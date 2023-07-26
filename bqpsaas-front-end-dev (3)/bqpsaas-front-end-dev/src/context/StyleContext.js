import { createContext, useContext, useState } from "react";

export const StyleContext = createContext();

export const useStyle = () => useContext(StyleContext);

export const StyleProvider = (props) => {
  const [dashboardCountStyles] = useState(null);

  // // set DashboardCount
  // useEffect(() => {
  //   axios
  //     .get("http://48fb-157-119-176-53.ngrok.io/dynamicdata")
  //     .then((response) => {
  //       if (response.status === 200) return response.data;
  //       else throw Error("Endpoint not found");
  //     })
  //     .then((data) => {
  //       const temp = [...data];
  //       setDashboardCountStyles(temp);
  //     })
  //     .catch((error) =>
  // }, []);

  const value = {
    dashboardCountStyles,
  };

  return (
    <StyleContext.Provider value={value}>
      {props.children}
    </StyleContext.Provider>
  );
};
