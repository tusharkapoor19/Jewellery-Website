import React, { useCallback, useEffect, useState } from "react";
import {
  fetchAdminDesigns,
  fetchAdminDesignSummary,
  fetchAdminMessages,
  sendAdminMessage,
  updateAdminDesign,
  DesignSummary,
} from "../../api/adminCustomDesign";
import { ApiError } from "../../api/client";
import type { ChatMessage, CustomDesignRecord } from "../../types";

const ORDER_STATUSES = [
  "Pending",
  "Design Review",
  "Approved",
  "In Production",
  "Ready",
  "Completed",
  "Cancelled",
];

const statusSlug = (status?: string) =>
  (status || "Pending").toLowerCase().replace(/\s+/g, "-");

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

interface CustomDesignAdminProps {
  // Lets the sidebar badge reflect how many requests are still Pending,
  // without the parent Dashboard having to know anything about how
  // custom-design data is fetched.
  onPendingCountChange?: (count: number) => void;
}

function DesignChat({ designId }: { designId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    fetchAdminMessages(designId)
      .then(setMessages)
      .catch(() => setError("Could not load messages."))
      .finally(() => setLoading(false));
  }, [designId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    setError("");
    try {
      const updated = await sendAdminMessage(designId, text.trim());
      setMessages(updated);
      setText("");
    } catch {
      setError("Could not send reply.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="cd-detail-card">
      <h3 style={{ fontSize: 18 }}>Conversation</h3>
      {loading ? (
        <p className="cd-chat-empty">Loading…</p>
      ) : (
        <div className="cd-chat-scroll">
          {messages.length === 0 && <p className="cd-chat-empty">No messages yet.</p>}
          {messages.map((m, i) => (
            <div key={i} className={`cd-chat-row ${m.sender === "admin" ? "cd-chat-row--admin" : ""}`}>
              <div className={`cd-chat-bubble ${m.sender === "admin" ? "cd-chat-bubble--admin" : ""}`}>
                <p className="cd-chat-sender">{m.sender === "admin" ? "You (Admin)" : "Customer"}</p>
                <p className="cd-chat-text">{m.text}</p>
                {m.createdAt && (
                  <p className="cd-chat-time">{new Date(m.createdAt).toLocaleString("en-IN")}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="field-error">{error}</p>}
      <form className="cd-chat-form" onSubmit={handleSend}>
        <input
          className="cd-chat-input"
          placeholder="Reply to customer…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={sending || !text.trim()}>
          {sending ? "Sending…" : "Reply"}
        </button>
      </form>
    </div>
  );
}

function DesignDetail({
  design,
  onUpdated,
}: {
  design: CustomDesignRecord;
  onUpdated: (d: CustomDesignRecord) => void;
}) {
  const [status, setStatus] = useState(design.orderStatus || "Pending");
  const [notes, setNotes] = useState(design.adminNotes || "");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    setStatus(design.orderStatus || "Pending");
    setNotes(design.adminNotes || "");
    setSaveMsg("");
  }, [design]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const updated = await updateAdminDesign(design._id, { orderStatus: status, adminNotes: notes });
      onUpdated(updated);
      setSaveMsg("Saved.");
    } catch {
      setSaveMsg("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const gemstones = design.jewellery?.gemstone || [];
  // AI Estimation (what our own calculator/AI estimator priced the design
  // at) and Max Customer Budget (the ceiling the customer told us they'd
  // spend, via the Budget step's slider) are two different, independently
  // meaningful numbers — shown separately rather than collapsed into one
  // "estimated total", so the admin can see at a glance whether the piece
  // is over or under what the customer said they'd pay.
  const aiEstimation = design.estimation?.totalEstimatedCost ?? 0;
  const maxBudget = design.budget?.max ?? 0;
  const referenceImages = design.design?.referenceImages || [];

  return (
    <div>
      <div className="cd-detail-card">
        <h3>
          {design.jewellery?.type || "Custom piece"} · {design.jewellery?.material || "—"}
        </h3>
        <p className="cd-detail-sub">
          {design.customer?.fullName} · {design.customer?.email} · {design.customer?.phone}
        </p>

        <div className="cd-spec-grid">
          <div>
            <p className="cd-spec-label">Order ID</p>
            <p className="cd-spec-value">{design.customOrderId || "—"}</p>
          </div>
          <div>
            <p className="cd-spec-label">Purity</p>
            <p className="cd-spec-value">{design.jewellery?.purity || "—"}</p>
          </div>
          <div>
            <p className="cd-spec-label">AI Estimation</p>
            <p className="cd-spec-value">{aiEstimation ? formatCurrency(aiEstimation) : "—"}</p>
          </div>
          <div>
            <p className="cd-spec-label">Max Customer Budget</p>
            <p className="cd-spec-value">{maxBudget ? formatCurrency(maxBudget) : "—"}</p>
          </div>
          {typeof design.jewellery?.gemstonePurity === "number" && gemstones.length > 0 && (
            <div>
              <p className="cd-spec-label">Gemstone quality</p>
              <p className="cd-spec-value">{Math.round(design.jewellery.gemstonePurity)}%</p>
            </div>
          )}
          <div>
            <p className="cd-spec-label">Requested</p>
            <p className="cd-spec-value">
              {design.createdAt
                ? new Date(design.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>

        {gemstones.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <p className="cd-spec-label">Gemstones</p>
            <div className="cd-gem-tags">
              {gemstones.map((g, i) => (
                <span className="cd-gem-tag" key={`${g.name}-${i}`}>
                  {g.name} × {g.quantity}
                </span>
              ))}
            </div>
          </div>
        )}

        {referenceImages.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <p className="cd-spec-label">Reference photo{referenceImages.length > 1 ? "s" : ""}</p>
            <div className="cd-ref-images">
              {referenceImages.map((src, i) => (
                <a href={src} target="_blank" rel="noreferrer" key={i}>
                  <img src={src} alt={`Reference ${i + 1}`} className="cd-ref-image" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="cd-detail-card">
        <h3 style={{ fontSize: 18 }}>Manage request</h3>

        <div className="field">
          <label htmlFor="cd-status">Order status</label>
          <select id="cd-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="cd-notes">Note to customer</label>
          <textarea
            id="cd-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Visible to the customer on their My Custom Orders page…"
          />
        </div>

        <div className="cd-save-row">
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saveMsg && <span className="cd-save-msg">{saveMsg}</span>}
        </div>
      </div>

      <DesignChat designId={design._id} />
    </div>
  );
}

const CustomDesignAdmin: React.FC<CustomDesignAdminProps> = ({ onPendingCountChange }) => {
  const [summary, setSummary] = useState<DesignSummary | null>(null);
  const [designs, setDesigns] = useState<CustomDesignRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    Promise.all([
      fetchAdminDesigns({ orderStatus: statusFilter || undefined, search: search || undefined }),
      fetchAdminDesignSummary(),
    ])
      .then(([page, stats]) => {
        setDesigns(page.designs);
        setSummary(stats);
        onPendingCountChange?.(stats.pending);
        setSelectedId((prev) => (prev && page.designs.some((d) => d._id === prev) ? prev : page.designs[0]?._id || null));
      })
      .catch((err) => {
        // Surface the real backend message (e.g. "Access denied. No token
        // provided." vs "jwt expired" vs "Admin access only") instead of a
        // generic string, so a 401/403 here is actually diagnosable instead
        // of just saying "could not load".
        if (err instanceof ApiError) {
          if (err.status === 401) {
            setError("Your admin session has expired or is invalid. Please sign in again.");
          } else if (err.status === 403) {
            setError("This account does not have admin access.");
          } else {
            setError(`Could not load custom design requests: ${err.message}`);
          }
        } else {
          setError("Could not load custom design requests.");
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const selected = designs.find((d) => d._id === selectedId) || null;

  const handleUpdated = (updated: CustomDesignRecord) => {
    setDesigns((prev) => prev.map((d) => (d._id === updated._id ? updated : d)));
    fetchAdminDesignSummary()
      .then((stats) => {
        setSummary(stats);
        onPendingCountChange?.(stats.pending);
      })
      .catch(() => {});
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Custom design studio</p>
          <h2>Custom Design</h2>
          <p className="panel-subtitle">
            Review bespoke design requests, update their status, and reply to customers directly.
          </p>
        </div>
        {summary && (
          <div className="stat-strip">
            <div className="stat-card">
              <span className="stat-value">{summary.total}</span>
              <span className="stat-label">Total requests</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{summary.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{summary.inProgress}</span>
              <span className="stat-label">In progress</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{summary.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        )}
      </header>

      <div className="filter-row" style={{ flexWrap: "wrap", gap: 12 }}>
        <input
          className="cd-chat-input"
          style={{ maxWidth: 280, borderRadius: 8 }}
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="cd-chat-input"
          style={{ maxWidth: 200, borderRadius: 8 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="banner banner--error">
          {error}{" "}
          <button className="banner-retry" onClick={load}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <p>Loading…</p>
          <span>Fetching custom design requests.</span>
        </div>
      ) : designs.length === 0 ? (
        <div className="empty-state">
          <p>No requests found.</p>
          <span>Custom design submissions from customers will show up here.</span>
        </div>
      ) : (
        <div className="cd-layout">
          <div className="cd-list">
            {designs.map((d) => (
              <button
                key={d._id}
                className={`cd-list-item ${d._id === selectedId ? "cd-list-item--active" : ""}`}
                onClick={() => setSelectedId(d._id)}
              >
                <p className="cd-list-item-title">
                  {d.jewellery?.type || "Custom piece"} · {d.jewellery?.material || "—"}
                </p>
                <p className="cd-list-item-sub">
                  {d.customOrderId ? `${d.customOrderId} · ` : ""}
                  {d.customer?.fullName || "Unknown customer"}
                </p>
                <span className={`status-pill status-pill--${statusSlug(d.orderStatus)}`}>
                  {d.orderStatus || "Pending"}
                </span>
              </button>
            ))}
          </div>

          <div>
            {selected ? (
              <DesignDetail design={selected} onUpdated={handleUpdated} />
            ) : (
              <p className="cd-chat-empty">Select a request to view details.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomDesignAdmin;
