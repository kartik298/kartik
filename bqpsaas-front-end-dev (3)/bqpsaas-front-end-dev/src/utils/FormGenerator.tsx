import { Field, Form, Formik } from "formik";
import React from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../components/FormComponents/IconButton";
import { LabelText } from "../components/FormComponents/LabelText";
import { RadioInput } from "../components/FormComponents/RadioInput";
import { ValueInput } from "../components/FormComponents/ValueInput";
import { modalOff } from "../components/SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import {
  deleteMaterialProperty,
  updateMaterialProperty,
  updateSolver,
} from "../features/simulationWorksapce/SolverInputSlice";
import { FormSchemaType } from "../tests/FormSchemaTypes";

type FormGeneratorProps = {
  schema: FormSchemaType;
  route: string;
};

export function FormGenerator({ schema, route }: FormGeneratorProps) {
  const dispatch = useDispatch();
  const { type, formID, subStore, state, values, components, index } = schema;
  const formState = useSelector((store: any) =>
    type === "form"
      ? store[subStore][state]
      : store[subStore][state][index as number]
  );

  const submitHandler = (values: Record<any, any>) => {
    switch (formID) {
      case "SESB000":
        dispatch(updateSolver({ ...values }));
        dispatch(
          modalOff({
            route,
            id: formID,
          })
        );
        break;
      case "SESB002":
        dispatch(updateMaterialProperty({ values, index }));
        break;
      default:
        throw new Error("There's no state handler for the action");
    }
  };

  const deleteHandler = (values: Record<any, any>) => {
    switch (formID) {
      case "SESB002":
        dispatch(deleteMaterialProperty({ values, index }));
        break;
      default:
        throw new Error("There's no delete handler for the current action");
    }
  };

  const initialValues: Record<string, string> = {};
  values.forEach((value: string) => (initialValues[value] = formState[value]));
  //

  return (
    <div className="flex flex-col pl-2" key={`form-container-${formID}`}>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        key={`formik-${formID}`}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-2" key={`form-${formID}`}>
            {components.map((component: Record<any, any>, index: number) => {
              switch (component.type) {
                case "label":
                  return (
                    <React.Fragment key={`react-frag-label-${index}-${formID}`}>
                      {(!component.dependentOn ||
                        component.dependentOn.visibleWhen.includes(
                          values[component.dependentOn.check]
                        )) && (
                        <LabelText
                          name={component.component.name}
                          key={`label-${component.component.name}-${formID}`}
                        />
                      )}
                    </React.Fragment>
                  );
                case "radio":
                  return (
                    <React.Fragment key={`react-frag-radio-${index}-${formID}`}>
                      {(!component.dependentOn ||
                        component.dependentOn.visibleWhen.includes(
                          values[component.dependentOn.check]
                        )) &&
                        component.component.fields.map(
                          ({
                            value,
                            optionName,
                          }: {
                            value: string;
                            optionName: string;
                          }) => (
                            <RadioInput
                              name={component.component.name}
                              optionName={optionName}
                              value={value}
                              key={`radio-${component.component.name}-${value}-${formID}`}
                            />
                          )
                        )}
                    </React.Fragment>
                  );
                case "button":
                  return (
                    <>
                      {type === "form" ? (
                        <div
                          className="flex justify-start gap-2"
                          key={`button-submit-${formID}`}
                        >
                          <IconButton key={`icon-button-submit-${formID}`} />
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-2xl font-extrabold"
                            type="submit"
                          >
                            <AiOutlineCheck />
                          </button>
                          <button
                            className="text-black border-2 rounded-md p-1 border-black text-2xl font-extrabold"
                            type="button"
                            onClick={() => deleteHandler(values)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      )}
                    </>
                  );
                case "value":
                  return (
                    <React.Fragment>
                      {(!component.dependentOn ||
                        component.dependentOn.visibleWhen.includes(
                          values[component.dependentOn.check]
                        )) && (
                        <ValueInput
                          name={component.component.name}
                          label={component.component.label}
                          placeholder={component.component.placeholder}
                          type={null}
                          unit={null}
                        />
                      )}
                    </React.Fragment>
                  );
                case "valueArray":
                  return (
                    <div className="flex gap-2">
                      {(!component.dependentOn ||
                        component.dependentOn.visibleWhen.includes(
                          values[component.dependentOn.check]
                        )) &&
                        component.component.fields.map(
                          ({
                            name,
                            placeholder,
                          }: {
                            name: string;
                            placeholder: string;
                          }) => (
                            <Field
                              name={name}
                              placeholder={placeholder}
                              className="w-1/4 px-2 py-1 rounded-md border-2 border-gray-500"
                            />
                          )
                        )}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </Form>
        )}
      </Formik>
    </div>
  );
}
