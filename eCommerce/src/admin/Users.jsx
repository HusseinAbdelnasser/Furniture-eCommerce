import React from "react";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import UseGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
const Users = () => {
  const { data: usersData } = UseGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User Deleted Successfully");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Access</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData?.map((user) => (
                  <tr key={user.uid}>
                    <td>
                      <img src={user.photoURL} alt="user image" />
                    </td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "user" ? (
                        <i class="ri-user-line"></i>
                      ) : (
                        <i class="ri-admin-line"></i>
                      )}
                      {user.role}
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
