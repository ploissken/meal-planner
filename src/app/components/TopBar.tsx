"use client";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import ResponsiveMenu from "./ResponsiveMenu";
import { APP_TITLE } from "@/consts";

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
        })}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_TITLE}
          </Typography>
          <ResponsiveMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
