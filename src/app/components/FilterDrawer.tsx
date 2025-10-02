"use client";
import { FilterListAlt } from "@mui/icons-material";
import { Drawer, Fab, IconButton } from "@mui/material";
import { useState } from "react";
import FilterForm from "./FilterForm";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="filter and search"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
        }}
      >
        <FilterListAlt />
      </Fab>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <FilterForm />
      </Drawer>
    </>
  );
}
