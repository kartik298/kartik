import React from "react";
import { Link } from "react-router-dom";
import { BackgroundPage } from "../BackgroundPage";
import { Logo } from "../../components/CommonComponents/Logo";
import bqp_logo from "../../assets/images/bqphy-light.png";
import { Footer } from "../../components/Footer";

const Landing = () => {
  return (
    <>
      <div className="h-screen relative">
        <Logo
          logo_src={bqp_logo}
          customStyle={"w-36 absolute top-6 mx-6 left-4"}
        />
        <BackgroundPage
          imgStyle={
            "bg-landing-page flex-1 bg-hero bg-cover bg-center bg-no-repeat"
          }
          customStyle="relative"
        >
          <div className="absolute bottom-0 left-0 w-full">
            <Footer
              customStyle={`text-white`}
              text={"BQPhy"}
              subtext={"Solving the unsolvable"}
            />
            <div className="relative">
              <Link
                className="bg-iris-blue-500 text-xl font-bold hover:bg-iris-blue-800 text-white p-6 px-16 relative -top-12 rounded h-18 w-full hover:text-black left-52 -top-72 lg:left-80 lg:-top-72 "
                to="/login"
              >
                Start Simulating
              </Link>
            </div>
          </div>
        </BackgroundPage>
      </div>
    </>
  );
};

export default Landing;
