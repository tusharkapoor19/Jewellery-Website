import React from "react";

export type View = "analytics" | "orders" | "catalogue" | "offers" | "customers" | "customDesign";

interface SidebarProps {
  active: View;
  onNavigate: (view: View) => void;
  pendingCount: number;
  pendingCustomDesignCount?: number;
  activeOfferCount?: number;
  adminName: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  active,
  onNavigate,
  pendingCount,
  pendingCustomDesignCount = 0,
  activeOfferCount = 0,
  adminName,
  onLogout,
}) => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M12 2 L21 9 L12 22 L3 9 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M3 9 L21 9" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8.5 9 L12 2 L15.5 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
        <div>
          <h1>HIRANYA</h1>
          <p>Jewellery Admin</p>
        </div>
      </div>

      <nav className="nav">
        <button
          className={`nav-item ${active === "analytics" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("analytics")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M4 20 V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M11 20 V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M18 20 V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M3 20 H21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          Analytics
        </button>

        <button
          className={`nav-item ${active === "orders" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("orders")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <rect x="3.5" y="5" width="17" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3.5 9.5 H20.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 5 V3.5 A1.5 1.5 0 0 1 9.5 2 H14.5 A1.5 1.5 0 0 1 16 3.5 V5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          Pending Orders
          {pendingCount > 0 && <span className="nav-badge">{pendingCount}</span>}
        </button>

        <button
          className={`nav-item ${active === "customDesign" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("customDesign")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 2 L14.5 8.5 L21 9 L16 13.2 L17.6 20 L12 16.3 L6.4 20 L8 13.2 L3 9 L9.5 8.5 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </span>
          Custom Design
          {pendingCustomDesignCount > 0 && <span className="nav-badge">{pendingCustomDesignCount}</span>}
        </button>

        <button
          className={`nav-item ${active === "catalogue" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("catalogue")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 3 L20 8 V16 L12 21 L4 16 V8 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M4 8 L12 13 L20 8" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12 13 V21" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          Catalogue
        </button>

        <button
          className={`nav-item ${active === "offers" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("offers")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M20.5 12.7 12.7 20.5 a1.4 1.4 0 0 1 -2 0 L3.5 13.3 V4.5 a1 1 0 0 1 1 -1 h8.8 l7.2 7.2 a1.4 1.4 0 0 1 0 2 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          Offers
          {activeOfferCount > 0 && <span className="nav-badge">{activeOfferCount}</span>}
        </button>

        <button
          className={`nav-item ${active === "customers" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("customers")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3.5 20 C3.5 15.5 6 13.5 9 13.5 C12 13.5 14.5 15.5 14.5 20" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M14.7 13.8 C17 13.3 20.5 14.8 20.5 19.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          Customers
        </button>
      </nav>

      <div className="sidebar-footer">
        <p>Signed in as</p>
        <div className="admin-chip">
          <span className="admin-avatar">{adminName.charAt(0).toUpperCase()}</span>
          <span>{adminName}</span>
        </div>
        <button className="logout-link" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
