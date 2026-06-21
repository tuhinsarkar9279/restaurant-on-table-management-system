import logo from "./assets/logo.png";

function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <img
          src={logo}
          alt="Tavola Logo"
          className="w-40 h-40 animate-pulse drop-shadow-[0_0_25px_#facc15]"
        />

        <h1 className="text-amber-400 text-4xl font-bold mt-4">
          Tavola
        </h1>

        <p className="text-gray-400 mt-2">
          Fine Dining, Your Table
        </p>
      </div>
    </div>
  );
}

export default Loader;