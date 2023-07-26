import { Footer } from "../../components/Footer";
import { PricingCard } from "../../components/PricingComponents/PricingCard";
import { BackgroundPage } from "../BackgroundPage";

const PricingWidget = () => {
  return (
    <BackgroundPage customStyle="flex flex-col justify-center items-center">
      <div className="h-full w-10/12 mt-10 box-border flex">
        <PricingCard />
        <PricingCard />
        <PricingCard />
      </div>
      <Footer />
    </BackgroundPage>
  );
};

export { PricingWidget };
