const DashboardCount = ({
  countHeading,
  count,
  textColor,
  paddingX,
  paddingY,
  bgColor,
  width,
  height,
}) => {
  return (
    <div
      className={`bg-${bgColor} rounded-md w-1/4 h-${height} px-${paddingX} py-${paddingY} ml-4 flex flex-col border border-blue-300 justify-evenly hover:shadow-md transition-all`}>
      <p className="text-left text-sm text-gray-700	">{countHeading}</p>
      <p className={`text-${textColor} text-2xl font-bold text-right`}>
        {count}
      </p>
    </div>
  );
};

export { DashboardCount };
