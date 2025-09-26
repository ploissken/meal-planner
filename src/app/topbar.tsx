"use client";
import { FilterListAlt } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useRecipeGalleryContext } from "./recipe-gallery/context/RecipeGalleryContext";
import { ChangeEvent } from "react";

export default function TopBar() {
  const { applyTextSearch } = useRecipeGalleryContext();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    applyTextSearch(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🍔 Weekly Meal Planner
          </Typography>
          <TextField
            size="small"
            id="search-ingredient"
            label="Search by title or ingredient"
            variant="outlined"
            style={{ width: "250px", paddingRight: 8 }}
            onChange={handleOnChange}
          />
          <IconButton
            color="inherit"
            aria-label="account of current user"
            aria-haspopup="true"
          >
            <FilterListAlt />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
