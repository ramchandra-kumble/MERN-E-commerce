import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from './screens/LoginScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" component={Homescreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
