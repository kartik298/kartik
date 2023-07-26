import { DashboardTitleBar } from "../../../../components/DashboardComponents/DashboardTitleBar";
import { GalleryWidget } from "../../../../components/DashboardComponents/GalleryComponents/GalleryWidget";

const SimulationWidget = () => {
  return (
    <div className="bg-white h-full w-full">
      <DashboardTitleBar dashboardTitle="Simulations" />
      <GalleryWidget />
    </div>
  );
};

export { SimulationWidget };
