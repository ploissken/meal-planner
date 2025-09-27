"use client";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useRecipeGalleryContext } from "../recipe-gallery/context/RecipeGalleryContext";

export default function SearchInput({
  label = "Search by title or ingredient",
  size = "small",
}: {
  label?: string;
  size?: "small" | "medium";
}) {
  const { searchInput, setSearchInput } = useRecipeGalleryContext();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <TextField
      sx={{ width: "100%" }}
      id="search-ingredient"
      label={label}
      size={size}
      variant="outlined"
      value={searchInput}
      onChange={handleOnChange}
    />
  );
}
