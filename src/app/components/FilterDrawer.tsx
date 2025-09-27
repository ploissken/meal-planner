"use client";
import { FilterListAlt } from "@mui/icons-material";
import { Drawer, IconButton, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import Multiselect from "./Multiselect";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

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
        <Multiselect
          value={personName}
          handleChange={handleChange}
          options={names}
          id="names"
          label="Cuisine"
        />
        <Multiselect
          value={personName}
          handleChange={handleChange}
          options={names}
          id="diet"
          label="Dietary Restrictions"
        />
        <Multiselect
          value={personName}
          handleChange={handleChange}
          options={names}
          id="time"
          label="Cooking Time"
        />
      </Drawer>
    </>
  );
}
