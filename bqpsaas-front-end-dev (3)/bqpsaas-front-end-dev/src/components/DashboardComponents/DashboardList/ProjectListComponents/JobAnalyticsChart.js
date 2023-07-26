import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const JobAnalyticsChart = ({ projectData }) => {
  const simulationMap = {};
  projectData.forEach((item) => {
    const projectType = item.simulationType;
    if (projectType in simulationMap) {
      simulationMap[projectType] += 1;
    } else {
      simulationMap[projectType] = 1;
    }
  });

  let data = {
    labels: Object.keys(simulationMap),
    datasets: [
      {
        label: "Variety of Simulations",
        data: Object.values(simulationMap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };
  return (
    <div
      className={`doughnut shadow-md sm:rounded-lg w-full border rounded-md p-1 items-center`}>
      <h4 className="ml-4 font-medium text-md">Project Types</h4>
      <div className="h-full flex items-center justify-center">
        {/* lg:w-full m-4 relative lg:top-16 md:top-20 sm:top-2 sm:w-72 */}
          <div className="lg:w-fit m-4 sm:w-72 " >
            {projectData ? (
              <Doughnut data={data} options={{responsive:true}}/>
            ) : (
              "There's no data to analyse"
            )}
          </div>
      </div>
    </div>
  );
};

export default JobAnalyticsChart;
