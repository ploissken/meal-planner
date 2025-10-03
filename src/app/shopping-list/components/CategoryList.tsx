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
import { mockFetch } from "@/mockFetch";

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
    mockFetch(null, 250).then(() => {
      updateShopList(newList);
    });
  };

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" color="info">
            {category} category
          </Typography>
          {uniqueIngredients.length === 0 ? (
            <Typography textAlign="center" sx={{ margin: "24px 0" }}>
              No items needed for this category 🥳
            </Typography>
          ) : (
            <Typography color="secondary">
              {`Estimated cost: $ ${categoryTotal.toFixed(2)}`}
            </Typography>
          )}
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
              <ListItemButton dense key={ingredientId} disableRipple>
                <ListItem
                  secondaryAction={
                    <Tooltip title={recipeNames}>
                      <IconButton>
                        <QuestionMark color="secondary" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      onClick={() => handleCheckboxClick(ingredientId)}
                      tabIndex={-1}
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
        </CardContent>
      </Card>
    </Grid>
  );
}
