import { useNavigate } from "react-router-dom";

function NavBarLogo({ logo_src, logo_alt, company_name }) {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => navigate("/dashboard/myproject")}
      className="flex items-center cursor-pointer">
      <span>
        <img className="h-12 pl-5" src={logo_src} alt={logo_alt} />
      </span>
      <span className="text-4xl pl-3 text-white font-poppins hover:text-gray-200">
        {company_name}
      </span>
    </span>
  );
}

export default NavBarLogo;
