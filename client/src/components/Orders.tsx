import { useState, useEffect } from "react";
import "../styles/orders.css";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
        console.log("Fetched orders:", data.orders);
      } else {
        console.error("Error fetching orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchOrders();
    };

    fetch();

    const intervalId = setInterval(() => {
      fetch();
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Order List</h1>
      <ul>
        {orders.map((order) => (
          <li className="order" key={order._id}>
            <p className="order-id">Order ID: {order._id}</p>
            <p className="order-total-price">
              Total Price: {order.totalPrice}€
            </p>
            <p className="order-table-number">
              Table number: {order.tableNumber}
            </p>
            <ul className="order-items">
              {order.items.map((item: any) => (
                <li className="order-item" key={item.name}>
                  {item.name} (x{item.quantity}) - {item.price}€
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
