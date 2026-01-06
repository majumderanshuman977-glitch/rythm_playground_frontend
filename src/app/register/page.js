"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useAuth } from "@/app/context/authContext";

export default function RegisterPage() {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: {
      day: "",
      month: "",
      year: "",
    },
    town: "",
    state: "",
    pincode: "",
    country: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleBirthdayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      birthday: {
        ...prev.birthday,
        [field]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (!formData.agree) {
      setErrors({ agree: "You must accept terms and conditions" });
      return;
    }

    const dob =
      formData.birthday.year &&
      formData.birthday.month &&
      formData.birthday.day
        ? `${formData.birthday.year}-${String(formData.birthday.month).padStart(2, "0")}-${String(formData.birthday.day).padStart(2, "0")}`
        : null;

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password_hash: formData.password,
      phone: formData.phone,
      town: formData.town,
      state: formData.state,
      zip_code: formData.pincode,
      country: formData.country?.label || "",
      dob,
    };

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setMessage(data.message || "Registration failed");
        return;
      }

      register(data.data.token);
      setMessage("Registration successful 🎉");

    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login_page_main">
      <div className="login_main_inner">
        <div className="login_left_area">
          <img className="log_lft_bg" src="../images/login_grp.png" alt="img" />
          <div className="login_left_area_inn">
            <img src="../images/logo.png" alt="logo" />
            <div className="mid_text">
              <h2>Welcome!!!</h2>
              <p>Register to your account</p>
            </div>
            <div className="regis_btn_area">
              <p>Already registered?</p>
              <Link href={"/login"}>LOGIN NOW!</Link>
            </div>
          </div>
        </div>

        <div className="login_right_area_register">
          <h2>Register Here...</h2>

          {message && (
            <div className={`alert ${Object.keys(errors).length ? "alert-danger" : "alert-success"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="frm_grp">
              <div className="field_wrap">
                <div className={`input_feild ${errors.first_name ? "input_error" : ""}`}>
                  <img src="../images/user.png" alt="img" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </div>
                {errors.first_name && <small className="error">{errors.first_name}</small>}
              </div>

              <div className="field_wrap">
                <div className={`input_feild ${errors.last_name ? "input_error" : ""}`}>
                  <img src="../images/user.png" alt="img" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
                {errors.last_name && <small className="error">{errors.last_name}</small>}
              </div>
            </div>

            {/* Email */}
              <div className="field_wrap">
            <div className={`input_feild ${errors.email ? "input_error" : ""}`}>
              <img src="../images/user.png" alt="img" />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
             
            </div>
             {errors.email && <small className="error">{errors.email}</small>}
            </div>

            {/* Phone */}
            <div className={`input_feild phone_count ${errors.phone ? "input_error" : ""}`}>
              <PhoneInput
                country={"au"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputStyle={{ width: "100%", height: "40px" }}
              />
              {errors.phone && <small className="error">{errors.phone}</small>}
            </div>

            {/* Birthday */}
            <div className="birthday_feild">
              <h4>Birthday</h4>
              <div className="datebirth">
                <select value={formData.birthday.day} onChange={(e) => handleBirthdayChange("day", e.target.value)}>
                  <option value="">Day</option>
                  {days.map((d) => <option key={d}>{d}</option>)}
                </select>

                <select value={formData.birthday.month} onChange={(e) => handleBirthdayChange("month", e.target.value)}>
                  <option value="">Month</option>
                  {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                </select>

                <select value={formData.birthday.year} onChange={(e) => handleBirthdayChange("year", e.target.value)}>
                  <option value="">Year</option>
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* Town / State */}
            <div className="frm_grp">
              <div className={`input_feild ${errors.town ? "input_error" : ""}`}>
                <img src="../images/map.png" alt="img" />
                <input type="text" name="town" placeholder="Town/City" onChange={handleChange} />
                {errors.town && <small className="error">{errors.town}</small>}
              </div>

              <div className={`input_feild ${errors.state ? "input_error" : ""}`}>
                <img src="../images/map.png" alt="img" />
                <input type="text" name="state" placeholder="State" onChange={handleChange} />
                {errors.state && <small className="error">{errors.state}</small>}
              </div>
            </div>

            {/* Pincode + Country */}
            <div className="frm_grp">
              <div className={`input_feild ${errors.zip_code ? "input_error" : ""}`}>
                <img src="../images/map.png" alt="img" />
                <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} />
                {errors.zip_code && <small className="error">{errors.zip_code}</small>}
              </div>

           
                <div className="input_feild">
                  <Select
                    options={countryOptions}
                    value={formData.country}
                    onChange={handleCountryChange}
                  />
                </div>
            </div>

            {/* Password */}
            <div className="frm_grp">
                <div className="field_wrap">
              <div className={`input_feild ${errors.password_hash ? "input_error" : ""}`}>
                <img src="../images/lock2.png" alt="img" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
               
              </div>
               {errors.password_hash && <small className="error">{errors.password_hash}</small>}
              </div>

              <div className="field_wrap">
              <div className={`input_feild ${errors.confirmPassword ? "input_error" : ""}`}>
                <img src="../images/lock2.png" alt="img" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
              </div>
               {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
              </div> 
            </div>

            {/* Checkbox */}
            <div className="checkarea">
              <label>
                <input type="checkbox" name="agree" onChange={handleChange} />
                <span>I agree to all studio, membership and credit terms and conditions.</span>
              </label>
              {errors.agree && <small className="error">{errors.agree}</small>}
            </div>

            <div className="submt_btn">
              <input type="submit" value={loading ? "Registering..." : "Register"} disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}





// "use client";
// import { useState, useMemo } from "react";
// import Link from "next/link";
// import PhoneInput from "react-phone-input-2";
// import Select from "react-select";
// import countryList from "react-select-country-list";
// import { useAuth } from "@/app/context/authContext";

// export default function RegisterPage() {
//   const { register } = useAuth();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     birthday: {
//       day: "",
//       month: "",
//       year: "",
//     },
//     town: "",
//     state: "",
//     pincode: "",
//     country: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   // Generate country list
//   const countryOptions = useMemo(() => countryList().getData(), []);

//   // Country Change
//   const handleCountryChange = (value) => {
//     setFormData((prev) => ({ ...prev, country: value }));
//   };

//   // Phone handler
//   const handlePhoneChange = (value) => {
//     setFormData((prev) => ({ ...prev, phone: value }));
//   };

//   // Birthday handler
//   const handleBirthdayChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       birthday: {
//         ...prev.birthday,
//         [field]: value,
//       },
//     }));
//   };

//   // Input handler
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Dropdown lists
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

//   // Submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const token = "REGISTER_SUCCESS_TOKEN";
//     register(token);

//     console.log("Final Form Data:", formData);
//   };

//   return (
//     <>
//       <section className="login_page_main">
//         <div className="login_main_inner">
//           <div className="login_left_area">
//             <img className="log_lft_bg" src="../images/login_grp.png" alt="img" />
//             <div className="login_left_area_inn">
//               <img src="../images/logo.png" alt="logo" />
//               <div className="mid_text">
//                 <h2>Welcome!!!</h2>
//                 <p>Register to your account</p>
//               </div>
//               <div className="regis_btn_area">
//                 <p>Already registered?</p>
//                 <Link href={"/login"}>LOGIN NOW!</Link>
//               </div>
//             </div>
//           </div>

//           <div className="login_right_area_register">
//             <h2>Register Here...</h2>

//             <form onSubmit={handleSubmit}>
//               {/* Name */}
//               <div className="frm_grp">
//                 <div className="input_feild">
//                   <img src="../images/user.png" alt="img" />
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input_feild">
//                   <img src="../images/user.png" alt="img" />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="input_feild phone_count">
//                 <PhoneInput
//                   country={"au"}
//                   value={formData.phone}
//                   onChange={handlePhoneChange}
//                   inputStyle={{ width: "100%", height: "40px" }}
//                 />
//               </div>


//                {/*Email */ }
//               <div className="input_feild">
//                 <img src="../images/user.png" alt="img" />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Birthday */}
//               <div className="birthday_feild">
//                 <h4>Birthday</h4>

//                 <div className="datebirth">
//                   <select
//                     value={formData.birthday.day}
//                     onChange={(e) => handleBirthdayChange("day", e.target.value)}
//                   >
//                     <option value="">Day</option>
//                     {days.map((d) => (
//                       <option key={d} value={d}>
//                         {d}
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     value={formData.birthday.month}
//                     onChange={(e) => handleBirthdayChange("month", e.target.value)}
//                   >
//                     <option value="">Month</option>
//                     {months.map((m, i) => (
//                       <option key={m} value={i + 1}>
//                         {m}
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     value={formData.birthday.year}
//                     onChange={(e) => handleBirthdayChange("year", e.target.value)}
//                   >
//                     <option value="">Year</option>
//                     {years.map((y) => (
//                       <option key={y} value={y}>
//                         {y}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Town / State */}
//               <div className="frm_grp">
//                 <div className="input_feild">
//                   <img src="../images/map.png" alt="img" />
//                   <input
//                     type="text"
//                     name="town"
//                     placeholder="Town/City"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input_feild">
//                   <img src="../images/map.png" alt="img" />
//                   <input
//                     type="text"
//                     name="state"
//                     placeholder="State"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Pincode + Country */}
//               <div className="frm_grp">
//                 <div className="input_feild">
//                   <img src="../images/map.png" alt="img" />
//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input_feild">
//                   <Select
//                     options={countryOptions}
//                     value={formData.country}
//                     onChange={handleCountryChange}
//                     placeholder="Select Country"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="frm_grp">
//                 <div className="input_feild">
//                   <img src="../images/lock2.png" alt="img" />
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input_feild">
//                   <img src="../images/lock2.png" alt="img" />
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Checkbox */}
//               <div className="checkarea">
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="agree"
//                     onChange={handleChange}
//                   />
//                   <span>
//                     I agree to all studio, membership and credit terms and conditions.
//                   </span>
//                 </label>
//               </div>

//               {/* Submit */}
//               <div className="submt_btn">
//                 <input type="submit" value="Register" />
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
