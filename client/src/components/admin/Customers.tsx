import React, { useMemo, useState } from "react";
import { Customer, UserRole } from "../../types/types";

interface CustomersProps {
  customers: Customer[];
  currentUserId: string | null;
  onChangeRole: (id: string, role: UserRole) => Promise<void>;
  onDeleteCustomer: (id: string) => Promise<void>;
}

const filters: { label: string; value: UserRole | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Customers", value: "customer" },
  { label: "Admins", value: "admin" },
];

const Customers: React.FC<CustomersProps> = ({
  customers,
  currentUserId,
  onChangeRole,
  onDeleteCustomer,
}) => {
  const [filter, setFilter] = useState<UserRole | "all">("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<"role" | "delete" | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Customer | null>(null);
  const [roleConfirmTarget, setRoleConfirmTarget] = useState<Customer | null>(null);
  const [actionError, setActionError] = useState("");

  const visibleCustomers = useMemo(
    () =>
      filter === "all" ? customers : customers.filter((c) => c.role === filter),
    [customers, filter]
  );

  const adminCount = customers.filter((c) => c.role === "admin").length;

  const requestRoleChange = (customer: Customer) => {
  setActionError("");
  setRoleConfirmTarget(customer);
};

const cancelRoleChange = () => setRoleConfirmTarget(null);

const confirmRoleChange = async () => {
  if (!roleConfirmTarget) return;
  const customer = roleConfirmTarget;
  const nextRole: UserRole = customer.role === "admin" ? "customer" : "admin";
  const verb = nextRole === "admin" ? "make" : "remove";
  setBusyId(customer.id);
  setBusyAction("role");
  setActionError("");
  try {
    await onChangeRole(customer.id, nextRole);
    setRoleConfirmTarget(null);
  } catch (err) {
    setActionError(err instanceof Error ? err.message : `Failed to ${verb} admin role`);
  } finally {
    setBusyId(null);
    setBusyAction(null);
  }
};

  const requestDelete = (customer: Customer) => {
    setActionError("");
    setConfirmTarget(customer);
  };

  const cancelDelete = () => setConfirmTarget(null);

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    setBusyId(confirmTarget.id);
    setBusyAction("delete");
    try {
      await onDeleteCustomer(confirmTarget.id);
      setConfirmTarget(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">User management</p>
          <h2>Customers</h2>
          <p className="panel-subtitle">
            View basic customer details, promote trusted users to admin, or
            remove accounts permanently.
          </p>
        </div>
        <div className="stat-strip">
          <div className="stat-card">
            <span className="stat-value">{customers.length}</span>
            <span className="stat-label">Total users</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{adminCount}</span>
            <span className="stat-label">Admins</span>
          </div>
        </div>
      </header>

      <div className="filter-row">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-chip ${filter === f.value ? "filter-chip--active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {actionError && <div className="banner banner--error">{actionError}</div>}

      {visibleCustomers.length === 0 ? (
        <div className="empty-state">
          <p>No users found.</p>
          <span>Try a different filter.</span>
        </div>
      ) : (
        <div className="customer-list">
          {visibleCustomers.map((customer) => {
            const isBusy = busyId === customer.id;
            const isSelf = customer.id === currentUserId;
            return (
              <article className="customer-card" key={customer.id}>
                <div className="customer-card-main">
                  <span className="customer-avatar">
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="customer-card-info">
                    <h4>
                      {customer.name}
                      {isSelf && <span className="you-badge"> (You)</span>}
                    </h4>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>

                <div className="customer-card-actions">
                  <span
                    className={`role-badge ${
                      customer.role === "admin" ? "role-badge--admin" : ""
                    }`}
                  >
                    {customer.role === "admin" ? "Admin" : "Customer"}
                  </span>

                  <button
                    type="button"
                    className="btn-outline"
                    disabled={isBusy || isSelf}
                    title={isSelf ? "You can't change your own admin access" : undefined}
                    onClick={() => requestRoleChange(customer)}
                  >
                    {isBusy && busyAction === "role"
                      ? "Updating..."
                      : customer.role === "admin"
                      ? "Remove admin"
                      : "Make admin"}
                  </button>

                  <button
                    type="button"
                    className="product-card-delete"
                    disabled={isBusy || isSelf}
                    title={isSelf ? "You can't delete your own account" : undefined}
                    onClick={() => requestDelete(customer)}
                  >
                    {isBusy && busyAction === "delete" ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {roleConfirmTarget && (
        <div className="modal-overlay" onClick={cancelRoleChange}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>
              {roleConfirmTarget.role === "admin" ? "Remove admin access?" : "Make this user an admin?"}
            </h3>
            <p>
              {roleConfirmTarget.role === "admin" ? (
                <>Admin access will be removed from <strong>{roleConfirmTarget.name}</strong>.</>
              ) : (
                <><strong>{roleConfirmTarget.name}</strong> will get full dashboard access.</>
              )}
            </p>
            {actionError && <p className="modal-error">{actionError}</p>}
            <div className="modal-actions">
              <button type="button" className="modal-btn-cancel" onClick={cancelRoleChange} disabled={busyId === roleConfirmTarget.id}>
                Cancel
              </button>
              <button type="button" className="modal-btn-delete" onClick={confirmRoleChange} disabled={busyId === roleConfirmTarget.id}>
                {busyId === roleConfirmTarget.id ? "Updating..." : "Yes, continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Customers;
