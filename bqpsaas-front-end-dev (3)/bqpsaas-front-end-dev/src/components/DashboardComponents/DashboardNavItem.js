import { CustomNavLink } from "../../helper/CustomNavLink";

const DashboardNavItem = () => {
  return (
    <nav>
      <CustomNavLink
        className="px-4 text-2xl"
        activeClassName="border-b-4 border-red-500"
        inactiveClassName=""
        to="/dashboard/myproject">
        My Project
      </CustomNavLink>
      <CustomNavLink
        inactiveClassName=""
        className="px-4 text-2xl"
        activeClassName="border-b-4 border-green-500"
        to="/dashboard/simulations">
        Simulations
      </CustomNavLink>
      <CustomNavLink
        inactiveClassName=""
        className="px-4 text-2xl"
        activeClassName="border-b-4 border-blue-500"
        to="/dashboard/results">
        Results
      </CustomNavLink>
    </nav>
  );
};

export { DashboardNavItem };
