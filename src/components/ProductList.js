import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../pages/Reducer/products_slice"; 
import CircularColor from "./Circular_Progress";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { products, inProgress } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  const handleEditProduct = (id) => {
    router.push(`/products/edit?id=${id}`);
  };

 
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(selectedProductId));
    handleCloseDialog();
  };

  return (
    <Container>
      {inProgress && <CircularColor />}
      <Grid container spacing={4} style={{ marginTop: 20 }}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditProduct(product.id)}
                  style={{ marginRight: 10 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDialog(product.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
      />

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;

