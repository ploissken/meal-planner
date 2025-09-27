import { Container, Grid, Typography } from "@mui/material";
import DayPlannerCard from "./DayPlannerCard";

export default function MealPlannerContainer() {
  const weekdays = [...Array(7).keys()].map((day) =>
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(Date.UTC(2021, 0, day + 4)) // ensures Sunday = 0
    )
  );

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Weekly Meal Planner
      </Typography>

      <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 7 }}>
        {weekdays.map((weekday) => (
          <Grid key={weekday} sx={{ borderRadius: 2 }} size={1}>
            <DayPlannerCard weekday={weekday} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
