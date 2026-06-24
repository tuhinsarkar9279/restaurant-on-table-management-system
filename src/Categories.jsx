import CustomButton from "./CustomButton";

function Categories({ active, setActive }) {
  const categories = [
    "All",
    "bbqs",
    "best-foods",
    "burgers",
    "desserts",
    "drinks",
    "pizzas",
  ];

  return (
    <div className="flex justify-center gap-3 flex-wrap my-5">
      {categories.map((category) => (
        <CustomButton
          key={category}
          text={category}
          active={active === category}
          onClick={() => setActive(category)}
        />
      ))}
    </div>
  );
}

export default Categories;