import { useEffect, useState } from "react";

export function useAccordionSwitches(length: number) {
  const [accordionStates, setAccordionStates] = useState<Array<boolean>>(() =>
    new Array(length).fill(false)
  );

  const accordionSwitchHandler = (index: number) =>
    setAccordionStates((prev) =>
      prev.map((ele, idx) => (idx === index ? !ele : ele))
    );

  useEffect(() => {
    setAccordionStates(new Array(length).fill(false));
  }, [length]);

  return { accordionStates, accordionSwitchHandler };
}
