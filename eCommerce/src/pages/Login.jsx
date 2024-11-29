import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signin = async(e) => {
    e.preventDefault();
    try {
      const userCredential =  await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      toast.success("Successfully Logged In");
      navigate("/");
    } catch (error){
      toast.error("Something went wrong");
    }
  }
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>
              <Form className="auth__form" onSubmit={signin}>
                <FormGroup className="form__group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Your Email"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </FormGroup>

                <button type="submit" className="buy__btn auth__btn">
                  Login
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup">Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
