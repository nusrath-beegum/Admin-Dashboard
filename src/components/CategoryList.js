import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../pages/Reducer/categories_slice";

const CategoryList = ({ onClose }) => {
  const dispatch = useDispatch();
  const { categories, inProgress } = useSelector((state) => state.categories);

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory));
    setNewCategory("");
  };

  const handleUpdateCategory = () => {
    dispatch(
      updateCategory({ id: editingCategory.id, name: updatedCategoryName })
    );
    setEditingCategory(null);
    setUpdatedCategoryName("");
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(categoryToDelete.id));
    handleCloseConfirmDialog();
  };

  const handleOpenConfirmDialog = (category) => {
    setCategoryToDelete(category);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      {inProgress && <p>Loading...</p>}
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} style={{ alignItems: "center" }}>
            <Avatar
              src={category.image}
              alt={category.name}
              style={{ width: 50, height: 50, marginRight: 16 }}
            />
            <Typography>{category.name}</Typography>
            <Button onClick={() => setEditingCategory(category)}>Edit</Button>
            <Button onClick={() => handleOpenConfirmDialog(category)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      <TextField
        label="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddCategory} color="primary">
        Add Category
      </Button>

      {editingCategory && (
        <div>
          <TextField
            label="Update Category Name"
            value={updatedCategoryName}
            onChange={(e) => setUpdatedCategoryName(e.target.value)}
            fullWidth
          />
          <Button onClick={handleUpdateCategory} color="primary">
            Update
          </Button>
        </div>
      )}

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryList;
