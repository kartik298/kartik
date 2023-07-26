const DashboardTitleBar = ({ dashboardTitle }) => {
  return (
    <div className="flex justify-between w-full mb-3">
      <h1 className="ml-4 text-2xl">{dashboardTitle}</h1>
      {/* <div className="flex ">
        <div className="px-3 mx-1 bg-gray-300 rounded-md h-7">Past Month</div>
        <div className="px-3 mx-1 bg-gray-300 rounded-md h-7">Print</div>
        <div className="px-3 mx-1 bg-gray-300 rounded-md h-7">Download</div>
      </div> */}
    </div>
  );
};

export { DashboardTitleBar };
