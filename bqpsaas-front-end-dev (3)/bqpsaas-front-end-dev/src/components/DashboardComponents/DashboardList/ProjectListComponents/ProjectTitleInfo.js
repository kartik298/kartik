const ProjectTitleInfo = ({ projectTitle, style }) => {
  return (
    <>
      {style !== null && projectTitle !== null ? (
        <div className="">
          <p className={`text-${style.projectListItemHeadingColor} font-bold`}>
            {projectTitle.title}
          </p>
          <span
            className={`text-xs text-${
              style.projectListState[projectTitle.state.toLowerCase()]
            }`}>
            {projectTitle.state}
          </span>
          <span
            className={`ml-2 text-xs text-${style.projectListNavigationColor}`}>
            {projectTitle.navigation}
          </span>
        </div>
      ) : null}
    </>
  );
};

export { ProjectTitleInfo };
