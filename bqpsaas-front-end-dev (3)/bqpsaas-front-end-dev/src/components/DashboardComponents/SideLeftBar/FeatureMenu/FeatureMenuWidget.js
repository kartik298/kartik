export const FeatureMenuWidget = () => {
  const featureMenuData = {
    menu: [
      {
        id: 1,
        title: "import",
        description: ".stl, .obj, .fbx, .dae, .3ds, .iges, .step, .vrml",
      },
      { id: 2, title: "results", description: "view your results" },
      {
        id: 3,
        title: "project analytics",
        description: "track project changes",
      },
      { id: 4, title: "more tools", description: "upgrade your plan to PRO" },
    ],
  };
  return (
    <div>
      {featureMenuData !== null
        ? featureMenuData.menu.map((menu) => (
            <div key={menu.id} className="py-1 cursor-pointer">
              <p className="capitalize text-lg font-semibold">{menu.title}</p>
              <p className="text-xs">{menu.description}</p>
            </div>
          ))
        : null}
    </div>
  );
};
