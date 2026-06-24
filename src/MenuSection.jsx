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
    const category =
      activeCategory === "All"
        ? "bbqs"
        : activeCategory;

    axios
      .get(
        `http://localhost:3000/${category}`
      )
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [activeCategory]);

  const filteredFoods = foods.filter((food) =>
    food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <h2 className="text-center text-white">
        Loading...
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-12 gap-6 mt-6">
      {filteredFoods.map((food) => (
        <FoodCard
          key={food.id}
          image={food.img}
          title={food.name}
         
          price={food.price}
          onAdd={() =>
            addToCart({
              id: food.id,
              name: food.name,
              image: food.img,
              price: food.price,
            })
          }
        />
      ))}
    </div>
  );
}

export default MenuSection;