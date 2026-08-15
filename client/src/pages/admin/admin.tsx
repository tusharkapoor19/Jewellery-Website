import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Sidebar, { View } from "../../components/admin/Sidebar";
import Analytics from "../../components/admin/Analytics";
import PendingOrders from "../../components/admin/PendingOrders";
import Catalogue from "../../components/admin/Catalogue";
import OffersAdmin from "../../components/admin/Offers";
import Customers from "../../components/admin/Customers";
import CustomDesignAdmin from "../../components/admin/CustomDesignAdmin";

import { useAuth } from "../../context/AuthContext";
<<<<<<< HEAD

import {
  orderToUi,
  productToUi,
  userToUi,
} from "../../api/adapters";

import {
  fetchOrders,
  updateOrderStatus as updateOrderStatusApi,
} from "../../api/orders";

=======
import { offerToUi, orderToUi, productToUi, userToUi } from "../../api/adapters";
import { fetchOrders, updateOrderStatus as updateOrderStatusApi } from "../../api/orders";
>>>>>>> 5f8e294 (offers)
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
<<<<<<< HEAD

import { ApiError } from "../../api/client";

import {
  Customer,
  OrderItem,
  OrderStatus,
  Product,
  UserRole,
} from "../../types/types";
=======
import {
  addOffer as addOfferApi,
  deleteOffer as deleteOfferApi,
  fetchAllOffers,
  NewOfferPayload,
  updateOffer as updateOfferApi,
  UpdateOfferPayload,
} from "../../api/offers";
import { ApiError } from "../../api/client";
import { Customer, Offer, OrderItem, OrderStatus, Product, UserRole } from "../../types/types";
>>>>>>> 5f8e294 (offers)

const ADMIN_VIEW_STORAGE_KEY = "hiranya_admin_view";

const NOTIFICATION_SERVICE_URL =
  process.env.REACT_APP_NOTIFICATION_SERVICE_URL ||
  "http://localhost:5006";

const getInitialView = (): View => {
<<<<<<< HEAD
  const stored = window.localStorage.getItem(ADMIN_VIEW_STORAGE_KEY);
  return stored === "analytics" ||
    stored === "catalogue" ||
<<<<<<< HEAD
=======
  const stored = window.localStorage.getItem(
    ADMIN_VIEW_STORAGE_KEY
  );

  return stored === "catalogue" ||
>>>>>>> c49b6c8 (Update project changes)
=======
    stored === "offers" ||
>>>>>>> 5f8e294 (offers)
    stored === "orders" ||
    stored === "customers" ||
    stored === "customDesign"
    ? stored
    : "orders";
};

