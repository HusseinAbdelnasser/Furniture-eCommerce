import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {  db } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase.config";
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState("")

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "store__hk");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dom3twvfk/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      await updateProfile(user, {
        displayName: username,
        photoURL: data.secure_url,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
        photoURL: data.secure_url,
        role: "user",
      });

      setLoading(false);
      toast.success("Account Created Successfully");
      navigate("/login");

    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>
              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <motion.button whileTap={{scale: 1.2}} type="submit" className="buy__btn auth__btn">
                  Create An Account
                </motion.button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
