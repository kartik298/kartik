import { DashboardCount } from "../../../../components/DashboardComponents/DashboardCount";
import JobAnalyticsChart from "../../../../components/DashboardComponents/DashboardList/ProjectListComponents/JobAnalyticsChart";
import { ProjectList } from "../../../../components/DashboardComponents/DashboardList/ProjectListComponents/ProjectList";
import { PurchaseList } from "../../../../components/DashboardComponents/DashboardList/PurchaseComponents/PurchaseList";
import { DashboardTitleBar } from "../../../../components/DashboardComponents/DashboardTitleBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl";
import { toast } from "react-hot-toast";
import RoleManager from "../../../../components/DashboardComponents/DashboardList/ProjectListComponents/RoleManager";
import UserActivityManager from "../../../../components/DashboardComponents/DashboardList/ProjectListComponents/UserActivityManager";
import Alert from "../../../../errors/Alert/Alert";
import '../../../../styles/productWidget.css';

const MyProjectsWidget = () => {
  const [currentTab, setCurrentTab] = useState("project-list");
  const [projectData, setProjectData] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userProjects = await axios.get(baseUrl + "jobid", {
          withCredentials: true,
        });
        setProjectData(userProjects.data);
      } catch (error) {
        toast.error("Unable to load user projects! (Server error)");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const users = await axios.get(baseUrl + "list", {
          withCredentials: true,
        });
        setUserList(users.data);
        setAuthenticatedUser();
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);

  let user_role = userList.map((e) => {
    return e.role;
  });

  if (user_role === "internal") {
    setAuthenticatedUser(false);
  }

  // sample data for the UI
  const dashboardCountList = [
    {
      id: 1,
      heading: "Projects",
      count: projectData.length,
      textColor: "red-500",
      paddingX: 2,
      paddingY: 2,
      bgColor: "gray-200",
      width: 32,
      height: 20,
    },
    {
      id: 2,
      heading: "Simulations",
      count: 0,
      textColor: "blue-500",
      paddingX: 2,
      paddingY: 2,
      bgColor: "gray-200",
      width: 32,
      height: 20,
    },
    {
      id: 3,
      heading: "Results",
      count: 0,
      textColor: "green-500",
      paddingX: 2,
      paddingY: 2,
      bgColor: "gray-200",
      width: 32,
      height: 20,
    },
    {
      id: 4,
      heading: "Compute Power Used",
      count: 0,
      textColor: "yellow-500",
      paddingX: 2,
      paddingY: 2,
      bgColor: "gray-200",
      width: 32,
      height: 20,
    },
  ];

  //

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  return (
    <div className="h-screen w-full flex flex-col p-3">
      {/* <DashboardTitleBar dashboardTitle="Dashboard" />
      {dashboardCountList !== null ? (
        <div>
          <h4 className="font-bold text-md border-b-2">At a glance</h4>
          <div className="flex items-center mr-3 my-2 transition-all">
            {dashboardCountList.map((dashboardCountInfo) => (
              <DashboardCount
                key={dashboardCountInfo.id}
                countHeading={dashboardCountInfo.heading}
                count={dashboardCountInfo.count}
                textColor={dashboardCountInfo.textColor}
                paddingX={dashboardCountInfo.paddingX}
                paddingY={dashboardCountInfo.paddingY}
                bgColor={dashboardCountInfo.bgColor}
                width={dashboardCountInfo.width}
                height={dashboardCountInfo.height}
              />
            ))}
          </div>
        </div>
      ) : null} */}
      <ul className="flex border-b">
        {authenticatedUser ? (
          <li className="-mb-px mr-1">
            <button
              className={`bg-white inline-block py-2 px-4 font-semibold ${
                currentTab === "project-list"
                  ? "border-l border-t border-r rounded-t"
                  : null
              }`}
              onClick={() => setCurrentTab("project-list")}>
              Team Projects
            </button>
          </li>
        ) : (
          <>
            <li className="-mb-px mr-1">
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${
                  currentTab === "project-list"
                    ? "border-l border-t border-r rounded-t"
                    : null
                }`}
                onClick={() => setCurrentTab("project-list")}>
                Team Projects
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${
                  currentTab === "manage-roles"
                    ? "border-l border-t border-r rounded-t"
                    : null
                }`}
                onClick={() => setCurrentTab("manage-roles")}>
                Manage Roles
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${
                  currentTab === "user-activity-monitoring"
                    ? "border-l border-t border-r rounded-t"
                    : null
                }`}
                onClick={() => setCurrentTab("user-activity-monitoring")}>
                User Activity Monitoring
              </button>
            </li>
          </>
        )}
      </ul>
      {/* result = (a >= 0) ? (a == 0 ? "zero" : "positive") : "negative"; */}
      {screenSize.width < 750 || screenSize.height < 750 ? (
        <div>
          <Alert />
        </div>
      ) : currentTab === "project-list" ? (
        <div className="analyticsArea h-5/6 md:h-4/5 mx-auto mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
          <JobAnalyticsChart projectData={projectData} />
          <ProjectList projectData={projectData} />
        </div>
      ) : currentTab === "manage-roles" ? (
        <div className="h-5/6 flex mt-3">
          <RoleManager />
        </div>
      ) : currentTab === "user-activity-monitoring" ? (
        <div className="h-5/6 flex mt-3">
          <UserActivityManager />
        </div>
      ) : null}
    </div>
  );
};

export { MyProjectsWidget };
