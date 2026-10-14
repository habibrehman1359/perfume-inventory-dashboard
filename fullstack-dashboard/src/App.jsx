import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackImage =
    "https://ateliernoir.habib-ur-rehman.com/wp-content/uploads/2026/07/Gemini_Generated_Image_h82xawh82xawh82x.png";

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/test")
      .then((res) => {
        if (!res.ok) throw new Error("API response error");
        return res.json();
      })
      .then((json) => {
        // Har tarah ke JSON structure se products nikalne ka tarika
        let items = [];
        if (Array.isArray(json)) {
          items = json;
        } else if (Array.isArray(json?.products)) {
          items = json.products;
        } else if (Array.isArray(json?.data?.products)) {
          items = json.data.products;
        } else if (Array.isArray(json?.data)) {
          items = json.data;
        } else {
          // Object ke andar arrays dhoondhein
          const candidate = Object.values(json || {}).find(
            (val) =>
              Array.isArray(val) &&
              val.length > 0 &&
              typeof val[0] === "object",
          );
          if (candidate) items = candidate;
        }

        setProductsList(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="state-wrap">
        <div className="spinner"></div>
        <p>Loading database records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrap">
        <div className="alert-box">
          <h4>Failed to connect to API</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-container">
      <header className="dash-header">
        <div>
          <h2>Operational Overview</h2>
          <p>Live synchronized data from MySQL & Node API</p>
        </div>
        <span className="live-pill">● System Connected</span>
      </header>

      <div className="stats-row">
        <div className="stat-pill">
          <span className="stat-title">Total Products</span>
          <span className="stat-value">{productsList.length}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-title">Active Database</span>
          <span className="stat-value">MySQL</span>
        </div>
      </div>

      <div className="dash-grid">
        <section className="card-panel">
          <div className="panel-header">
            <h3>Inventory Products</h3>
            <span className="counter-badge">{productsList.length} items</span>
          </div>

          {productsList.length > 0 ? (
            <div className="table-responsive">
              <table className="flat-table">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Image</th>
                    <th>Product Details</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td className="id-col">{item.id || idx + 1}</td>
                      <td className="img-col">
                        <img
                          src={item.image || item.image_url || fallbackImage}
                          alt={item.name || "Product"}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImage;
                          }}
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            display: "block",
                          }}
                        />
                      </td>
                      <td className="name-col">
                        <strong>{item.name || "Unnamed Product"}</strong>
                        {item.sku && (
                          <div style={{ fontSize: "12px", color: "#888" }}>
                            SKU: {item.sku}
                          </div>
                        )}
                      </td>
                      <td className="price-col">
                        Rs. {Number(item.price || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-hint">
              No records found in the products table.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
