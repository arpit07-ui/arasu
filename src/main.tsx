import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store, { persistor } from "./redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              // Base styles
              style: {
                padding: "16px",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#D1FAE5",
                  color: "#065F46",
                  borderLeft: "6px solid #10B981",
                },
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#D1FAE5",
                },
              },
              error: {
                style: {
                  background: "#FEE2E2",
                  color: "#991B1B",
                  borderLeft: "6px solid #EF4444",
                },
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#FEE2E2",
                },
              },
              loading: {
                style: {
                  background: "#FEF3C7",
                  color: "#92400E",
                  borderLeft: "6px solid #F59E0B",
                },
                iconTheme: {
                  primary: "#F59E0B",
                  secondary: "#FEF3C7",
                },
              },
              // Optional info toast
              blank: {
                style: {
                  background: "#DBEAFE",
                  color: "#1E3A8A",
                  borderLeft: "6px solid #3B82F6",
                },
              },
            }}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
