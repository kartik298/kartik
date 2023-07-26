export const SupportMenuWidget = () => {
  const supportMenuData = {
    menu: [
      {
        id: 1,
        title: "settings",
      },
      { id: 2, title: "previous version" },
      { id: 3, title: "What's new?" },
      { id: 4, title: "Customer Support" },
    ],
  };
  return (
    <div>
      {supportMenuData !== null
        ? supportMenuData.menu.map((menu) => (
            <div
              key={menu.id}
              className="capitalize border-b-2 border-white text-lg py-1 cursor-pointer">
              {menu.title}
            </div>
          ))
        : null}
    </div>
  );
};
