const BackgroundPage = ({ children, customStyle, imgStyle, screenStyle }) => {
  return (
    <>
      <div>
        <div className={`h-screen ${screenStyle}`}>
          <div className={`${imgStyle}`}>
            <div className="flex justify-center items-center flex-wrap h-full text-gray-800 ">
              <div className="md:w-8/12 lg:w-7/12 mb-20 md:mb-0"></div>
              {/* <div className="md:w-8/12 max-w-sm"> */}
              <div className={`${customStyle}`}></div>
              <div>{children}</div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { BackgroundPage };
