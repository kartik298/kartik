import { PricingButton } from "./PricingButton";

const PricingCard = () => {
  return (
    <div className="h-full w-1/3 bg-gray-300 opacity-60 mx-6 rounded-3xl flex flex-col">
      <div className="bg-gradient-to-t from-gray-300 to-green-300 rounded-t-3xl h-24 w-full text-black text-3xl font-semibold flex justify-center items-center">
        OPTION 1
      </div>
      <div className="py-5 px-6 h-5/6 w-full">
        What all would come under this package <br />
        <span>1. Lorem Ipsum</span>
        <br />
        <span>2. Lorem Ipsum</span>
      </div>
      <div className="h-1/6 rounded-b-3xl flex justify-center items-center">
        <PricingButton />
      </div>
    </div>
  );
};

export { PricingCard };
