import { useState } from "react";
import Categories from "./Categories";
import MenuSection from "./MenuSection";
import Bar from "./searcbar";

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
   const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <Bar setSearchTerm={setSearchTerm} />
      
      <Categories
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <MenuSection activeCategory={activeCategory} searchTerm={searchTerm} />
    </>
  );
}

export default Home;