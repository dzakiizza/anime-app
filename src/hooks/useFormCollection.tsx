import React from "react";

export const useFormCollection = (collection: any[]) => {
  const [val, setVal] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    if (collection.find((item) => item.name === val) || regex.test(val)) {
      setError(
        "The collection name must be unique and not containing special char"
      );
    } else {
      setError("");
    }
  }, [val, collection]);

  return {
    val,
    setVal,
    error,
    setError,
  };
};
