import { Box, AppBar, Toolbar, Typography, Stack } from "@mui/material";
import FilterDrawer from "./FilterDrawer";
import SearchInput from "./SearchInput";

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🍔 Weekly Meal Planner
          </Typography>
          <Stack direction="row" sx={{ width: "350px", gap: 2 }}>
            <SearchInput size="small" />
            <FilterDrawer />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
