"use client"; // required for client-side interactivity

import { useState } from "react";

export default function BirthdaySelector() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Generate options dynamically
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // last 100 years

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Birthday: ${day} ${months[month - 1]} ${year}`);
  // };

  return (
    <>
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Month</option>
        {months.map((m, i) => (
          <option key={m} value={i + 1}>
            {m}
          </option>
        ))}
      </select>

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

    </>
  );
}
