function Button({ type, onClick, children, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-emerald-700 px-4 py-2 rounded-lg block  text-white  hover:bg-emerald-500 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
