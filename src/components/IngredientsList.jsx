import Ingredient from "./Ingredient";

export default function IngredientsList({ food, loading }) {
  return (
    <div>
      {!loading
        ? food.extendedIngredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} />
          ))
        : "Loading..."}
    </div>
  );
}
