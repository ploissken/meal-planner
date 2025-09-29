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

export default function CategoryList({ category }: { category: string }) {
  const { ingredients, shoplist } = useMealPlannerContext();
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
    console.log(`mark ingredient ${id} as not needed`);
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
              <ListItemButton role={undefined} dense key={ingredientId}>
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
          <Typography variant="h6" textAlign="right" color="secondary">
            {`Estimated cost: $ ${categoryTotal.toFixed(2)}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
