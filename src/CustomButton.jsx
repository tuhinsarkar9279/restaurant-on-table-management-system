const CustomButton = ({ text, icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-3xl transition flex items-center gap-2
        ${
          active
            ? "bg-amber-400 text-black"
            : "bg-zinc-900 border border-gray-700 text-gray-300 hover:bg-zinc-800"
        }`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;