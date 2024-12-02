import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductList from "../components/UI/ProductList";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import UseGetData from "../custom-hooks/useGetData";
import UseAuth from "../custom-hooks/useAuth";

const ProductDetails = () => {
  const { currentUser } = UseAuth();
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");

  const [reviewUser, setReviewUser] = useState("");
  const [reviewMessage, setReviewMessage] = useState();
  const [rating, setRating] = useState();
  let { id } = useParams();
  const { data: products } = UseGetData("products");

  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No Product!");
      }
    };
    getProduct();
  }, []);

  const { imgUrl, productName, price, description, shortDesc, category, reviews } =
    product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "products", id), {
      reviews: arrayUnion({
        reviewUser,
        reviewMessage,
        rating,
      }),
    });

    setReviewUser("");
    setReviewMessage("");
    setRating("");
    toast.success("Review Submitted");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  
  let avgRating = 0
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="product image" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  {/*  
                  <p>
                    (<span>{avgRating}</span>rating)
                  </p>
                  */}
                </div>

                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  onClick={async () => {
                    await setDoc(doc(db, `cart ${currentUser?.uid}`, id), {
                      id,
                      productName,
                      price,
                      imgUrl,
                      category,
                      quantity: 1,
                    });
                    toast.success("Product added to cart!");
                  }}
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                >
                  Add To Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>{item.reviewUser}</h6>
                          <span>
                            {item.rating}
                          </span>
                          <p>{item.reviewMessage}</p>
                        </li>
                      ))}
                    </ul>
                    

                    <div className="review__form">
                      <h4>Leave Your Experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            value={reviewUser}
                            onChange={(e) => setReviewUser(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-half-s-line"></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            value={reviewMessage}
                            onChange={(e) => setReviewMessage(e.target.value)}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileTap={{ scale: 1.2 }}
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" mt="5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
