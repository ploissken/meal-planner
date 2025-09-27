"use client";
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";

export default function DayPlannerCard({ weekday }: { weekday: string }) {
  const mealLabels = ["Breakfast", "Lunch", "Dinner"];
  return (
    <Card sx={{ borderRadius: "inherit" }}>
      <CardContent>
        <Grid container>
          <Grid sx={{ minHeight: "80px" }} size={{ xs: 6, md: 12 }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              {weekday}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>
            {mealLabels.map((mealLabel) => (
              <Grid key={`${weekday}-${mealLabel}`}>
                <Typography gutterBottom sx={{ fontSize: 14 }}>
                  {mealLabel}
                </Typography>
                <Chip
                  label="Garlic Spaghetti with Brocoll"
                  color="primary"
                  variant="outlined"
                  onClick={() => {}}
                  sx={{
                    height: "auto",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
