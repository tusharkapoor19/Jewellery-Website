export const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

// Kept in sync with the `orderStatus` enum on the CustomDesign schema
// (models/CustomDesign.js).
export const ORDER_STATUSES = [
  "Pending",
  "Design Review",
  "Approved",
  "In Production",
  "Ready",
  "Completed",
  "Cancelled",
];

// Order statuses considered "in progress" for the admin dashboard's
// summary stat card.
export const IN_PROGRESS_STATUSES = ["Design Review", "Approved", "In Production", "Ready"];

// Prefix + zero-padded width used when generating a customOrderId for a new
// submission (see utils/helpers.js -> generateCustomOrderId). e.g. "CD00001".
export const CUSTOM_ORDER_ID_PREFIX = "CD";
export const CUSTOM_ORDER_ID_PAD_LENGTH = 5;

// Maps the flat shape sent by the current frontend (src/types/index.ts ->
// SubmittedDesign) to friendlier labels used inside the nested schema.
export const MATERIAL_LABELS = {
  gold: "Gold",
  silver: "Silver",
  platinum: "Platinum",
};

export const JEWELLERY_LABELS = {
  ring: "Ring",
  necklace: "Necklace",
  pendant: "Pendant",
  earrings: "Earrings",
  bracelet: "Bracelet",
  bangle: "Bangle",
};

// Maps gemstone ids used by the frontend (src/data/gemstones.ts) to the
// friendlier display names stored in jewellery.gemstone[].name
export const GEMSTONE_LABELS = {
  none: "No Stone",
  diamond: "Diamond",
  ruby: "Ruby",
  emerald: "Emerald",
  sapphire: "Sapphire",
  pearl: "Pearl",
  polki: "Polki (Uncut Diamond)",
};

export const CHAT_SENDERS = ["customer", "admin"];
