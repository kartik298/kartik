
export const Multiphysics = ({ id, url }) => {
  // const id = "SESB001";
  // const url = "/simulation-workspace/setup";

  return (
    // need to add stopping criteria, align input boxes
    <div className="flex flex-col pl-4 gap-1">
      {/* <Formik
        initialValues={{
          coOrdinateSystem: solverCurrentState.coordinateSystem,
          type: solverCurrentState.type,
          startTime: solverCurrentState.startTime,
          endTime: solverCurrentState.endtime,
          timeStep: solverCurrentState.timestep,
          stoppingCriteria: solverCurrentState.stoppingCriteria,
          massMatrixType: solverCurrentState.massMatrixType,
        }}
        onSubmit={async (values) => {
          // await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));

          const {
            coOrdinateSystem,
            type,
            startTime,
            endTime,
            timeStep,
            stoppingCriteria,
            massMatrixType,
          } = values;

          dispatch(
            updateSolver({
              coOrdinateSystem,
              type,
              startTime,
              endTime,
              timeStep,
              stoppingCriteria,
              massMatrixType,
            })
          );

          dispatch(
            modalOff({
              route: url,
              id: id,
            })
          );
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex justify-end gap-2">
              <button
                className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-2xl font-extrabold"
                type="submit"
              >
                <AiOutlineCheck />
              </button>
              <button
                className="text-black border-2 rounded-md p-1 border-black text-2xl font-extrabold"
                onClick={closeHandler}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <>
                <span>Co-ordinate System</span>
                <RadioInput
                  name="coOrdinateSystem"
                  value="AXIS"
                  optionName="Axisymmetric"
                />
                <RadioInput
                  name="coOrdinateSystem"
                  value="1d"
                  optionName="1D"
                />
                <RadioInput
                  name="coOrdinateSystem"
                  value="2D"
                  optionName="2D"
                />
                <RadioInput
                  name="coOrdinateSystem"
                  value="3D"
                  optionName="3D"
                />
              </>
              <>
                <span>Type</span>

                <RadioInput
                  name="type"
                  value="transient"
                  optionName="Transient"
                />
                <RadioInput name="type" value="steady" optionName="Steady" />
              </>
              {values.type === "transient" ? (
                <>
                  <>
                    <ValueInput
                      label="Start Time"
                      name="startTime"
                      placeholder=""
                    />
                    <ValueInput
                      label="End Time"
                      name="endTime"
                      placeholder=""
                    />
                    <ValueInput
                      label="Time Step"
                      name="timeStep"
                      placeholder=""
                    />
                    <ValueInput
                      label="Stopping Criteria"
                      name="stoppingCriteria"
                      placeholder=""
                    />
                  </>
                  <>
                    <span>Mass Matrix Type</span>
                    <RadioInput
                      name="massMatrixType"
                      value="lumped"
                      optionName="Lumped Mass Matrix"
                    />
                    <RadioInput
                      name="massMatrixType"
                      value="consistent"
                      optionName="Consistent Mass Matrix"
                    />
                  </>
                </>
              ) : null}
            </div>
          </Form>
        )}
      </Formik> */}
      <div>In progress</div>
    </div>
  );
};
