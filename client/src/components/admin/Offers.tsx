import React, { useState } from "react";
import { Offer } from "../../types/types";
import { NewOfferPayload, UpdateOfferPayload } from "../../api/offers";

interface OffersProps {
  offers: Offer[];
  onAddOffer: (payload: NewOfferPayload) => Promise<void>;
  onUpdateOffer: (id: string, payload: UpdateOfferPayload) => Promise<void>;
  onDeleteOffer: (id: string) => Promise<void>;
}

interface FormState {
  code: string;
  description: string;
  discountType: "percentage" | "flat";
  discountValue: string;
  minCartValue: string;
  isActive: boolean;
}

const emptyForm: FormState = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  minCartValue: "",
  isActive: true,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDiscount = (offer: Offer) =>
  offer.discountType === "percentage"
    ? `${offer.discountValue}% OFF`
    : `${formatCurrency(offer.discountValue)} OFF`;

const Offers: React.FC<OffersProps> = ({
  offers,
  onAddOffer,
  onUpdateOffer,
  onDeleteOffer,
}) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [toast, setToast] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // When set, the form is editing this offer instead of creating a new one.
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Offer | null>(null);
  const [actionError, setActionError] = useState("");

  const activeCount = offers.filter((o) => o.isActive).length;

  const startEdit = (offer: Offer) => {
    setSubmitError("");
    setErrors({});
    setEditingOffer(offer);
    setForm({
      code: offer.code,
      description: offer.description,
      discountType: offer.discountType,
      discountValue: String(offer.discountValue),
      minCartValue: String(offer.minCartValue),
      isActive: offer.isActive,
    });
    window.setTimeout(() => {
      document.getElementById("offer-code")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const cancelEdit = () => {
    setEditingOffer(null);
    setForm(emptyForm);
    setErrors({});
    setSubmitError("");
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value } as FormState));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.code.trim()) nextErrors.code = "Coupon code is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    if (!form.discountValue || Number(form.discountValue) <= 0) {
      nextErrors.discountValue = "Enter a valid discount value";
    } else if (form.discountType === "percentage" && Number(form.discountValue) > 100) {
      nextErrors.discountValue = "Percentage discount can't exceed 100";
    }
    if (form.minCartValue !== "" && Number(form.minCartValue) < 0) {
      nextErrors.minCartValue = "Minimum cart value can't be negative";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    const payload: NewOfferPayload = {
      code: form.code.trim().toUpperCase(),
      description: form.description.trim(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minCartValue: form.minCartValue ? Number(form.minCartValue) : 0,
      isActive: form.isActive,
    };

    setSubmitting(true);
    try {
      if (editingOffer) {
        await onUpdateOffer(editingOffer.id, payload);
        setToast(`"${payload.code}" updated`);
        setEditingOffer(null);
      } else {
        await onAddOffer(payload);
        setToast(`"${payload.code}" added`);
      }
      setForm(emptyForm);
      window.setTimeout(() => setToast(""), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : editingOffer
          ? "Failed to update offer"
          : "Failed to add offer"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (offer: Offer) => {
    setBusyId(offer.id);
    setActionError("");
    try {
      await onUpdateOffer(offer.id, { isActive: !offer.isActive });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update offer");
    } finally {
      setBusyId(null);
    }
  };

  const requestDelete = (offer: Offer) => {
    setActionError("");
    setConfirmTarget(offer);
  };

  const cancelDelete = () => setConfirmTarget(null);

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    const id = confirmTarget.id;
    setBusyId(id);
    try {
      await onDeleteOffer(id);
      setConfirmTarget(null);
      if (editingOffer?.id === id) cancelEdit();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete offer");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Coupons & discounts</p>
          <h2>Offers</h2>
          <p className="panel-subtitle">
            Create coupon codes with a minimum-cart condition and a percentage or flat
            discount. Customers can view and apply these on the Offers page and in their
            cart — the order total updates automatically.
          </p>
        </div>
        <div className="stat-strip">
          <div className="stat-card">
            <span className="stat-value">{offers.length}</span>
            <span className="stat-label">Total offers</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{activeCount}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
      </header>

      {actionError && <div className="banner banner--error">{actionError}</div>}

      <div className="catalogue-layout">
        <form className="product-form" onSubmit={handleSubmit} noValidate>
          <div className="product-form-heading">
            <h3>{editingOffer ? `Edit "${editingOffer.code}"` : "Add an offer"}</h3>
            {editingOffer && (
              <button
                type="button"
                className="product-form-cancel-link"
                onClick={cancelEdit}
                disabled={submitting}
              >
                Cancel
              </button>
            )}
          </div>

          <div className="field">
            <label htmlFor="offer-code">Coupon code</label>
            <input
              id="offer-code"
              type="text"
              placeholder="e.g. HIRANYA10"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
            />
            {errors.code && <span className="field-error">{errors.code}</span>}
            <span className="field-hint">
              This is exactly what the customer types in at checkout.
            </span>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="discountType">Discount type</label>
              <select
                id="discountType"
                value={form.discountType}
                onChange={(e) =>
                  handleChange("discountType", e.target.value as "percentage" | "flat")
                }
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat amount (₹)</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="discountValue">
                {form.discountType === "percentage" ? "Discount %" : "Discount amount (₹)"}
              </label>
              <input
                id="discountValue"
                type="number"
                min={0}
                max={form.discountType === "percentage" ? 100 : undefined}
                placeholder={form.discountType === "percentage" ? "10" : "5000"}
                value={form.discountValue}
                onChange={(e) => handleChange("discountValue", e.target.value)}
              />
              {errors.discountValue && (
                <span className="field-error">{errors.discountValue}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="minCartValue">Condition — minimum cart value (₹)</label>
            <input
              id="minCartValue"
              type="number"
              min={0}
              placeholder="0 for no minimum"
              value={form.minCartValue}
              onChange={(e) => handleChange("minCartValue", e.target.value)}
            />
            {errors.minCartValue && (
              <span className="field-error">{errors.minCartValue}</span>
            )}
            <span className="field-hint">
              The cart subtotal must be at least this much for the coupon to work.
            </span>
          </div>

          <div className="field">
            <label htmlFor="offer-description">Description</label>
            <textarea
              id="offer-description"
              rows={3}
              placeholder="Shown to customers, e.g. Get 10% OFF on orders above ₹50,000"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          <div className="field field-checkbox">
            <label htmlFor="offer-active">
              <input
                id="offer-active"
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
              />
              Active — visible to customers right away
            </label>
          </div>

          {submitError && <div className="banner banner--error">{submitError}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting
              ? editingOffer
                ? "Saving…"
                : "Adding…"
              : editingOffer
              ? "Save changes"
              : "Add offer"}
          </button>

          {toast && <div className="toast">{toast}</div>}
        </form>

        <div className="product-grid">
          {offers.length === 0 ? (
            <div className="empty-state">
              <p>No offers yet.</p>
              <span>Offers you add will appear here and on the storefront.</span>
            </div>
          ) : (
            offers.map((offer) => (
              <article
                className={`product-card offer-admin-card${
                  editingOffer?.id === offer.id ? " product-card--editing" : ""
                }${offer.isActive ? "" : " offer-admin-card--inactive"}`}
                key={offer.id}
              >
                <div className="product-card-body">
                  <span className="product-card-category">{formatDiscount(offer)}</span>
                  <h4>{offer.code}</h4>
                  <p className="product-card-material">{offer.description}</p>
                  <div className="product-card-footer">
                    <span className="product-card-price">
                      {offer.minCartValue > 0
                        ? `Min cart ${formatCurrency(offer.minCartValue)}`
                        : "No minimum cart value"}
                    </span>
                    <span
                      className={`stock-pill ${offer.isActive ? "" : "stock-pill--low"}`}
                    >
                      {offer.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="product-card-actions">
                    <button
                      type="button"
                      className="btn-outline"
                      disabled={busyId === offer.id}
                      onClick={() => toggleActive(offer)}
                    >
                      {busyId === offer.id
                        ? "Updating..."
                        : offer.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                    <button
                      type="button"
                      className="product-card-edit"
                      onClick={() => startEdit(offer)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="product-card-delete"
                      disabled={busyId === offer.id}
                      onClick={() => requestDelete(offer)}
                    >
                      {busyId === offer.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {confirmTarget && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this offer?</h3>
            <p>
              <strong>{confirmTarget.code}</strong> will be removed and customers will no
              longer be able to apply it. This cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={cancelDelete}
                disabled={busyId === confirmTarget.id}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn-delete"
                onClick={confirmDelete}
                disabled={busyId === confirmTarget.id}
              >
                {busyId === confirmTarget.id ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Offers;
