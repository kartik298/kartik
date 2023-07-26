import { FlatButton } from "../../components/FlatButton";
import NavBar from "../../components/NavBar";
import { BackgroundPage } from "../BackgroundPage";
import { OnBoardingWidgetContainer } from "./OnBoardingWidgetContainer";

const OnBoardingWidget = () => {
  const { onBoardingEvent } = OnBoardingWidgetContainer();
  return (
    <BackgroundPage customStyle="flex flex-col">
      <NavBar />
      <div className="flex flex-col place-content-around pl-20 h-full">
        <p className="text-white text-7xl w-3/6">
          Enabling Simulations for Quantum Paradigm
        </p>
        <FlatButton
          buttonTxt="Start Simulating"
          width="40"
          eventFunction={onBoardingEvent}
        />
      </div>
    </BackgroundPage>
  );
};

export { OnBoardingWidget };
