export const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

export const ORDER_STATUSES = [
  "Pending",
  "Design Review",
  "Quotation Sent",
  "Approved",
  "In Production",
  "Completed",
  "Cancelled",
];

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
