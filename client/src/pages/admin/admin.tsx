import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar, { View } from "../../components/admin/Sidebar";
import Analytics from "../../components/admin/Analytics";
import PendingOrders from "../../components/admin/PendingOrders";
import Catalogue from "../../components/admin/Catalogue";
import Customers from "../../components/admin/Customers";
import CustomDesignAdmin from "../../components/admin/CustomDesignAdmin";
import { useAuth } from "../../context/AuthContext";
import { orderToUi, productToUi, userToUi } from "../../api/adapters";
import { fetchOrders, updateOrderStatus as updateOrderStatusApi } from "../../api/orders";
import {
  addProduct as addProductApi,
  deleteProduct as deleteProductApi,
  fetchProducts,
  NewProductPayload,
  updateProduct as updateProductApi,
  UpdateProductPayload,
} from "../../api/products";
import {
  deleteUser as deleteUserApi,
  fetchUsers,
  updateUserRole as updateUserRoleApi,
} from "../../api/users";
import { ApiError } from "../../api/client";
import { Customer, OrderItem, OrderStatus, Product, UserRole } from "../../types/types";

const ADMIN_VIEW_STORAGE_KEY = "hiranya_admin_view";

const getInitialView = (): View => {
  const stored = window.localStorage.getItem(ADMIN_VIEW_STORAGE_KEY);
  return stored === "analytics" ||
    stored === "catalogue" ||
    stored === "orders" ||
    stored === "customers" ||
    stored === "customDesign"
    ? stored
    : "orders";
};

const Dashboard: React.FC = () => {
  const { name, id, logout } = useAuth();
  const [view, setView] = useState<View>(getInitialView);

  const handleNavigate = (nextView: View) => {
    setView(nextView);
    window.localStorage.setItem(ADMIN_VIEW_STORAGE_KEY, nextView);
  };

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [apiOrders, apiProducts, apiUsers] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
        fetchUsers(),
      ]);
      setOrders(apiOrders.map(orderToUi));
      setProducts(apiProducts.map(productToUi));
      setCustomers(apiUsers.map(userToUi));
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
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
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
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

  const handleUpdateProduct = async (
    productID: string,
    payload: UpdateProductPayload
  ) => {
    const updated = await updateProductApi(productID, payload);
    setProducts((prev) =>
      prev.map((p) => (p.id === productID ? productToUi(updated) : p))
    );
  };

  const handleDeleteProduct = async (productID: string) => {
    await deleteProductApi(productID);
    setProducts((prev) => prev.filter((p) => p.id !== productID));
  };

  const handleChangeUserRole = async (id: string, role: UserRole) => {
    const updated = await updateUserRoleApi(id, role);
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? userToUi(updated) : c))
    );
  };

  const handleDeleteCustomer = async (id: string) => {
    await deleteUserApi(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const [customDesignPendingCount, setCustomDesignPendingCount] = useState(0);

  return (
    <div className="admin-shell">
      <Sidebar
        active={view}
        onNavigate={handleNavigate}
        pendingCount={pendingCount}
        pendingCustomDesignCount={customDesignPendingCount}
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

        {view === "customDesign" ? (
          <CustomDesignAdmin onPendingCountChange={setCustomDesignPendingCount} />
        ) : view === "analytics" ? (
          <Analytics onUnauthorized={logout} />
        ) : loading ? (
          <div className="empty-state">
            <p>Loading…</p>
            <span>Fetching the latest orders and catalogue.</span>
          </div>
        ) : view === "orders" ? (
          <PendingOrders orders={orders} onUpdateStatus={handleUpdateStatus} />
        ) : view === "catalogue" ? (
          <Catalogue
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        ) : (
          <Customers
            customers={customers}
            currentUserId={id}
            onChangeRole={handleChangeUserRole}
            onDeleteCustomer={handleDeleteCustomer}
          />
        )}
      </main>
    </div>
  );
};

const Admin: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === "admin" ? (
    <Dashboard />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Admin;
