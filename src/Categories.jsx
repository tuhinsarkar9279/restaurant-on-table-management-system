import CustomButton from "./CustomButton";

function Categories({ active, setActive }) {
  const categories = [
    { label: "ALL", value: "All" },
    { label: "BBQS", value: "bbqs" },
    { label: "BEST FOODS", value: "best-foods" },
    { label: "BURGERS", value: "burgers" },
    { label: "DESSERTS", value: "desserts" },
    { label: "DRINKS", value: "drinks" },
    { label: "PIZZAS", value: "pizzas" },
  ];

  return (
    <div className="flex justify-center gap-3 flex-wrap my-5">
      {categories.map((category) => (
        <CustomButton
          key={category.value}
          text={category.label}
          active={active === category.value}
          onClick={() => setActive(category.value)}
        />
      ))}
    </div>
  );
}

export default Categories;