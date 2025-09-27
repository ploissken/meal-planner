"use client";
import { FilterListAlt } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import FilterForm from "./FilterForm";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
      >
        <FilterListAlt />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <FilterForm />
      </Drawer>
    </>
  );
}
