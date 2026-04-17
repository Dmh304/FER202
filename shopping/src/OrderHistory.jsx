import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Lấy orders từ localStorage
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);
  return (
    <div className="container mt-4">
      <div className="mb-4">
        <Button variant="secondary" onClick={() => navigate("/")}>
          ← Back to Shopping
        </Button>
      </div>

      <h2 className="mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>OrderId</th>
                <th>OrderDate</th>
                <th>ShipAddress</th>
                <th>ProductList</th>
                <th>TotalPrice ($)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.address}</td>
                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.id} {item.name}
                        <span className="ms-2">{item.price}</span>
                        <span className="ms-2">{item.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td>{order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
