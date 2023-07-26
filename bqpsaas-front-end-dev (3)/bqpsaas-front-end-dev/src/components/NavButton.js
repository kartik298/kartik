const NavButton = ({ navBtnTxt }) => {
  return (
    <div className="flex h-full bg-blue-500 items-center px-8 rounded-t-xl bg-gradient-to-t from-white">
      {navBtnTxt}
    </div>
  );
};

export { NavButton };
