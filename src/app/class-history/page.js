"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authContext";

function ClassHistory() {
  const { token } = useAuth();

  const [userData, setUserData] = useState(null);
  const [membershipHistory, setMembershipHistory] = useState([]);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const fetchClassHistory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}history`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

        const json = await res.json();
        console.log("History response:", json);
            
        if (!res.ok || !json.status) {
          console.error(json.message || "Failed to fetch class history");
          return;
        }

        if (isMounted && json.data) {
          setUserData(json.data.user);
          setMembershipHistory(Array.isArray(json.data.booking_history) ? json.data.booking_history : []);
        }
      } catch (err) {
        console.error("Class history error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchClassHistory();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <section className='account_details_main'>
          <img className={sideMenuOpen ? "prof_lft_bg active_sidemenu" : "prof_lft_bg"} src='../images/dashboard_grp.png' alt='img' />
          <div className='account_details_inner'>
            <div className={sideMenuOpen ? "side_menu active_sidemenu" : "side_menu"} onClick={() => setSideMenuOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z"></path>
              </svg>
            </div>
            
            <div className={sideMenuOpen ? "account_details_left active_sidemenu" : "account_details_left"}>
              <div className={sideMenuOpen ? "side_menu_inn active_sidemenu" : "side_menu_inn"} onClick={() => setSideMenuOpen(false)}>
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
                    <li><Link href={'/account-details'}>Account Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                    <li><Link href={'/memberships'}>Memberships <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                    <li className='active_nav'><Link href={'/class-history'}>Class History <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                  </ul>
                </div>
                <div className='account_details_logout'>
                  <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg> Logout</button>
                </div>
              </div>
            </div>
            
            <div className='account_details_right'>
              <div className='account_details_right_all'>
                <h2>Class History</h2>
                <div className='account_details_right_profilenmimg'>
                  <div className='userprof_top'>
                    <div className='userprof_top_left'>
                      <div className='profile_img'>
                     <img
  src={userData?.profile_image || "../images/profile.png"}
  alt="profile"
/>

                      </div>
                      <div className='profile_dtl'>
                        <h3>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</h3>
                        <p>{userData?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className='account_details_right_profile_info'>
                  <div className='class_history_main'>
                    <h5>Class History</h5>
                    <div className='class_history_main_all_main'>
                      {loading ? (
                        <p>Loading class history...</p>
                      ) : membershipHistory.length > 0 ? (
                        membershipHistory.map((history) => (
                          <div className='class_history_main_all' key={history.id}>
                            <div className='class_history_main_single'>
                              <div className='class_history_main_single_top'>
                                <h2>{history.class_title} </h2>
                                <p>{history.class_description}</p>
                              </div>
                              <div className=''>
                                <h3>Instructor: {history.class_instructor}</h3>
                              </div>
                            </div>
                            <h6>
                              <img src='../images/calendar.png' alt='img' /> 
                              {formatDate(history.booking_date)}
                            </h6>
                          </div>
                        ))
                      ) : (
                        <p>No class history found.</p>
                      )}
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

export default ClassHistory;