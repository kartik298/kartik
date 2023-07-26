import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../../../routes/BaseUrl";
import { ListHeader } from "../ListHeader";

const UserActivityManager = () => {

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetchUserList() {
      try {
        const users = await axios.get(baseUrl + "internal-user-list", {
          withCredentials: true,
        });
        setUserList(users.data["user-activity-metrics"]);
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("You don't have necessary permissions to manage roles");
        } else {
          toast.error("Cannot fetch users [Server error]");
        }
      }
    }
    fetchUserList();
  }, []);
  const [col1, col2, col3, col4, col5, col6] = ["", "User", "Email", "Time Usage", "Joining Date", "Expiry Date"];

  return (
    <>
      <div className="overflow-y-scroll w-full relative shadow-md border sm:rounded-lg">
        <div className="grid grid-cols-6 gap-4 m-3">
          <div className="ml-2 col-start-1 col-end-3 font-bold">Total Signups : <span className="text-iris-blue-500">{userList.length}</span> </div>
          <div className="col-end-7 col-span-2 
        font-bold"><span className="logged-in px-1 text-sm">●</span>Active : <span className="text-iris-blue-500">{userList.filter((user) => user.is_loggedin).length}</span>  </div>
        </div>
        <table className="overflow-auto w-full text-sm text-left text-gray-700 bg-gray-200">
          <ListHeader col1={col1} col2={col2} col3={col3} col4={col4} col5={col5} col6={col6} customStyle3={`relative -left-6`} customStyle4={`relative -left-4`} customStyle5={`relative -left-4`} customStyle6={`relative -left-4`} />
          <tbody>
            {userList
              ? userList.map((user) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id} >
                    <td className="p-1">{user.is_loggedin ? <span className="text-xs logged-in">●</span> : ''}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{user.name}</th>
                    <td>{user.email}</td>
                    <td className="p-3">{user.active_time.slice(0, 8) + ' hr'}</td>
                    <td>{(user.joined_date).slice(0, 11) + (user.joined_date).slice(20)}</td>
                    <td>{(user.expiry_time).slice(0, 11) + (user.expiry_time).slice(20)}</td>
                  </tr>
                )
              })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserActivityManager;
