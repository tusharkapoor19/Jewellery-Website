import React from "react";

export type View = "orders" | "catalogue";

interface SidebarProps {
  active: View;
  onNavigate: (view: View) => void;
  pendingCount: number;
  adminName: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  active,
  onNavigate,
  pendingCount,
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
