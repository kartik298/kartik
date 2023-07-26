const Footer = ({ customStyle, text, subtext }) => {
  return (
    <footer className={`text-white ${customStyle}`}>
      <p className="font-extrabold text-6xl absolute left-32 bottom-96">
        {text}{" "}
        <p className="font-normal text-normal text-3xl mt-2 text-gray-50 ">
          {subtext}
        </p>
      </p>
    </footer>
  );
};

export { Footer };
