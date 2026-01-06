"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/authContext"

function accountDetails() {

  const { logout } = useAuth();
  const router = useRouter();

  const [sideMenuOpen, serSideMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 🔹 Fetch profile on load
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }


      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.data);
          setUser(data.data);
        } else {
          sessionStorage.removeItem("token");
          router.replace("/login");
        }
      })
      .catch(() => {
        sessionStorage.removeItem("token");
        router.replace("/login");
      });
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    logout();
    router.replace("/login");
  };

  return (
    <>
      <section className='account_details_main'>
        <img
          className={sideMenuOpen ? "prof_lft_bg active_sidemenu" : "prof_lft_bg"}
          src='../images/dashboard_grp.png'
          alt='img'
        />

        <div className='account_details_inner'>
          <div
            className={sideMenuOpen ? "side_menu active_sidemenu" : "side_menu"}
            onClick={() => serSideMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z"></path>
            </svg>
          </div>

          <div className={sideMenuOpen ? "account_details_left active_sidemenu" : "account_details_left"}>
            <div
              className={sideMenuOpen ? "side_menu_inn active_sidemenu" : "side_menu_inn"}
              onClick={() => serSideMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </div>

            <div className='account_details_left_inner'>
              <div className='account_details_logo'>
                <img src='../images/logo.png' alt='logo' />
              </div>

              <div className='account_details_nav'>
                <ul>
                  <li className='active_nav'><Link href={'/account-details'}>Account Details</Link></li>
                  <li><Link href={'/memberships'}>Memberships</Link></li>
                  <li><Link href={'/class-history'}>Class History</Link></li>
                </ul>
              </div>

              <div className='account_details_logout'>
                <button onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
                  </svg> Logout
                </button>
              </div>
            </div>
          </div>

          <div className='account_details_right'>
            <div className='account_details_right_all'>
              <h2>Account Details</h2>

              <div className='account_details_right_profilenmimg'>
                <div className='userprof_top'>
                  <div className='userprof_top_left'>
                    <div className='profile_img'>
                      <img
                        src={user?.profile_image || "../images/profile.png"}
                        alt='img'
                      />
                    </div>
                    <div className='profile_dtl'>
                      <h3>{user ? `${user.first_name} ${user.last_name}` : "—"}</h3>
                      <p>{user?.phone || "—"}</p>
                    </div>
                  </div>

                  <div className='userprof_top_right'>
                    <Link href={'/edit-profile'}><img src='../images/edit.png' alt='img' /> Edit Profile</Link>
                  </div>
                </div>
              </div>

              <div className='account_details_right_profile_info'>
                <div className='account_details_right_profile_info_emlphon_sing'>
                  <p><img src='../images/sign.png' alt='logo' /> {user?.email || "—"}</p>
                  <p><img src='../images/call.png' alt='logo' />+ {user?.phone || "—"}</p>
                </div>

                <div className='date_address_profile'>
                  <div className='date_address_profile_sing'>
                    <h4><img src='../images/calendar.png' alt='logo' /> Birthday</h4>
                    <p>{user?.dob || "—"}</p>
                  </div>

                  <div className='date_address_profile_sing'>
                    <h4><img src='../images/location.png' alt='logo' /> Address</h4>
                    <p>
                      {user
                        ? `${user.city}, ${user.state}, ${user.zip_code}, ${user.country}`
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className='password_detl_area'>
                  <div className='detl_sing_password'>
                    <p>Password</p>
                    <div className='detl_sing_pass_box'>
                      <img src='../images/lock2.png' alt='img' />
                      <input type='password' placeholder='**********' disabled />
                    </div>
                  </div>

                  <div className='detl_sing_password'>
                    <p>Confirm Password</p>
                    <div className='detl_sing_pass_box'>
                      <img src='../images/lock2.png' alt='img' />
                      <input type='password' placeholder='**********' disabled />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default accountDetails;


// "use client";
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/app/context/authContext"

// function accountDetails() {

// const { logout } = useAuth();

// const [sideMenuOpen, serSideMenuOpen] = useState(false);

// const router = useRouter();
// const [token, setToken] = useState();


// // Load token on mount
//   // useEffect(() => {
//   //   const t = localStorage.getItem("token");
//   //   setToken(t);
//   // }, []);

// //     useEffect(() => {
// //       const token = localStorage.getItem("token");
  
// //       // If already logged in → redirect to home/dashboard
// //       if (token === null) {
// //         router.replace("/login"); 
// //       }
// //     }, []);

// // const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     setToken(null); // rerender UI
// //   };

//   return (
//     <>
//       <section className='account_details_main'>
//           <img className={sideMenuOpen === true ? "prof_lft_bg active_sidemenu" : "prof_lft_bg"} src='../images/dashboard_grp.png' alt='img' />
//           <div className='account_details_inner'>
//             <div className={sideMenuOpen === true ? "side_menu active_sidemenu" : "side_menu"} onClick={() => serSideMenuOpen(true)}><svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z"></path>
//                   </svg></div>
//               <div className={sideMenuOpen === true ? "account_details_left active_sidemenu" : "account_details_left"}>
//                 <div className={sideMenuOpen === true ? "side_menu_inn active_sidemenu" : "side_menu_inn"} onClick={() => serSideMenuOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></div>
//                   <div className='account_details_left_inner'>
                    
//                     <div className='account_details_logo'>
//                       <img src='../images/logo.png' alt='logo' />
//                     </div>
//                     <div className='account_details_nav'>
//                       <ul>
//                         <li className='active_nav'><Link href={'/account-details'}>Account Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
//                         <li><Link href={'/memberships'}>Memberships <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
//                         <li><Link href={'/class-history'}>Class History <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
//                       </ul>
//                     </div>
//                     <div className='account_details_logout'>
//                         <button onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg> Logout</button>
//                     </div>
//                   </div>
//               </div>
//               <div className='account_details_right'>
//                   <div className='account_details_right_all'>
//                       <h2>Account Details</h2>
//                       <div className='account_details_right_profilenmimg'>
//                           <div className='userprof_top'>
//                               <div className='userprof_top_left'>
//                                   <div className='profile_img'>
//                                     <img src='../images/profile.png' alt='img' />
//                                   </div>
//                                   <div className='profile_dtl'>
//                                      <h3>Rahul Sharma</h3>
//                                      <p>+91 2536 5957 20</p>
//                                   </div>
//                               </div>
//                               <div className='userprof_top_right'>
//                                  <Link href={''}><img src='../images/edit.png' alt='img' /> Edit Profile</Link>
//                               </div>
//                           </div>
//                       </div>
//                       <div className='account_details_right_profile_info'>
//                           <div className='account_details_right_profile_info_emlphon'>
//                               <div className='account_details_right_profile_info_emlphon_sing'>
//                                 <p><img src='../images/sign.png' alt='logo' /> demomail@mail.com</p>
//                                 <p><img src='../images/call.png' alt='logo' /> +91 254869605</p>
//                               </div>
//                           </div>
//                           <div className='date_address_profile'>
//                               <div className='date_address_profile_sing'>
//                                   <h4><img src='../images/calendar.png' alt='logo' /> Birthday</h4>
//                                   <p>25 Apr, 2025</p>
//                               </div>
//                               <div className='date_address_profile_sing'>
//                                   <h4><img src='../images/location.png' alt='logo' /> Address</h4>
//                                   <p>Kolkata, West Bengal, 700091, India</p>
//                               </div>
//                           </div>
//                           <div className='password_detl_area'>

//                             <div className='detl_sing_password'>
//                               <p>Password</p>
//                               <div className='detl_sing_pass_box'>
//                                 <img src='../images/lock2.png' alt='img' />
//                                 <input type='password' placeholder='**********' />
//                               </div>
//                             </div>
//                             <div className='detl_sing_password'>
//                               <p>Confirm Password</p>
//                               <div className='detl_sing_pass_box'>
//                                 <img src='../images/lock2.png' alt='img' />
//                                 <input type='password' placeholder='**********' />
//                               </div>
//                             </div>

//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </section>
//     </>
//   )
// }

// export default accountDetails
