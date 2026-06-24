import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "./FoodCard";

function MenuSection({
  activeCategory,
  searchTerm,
  addToCart,
}) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axios
    .get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    )
    .then((res) => {
      const mealsWithPrice = (res.data.meals || []).map(
  (meal) => ({
    ...meal,
    price:
      meal.strCategory === "Seafood"
        ? 18.99
        : meal.strCategory === "Side"
        ? 16.99
        : meal.strCategory === "Dessert"
        ? 8.99
        : 12.99,
  })
);

      setFoods(mealsWithPrice);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}, []);

  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      activeCategory === "All" ||
      food.strCategory
        .toLowerCase()
        .includes(activeCategory.toLowerCase());

    const searchMatch = food.strMeal
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <h2 className="text-center text-white mt-5">
        Loading...
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-12 gap-6 mt-6 mb-3">
      {filteredFoods.map((food) => (
        <FoodCard
  key={food.idMeal}
  image={food.strMealThumb}
  title={food.strMeal}
  description={food.strCategory}
  price={food.price}
  onAdd={() =>
    addToCart({
      id: food.idMeal,
      name: food.strMeal,
      image: food.strMealThumb,
      price: food.price,
    })
  }
/>
      ))}
    </div>
  );
}

export default MenuSection;