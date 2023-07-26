function NavBarLink({ link_text }) {
  return (
    <a
      href="/home"
      className=" hover:bg-gray-700 text-white rounded-md text-lg font-medium">
      {link_text}
    </a>
  );
}

export default NavBarLink;
