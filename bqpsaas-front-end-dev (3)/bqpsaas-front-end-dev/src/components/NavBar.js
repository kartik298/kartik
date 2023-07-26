import NavBarLogo from "./simulationbar_components/NavBarLogo";
import bqp_logo from "../assets/images/bqp_logo.webp";
import { ProfileAvatar } from "./CommonComponents/ProfileAvatar";
import { DashboardTitleBar } from "./DashboardComponents/DashboardTitleBar";

const NavBar = () => {
  return (
    <div className="h-28 w-full bg-black flex place-content-between items-center justify-between p-2">
      <NavBarLogo
        logo_src={bqp_logo}
        logo_alt="bqp_logo"
        company_name="BQPhy"
      />
      <ProfileAvatar />
    </div>
  );
};

export default NavBar;
