import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", enterProductImg);
    formData.append("upload_preset", "store__hk");

    try {

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dom3twvfk/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      const docRef = await collection(db, "products");
      await addDoc(docRef, {
        productName: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        price: enterPrice,
        imgUrl: data.secure_url,
      });
      toast.success("Product Added Successfully");
      //navigate("/dashboard/all-products");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">AddProducts</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className="form__group">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double Sofa"
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="lorem......"
                  value={enterShortDesc}
                  onChange={(e) => setEnterShortDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span> Description</span>
                <input
                  type="text"
                  placeholder="Description......"
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>

              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form__group w-50">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="$100"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  >
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <input
                    type="file"
                    onChange={(e) => setEnterProductImg(e.target.files[0])}
                    required
                  />
                </FormGroup>
              </div>
              <motion.button whileTap={{scale: 1.1}} className="buy__btn" type="submit">
                Add Product
              </motion.button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
