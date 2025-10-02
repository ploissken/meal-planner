import { Recipe } from "@/types";
import {
  FormatListNumbered,
  MenuBook,
  PieChart,
  Reviews,
  Star,
  StarHalf,
  StarOutline,
} from "@mui/icons-material";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import RecipeInstructionItem from "./RecipeInstructionItem";

export default function RecipeDetailModal({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const titleStyle = { display: "flex", alignItems: "center", gap: 2, mt: 4 };

  const handleRating = (rate: number) => {
    if (!rating) {
      // not persisting vote for simplicity
      console.info(`persist vote: { recipeId: ${recipe.id}, rate: ${rate}}`);
      setRating(rate);
    }
  };

  const getRecipeRating = () => {
    const {
      rating: { average, votes },
    } = recipe;
    const fullStars = Math.floor(average);
    const hasHalfStar =
      average - fullStars >= 0.25 && average - fullStars < 0.9;
    const outlineStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const iconSx = rating > 0 ? {} : { cursor: "pointer" };

    // mocking rate persistence for simplicity
    const newRating = (average * votes + rating) / (votes + 1);
    const ratingLabel =
      rating > 0
        ? `${newRating.toFixed(2)} (${votes + 1} votes)`
        : `${average} (${votes} votes)`;

    return (
      <Box sx={{ paddingTop: "8px" }}>
        {[...Array.from({ length: fullStars })].map((_, index) => (
          <Star
            key={index}
            onClick={() => handleRating(index + 1)}
            sx={iconSx}
          />
        ))}
        {hasHalfStar && (
          <StarHalf onClick={() => handleRating(fullStars + 1)} sx={iconSx} />
        )}
        {[...Array.from({ length: outlineStars })].map((_, index) => (
          <StarOutline
            key={index}
            sx={iconSx}
            onClick={() =>
              handleRating(fullStars + (hasHalfStar ? 1 : 0) + index + 1)
            }
          />
        ))}
        <Typography color="lightgray">{ratingLabel}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ width: "100%" }}
      >
        Details
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>{recipe.title}</DialogTitle>

        <DialogContent dividers>
          <Box>
            {/* avoiding next/image for config simplicity */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.image}
              style={{ maxWidth: "500px", width: "100%" }}
              alt={recipe.title}
            />
          </Box>

          <Typography variant="h6" sx={titleStyle}>
            <PieChart />
            Nutritional Info
          </Typography>
          <Divider />

          <BarChart
            xAxis={[
              {
                data: ["protein", "carbs", "fat"],
              },
            ]}
            series={[
              {
                data: [
                  recipe.nutritionalInfo.protein,
                  recipe.nutritionalInfo.carbs,
                  recipe.nutritionalInfo.fat,
                ],
              },
            ]}
            height={250}
          />

          <Typography variant="h6" sx={titleStyle}>
            <Reviews />
            Rating
          </Typography>
          <Divider />
          {getRecipeRating()}

          <Typography variant="h6" sx={titleStyle}>
            <MenuBook />
            Ingredients
          </Typography>
          <Divider />

          <List>
            {recipe.ingredients.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemText
                  primary={`${item.quantity} (units) ${item.name}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={titleStyle}>
            <FormatListNumbered />
            Instructions
          </Typography>
          <Divider />

          <List>
            {recipe.instructions.map((item) => (
              <RecipeInstructionItem key={item.label} instruction={item} />
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
