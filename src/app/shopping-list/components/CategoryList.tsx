import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { QuestionMark } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIngredientDialog from "./AddIngredientDialog";

export default function CategoryList({ category }: { category: string }) {
  const { ingredients, shoplist, updateShopList } = useMealPlannerContext();
  const requiredIngredients = shoplist.filter(
    (ingredient) => ingredient.category === category
  );

  const uniqueIngredients: string[] = [
    ...new Set(requiredIngredients.map(({ id }) => id)),
  ];

  const categoryTotal = requiredIngredients.reduce(
    (a, c) => (a += c.estimatedCostPerUnit! * c.quantity),
    0
  );

  const handleCheckboxClick = (id: string) => {
    const newList = shoplist.filter((ingredient) => ingredient.id !== id);
    updateShopList(newList);
  };

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {category}
          </Typography>
          {uniqueIngredients.map((ingredientId) => {
            const ingredient = ingredients.find((i) => i.id === ingredientId);
            const totalRequired = requiredIngredients
              .filter((ingredient) => ingredient.id === ingredientId)
              .reduce((a, c) => (a += c.quantity), 0);
            const recipeNames = [
              ...new Set(
                requiredIngredients
                  .filter((i) => i.category === category)
                  .map((ing) => ing.recipeName)
              ),
            ].join(", ");

            return (
              <ListItemButton dense key={ingredientId}>
                <ListItem
                  secondaryAction={
                    <Tooltip title={recipeNames}>
                      <IconButton>
                        <QuestionMark />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={false}
                      onClick={() => handleCheckboxClick(ingredientId)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={ingredient?.name}
                    secondary={`${totalRequired} ${ingredient?.unit}s`}
                  />
                </ListItem>
              </ListItemButton>
            );
          })}
          <AddIngredientDialog category={category} />
          {uniqueIngredients.length === 0 ? (
            <Typography textAlign="center">
              No items needed for this category 🥳
            </Typography>
          ) : (
            <Typography variant="h6" textAlign="right" color="secondary">
              {`Estimated cost: $ ${categoryTotal.toFixed(2)}`}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
