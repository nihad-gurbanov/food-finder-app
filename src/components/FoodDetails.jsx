import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import IngredientsList from "./IngredientsList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY_IN_USE;
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div className={styles.recipeCard}>
      <div>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>🕒{food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong> 🧑🏻‍🦰{food.servings} Servings</strong>
          </span>
          <span>
            {food.vegetarian ? (
              <strong> 🌱Vegetarian</strong>
            ) : (
              <strong> 🥩Non-Vegetarian</strong>
            )}
          </span>
          <span>{food.vegan ? <strong> 🐮 Vegan</strong> : ""}</span>
        </div>
        <div>
          <span>
            <strong>
              ${(food.pricePerServing / 100).toFixed(2)} Per serving
            </strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <IngredientsList food={food} loading={loading} />
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {loading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li key={Math.random()}>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
