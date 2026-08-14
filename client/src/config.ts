// Base URLs for each backend microservice.
// These read from CRA environment variables (see .env.example) and fall
// back to the ports defined in each service's own .env file, so the
// dashboard works out of the box against a locally running backend:
//   auth-services     -> PORT 5001
//   product-services   -> PORT 5002
//   order-services     -> PORT 5003
export const AUTH_API_BASE =
  process.env.REACT_APP_AUTH_API_URL || "http://localhost:5001/auth";

export const PRODUCT_API_BASE =
  process.env.REACT_APP_PRODUCT_API_URL || "http://localhost:5002/product";

export const PRODUCT_IMAGE_BASE =
  process.env.REACT_APP_PRODUCT_IMAGE_BASE || "http://localhost:5002";

export const ORDER_API_BASE =
  process.env.REACT_APP_ORDER_API_URL || "http://localhost:5003/orders";

// custom-design-services -> PORT 5006. Handles the whole Custom Design
// feature: customers submitting/viewing their own requests + chat, and
// (via the same admin JWT used everywhere else in the dashboard) the
// admin Custom Design tab's request list, status/notes updates and chat
// replies. There is no separate custom-design admin service or login.
export const CUSTOM_DESIGN_API_BASE =
  process.env.REACT_APP_CUSTOM_DESIGN_API_URL || "http://localhost:5006/custom-design-save";

  
// Key used to persist the admin JWT + name in localStorage between reloads.
// NOTE: this must match the key AuthContext.tsx actually writes to
// localStorage on login ("token"), or every authenticated admin API call
// will go out with no Authorization header and get bounced back to /login.
export const TOKEN_STORAGE_KEY = "token";
export const NAME_STORAGE_KEY = "userName";
export const ROLE_STORAGE_KEY = "role";
export const USER_API_BASE = process.env.REACT_APP_USER_API_URL || "http://localhost:5005/admin";
