import React, { useState } from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UseAuth from "../custom-hooks/useAuth";
import { toast } from "react-toastify";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  deleteDoc,
  doc,
  collection,
  query,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import ReactLoading from "react-loading";
const Cart = () => {
  const { currentUser } = UseAuth();
  const [value, loading, error] = useCollection(
    query(collection(db, `cart ${currentUser?.uid}`))
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const addOrder = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Orders"), {
        userId: currentUser.uid,
        name,
        email,
        number,
        address,
        postalCode,
        country,
        items: value.docs.map((item) => ({
          id: item.id,
          productName: item.data().productName,
          price: item.data().price,
          quantity: item.data().quantity,
        })),
        total: subtotal,
      });
      toast.success("Order Placed Successfully");
      value.docs.forEach((doc) => deleteDoc(doc.ref));
      setName("");
      setEmail("");
      setNumber("");
      setAddress("");
      setPostalCode("");
      setCountry("");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return (
      <section className="loading">
        <ReactLoading type={"spin"} color={"black"} height={77} width={77} />
      </section>
    );
  }

  let subtotal = 0;

    return (
      <>
        <Helmet title="Cart" />
        <CommonSection title="Shopping Cart" />

        <section>
          <Container>
            <Row>
              <Col lg="9">
                {value?.docs.length === 0 ? (
                  <h2 className="fs-4 text-center">No Items Added To Cart</h2>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value?.docs.map((item, index) => {
                        subtotal +=
                          Number(item.data().price) *
                          Number(item.data().quantity);
                        return (
                          <tr key={index}>
                            <td>
                              <img src={item.data().imgUrl} alt="" />
                            </td>
                            <td>{item.data().productName}</td>
                            <td>${item.data().price}</td>
                            <td>
                              <motion.i
                                whileTap={{ scale: 1.2 }}
                                class="ri-subtract-fill"
                                onClick={async () => {
                                  await updateDoc(
                                    doc(
                                      db,
                                      `cart ${currentUser.uid}`,
                                      item.data().id
                                    ),
                                    {
                                      quantity:
                                        Number(`${item.data().quantity}`) -
                                        Number(1),
                                    }
                                  );
                                }}
                              ></motion.i>
                              <span className="mx-3">
                                {item.data().quantity}
                              </span>
                              <motion.i
                                whileTap={{ scale: 1.2 }}
                                class="ri-add-fill"
                                onClick={async () => {
                                  await updateDoc(
                                    doc(
                                      db,
                                      `cart ${currentUser.uid}`,
                                      item.data().id
                                    ),
                                    {
                                      quantity:
                                        Number(`${item.data().quantity}`) +
                                        Number(1),
                                    }
                                  );
                                }}
                              ></motion.i>
                            </td>
                            <td>
                              <motion.i
                                whileTap={{ scale: 1.2 }}
                                className="ri-delete-bin-line "
                                onClick={async () => {
                                  await deleteDoc(
                                    doc(
                                      db,
                                      `cart ${currentUser.uid}`,
                                      item.data().id
                                    )
                                  );
                                  toast.success("Product deleted from cart");
                                }}
                              ></motion.i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col lg="3">
                <div className="checkout__cart">
                  <h6>
                    Total Qty: <span>{value.docs.length} Items</span>
                  </h6>
                  <h6>
                    Subtotal: <span>$ {subtotal}</span>
                  </h6>
                  <h6>
                    Shipping: <span>$0</span>
                  </h6>
                  <h4>
                    Total Cost: <span>$ {subtotal}</span>
                  </h4>
                </div>
                <div>
                  <button className="buy__btn w-100 mt-3">
                    <Link to="/shop">Continue Shopping</Link>
                  </button>
                </div>
              </Col>

              <Col lg="12" className="mt-5">
                <h6 className="mb-4 fw-bold">Billing Information</h6>
                <Form className="billing__form" onSubmit={addOrder}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Phone Number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </FormGroup>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="buy__btn  w-100"
                    type="submit"
                  >
                    Place an order
                  </motion.button>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
};

export default Cart;
