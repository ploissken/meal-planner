"use client";
import { Container, Grid, Typography } from "@mui/material";
import DayPlannerCard from "./DayPlannerCard";
import { useLocalStorageContext } from "../../context/LocalStorageContext";

export default function MealPlannerContainer() {
  const { mealPlan, weekdays } = useLocalStorageContext();

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Weekly Meal Planner
      </Typography>

      <Grid container spacing={2} columns={{ xs: 1, lg: 7 }}>
        {weekdays.map((weekday, index) => (
          <Grid key={weekday} sx={{ borderRadius: 2 }} size={1}>
            <DayPlannerCard
              weekday={{ name: weekday, index }}
              plan={mealPlan[index]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
