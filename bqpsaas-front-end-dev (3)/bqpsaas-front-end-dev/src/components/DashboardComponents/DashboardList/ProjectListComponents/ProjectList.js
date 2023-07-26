import { ListHeader } from "../ListHeader";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../../../routes/BaseUrl";

export const ProjectList = ({ projectData }) => {
  const [col1, col2, col3, col4, col5, col6] = [
    "Project Name",
    "Simulation Type",
    "Created at",
    "Download",
    "",
    "",
  ];

  return (
    <div
      className={`overflow-y-scroll min-h-64 border w-full relative shadow-md sm:rounded-lg`}
    >
      <h4 className="ml-4 font-medium text-md mt-1 mb-3">User Activity</h4>
      <div className="w-full flex overflow-y-auto overflow-auto">
        {projectData.length > 0 ? (
          <table className="overflow-auto w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <ListHeader
              col1={col1}
              col2={col2}
              col3={col3}
              col4={col4}
              col5={col5}
              col6={col6}
              customStyle={`px-3 py-3`}
              customStyle5={`hidden`}
              customStyle6={`hidden`}
            />
            <tbody>
              {projectData
                .map((project) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={project.id}
                    >
                      <th
                        scope="row"
                        className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {project.projectName}
                      </th>
                      <td className="text-center">{project.simulationType}</td>
                      <td className="text-center">
                        {project.created_at.slice(0, 11) +
                          project.created_at.slice(20)}
                      </td>
                      <td className="text-center">
                        <button
                          className="fa fa-download cursor-pointer font-20 text-iris-blue-500 hover:text-gray-500"
                          type="submit"
                          onClick={async (e) => {
                            e.preventDefault();

                            try {
                              const generateDownloadUrlRequest =
                                await axios.get(
                                  baseUrl +
                                    `dashboardDownloadfile/${project.id}`,
                                  {
                                    withCredentials: true,
                                  }
                                );

                              const checkExistenceOfFile = await axios.get(
                                generateDownloadUrlRequest.data.download_url
                              );
                              if (checkExistenceOfFile.status === 200) {
                                toast.success("File is ready for download");
                                setTimeout(() => {
                                  window.open(
                                    generateDownloadUrlRequest.data.download_url
                                  );
                                }, 3000);
                              } else {
                                toast.error("Simulation is still in progress");
                              }
                            } catch (error) {
                              if (error.response.status === 401) {
                                toast.error("Credential Error");
                              } else if (error.response.status === 404) {
                                toast.error("Simulation is still in progress");
                              } else {
                                toast.error(
                                  "Cannot fetch users [Server error]"
                                );
                              }
                            }
                          }}
                        ></button>
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        ) : (
          <div className="p-10">
            {" "}
            You haven't created a project on BQPhy yet{" "}
          </div>
        )}
      </div>
    </div>
  );
};
