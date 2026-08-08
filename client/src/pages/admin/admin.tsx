import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar, { View } from "../../components/admin/Sidebar";
import PendingOrders from "../../components/admin/PendingOrders";
import Catalogue from "../../components/admin/Catalogue";
import { useAuth } from "../../context/AuthContext";
import { orderToUi, productToUi } from "../../api/adapters";
import { fetchOrders, updateOrderStatus as updateOrderStatusApi } from "../../api/orders";
import { addProduct as addProductApi, fetchProducts, NewProductPayload } from "../../api/products";
import { ApiError } from "../../api/client";
import { OrderItem, OrderStatus, Product } from "../../types/types";
 
const ADMIN_VIEW_STORAGE_KEY = "hiranya_admin_view";

const getInitialView = (): View => {
  const stored = window.localStorage.getItem(ADMIN_VIEW_STORAGE_KEY);
  return stored === "catalogue" || stored === "orders" ? stored : "orders";
};

const Dashboard: React.FC = () => {
  const { name, logout } = useAuth();
  const [view, setView] = useState<View>(getInitialView);
   const handleNavigate = (nextView: View) => {
     setView(nextView);
    window.localStorage.setItem(ADMIN_VIEW_STORAGE_KEY, nextView);
  };
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [apiOrders, apiProducts] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
      ]);
      setOrders(apiOrders.map(orderToUi));
      setProducts(apiProducts.map(productToUi));
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      setLoadError(
        error instanceof Error ? error.message : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    const backendStatus = status === "approved" ? "Confirmed" : "Cancelled";

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    try {
      await updateOrderStatusApi(id, backendStatus);
    } catch (error) {
      await loadData();
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      window.alert(
        error instanceof Error ? error.message : "Failed to update order"
      );
    }
  };

  const handleAddProduct = async (payload: NewProductPayload) => {
    const created = await addProductApi(payload);
    setProducts((prev) => [productToUi(created), ...prev]);
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="admin-shell">
      <Sidebar
        active={view}
        onNavigate={handleNavigate}
        pendingCount={pendingCount}
        adminName={name || "Store Admin"}
        onLogout={logout}
      />
      <main className="main-content">
        {loadError && (
          <div className="banner banner--error">
            {loadError}{" "}
            <button className="banner-retry" onClick={loadData}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            <p>Loading…</p>
            <span>Fetching the latest orders and catalogue.</span>
          </div>
        ) : view === "orders" ? (
          <PendingOrders orders={orders} onUpdateStatus={handleUpdateStatus} />
        ) : (
          <Catalogue products={products} onAddProduct={handleAddProduct} />
        )}
      </main>
    </div>
  );
};

const Admin: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />;
};

export default Admin;