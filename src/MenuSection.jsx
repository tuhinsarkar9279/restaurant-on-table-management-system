import FoodCard from "./FoodCard";
import pizza1 from "./assets/pizza.png";
import burgar from "./assets/burgar.png";
import pasta from "./assets/image.png";

function MenuSection({ activeCategory, searchTerm }) {
  const foods = [
    {
      title: "Margherita Pizza",
      category: "Pizza",
      image: pizza1,
      price: "14.90",
    },
    {
      title: "Classic Burger",
      category: "Burgers",
      image: burgar,
      price: "12.50",
    },
    {
      title: "Pasta Carbonara",
      category: "Pasta",
      image: pasta,
      price: "15.50",
    },
  ];

  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      activeCategory === "All" ||
      food.category === activeCategory;

    const searchMatch = food.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-12 gap-6 mt-6 mb-3">
      {filteredFoods.map((food, index) => (
        <FoodCard
          key={index}
          image={food.image}
          title={food.title}
          price={food.price}
        />
      ))}
    </div>
  );
}

export default MenuSection;