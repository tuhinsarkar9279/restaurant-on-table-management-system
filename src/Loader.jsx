import logo from "./assets/logo.png";

function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="Tavola"
          className="w-28 h-28 animate-spin"
        />

        <h2 className="text-amber-400 text-2xl font-bold mt-4">
          Tavola
        </h2>

        <p className="text-gray-400 mt-2">
          Preparing your table...
        </p>
      </div>
    </div>
  );
}

export default Loader;