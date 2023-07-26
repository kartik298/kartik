import { DashboardTitleBar } from "../../../../components/DashboardComponents/DashboardTitleBar";
import { GalleryWidget } from "../../../../components/DashboardComponents/GalleryComponents/GalleryWidget";

const ResultsWidget = () => {
  return (
    <div className="bg-white h-full w-full">
      <DashboardTitleBar dashboardTitle="Result" />
      <GalleryWidget />
    </div>
  );
};

export { ResultsWidget };
