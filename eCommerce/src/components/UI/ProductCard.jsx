import React from "react";
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import UseAuth from "../../custom-hooks/useAuth";
const ProductCard = ({ item }) => {
  const { currentUser } = UseAuth();
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <Link to={`/shop/${item.id}`}>
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt="productImg"
            />
          </Link>
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span
            whileTap={{ scale: 1.2 }}
            onClick={async () => {
              {
                !currentUser
                  ? toast.error("Please Login First!")
                  : await setDoc(doc(db, `cart ${currentUser?.uid}`, item.id), {
                      ...item,
                      quantity: 1,
                    });
              }
            }}
          >
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
