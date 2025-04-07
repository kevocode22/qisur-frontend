import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider.js";
import Layout from "./components/layout.js";
import ProductsTable from "./pages/ProductsTable.js";
import ProductDetails from "./components/ProductDetails.js";
import { Toaster } from "sonner";
import PageCharts from "./pages/PageCharts.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsTable />} />
          <Route path="/charts" element={<PageCharts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
        <Toaster />
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
);
