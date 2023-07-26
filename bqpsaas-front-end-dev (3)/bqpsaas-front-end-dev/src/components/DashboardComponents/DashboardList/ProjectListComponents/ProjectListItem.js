import { ProjectTitleInfo } from "./ProjectTitleInfo";

const ProjectListItem = ({ listItem, style }) => {
  return (
    <tr>
      <td className="border-b-2">
        <ProjectTitleInfo projectTitle={listItem.title} style={style} />
      </td>
      <td
        className={
          style !== null
            ? listItem.simulated === "Yes"
              ? `text-center border-b-2 text-${style.projectItemSimulatedYes}`
              : `text-center border-b-2 text-${style.projectItemSimulatedNo}`
            : null
        }>
        {listItem.simulated}
      </td>
      <td
        className="
        text-center
        border-b-2
      ">
        {listItem !== null ? listItem.time : "-"}
      </td>
    </tr>
  );
};

export { ProjectListItem };
