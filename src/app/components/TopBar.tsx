import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import ResponsiveMenu from "./ResponsiveMenu";

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <Grid sx={{ display: "flex", justifyContent: "space-between" }}> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🍔 Neat & Fit
          </Typography>
          <ResponsiveMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
