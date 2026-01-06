"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";

function login() {

  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      // 🔴 Validation / Auth error
      if (!res.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message });
        }
        return;
      }

      // ✅ Success: store token + user globally
      login(result.data.token, result.data.user);

      router.push("/");

    } catch (err) {
      console.error(err);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <section className='login_page_main'>
        <div className='login_main_inner'>
          
          <div className='login_left_area'>
            <img className='log_lft_bg' src='../images/login_grp.png' alt='img' />
            <div className='login_left_area_inn'>
              <img src='../images/logo.png' alt='logo' />
              <div className='mid_text'>
                <h2>Welcome <span>Back</span></h2>
                <p>Login to your account</p>
              </div>
              <div className='regis_btn_area'>
                <p>Not yet registered?</p>
                <Link href={'/register'}>REGISTER NOW!</Link>
              </div>
            </div>
          </div>

          <div className='login_right_area'>
            <h2>Login Here...</h2>

            {/* 🔴 General error */}
            {errors.general && (
              <p className="error">{errors.general}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className='input_feild'>
                <img src='../images/user.png' alt='img' />
                <input 
                  type='email'
                  name='email' 
                  placeholder='Enter email address'
                  onChange={handleChange} 
                />
              </div>

              {/* 🔴 Email error */}
              {errors.email && (
                <p className="error">{errors.email}</p>
              )}

              <div className='input_feild'>
                <img src='../images/lock2.png' alt='img' />
                <input 
                  type='password'
                  name="password" 
                  placeholder='Password'
                  onChange={handleChange} 
                />
              </div>

              {/* 🔴 Password error */}
              {errors.password && (
                <p className="error">{errors.password}</p>
              )}

              <div className='submt_btn'>
                <input type='submit' value="login" />
              </div>

              <div className='forgot_passw'>
                <Link href={''}>Forgotten your password?</Link>
              </div>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}

export default login;


// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/authContext";

// function Login() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     // clear error while typing
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (!result.status) {
//         // validation or auth errors
//         if (result.errors) {
//           setErrors(result.errors);
//         }
//         setErrorMsg(result.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ SUCCESS
//       const { token, user } = result.data;

//       // save via auth context
//       login(token, user);

//       router.replace("/account-details");
//     } catch (error) {
//       setErrorMsg("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="login_page_main">
//       <div className="login_main_inner">
//         {/* LEFT SIDE */}
//         <div className="login_left_area">
//           <img className="log_lft_bg" src="/images/login_grp.png" alt="img" />
//           <div className="login_left_area_inn">
//             <img src="/images/logo.png" alt="logo" />
//             <div className="mid_text">
//               <h2>
//                 Welcome <span>Back</span>
//               </h2>
//               <p>Login to your account</p>
//             </div>
//             <div className="regis_btn_area">
//               <p>Not yet registered?</p>
//               <Link href="/register">REGISTER NOW!</Link>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="login_right_area">
//           <h2>Login Here...</h2>

          

//           <form onSubmit={handleSubmit}>
//             {/* EMAIL */}
//             <div className="input_feild">
//               <img src="/images/user.png" alt="img" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             {errors.email && <small className="error-text">{errors.email}</small>}
            
     
//             {/* PASSWORD */}
//             <div className="input_feild">
//               <img src="/images/lock2.png" alt="img" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             {errors.password && (
//               <small className="error-text">{errors.password}</small>
//             )}



//                    {errorMsg && <p className="error-msg">{errorMsg}</p>}

//             <div className="submt_btn">
//               <input
//                 type="submit"
//                 value={loading ? "Logging in..." : "Login"}
//                 disabled={loading}
//               />
//             </div>

//             <div className="forgot_passw">
//               <Link href="#">Forgotten your password?</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;
