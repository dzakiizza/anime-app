import { CollectionList } from "@/context/app-provider";
import React from "react";

export const useFormCollection = (collection: CollectionList[], value = "") => {
  const [val, setVal] = React.useState(value);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, [value]);

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
