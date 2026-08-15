import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchMonthlyAnalytics,
  MonthlyAnalytics,
} from "../../api/analytics";
import { ApiError } from "../../api/client";

interface AnalyticsProps {
  onUnauthorized: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const formatMonthLabel = (monthStr: string) => {
  const [year, month] = monthStr.split("-").map(Number);
  if (!year || !month) return monthStr;
  return new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

type MetalFilter = "all" | "gold" | "silver" | "platinum";

const metalFilters: { label: string; value: MetalFilter }[] = [
  { label: "All", value: "all" },
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
  { label: "Platinum", value: "platinum" },
];

const Analytics: React.FC<AnalyticsProps> = ({ onUnauthorized }) => {
  const [month, setMonth] = useState<string>(getCurrentMonth());
  const [data, setData] = useState<MonthlyAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metalFilter, setMetalFilter] = useState<MetalFilter>("all");

  const loadAnalytics = useCallback(
    async (selectedMonth: string) => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchMonthlyAnalytics(selectedMonth);
        setData(result);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          onUnauthorized();
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized]
  );

  useEffect(() => {
    loadAnalytics(month);
  }, [month, loadAnalytics]);

  const revenueByMetal = data?.revenueByMetal;

  const totalMetalRevenue = useMemo(() => {
    if (!revenueByMetal) return 0;
    return (
      revenueByMetal.gold +
      revenueByMetal.silver +
      revenueByMetal.platinum +
      revenueByMetal.other
    );
  }, [revenueByMetal]);

  const visibleMetalCards = useMemo(() => {
    if (!revenueByMetal) return [];
    const all: { key: MetalFilter; label: string; value: number }[] = [
      { key: "gold", label: "Gold", value: revenueByMetal.gold },
      { key: "silver", label: "Silver", value: revenueByMetal.silver },
      { key: "platinum", label: "Platinum", value: revenueByMetal.platinum },
    ];
    return metalFilter === "all" ? all : all.filter((c) => c.key === metalFilter);
  }, [revenueByMetal, metalFilter]);

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Insights</p>
          <h2>Analytics</h2>
          <p className="panel-subtitle">
            Top sellers, revenue and top customers for the selected month.
          </p>
        </div>
        <div className="analytics-header-controls">
          <label htmlFor="analytics-month" className="analytics-month-label">
            Month
          </label>
          <input
            id="analytics-month"
            type="month"
            className="month-picker"
            value={month}
            max={getCurrentMonth()}
            onChange={(e) => e.target.value && setMonth(e.target.value)}
          />
        </div>
      </header>

      {error && (
        <div className="banner banner--error">
          {error}{" "}
          <button className="banner-retry" onClick={() => loadAnalytics(month)}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <p>Loading…</p>
          <span>Crunching numbers for {formatMonthLabel(month)}.</span>
        </div>
      ) : !data || data.totalOrders === 0 ? (
        <div className="empty-state">
          <p>No orders in {formatMonthLabel(month)}.</p>
          <span>Pick a different month to see analytics.</span>
        </div>
      ) : (
        <>
          <div className="stat-strip" style={{ marginBottom: 28 }}>
            <div className="stat-card">
              <span className="stat-value">{formatCurrency(data.totalRevenue)}</span>
              <span className="stat-label">Total revenue — {formatMonthLabel(data.month)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{data.totalOrders}</span>
              <span className="stat-label">Orders this month</span>
            </div>
          </div>

          <div className="analytics-grid">
            {/* Top 3 most ordered products */}
            <div className="analytics-card">
              <h3>Top 3 Most Ordered Products</h3>
              <p className="analytics-card-subtitle">Ranked by units sold this month.</p>
              {data.topProducts.length === 0 ? (
                <p className="analytics-card-empty">No products ordered this month.</p>
              ) : (
                <div className="rank-list">
                  {data.topProducts.map((product, index) => (
                    <div className="rank-item" key={product.productID}>
                      <span className="rank-badge">{index + 1}</span>
                      <div className="rank-info">
                        <span className="rank-name">{product.name}</span>
                        <span className="rank-meta">{product.productID}</span>
                      </div>
                      <div className="rank-value">
                        <strong>{product.quantity} sold</strong>
                        <span>{formatCurrency(product.revenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top 3 customers */}
            <div className="analytics-card">
              <h3>Top 3 Customers</h3>
              <p className="analytics-card-subtitle">Ranked by number of orders placed.</p>
              {data.topCustomers.length === 0 ? (
                <p className="analytics-card-empty">No customer orders this month.</p>
              ) : (
                <div className="rank-list">
                  {data.topCustomers.map((customer, index) => (
                    <div className="rank-item" key={customer.userID}>
                      <span className="rank-badge">{index + 1}</span>
                      <div className="rank-info">
                        <span className="rank-name">{customer.name}</span>
                        <span className="rank-meta">{customer.email}</span>
                      </div>
                      <div className="rank-value">
                        <strong>{customer.orderCount} orders</strong>
                        <span>{formatCurrency(customer.totalSpent)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Revenue by metal */}
          <div className="analytics-card">
            <h3>Revenue by Metal</h3>
            <p className="analytics-card-subtitle">
              Product revenue for {formatMonthLabel(data.month)}, split by metal type.
            </p>

            <div className="filter-row">
              {metalFilters.map((f) => (
                <button
                  key={f.value}
                  className={`filter-chip ${metalFilter === f.value ? "filter-chip--active" : ""}`}
                  onClick={() => setMetalFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="metal-stat-strip">
              {visibleMetalCards.map((card) => (
                <div className="metal-stat-card" key={card.key}>
                  <span className="stat-value">{formatCurrency(card.value)}</span>
                  <span className="stat-label">{card.label}</span>
                </div>
              ))}
              <div className="metal-stat-card metal-stat-card--total">
                <span className="stat-value">{formatCurrency(totalMetalRevenue)}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Analytics;
