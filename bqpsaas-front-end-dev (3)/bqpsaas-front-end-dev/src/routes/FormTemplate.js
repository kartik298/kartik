const FormTemplate = ({ children }) => {
  return (
    <form className="flex flex-col w-full h-64 p-5 place-content-around rounded-xl">
      {children}
    </form>
  );
};

export { FormTemplate };
