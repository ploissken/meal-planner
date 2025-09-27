"use client";
import { Container, Grid, Typography } from "@mui/material";
import DayPlannerCard from "./DayPlannerCard";
import { useMealPlannerContext } from "../context/MealPlannerContext";

export default function MealPlannerContainer() {
  const { mealPlan, weekdays } = useMealPlannerContext();

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Weekly Meal Planner
      </Typography>

      <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 7 }}>
        {weekdays.map((weekday, index) => (
          <Grid key={weekday} sx={{ borderRadius: 2 }} size={1}>
            <DayPlannerCard weekday={weekday} plan={mealPlan[index]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
