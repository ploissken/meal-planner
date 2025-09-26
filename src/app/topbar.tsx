import { FilterListAlt } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";

export default function TopBar() {
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
