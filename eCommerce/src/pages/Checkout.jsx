import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import UseAuth from "../custom-hooks/useAuth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase.config";
import ReactLoading from "react-loading";

const Checkout = () => {
  const {currentUser} = UseAuth();
  const [value, loading, error] = useCollection(
    query(collection(db, `cart ${currentUser.uid}`))
  );

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

 if(value){
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <Container>
        <Row className="mt-5 mb-2">
          <Col lg="8">
            <h6 className="mb-4 fw-bold">Billing Information</h6>
            <Form className="billing__form">
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your Name" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="email" placeholder="Enter Your Email" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="number" placeholder="Phone Number" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Street Address" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Postal Code" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Country" />
              </FormGroup>
            </Form>
          </Col>
          <Col lg="4">
            <div className="checkout__cart">
              <h6>
                Total Qty: <span>{value.docs.length} Items</span>
              </h6>
              <h6>
                Subtotal: <span>$</span>
              </h6>
              <h6>
                Shipping: <span>$0</span>
              </h6>
              <h4>
                Total Cost: <span>$</span>
              </h4>
            </div>
            <button className="buy__btn auth__btn w-100">Place an order</button>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
 }
 
};

export default Checkout;
