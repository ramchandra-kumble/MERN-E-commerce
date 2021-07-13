import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions"
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders} = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const handleNameEdit = () => {
    setEditName(!editName);
  };
  const handleEmailEdit = () => {
    setEditEmail(!editEmail);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      //DISPATCH UPDATE
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Row>
              <Col md={10}>
                {!editName ? (
                  <Form.Control
                    disabled
                    style={{ cursor: "no-drop" }}
                    type="text"
                    palceholeder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                ) : (
                  <Form.Control
                    type="text"
                    palceholeder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                )}
              </Col>
              <Col md={2}>
                <div
                  style={{
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={handleNameEdit}
                >
                  Edit
                </div>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Row>
              <Col md={10}>
                {!editEmail ? (
                  <Form.Control
                    disabled
                    style={{ cursor: "no-drop" }}
                    type="email"
                    palceholeder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                ) : (
                  <Form.Control
                    type="email"
                    palceholeder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                )}
              </Col>
              <Col md={2}>
                <div
                  style={{ cursor: "pointer", marginTop: "10px" }}
                  onClick={handleEmailEdit}
                >
                  Edit
                </div>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              palceholeder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              palceholeder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>
          {errorOrders}
        </Message>: (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td >{order._id}</td>
                  <td >{order.createdAt.substring(0, 10)}</td>
                  <td >{order.totalPrice}</td>
                  <td >{order.isPaid ? order.paidAt.substring(0,10) : (
                    <i className='fas fa-times ' style={{ color: 'red'}}></i>
                  )}</td>
                  <td >{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                    <i className='fas fa-times ' style={{ color: 'red'}}></i>
                  )}</td>
                  <td >
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
