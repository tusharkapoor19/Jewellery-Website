import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AddressProvider } from "./context/AddressContext";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AddressProvider>
          <CartProvider>
            <WishlistProvider>

              <App />

              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3500,
                  style: {
                    background: "#fff",
                    color: "#111",
                    border: "1px solid #d4af37",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    fontSize: "15px",
                    boxShadow: "0 12px 35px rgba(0,0,0,.12)"
                  }
                }}
              />

            </WishlistProvider>
          </CartProvider>
        </AddressProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();