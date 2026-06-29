import React, { useEffect, useState } from "react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import {
  cilCheckCircle,
  cilReload,
  cilRestaurant,
  cilBan,
  cilTrash,
} from "@coreui/icons";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CBadge,
} from "@coreui/react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setVisible(true);
  };
  const [selectedDate, setSelectedDate] = useState("");

  const filteredOrders = orders.filter((order) => {
  if (!selectedDate) return true;

  const [day, month, year] = order.orderDate.split("/");

  const formatted = `${year}-${month}-${day}`;

  return formatted === selectedDate;
});


  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, { status });
      fetchOrders();
      setSelectedOrder((prev) => ({ ...prev, status }));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`http://localhost:3000/orders/${id}`);
      setVisible(false);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Preparing":
        return "warning";
      case "Served":
        return "info";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h4 className="mb-0">Restaurant Orders</h4>
          <input
            type="date"
            className="form-control mb-3"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
          />
        </CCardHeader>

        <CCardBody>
          <table className="table table-hover table-bordered align-middle">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Table</th>
                <th>Total Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>

                  <td>{order.id}</td>

                  <td>{order.orderDate}</td>

                  <td>{order.orderTime}</td>

                  <td>{order.tableNumber}</td>

                  <td>{order.totalItems}</td>

                  <td>₹{order.totalPrice}</td>

                  <td>
                    <span className="badge bg-warning">
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => viewOrder(order)}
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>

      <CModal
  visible={visible}
  onClose={() => setVisible(false)}
  size="lg"
>
  <CModalHeader>
    <CModalTitle>
      Order #{selectedOrder?.id}
    </CModalTitle>
  </CModalHeader>

  <CModalBody>
    {selectedOrder && (
      <>
        {/* Order Information */}
        <div className="row mb-3">
          <div className="col-md-6">
            <p>
              <strong>Table Number :</strong>{" "}
              {selectedOrder.tableNumber}
            </p>

            <p>
              <strong>Order Date :</strong>{" "}
              {selectedOrder.orderDate}
            </p>

            <p>
              <strong>Order Time :</strong>{" "}
              {selectedOrder.orderTime}
            </p>
          </div>

          <div className="col-md-6">
            <p>
              <strong>Total Items :</strong>{" "}
              {selectedOrder.totalItems}
            </p>

            <p>
              <strong>Total Price :</strong> ₹
              {selectedOrder.totalPrice}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              <CBadge color={badgeColor(selectedOrder.status)}>
                {selectedOrder.status}
              </CBadge>
            </p>
          </div>
        </div>

        {/* Food Items */}
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {selectedOrder.items.map((item) => (
              <tr key={item.foodId}>
                <td>{item.foodName}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </CModalBody>

  <CModalFooter>
   {/* Accept */}
<CButton
  color="success"
  disabled={selectedOrder?.status !== "Pending"}
  onClick={() =>
    updateStatus(selectedOrder.id, "Accepted")
  }
>
  <CIcon icon={cilCheckCircle} className="me-2" />
  Accept
</CButton>

{/* Preparing */}
<CButton
  color="warning"
  disabled={selectedOrder?.status !== "Accepted"}
  onClick={() =>
    updateStatus(selectedOrder.id, "Preparing")
  }
>
  <CIcon icon={cilReload} className="me-2" />
  Preparing
</CButton>

{/* Served */}
<CButton
  color="info"
  disabled={selectedOrder?.status !== "Preparing"}
  onClick={() =>
    updateStatus(selectedOrder.id, "Served")
  }
>
  <CIcon icon={cilRestaurant} className="me-2" />
  Served
</CButton>

{/* Cancel */}
<CButton
  color="danger"
  disabled={
    selectedOrder?.status === "Served" ||
    selectedOrder?.status === "Cancelled"
  }
  onClick={() =>
    updateStatus(selectedOrder.id, "Cancelled")
  }
>
  <CIcon icon={cilBan} className="me-2" />
  Cancel
</CButton>

{/* Delete */}
<CButton
  color="dark"
  onClick={() =>
    deleteOrder(selectedOrder.id)
  }
>
  <CIcon icon={cilTrash} className="me-2" />
  Delete
</CButton>
  </CModalFooter>
</CModal>
    </>
  );
}
