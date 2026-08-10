import React, { useState } from "react";
import { Product, ProductCategory } from "../../types/types";
import {
  NewProductPayload,
  UpdateProductPayload,
  uploadProductImage,
} from "../../api/products";

interface CatalogueProps {
  products: Product[];
  onAddProduct: (payload: NewProductPayload) => Promise<void>;
  onUpdateProduct: (
    productID: string,
    payload: UpdateProductPayload
  ) => Promise<void>;
  onDeleteProduct: (productID: string) => Promise<void>;
}

const categories: ProductCategory[] = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Pendants",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

interface FormState {
  name: string;
  category: ProductCategory;
  collection: string;
  metal: string;
  description: string;
  weight: string;
  stock: string;
  image: string;
}

const emptyForm: FormState = {
  name: "",
  category: "Rings",
  collection: "",
  metal: "",
  description: "",
  weight: "",
  stock: "",
  image: "",
};

const Catalogue: React.FC<CatalogueProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [toast, setToast] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // When set, the form is editing this product instead of creating a new one.
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Product | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const startEdit = (product: Product) => {
    setSubmitError("");
    setErrors({});
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      collection: product.collection,
      metal: product.metal,
      description: product.description,
      weight: String(product.weight),
      stock: String(product.stock),
      image: product.image || "",
    });
    // Scroll the form into view for smaller screens where the grid stacks.
    window.setTimeout(() => {
      document.getElementById("name")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setErrors({});
    setSubmitError("");
  };

  const requestDelete = (product: Product) => {
    setDeleteError("");
    setConfirmTarget(product);
  };

  const cancelDelete = () => setConfirmTarget(null);

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    const productID = confirmTarget.id;
    setDeletingId(productID);
    try {
      await onDeleteProduct(productID);
      setConfirmTarget(null);
      if (editingProduct?.id === productID) cancelEdit();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Product name is required";
    if (!form.collection.trim()) nextErrors.collection = "Collection is required";
    if (!form.metal.trim()) nextErrors.metal = "Metal is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    if (!form.weight || Number(form.weight) <= 0) nextErrors.weight = "Enter a valid weight";
    if (!form.stock || Number(form.stock) <= 0) nextErrors.stock = "Enter a valid stock count";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadProductImage(file); // from api/products.ts
      handleChange("image", url);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    const payload: NewProductPayload = {
      name: form.name.trim(),
      category: form.category,
      collection: form.collection.trim(),
      metal: form.metal.trim(),
      description: form.description.trim(),
      weight: Number(form.weight),
      stock: Number(form.stock),
      image: form.image.trim() || undefined,
    };

    setSubmitting(true);
    try {
      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, payload);
        setToast(`"${payload.name}" updated`);
        setEditingProduct(null);
      } else {
        await onAddProduct(payload);
        setToast(`"${payload.name}" added to catalogue`);
      }
      setForm(emptyForm);
      window.setTimeout(() => setToast(""), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : editingProduct
          ? "Failed to update product"
          : "Failed to add product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Product catalogue</p>
          <h2>Catalogue</h2>
          <p className="panel-subtitle">Add new jewellery pieces so they appear on the storefront.</p>
        </div>
        <div className="stat-strip">
          <div className="stat-card">
            <span className="stat-value">{products.length}</span>
            <span className="stat-label">Products live</span>
          </div>
        </div>
      </header>

      <div className="catalogue-layout">
        <form className="product-form" onSubmit={handleSubmit} noValidate>
          <div className="product-form-heading">
            <h3>{editingProduct ? `Edit "${editingProduct.name}"` : "Add a product"}</h3>
            {editingProduct && (
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
            <label htmlFor="name">Product name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Emerald Halo Pendant"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="collection">Collection</label>
              <input
                id="collection"
                type="text"
                placeholder="e.g. Heritage"
                value={form.collection}
                onChange={(e) => handleChange("collection", e.target.value)}
              />
              {errors.collection && <span className="field-error">{errors.collection}</span>}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="stock">Stock quantity</label>
              <input
                id="stock"
                type="number"
                min={0}
                placeholder="10"
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
              />
              {errors.stock && <span className="field-error">{errors.stock}</span>}
            </div>

            <div className="field">
              <label htmlFor="weight">Weight (grams)</label>
              <input
                id="weight"
                type="number"
                min={0}
                step="0.1"
                placeholder="6.5"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
              {errors.weight && <span className="field-error">{errors.weight}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="metal">Metal</label>
            <input
              id="metal"
              type="text"
              placeholder="18K Gold"
              value={form.metal}
              onChange={(e) => handleChange("metal", e.target.value)}
            />
            {errors.metal && <span className="field-error">{errors.metal}</span>}
            <span className="field-hint">
              Price is calculated automatically from the live gold/silver rate and weight —
              use "Gold", "White Gold", "Rose Gold", or "Silver" for accurate pricing.
            </span>
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Short description shown on the storefront"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>
          
          <div className="field">
            <label htmlFor="image">Product image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
            {uploadingImage && <span className="field-error" style={{ color: "#555" }}>Uploading…</span>}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8, marginTop: 8 }}
              />
            )}
          </div>

          {submitError && <div className="banner banner--error">{submitError}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting
              ? editingProduct
                ? "Saving…"
                : "Adding…"
              : editingProduct
              ? "Save changes"
              : "Add to catalogue"}
          </button>

          {toast && <div className="toast">{toast}</div>}
        </form>

        <div className="product-grid">
          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products yet.</p>
              <span>Products you add will appear here.</span>
            </div>
          ) : (
            products.map((product) => (
              <article
                className={`product-card${editingProduct?.id === product.id ? " product-card--editing" : ""}`}
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23F1E9DC'/%3E%3Cpath d='M60 20 L95 50 L60 100 L25 50 Z' fill='%23C7A24A'/%3E%3C/svg%3E";
                  }}
                />
                <div className="product-card-body">
                  <span className="product-card-category">{product.category}</span>
                  <h4>{product.name}</h4>
                  <p className="product-card-material">{product.material}</p>
                  <div className="product-card-footer">
                    <span className="product-card-price">{formatCurrency(product.price)}</span>
                    <span className={`stock-pill ${product.stock < 5 ? "stock-pill--low" : ""}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="product-card-actions">
                    <button
                      type="button"
                      className="product-card-edit"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="product-card-delete"
                      disabled={deletingId === product.id}
                      onClick={() => requestDelete(product)}
                    >
                      {deletingId === product.id ? "Deleting..." : "Delete"}
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
            <h3>Delete this product?</h3>
            <p>
              <strong>{confirmTarget.name}</strong> ({confirmTarget.id}) will be removed from
              the catalogue. This cannot be undone.
            </p>
            {deleteError && <p className="modal-error">{deleteError}</p>}
            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={cancelDelete}
                disabled={deletingId === confirmTarget.id}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn-delete"
                onClick={confirmDelete}
                disabled={deletingId === confirmTarget.id}
              >
                {deletingId === confirmTarget.id ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalogue;
