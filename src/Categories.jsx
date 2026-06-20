import CustomButton from "./CustomButton";

function Categories({ active, setActive }) {
  const categories = [
    { name: "All", icon: "📋" },
    { name: "Pizza", icon: "🍕" },
    { name: "Burgers", icon: "🍔" },
    { name: "Pasta", icon: "🍝" },
    { name: "Drinks", icon: "🥤" },
    { name: "Desserts", icon: "🍰" },
  ];

  return (
    <div className="flex cata justify-center barr mx-12 gap-3">
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