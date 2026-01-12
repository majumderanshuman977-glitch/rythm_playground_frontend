"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function ClassHistory() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const [user, setUser] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  const labelRef = useRef(null);
  const tabsRef = useRef([]);

  /* ---------- FORMAT DATE ---------- */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  /* ---------- FETCH DATA ---------- */
  const fetchHistory = async (type) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}history?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    const json = await res.json();
    return json.data;
  };

  useEffect(() => {
    (async () => {
      const upcomingData = await fetchHistory("upcoming");
      const completedData = await fetchHistory("completed");

      setUser(upcomingData.user);
      setUpcoming(upcomingData.classes);
      setCompleted(completedData.classes);
    })();
  }, []);

  /* ---------- TAB ANIMATION ---------- */
  useEffect(() => {
    const label = labelRef.current;
    const activeEl = tabsRef.current[activeTab - 1];
    if (!label || !activeEl) return;

    const rect = activeEl.getBoundingClientRect();
    const parentRect = activeEl.parentElement.getBoundingClientRect();

    gsap.to(label, {
      x: rect.left - parentRect.left,
      width: rect.width,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [activeTab]);

  return (
    <>
      <section className='account_details_main'>
          <img className={sideMenuOpen === true ? "prof_lft_bg active_sidemenu" : "prof_lft_bg"} src='../images/dashboard_grp.png' alt='img' />
          <div className='account_details_inner'>
            <div className={sideMenuOpen === true ? "side_menu active_sidemenu" : "side_menu"} onClick={() => serSideMenuOpen(true)}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z"></path>
                  </svg></div>
              <div className={sideMenuOpen === true ? "account_details_left active_sidemenu" : "account_details_left"}>
                <div className={sideMenuOpen === true ? "side_menu_inn active_sidemenu" : "side_menu_inn"} onClick={() => serSideMenuOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></div>
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
                                     {user && user.profile_image ? (
                                      <img src={user.profile_image} alt='img' />
                                     ) : (
                                      <img src='../images/profile.png' alt='img' />
                                     )}
                                  </div>
                                  <div className='profile_dtl'>
                                     <h3>{user ? user.first_name : 'Loading...'} {user ? user.last_name : 'Loading...'}</h3>
                                     <p>{user ? user.phone : 'Loading...'}</p>
                                  </div>
                                </div>
                              

                              
                          </div>
                      </div>
                      <div className='account_details_right_profile_info'>
                          <div className='class_history_main'>
                            <h5>Class History</h5>

                            <ul className="tabs-block">

                                <li
                                ref={(el) => (tabsRef.current[0] = el)}
                                className={activeTab === 1 ? "active" : ""}
                                onClick={() => setActiveTab(1)}
                                >
                                Current Classes
                                </li>

                                <li
                                ref={(el) => (tabsRef.current[1] = el)}
                                className={activeTab === 2 ? "active" : ""}
                                onClick={() => setActiveTab(2)}
                                >
                                Completed Classes
                                </li>
                            </ul>
                            <div className='class_history_main_all_main'>
                            {/* <div className="article-block">
                                {activeTab === 1 && (
                                <div className="article show">
                                    <div className='class_history_main_all'>
                                    <div className='class_history_main_single'>
                                        <div className='class_history_main_single_top'>
                                            <h2>5 Class Credits</h2>
                                            <h4>Sanjit Sen</h4>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text</p>
                                        </div>
                                        <div className='gmeet_icon'>
                                            <Link href={''}><img src={'../images/meet.png'} /></Link>
                                        </div>
                                    </div>
                                    <h6><img src='../images/calendar.png' alt='img' /> 12 Jul, 2025</h6>
                                </div>
                                <div className='class_history_main_all'>
                                    <div className='class_history_main_single'>
                                        <div className='class_history_main_single_top'>
                                            <h2>10 Class Credits</h2>
                                            <h4>Ahil Khan</h4>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text</p>
                                        </div>
                                        <div className='gmeet_icon'>
                                            <Link href={''}><img src={'../images/meet.png'} /></Link>
                                        </div>
                                    </div>
                                    <h6><img src='../images/calendar.png' alt='img' /> 12 Jul, 2025</h6>
                                </div>


                                </div>
                                )}

                                {activeTab === 2 && (
                                <div className="article show">
                                    <div className='class_history_main_all'>
                                    <div className='class_history_main_single'>
                                        <div className='class_history_main_single_top'>
                                            <h2>5 Class Credits</h2>
                                            <h4>Akira Khan</h4>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text</p>
                                        </div>
                                        <div className=''>
                                            <h3>$32/<span>month</span></h3>
                                        </div>
                                    </div>
                                    <h6><img src='../images/calendar.png' alt='img' /> 12 Jul, 2025</h6>
                                </div>
                                <div className='class_history_main_all'>
                                    <div className='class_history_main_single'>
                                        <div className='class_history_main_single_top'>
                                            <h2>10 Class Credits</h2>
                                            <h4>Mohon Pandey</h4>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text</p>
                                        </div>
                                        <div className=''>
                                            <h3>$132/<span>month</span></h3>
                                        </div>
                                    </div>
                                    <h6><img src='../images/calendar.png' alt='img' /> 12 Jul, 2025</h6>
                                </div>
                                <div className='class_history_main_all'>
                                    <div className='class_history_main_single'>
                                        <div className='class_history_main_single_top'>
                                            <h2>20 Class Credits</h2>
                                            <h4>Rahul Sharma</h4>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text</p>
                                        </div>
                                        <div className=''>
                                            <h3>$200/<span>month</span></h3>
                                        </div>
                                    </div>
                                    <h6><img src='../images/calendar.png' alt='img' /> 12 Jul, 2025</h6>
                                </div>
                                <div className='class_history_main_all'>
                                    <div className='class_history_main_single'>
                                        <div className='class_history_main_single_top'>
                                            <h2>30 Class Credits</h2>
                                            <h4>Sonali Sharma</h4>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text</p>
                                        </div>
                                        <div className=''>
                                            <h3>$360/<span>month</span></h3>
                                        </div>
                                    </div>
                                    <h6><img src='../images/calendar.png' alt='img' /> 12 Jul, 2025</h6>
                                </div>
                                </div>
                                )}
                            </div> */}
                            <div className="article-block">

  {/* -------- UPCOMING CLASSES -------- */}
  {activeTab === 1 && (
    <div className="article show">
      {upcoming.length === 0 && <p>No upcoming classes</p>}

      {upcoming.map((cls) => (
        <div key={cls.class_id} className="class_history_main_all">
          <div className="class_history_main_single">
            <div className="class_history_main_single_top">
              <h2>{cls.title}</h2>

              <h4>
                {cls.instructor.first_name} {cls.instructor.last_name}
              </h4>

              <p>{cls.description}</p>
            </div>

            {cls.can_join && cls.meeting_link && (
              <div className="gmeet_icon">
                <Link href={cls.meeting_link} target="_blank">
                  <img src="../images/meet.png" alt="meet" />
                </Link>
              </div>
            )}
          </div>

          <h6>
            <img src="../images/calendar.png" alt="calendar" />{" "}
            {formatDate(cls.class_date)}
          </h6>
        </div>
      ))}
    </div>
  )}

  {/* -------- COMPLETED CLASSES -------- */}
  {activeTab === 2 && (
    <div className="article show">
      {completed.length === 0 && <p>No completed classes</p>}

      {completed.map((cls) => (
        <div key={cls.class_id} className="class_history_main_all">
          <div className="class_history_main_single">
            <div className="class_history_main_single_top">
              <h2>{cls.title}</h2>

              <h4>
                {cls.instructor.first_name} {cls.instructor.last_name}
              </h4>

              <p>{cls.description}</p>
            </div>
          </div>

          <h6>
            <img src="../images/calendar.png" alt="calendar" />{" "}
            {formatDate(cls.class_date)}
          </h6>
        </div>
      ))}
    </div>
  )}

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

export default ClassHistory




