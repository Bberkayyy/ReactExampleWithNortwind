import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveProduct } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import ProductDetail from "./ProductDetail";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  ...props
}) {
  let history = useNavigate();
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [categories.length, getCategories, props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "Ürün ismi giriniz!",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "",
      }));
    }
    if (name === "unitPrice" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "Ürün fiyatı giriniz!",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "",
      }));
    }
    if (name === "unitsInStock" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "Ürün adedi giriniz!",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history("/");
    });
    alertify.success(
      product.id
        ? product.productName + " Güncellendi!"
        : product.productName + " Eklendi"
    );
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id === productId);
  return product !== undefined ? product : undefined;
}
function mapStateToProps(state, ownProps) {
  const { productListReducer, categoryListReducer } = state;
  const productId = ownProps;
  const product =
    (productId && productListReducer.length) > 0
      ? getProductById(productListReducer, productId)
      : {};
  console.log(product);
  return {
    product,
    products: productListReducer,
    categories: categoryListReducer,
  };
}
const mapDispatchToProps = {
  getCategories,
  saveProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
