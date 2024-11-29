import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "../styles/dashboard.css";
import UseGetData from '../custom-hooks/useGetData';
import UseAuth from '../custom-hooks/useAuth';
const Dashboard = () => {
    const {currentUser} = UseAuth();
    const {data: products} = UseGetData('products');
    const {data: users} = UseGetData('users');
    const {data: orders} = UseGetData('Orders');

    if(currentUser?.email === "husseinkhaled9847@gmail.com"){
      return (
         <>
             <section>
                 <Container>
                     <Row>
                         <Col className='lg-3'>
                            <div className="revenue__box">
                               <h5>Total Sales</h5>
                               <span>{orders.length}</span>
                            </div>
                         </Col>
                         <Col className='lg-3'>
                            <div className="order__box">
                               <h5>Orders</h5>
                               <span>{orders.length}</span>
                            </div>
                         </Col>
                         <Col className='lg-3'>
                            <div className="products__box">
                               <h5>Total Products</h5>
                               <span>{products.length}</span>
                            </div>
                         </Col>
                         <Col className='lg-3'>
                            <div className="users__box">
                               <h5>Total users</h5>
                               <span>{users.length}</span>
                            </div>
                         </Col>
                     </Row>
                 </Container>
             </section>
         </>
     );
    } else {
      return <></>
    }
}

export default Dashboard;
