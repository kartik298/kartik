import { useSelector } from "react-redux";

const CreateButton = ({ name, clickHandler }) => {
  const styles = useSelector(
    (store) => store.theme.dashboard.leftSideBar.selectionButton
  );

  return (
    <button
      className={`bg-${styles.textColor} text-${styles.backgroundColor}-600 px-4 py-1 rounded-2xl cursor-pointer`}
      onClick={clickHandler}>
      {name}
    </button>
  );
};
export { CreateButton };
