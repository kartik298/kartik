import { CustomNavLink } from "../../helper/CustomNavLink";

const SimulationNavItems = ({
  icon,
  icon_alt_text,
  url,
  title,
  clickHandler,
}) => {
  return (
    <CustomNavLink
      className="flex flex-col gap-1 items-center p-2 text-white text-lg font-poppins"
      activeClassName="text-green-400 font-poppins"
      inactiveClassName=""
      to={url}
      onClick={clickHandler}>
      <img src={icon} alt={icon_alt_text} className="h-6" />
      <span className="font-semibold">{title}</span>
    </CustomNavLink>
  );
};

export { SimulationNavItems };
