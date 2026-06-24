import CustomButton from "./CustomButton";

function Categories({ active, setActive }) {
  const categories = [
    { name: "All", icon: "📋" },
    { name: "Breakfast", icon: "🍕" },
    { name: "Miscellaneous", icon: "🍔" },
    { name: "Side", icon: "🍝" },
    { name: "Chicken", icon: "🍗" },
    { name: "Seafood", icon: "🦐" },
    { name: "Dessert", icon: "🍰" },
    { name: "Vegetarian", icon: "🥤" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mx-12 my-6">
      {categories.map((item) => (
        <CustomButton
          key={item.name}
          text={item.name}
          icon={item.icon}
          active={active === item.name}
          onClick={() => setActive(item.name)}
        />
      ))}
    </div>
  );
}

export default Categories;