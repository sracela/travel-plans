import { useState } from "react";

export const useField = (type, defaultValue) => {
  const [value, setValue] = useState(defaultValue || "");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    reset,
    onChange,
  };
};

// // modules can have several named exports
// export const useAnotherHook = () => {
//   // ...
// };
