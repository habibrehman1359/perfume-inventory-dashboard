import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackImage =
    "https://ateliernoir.habib-ur-rehman.com/wp-content/uploads/2026/07/Gemini_Generated_Image_h82xawh82xawh82x.png";

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/test")
      .then((res) => {
        if (!res.ok) throw new Error("API call response was not ok");
        return res.json();
      })
      .then((json) => {
        setData(json);
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
          <small>
            Make sure backend server is running on port 3000 and CORS is
            enabled.
          </small>
        </div>
      </div>
    );
  }

  const productsCount = data?.products?.length || 0;

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
          <span className="stat-value">{productsCount}</span>
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
            <span className="counter-badge">{productsCount} items</span>
          </div>

          {productsCount > 0 ? (
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
                  {data.products.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td className="id-col">{item.id || idx + 1}</td>
                      <td className="img-col">
                        <img
                          src={
                            item.image_url ||
                            item.image ||
                            item.img ||
                            fallbackImage
                          }
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
                        {item.name || item.title || "Unnamed Product"}
                      </td>
                      <td className="price-col">
                        Rs.{" "}
                        {Number(
                          item.price || item.current_price || 0,
                        ).toLocaleString()}
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
