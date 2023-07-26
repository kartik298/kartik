import DirectionImg from "../../../assets/sphere/direction.png";
import ScaleImg from "../../../assets/simAssets/scale.png";
import Bar from "../../../assets/car/bar.png";
import { useLocation } from "react-router-dom";

const ImageWidget = ({ image }) => {
  const location = useLocation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="flex h-full w-full items-center justify-center">
        <img src={image} alt="image_sim" className="h-96 mx-auto" />
        {(location.pathname === "/simulation-workspace/result" ||
          location.pathname === "/simulation-workspace/simulation") && (
          <img src={Bar} alt="bar" className="h-96 mr-6" />
        )}
      </div>
      <div className="flex w-full justify-between items-end">
        <img src={ScaleImg} alt="" className="h-10" />
        <img src={DirectionImg} alt="" />
      </div>
    </div>
  );
};
export { ImageWidget };
