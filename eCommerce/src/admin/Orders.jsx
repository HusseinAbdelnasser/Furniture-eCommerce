import React from "react";
import "../styles/cart.css";
import UseGetData from "../custom-hooks/useGetData";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { deleteDoc, doc } from "firebase/firestore";
const Orders = () => {
  const { data: orders } = UseGetData("Orders");
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {orders?.length === 0 ? (
              <h2 className="fs-4 text-center">No Orders Placed</h2>
            ) : (
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Items No.</th>
                    <th>Subtotal</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => {
                        return (
                            <tr key='index'>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.items.length}</td>
                                <td>${item.total}</td>
                                <td>
                                <motion.i
                                whileTap={{ scale: 1.2 }}
                                className="ri-delete-bin-line "
                                onClick={async () => {
                                  await deleteDoc(
                                    doc(
                                      db,
                                     "orders",
                                      item.id
                                    )
                                  );
                                  toast.success("Order deleted!");
                                }}
                              ></motion.i>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
