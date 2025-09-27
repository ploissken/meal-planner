"use client";
import { Box, AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import FilterDrawer from "./FilterDrawer";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const [selectedTab, setSelectedTab] = useState("recipe-gallery");
  const router = useRouter();

  const handleTabChange = (event: SyntheticEvent, value: string) => {
    setSelectedTab(value);
    router.push(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <Grid sx={{ display: "flex", justifyContent: "space-between" }}> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🍔 Neat & Fit
          </Typography>
          <Box>
            <Tabs
              sx={{ height: "100%" }}
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab value="recipe-gallery" label="Recipe Gallery" />
              <Tab value="meal-planner" label="Meal Planner" />
              <Tab value="shopping-list" label="Shopping List" />
            </Tabs>
          </Box>

          <FilterDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
