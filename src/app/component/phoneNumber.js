"use client"; // required for client-side interactivity

import { useState } from "react";
import PhoneInput from "react-phone-input-2";

export default function PhoneField() {
  const [phone, setPhone] = useState("");

  return (
      
      <PhoneInput
        country={"au"} // default country (India)
        value={phone}
        onChange={(value) => setPhone(value)}
        inputStyle={{ width: "100%", height: "40px" }}
      />

  );
}