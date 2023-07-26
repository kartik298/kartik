import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { baseUrl } from "../../routes/BaseUrl";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useLogoutMutation } from "../../services/auth/authApi";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/auth/authSlice";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import "../../../src/components/NavBar.css";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function ProfileAvatar() {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useOnClickOutside(dropDownRef, () => setDropDown(false));

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetchUserList() {
      try {
        const users = await axios.get(baseUrl + "user", {
          withCredentials: true,
        });
        setUserList(users.data);
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("Credential Error");
        } else {
          toast.error("Cannot fetch users [Server error]");
        }
      }
      try {
        const users = await axios.get(baseUrl + "s3path", {
          withCredentials: true,
        });
        let userData = users.data;
        Cookies.set("jobid", userData.id);
        Cookies.set("userName", userData.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);

  const { clearLocalStorage } = useLocalAuth();
  return (
    <div className="relative" onClick={() => setDropDown(true)}>
      <div className="text-xl font-medium text-white mr-3 link link-underline link-underline-black cursor-pointer">
        {userList.name}
        <span className="fa fa-sign-out text-md ml-2"></span>
      </div>
      {dropDown && (
        <div
          className="absolute top-10 right-2 w-32 h-12 rounded-md z-10 cursor-pointer bg-iris-blue-500 hover:bg-iris-blue-800 text-white transition font-bold hover:text-black"
          ref={dropDownRef}
        >
          <div
            className="text-center p-2 font-md"
            onClick={() => {
              (async () => {
                const endtime = new Date();
                const starttime = localStorage.getItem("starttime");
                const sstarttime = new Date(starttime);
                const id = localStorage.getItem("id");
              
                const timeDifference = Math.abs(endtime.getTime() - sstarttime.getTime());
                const timeDifferenceInSeconds = Math.floor(timeDifference/ 1000);
               console.log(timeDifferenceInSeconds);
                const apiUrl = `${baseUrl}active_time/${id}`
                
               await fetch(apiUrl, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(timeDifferenceInSeconds),
                })
                  .then((response) => response.json())
                  .then((responseData) => {
                    console.log("API Response:", responseData);
                  })
                  .catch((error) => {
                    console.error("Error sending data to API:", error);
                  });
                const response = await logout();
                navigate("/logout");
                dispatch(setCredentials({ jwt: null }));

                clearLocalStorage();
                setTimeout(() => {
                  navigate("/login");
                }, 5000);
                const { data, error } = response;
                if (data) {
                  toast.success("You've successfully logged out");
                } else if (error) {
                  toast.error("Something went wrong");
                }
              })();
            }}
          >
            <span className="text-lg pointer">Log out</span>{" "}
            {/* <BiLogOutCircle className="text-center text-red-900 text-2xl" /> */}
          </div>
        </div>
      )}
    </div>
  );
}
