/**
 * Extracted and adapted from MUI sample https://mui.com/material-ui/react-select/#multiple-select
 * Typed by chatGPT
 */
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultiselectProps<T extends string | number> {
  id: string;
  label: string;
  value: T[];
  handleChange: (event: SelectChangeEvent<T[]>) => void;
  options: T[];
}

export default function Multiselect<T extends string | number>({
  id,
  label,
  value,
  handleChange,
  options,
}: MultiselectProps<T>) {
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        multiple
        labelId={`${id}-label`}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((val) => (
              <Chip key={val} label={val} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
