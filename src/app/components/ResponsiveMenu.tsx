"use client";
import { Menu } from "@mui/icons-material";
import { Box, Tabs, Tab, Grid, Drawer, IconButton, Card } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";

export default function ResponsiveMenu() {
  const pathname = usePathname();
  const cleaned = pathname.replace(/^\/+/, "") || "recipe-gallery";
  const [selectedTab, setSelectedTab] = useState(cleaned);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleTabChange = (event: SyntheticEvent, value: string) => {
    setSelectedTab(value);
    router.push(value);
    setOpen(false);
  };

  const tabs = [
    <Tab key="recipe-gallery" value="recipe-gallery" label="Recipe Gallery" />,
    <Tab key="meal-planner" value="meal-planner" label="Meal Planner" />,
    <Tab key="shopping-list" value="shopping-list" label="Shopping List" />,
  ];

  const tabsDefaultProps = {
    value: selectedTab,
    onChange: handleTabChange,
  };

  return (
    <Grid container spacing={2}>
      <Grid sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>
      </Grid>
      <Grid sx={{ display: { xs: "none", md: "block" } }}>
        <Box>
          <Tabs {...tabsDefaultProps}>{tabs}</Tabs>
        </Box>
      </Grid>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <Card sx={{ width: "250px" }}>
          <Tabs orientation="vertical" {...tabsDefaultProps}>
            {tabs}
          </Tabs>
        </Card>
      </Drawer>
    </Grid>
  );
}
