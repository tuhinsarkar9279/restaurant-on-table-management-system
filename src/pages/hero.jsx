import diningImage from "../assets/dining.jpg";

function Hero() {
  return (
    <div className="relative w-full h-80 overflow-hidden">
      <img
        src={diningImage}
        alt="Card background"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-3xl font-bold z ease-linear transition">
          Fine Dining, Your Table
        </h1>
        <p className="text-sm text-gray-400">
          Browse our menu and order directly from your table
        </p>
      </div>
    </div>
  );
}

export default Hero;