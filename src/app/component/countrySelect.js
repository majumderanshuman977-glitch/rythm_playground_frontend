"use client";

import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function CountrySelect() {
  const [value, setValue] = useState(null);
  const options = useMemo(() => countryList().getData(), []); // memoize country data

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <>
      <Select options={options} value={value} placeholder="Select Country" onChange={changeHandler} />
      </>
  );
}