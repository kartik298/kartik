const InputPasswordField = ({ ref, placeholder }) => {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="border-b-2 outline-none bg-transparent px-2"
    />
  );
};

export { InputPasswordField };
