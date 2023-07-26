import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../../../routes/BaseUrl";
import { ListHeader } from "../ListHeader";
import { Form, Formik } from "formik";
import { RadioInput } from "../../../FormComponents/RadioInput";
import { CheckInput } from "../../../FormComponents/CheckInput";

const RoleManager = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetchUserList() {
      try {
        const users = await axios.get(baseUrl + "list", {
          withCredentials: true,
        });
        setUserList(users.data);
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
  const [col1, col2, col3, col4, col5, col6] = ["User", "Role & Access Level"];

  return (
    <div className="w-full relative overflow-x-auto shadow-md border sm:rounded-lg">
      <div className="overflow-auto">
        <table className="overflow-auto
      w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <ListHeader col1={col1} col2={col2} col3={col3} col4={col4} col5={col5} col6={col6} customStyle1={`px-6 py-3`} customStyle3={`hidden`} customStyle4={`hidden`} customStyle5={`hidden`} customStyle6={`hidden`} />
          <tbody>
            {userList
              ? userList.map((user) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                    <th scope="row" className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{user.name}</th>
                    <td className="overflow-x-auto">
                      <Formik
                        initialValues={{
                          user: user,
                          role: user.role,
                          is_staff: user.is_staff,
                          is_superuser: user.is_superuser,
                        }}
                        onSubmit={async (values) => {
                          try {
                            const requestData = {
                              name: values.user.name,
                              role: values.role,
                              is_staff: values.is_staff,
                              is_superuser: values.is_superuser,
                            };
                            const response = await axios.put(
                              baseUrl + `update/${user.id}`,
                              requestData
                            );
                            toast.success("User details updated successfully!");
                          } catch (error) {
                            toast.error(
                              "User details were not updated! [Server Error]"
                            );
                          }
                        }}
                      >
                        <Form>
                          <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
                              <div className="flex p-2 justify-between">
                                <span className="font-medium self-center text-gray-600 mr-1">
                                  Role
                                </span>
                                <RadioInput
                                  name="role"
                                  value="internal"
                                  optionName="Internal"
                                />
                                <RadioInput
                                  name="role"
                                  value="external"
                                  optionName="External"
                                />
                              </div>
                              <div className="flex justify-between p-2">
                                <span className="font-medium self-center text-gray-600 mr-1">
                                  Access Level
                                </span>
                                <CheckInput name="is_staff" label="Staff" />
                                <CheckInput name="is_superuser" label="Admin" />
                              </div>
                              <div className="flex p-2">
                                <button
                                  className="bg-iris-blue-500 hover:bg-iris-blue-800 hover:text-black text-white p-2 m-1 w-28 font-semibold rounded-md"
                                  type="submit"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </td>
                  </tr>
                );
              })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManager;