const Dashboard: React.FC = () => {
  const { name, id, logout } = useAuth();

  const [view, setView] =
    useState<View>(getInitialView);

  const [orders, setOrders] =
    useState<OrderItem[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  /*
   * Keeps the backend userID for every order.
   *
   * OrderItem UI adapter does not need to expose userID.
   * We keep it separately so Admin can send notifications
   * to the correct customer.
   */
  const [orderUserIds, setOrderUserIds] =
    useState<Record<string, string>>({});

  const [loading, setLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");

  const [customDesignPendingCount, setCustomDesignPendingCount] =
    useState(0);

  /*
   * ============================================================
   * Navigation
   * ============================================================
   */

  const handleNavigate = (nextView: View) => {
    setView(nextView);

    window.localStorage.setItem(
      ADMIN_VIEW_STORAGE_KEY,
      nextView
    );
  };

<<<<<<< HEAD
  /*
   * ============================================================
   * Load Dashboard Data
   * ============================================================
   */
=======
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
>>>>>>> 5f8e294 (offers)

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
<<<<<<< HEAD
      const [
        apiOrders,
        apiProducts,
        apiUsers,
      ] = await Promise.all([
=======
      const [apiOrders, apiProducts, apiUsers, apiOffers] = await Promise.all([
>>>>>>> 5f8e294 (offers)
        fetchOrders(),
        fetchProducts(),
        fetchUsers(),
        fetchAllOffers(),
      ]);
<<<<<<< HEAD

      /*
       * Store backend userID separately.
       *
       * Backend order contains:
       * {
       *   orderID,
       *   userID,
       *   ...
       * }
       *
       * We need userID later when admin approves/rejects
       * an order and creates a notification.
       */
      const userIdMap: Record<string, string> = {};

      apiOrders.forEach((order: any) => {
        if (order.orderID && order.userID) {
          userIdMap[order.orderID] = String(
            order.userID
          );
        }
      });

      setOrderUserIds(userIdMap);

      /*
       * Convert backend data to Admin UI format
       */
      setOrders(
        apiOrders.map(orderToUi)
      );

      setProducts(
        apiProducts.map(productToUi)
      );

      setCustomers(
        apiUsers.map(userToUi)
      );
=======
      setOrders(apiOrders.map(orderToUi));
      setProducts(apiProducts.map(productToUi));
      setCustomers(apiUsers.map(userToUi));
      setOffers(apiOffers.map(offerToUi));
>>>>>>> 5f8e294 (offers)
    } catch (error) {
      if (
        error instanceof ApiError &&
        (
          error.status === 401 ||
          error.status === 403
        )
      ) {
        logout();
        return;
      }

      setLoadError(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, [logout]);

  /*
   * Load data on dashboard mount
   */

  useEffect(() => {
    loadData();
  }, [loadData]);

  /*
   * ============================================================
   * UPDATE ORDER STATUS
   * ============================================================
   *
   * Admin:
   *
   * Approve
   *   ↓
   * Backend status = Confirmed
   *   ↓
   * Notification created
   *   ↓
   * Customer Bell 🔔
   *
   * Reject
   *   ↓
   * Backend status = Cancelled
   *   ↓
   * Notification created
   *   ↓
   * Customer Bell 🔔
   *
   * NO EMAIL IS SENT HERE.
   */

  const handleUpdateStatus = async (
    orderId: string,
    status: OrderStatus
  ) => {
    /*
     * Convert frontend UI status
     * to backend order status.
     */
    const backendStatus =
      status === "approved"
        ? "Confirmed"
        : "Cancelled";

    /*
     * Get customer userID using order ID.
     */
    const userId =
      orderUserIds[orderId];

    /*
     * Optimistically update UI.
     */
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    try {
      /*
       * --------------------------------------------------------
       * STEP 1: Update Order Status
       * --------------------------------------------------------
       */

      await updateOrderStatusApi(
        orderId,
        backendStatus
      );

      /*
       * --------------------------------------------------------
       * STEP 2: Create Notification
       * --------------------------------------------------------
       *
       * Only create notification after the order status
       * was successfully updated.
       */

      if (!userId) {
        console.error(
          "Notification not created: userID not found for order",
          orderId
        );

        return;
      }

      try {
        const notificationTitle =
          status === "approved"
            ? "Order Confirmed"
            : "Order Rejected";

        const notificationMessage =
          status === "approved"
            ? `Your order ${orderId} has been confirmed successfully.`
            : `Your order ${orderId} has been rejected.`;

        await axios.post(
          `${NOTIFICATION_SERVICE_URL}/notifications`,
          {
            userId: userId,
            title: notificationTitle,
            message: notificationMessage,
          }
        );

        console.log(
          "Order status notification created successfully"
        );
      } catch (notificationError) {
        /*
         * IMPORTANT:
         *
         * Order status update already succeeded.
         * Therefore we do NOT rollback the order just because
         * notification creation failed.
         */
        console.error(
          "Failed to create order status notification:",
          notificationError
        );
      }
    } catch (error) {
      /*
       * Order update itself failed.
       *
       * Reload latest data so UI returns to correct state.
       */

      await loadData();

      if (
        error instanceof ApiError &&
        (
          error.status === 401 ||
          error.status === 403
        )
      ) {
        logout();
        return;
      }

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to update order"
      );
    }
  };

  /*
   * ============================================================
   * PRODUCTS
   * ============================================================
   */

  const handleAddProduct = async (
    payload: NewProductPayload
  ) => {
    const created =
      await addProductApi(payload);

    setProducts((prev) => [
      productToUi(created),
      ...prev,
    ]);
  };

  const handleUpdateProduct = async (
    productID: string,
    payload: UpdateProductPayload
  ) => {
    const updated =
      await updateProductApi(
        productID,
        payload
      );

    setProducts((prev) =>
      prev.map((product) =>
        product.id === productID
          ? productToUi(updated)
          : product
      )
    );
  };

  const handleDeleteProduct = async (
    productID: string
  ) => {
    await deleteProductApi(productID);

    setProducts((prev) =>
      prev.filter(
        (product) =>
          product.id !== productID
      )
    );
  };

  /*
   * ============================================================
   * CUSTOMERS
   * ============================================================
   */

  const handleChangeUserRole = async (
    customerId: string,
    role: UserRole
  ) => {
    const updated =
      await updateUserRoleApi(
        customerId,
        role
      );

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? userToUi(updated)
          : customer
      )
    );
  };

<<<<<<< HEAD
  const handleDeleteCustomer = async (
    customerId: string
  ) => {
    await deleteUserApi(customerId);

    setCustomers((prev) =>
      prev.filter(
        (customer) =>
          customer.id !== customerId
      )
    );
  };

  /*
   * ============================================================
   * COUNTERS
   * ============================================================
   */

  const pendingCount =
    orders.filter(
      (order) =>
        order.status === "pending"
    ).length;

  /*
   * ============================================================
   * DASHBOARD
   * ============================================================
   */
=======
  const handleAddOffer = async (payload: NewOfferPayload) => {
    const created = await addOfferApi(payload);
    setOffers((prev) => [offerToUi(created), ...prev]);
  };

  const handleUpdateOffer = async (id: string, payload: UpdateOfferPayload) => {
    const updated = await updateOfferApi(id, payload);
    setOffers((prev) => prev.map((o) => (o.id === id ? offerToUi(updated) : o)));
  };

  const handleDeleteOffer = async (id: string) => {
    await deleteOfferApi(id);
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const activeOfferCount = offers.filter((o) => o.isActive).length;
  const [customDesignPendingCount, setCustomDesignPendingCount] = useState(0);
>>>>>>> 5f8e294 (offers)

  return (
    <div className="admin-shell">

      <Sidebar
        active={view}
        onNavigate={handleNavigate}
        pendingCount={pendingCount}
<<<<<<< HEAD
        pendingCustomDesignCount={
          customDesignPendingCount
        }
        adminName={
          name || "Store Admin"
        }
=======
        pendingCustomDesignCount={customDesignPendingCount}
        activeOfferCount={activeOfferCount}
        adminName={name || "Store Admin"}
>>>>>>> 5f8e294 (offers)
        onLogout={logout}
      />

      <main className="main-content">

        {loadError && (
          <div className="banner banner--error">

            {loadError}

            {" "}

            <button
              className="banner-retry"
              onClick={loadData}
            >
              Retry
            </button>

          </div>
        )}

        {/*
         * ======================================================
         * CUSTOM DESIGN
         * ======================================================
         */}

        {view === "customDesign" ? (
<<<<<<< HEAD
          <CustomDesignAdmin onPendingCountChange={setCustomDesignPendingCount} />
        ) : view === "analytics" ? (
          <Analytics onUnauthorized={logout} />
=======

          <CustomDesignAdmin
            onPendingCountChange={
              setCustomDesignPendingCount
            }
          />

>>>>>>> c49b6c8 (Update project changes)
        ) : loading ? (

          /*
           * ====================================================
           * LOADING
           * ====================================================
           */

          <div className="empty-state">

            <p>
              Loading…
            </p>

            <span>
              Fetching the latest orders and catalogue.
            </span>

          </div>

        ) : view === "orders" ? (

          /*
           * ====================================================
           * ORDERS
           * ====================================================
           */

          <PendingOrders
            orders={orders}
            onUpdateStatus={
              handleUpdateStatus
            }
          />

        ) : view === "catalogue" ? (

          /*
           * ====================================================
           * CATALOGUE
           * ====================================================
           */

          <Catalogue
            products={products}
            onAddProduct={
              handleAddProduct
            }
            onUpdateProduct={
              handleUpdateProduct
            }
            onDeleteProduct={
              handleDeleteProduct
            }
          />
<<<<<<< HEAD

=======
        ) : view === "offers" ? (
          <OffersAdmin
            offers={offers}
            onAddOffer={handleAddOffer}
            onUpdateOffer={handleUpdateOffer}
            onDeleteOffer={handleDeleteOffer}
          />
>>>>>>> 5f8e294 (offers)
        ) : (

          /*
           * ====================================================
           * CUSTOMERS
           * ====================================================
           */

          <Customers
            customers={customers}
            currentUserId={id}
            onChangeRole={
              handleChangeUserRole
            }
            onDeleteCustomer={
              handleDeleteCustomer
            }
          />

        )}

      </main>

    </div>
  );
};

/*
 * ==============================================================
 * ADMIN ROUTE PROTECTION
 * ==============================================================
 */

const Admin: React.FC = () => {
  const {
    isAuthenticated,
    role,
  } = useAuth();

  return isAuthenticated &&
    role === "admin" ? (
    <Dashboard />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default Admin;