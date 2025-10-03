import { Recipe } from "@/types";
import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const MIN_FOR_HALF_START = 0.25;
const MAX_FOR_HALF_START = 0.9;

export default function RecipeRating({ recipe }: { recipe: Recipe }) {
  const [rating, setRating] = useState(0);
  const {
    rating: { average, votes },
  } = recipe;
  const fullStars = Math.floor(average);
  const hasHalfStar =
    average - fullStars >= MIN_FOR_HALF_START &&
    average - fullStars < MAX_FOR_HALF_START;
  const outlineStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const iconSx = rating > 0 ? {} : { cursor: "pointer" };

  // mocking rate persistence for simplicity
  const newRating = (average * votes + rating) / (votes + 1);
  const ratingLabel =
    rating > 0
      ? `${newRating.toFixed(2)} (${votes + 1} votes)`
      : `${average} (${votes} votes)`;

  const handleRating = (rate: number) => {
    if (!rating) {
      // not persisting vote for simplicity
      console.info(`persist vote: { recipeId: ${recipe.id}, rate: ${rate}}`);
      setRating(rate);
    }
  };

  return (
    <Box sx={{ paddingTop: "8px" }}>
      {[...Array.from({ length: fullStars })].map((_, index) => (
        <Star key={index} onClick={() => handleRating(index + 1)} sx={iconSx} />
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
}
