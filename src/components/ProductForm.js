import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../pages/Reducer/products_slice"; 
import { useRouter } from "next/router";

const ProductForm = ({ product }) => {
  const [title, setTitle] = useState(product ? product.title : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [category, setCategory] = useState(product ? product.category : "");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { title, price, description, category };

    if (product) {
      dispatch(editProduct({ id: product.id, productData }));
    } else {
      dispatch(addProduct(productData));
    }

    router.push("/products");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {product ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          {product ? "Update" : "Add"} Product
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;
