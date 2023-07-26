import { EquationContext } from "react-equation";
const EquationDisplay = ({ unit }) => {
  return (
    <span>
      {"("}
      <small>
        <EquationContext
          render={(equation) => equation(unit)}
        ></EquationContext>
      </small>
      {")"}
    </span>
  );
};

export default EquationDisplay;
