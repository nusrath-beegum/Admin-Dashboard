import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ProductForm from '../../components/ProductForm';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const { products } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedProduct = products.find((p) => p.id === parseInt(id));
      setProduct(selectedProduct);
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
};

export default EditProduct;
