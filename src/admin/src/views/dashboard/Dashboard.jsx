import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

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

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const servedOrders = orders.filter(
    (order) => order.status === "Served"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const acceptedOrders = orders.filter(
    (order) => order.status === "Accepted"
  ).length;

  return (
    <>
      {/* Dashboard Cards */}
      <CRow>
        <CCol md={3}>
          <CCard className="mb-4">
            <CCardBody className="text-center">
              <h6>Total Orders</h6>
              <h2>{totalOrders}</h2>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={3}>
          <CCard className="mb-4">
            <CCardBody className="text-center">
              <h6>Revenue</h6>
              <h2>₹{totalRevenue}</h2>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={3}>
          <CCard className="mb-4">
            <CCardBody className="text-center">
              <h6>Pending</h6>
              <h2>{pendingOrders}</h2>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={3}>
          <CCard className="mb-4">
            <CCardBody className="text-center">
              <h6>Served</h6>
              <h2>{servedOrders}</h2>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Order Status */}
      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>Order Status</CCardHeader>

            <CCardBody>
              <p>
                <strong>Accepted :</strong> {acceptedOrders}
              </p>

              <p>
                <strong>Preparing :</strong> {preparingOrders}
              </p>

              <p>
                <strong>Served :</strong> {servedOrders}
              </p>

              <p>
                <strong>Pending :</strong> {pendingOrders}
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>Today's Revenue</CCardHeader>

            <CCardBody>
              <h2>₹{totalRevenue}</h2>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Recent Orders */}
      <CCard>
        <CCardHeader>Recent Orders</CCardHeader>

        <CCardBody>
          <CTable hover bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Order</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Time</CTableHeaderCell>
                <CTableHeaderCell>Table</CTableHeaderCell>
                <CTableHeaderCell>Total</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {orders
                .slice()
                .reverse()
                .slice(0, 5)
                .map((order) => (
                  <CTableRow key={order.id}>
                    <CTableDataCell>{order.id}</CTableDataCell>

                    <CTableDataCell>
                      {order.orderDate}
                    </CTableDataCell>

                    <CTableDataCell>
                      {order.orderTime}
                    </CTableDataCell>

                    <CTableDataCell>
                      {order.tableNumber}
                    </CTableDataCell>

                    <CTableDataCell>
                      ₹{order.totalPrice}
                    </CTableDataCell>

                    <CTableDataCell>
                      <CBadge
                        color={
                          order.status === "Accepted"
                            ? "success"
                            : order.status === "Preparing"
                            ? "warning"
                            : order.status === "Served"
                            ? "info"
                            : order.status === "Cancelled"
                            ? "danger"
                            : "secondary"
                        }
                      >
                        {order.status}
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;