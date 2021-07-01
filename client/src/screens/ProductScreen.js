import React,{useEffect} from "react"
import { Link } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import Message from "../components/Message"
import Loader from "../components/Loader"
import product from "../product"
import { listProductDetails } from "../actions/productAction"



const ProductScreen = ({ match }) => {

  const dispatch =useDispatch()
  const productDetails=useSelector(state=> state.productDetails)
  const {loading,error} =productDetails
useEffect(()=>
{
     dispatch(listProductDetails(match.param.id))
}
,[dispatch,match])

  const prod = product.find((p) => p._id === match.params.id);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
            <Row>
            <Col md={6}>
              <Image src={prod.image} alt={prod.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{prod.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={prod.rating} text={`${prod.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${prod.price}</ListGroup.Item>
                <ListGroup.Item>Description: {prod.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>${prod.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {prod.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={prod.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
      )}
      
    </>
  );
};

export default ProductScreen;
