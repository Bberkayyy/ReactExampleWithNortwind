import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import CartDetails from "../cart/CartDetails";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";
function App() {
  return (
    <Container>
      <Navi></Navi>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route path="/product" element={<Dashboard />}></Route>
        <Route path="/cart" element={<CartDetails />}></Route>
        <Route path="/saveproduct" element={<AddOrUpdateProduct />}></Route>
        <Route
          path="/saveproduct/:productId"
          element={<AddOrUpdateProduct />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
