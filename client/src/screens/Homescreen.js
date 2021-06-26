import React from 'react'
import { Row ,Col } from 'react-bootstrap'
import Product from '../components/Product'
import product from '../product'


const Homescreen = () => {
    return (
        <>
        <h1>Latest Products</h1>    
        <Row>
          {product.map(product =>(
                <Col sm={12} md={6} lg={4} xl={3}>
                <h3>
                    <Product product={product}/>
                </h3>
                </Col>
          ))}

        </Row>
        </>
    )
}

export default Homescreen;
