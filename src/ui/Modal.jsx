function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-stone-200/20  flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
