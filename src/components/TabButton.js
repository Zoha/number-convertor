function TabButton({ children, isActive, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-3xl px-4 py-2 cursor-pointer hover:border-opacity-30 ${
        isActive
          ? "bg-primary text-white"
          : "text-primary border-primary border "
      }`}
    >
      {children}
    </div>
  );
}

export default TabButton;
