import React, { useMemo, useState } from "react";
import { OrderItem, OrderStatus } from "../../types/types";

interface PendingOrdersProps {
  orders: OrderItem[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const filters: { label: string; value: OrderStatus | "all" }[] = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "all" },
];

const PendingOrders: React.FC<PendingOrdersProps> = ({ orders, onUpdateStatus }) => {
  const [filter, setFilter] = useState<OrderStatus | "all">("pending");

  const visibleOrders = useMemo(() => {
    const filtered =
      filter === "all" ? orders : orders.filter((o) => o.status === filter);

    /*
     * Newest order first — ORD023 before ORD001 — across every tab
     * (All / Pending / Approved / Rejected). orderCode is "ORD" + a
     * zero-padded number, so compare the numeric part descending
     * rather than the string (keeps it correct past 3 digits too).
     */
    return [...filtered].sort((a, b) => {
      const numA = parseInt(a.orderCode.replace(/\D/g, ""), 10) || 0;
      const numB = parseInt(b.orderCode.replace(/\D/g, ""), 10) || 0;
      return numB - numA;
    });
  }, [orders, filter]);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const approvedValue = orders
    .filter((o) => o.status === "approved")
    .reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Order flow</p>
          <h2>Pending Orders</h2>
          <p className="panel-subtitle">
            Review new orders and confirm them to move into fulfilment.
          </p>
        </div>
        <div className="stat-strip">
          <div className="stat-card">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">Awaiting review</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{formatCurrency(approvedValue)}</span>
            <span className="stat-label">Approved value</span>
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

      {visibleOrders.length === 0 ? (
        <div className="empty-state">
          <p>No orders here yet.</p>
          <span>Orders placed by customers will show up in this list.</span>
        </div>
      ) : (
        <div className="order-table-wrap">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Placed</th>
                <th>Status</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.id}>
                  <td className="cell-code">{order.orderCode}</td>
                  <td>
                    <div className="customer-cell">
                      <span className="customer-name">{order.customerName}</span>
                      <span className="customer-phone">{order.customerPhone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-cell">
                      <img src={order.productImage} alt="" className="product-thumb" />
                      <div>
                        <span className="product-name">
                          {order.productName}
                          {order.extraItemsCount > 0 && (
                            <span className="extra-items"> +{order.extraItemsCount} more</span>
                          )}
                        </span>
                        {order.category && (
                          <span className="product-category">{order.category}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{order.quantity}</td>
                  <td className="cell-amount">{formatCurrency(order.price * order.quantity)}</td>
                  <td className="cell-muted">{formatDate(order.orderedAt)}</td>
                  <td>
                    <span className={`status-pill status-pill--${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button
                        className="btn btn-approve"
                        disabled={order.status === "approved"}
                        onClick={() => onUpdateStatus(order.id, "approved")}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-reject"
                        disabled={order.status === "rejected"}
                        onClick={() => onUpdateStatus(order.id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PendingOrders;
