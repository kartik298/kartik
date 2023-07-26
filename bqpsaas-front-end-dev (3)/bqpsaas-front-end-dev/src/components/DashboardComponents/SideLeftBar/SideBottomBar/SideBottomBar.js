export const SideBottomBar = () => {
  const sideBottomBarData = {
    menu: [
      { id: 1, title: "status" },
      { id: 2, title: "privacy" },
      { id: 3, title: "terms" },
    ],
    style: {
      bgColor: "white",
      paddingX: 2,
      paddingY: 1,
    },
  };

  return (
    <div className="flex justify-between">
      {sideBottomBarData !== null
        ? sideBottomBarData.menu.map((menu) => (
            <button
              key={menu.id}
              className={`bg-${sideBottomBarData.style.bgColor} px-${sideBottomBarData.style.paddingX} py-${sideBottomBarData.style.paddingY} rounded-md`}>
              {menu.title}
            </button>
          ))
        : null}
    </div>
  );
};
