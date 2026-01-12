"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react'
 import { useRouter } from 'next/navigation';

function memberships() {

const [sideMenuOpen, serSideMenuOpen] = useState(false);
 const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [membership, setMembership] = useState([]);
const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          setErrorMsg("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}transactions-history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.log("Failed to fetch transaction history");
          setErrorMsg("Failed to fetch transaction history");
          setLoading(false);
          return;
        }

        const result = await res.json();
        console.log("Transaction History Data:", result);

        if (result.status && result.data) {
          setTransactions(result.data.transactions || []);
          setUser(result.data.user || null);
          setMembership(result.data.membership || []);
        } else {
          setErrorMsg(result.message || "Failed to fetch transactions");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to fetch transaction history");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getDaysLeft = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
};


  return (
    <>
       <section className="account_details_main">
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
                        <li className='active_nav'><Link href={'/memberships'}>Memberships <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                        <li><Link href={'/class-history'}>Class History <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                      </ul>
                    </div>
                    <div className='account_details_logout'>
                        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg> Logout</button>
                    </div>
                  </div>
              </div>
              <div className='account_details_right'>
                  <div className='account_details_right_all'>
                      <h2>Membership</h2>

                      <div className='account_details_right_profilenmimg_main'>
                   <div className='account_details_right_profilenmimg'>
  <div className='userprof_top'>
    <div className='userprof_top_left'>
      
      {/* Profile Image */}
      <div className='profile_img'>
        <img 
          src={user?.profile_image || '../images/profile.png'} 
          alt='Profile' 
        />
      </div>

      {/* User Details */}
      <div className='profile_dtl'>
        <h3>{user?.name || "Unknown User"}</h3>
        <p>{user?.phone || user?.email || "No contact info"}</p>
      </div>

    </div>
  </div>
</div>


<div className='account_details_right_profile_info'>
  <div className='subscription_plan_area'>
    <h3>Subscriptions Plan</h3>

    <div className='subscription_plan_box'>
      {membership.map((plan, index) => (
        <div className='subscription_plan_box_sing' key={index}>
          
          <div className='subscription_plan_box_sing_top'>
            <h2>{plan.title}</h2>
            <h4>
              A${plan.price}
              <span>/credit</span>
            </h4>
          </div>

          <p>{plan.days_left} Days remaining</p>

        </div>
      ))}
    </div>
  </div>
</div>
     


                        <div className='account_details_right_profile_info'>
                            <div className='subscription_plan_area'>
                              <h3>Payment Methods</h3>
                              <div className='subscription_plan_box'>

                                  <div className='subscription_plan_box_sing payment_method_box'>
                                      <div className='subscription_plan_box_sing_top'>
                                          <h2>Visa Card</h2>
                                          <img src='../images/chip2.png' alt='img' />
                                      </div>
                                      <p>Benedict Cumb... 1234**** ****6958</p>
                                      <div className='bottom_exp'>
                                          <h5>Exp 06/05</h5>
                                          <img src='../images/visa2.png' alt='img' />
                                      </div>
                                  </div>

                                  <div className='subscription_plan_box_sing payment_add_button'>
                                      <img src='../images/plus.png' alt='img' />
                                  </div>

                              </div>
                            </div>                         
                        </div>


                        {/* Transaction History  */}
                        {/* <div className="account_details_right_profile_info">
  <div className="class_history_main">
    <h5>Transaction History</h5>

    <div className="class_history_main_all_main">


      <div className="class_history_main_all">
        <div className="class_history_main_single">
          <div className="class_history_main_single_top">
            <h2>Monthly Membership</h2>
            <p>Unlimited access to all fitness classes</p>
          </div>
          <div>
            <h3>Class Credit Remaing: 20</h3>
          </div>

        </div>

        <h6>
          <img src="../images/calendar.png" alt="img" />
          12 Jul, 2025
        </h6>

        <h6 className="transaction_amount success">
          + ₹2,499
        </h6>
      </div>

   
      <div className="class_history_main_all">
        <div className="class_history_main_single">
          <div className="class_history_main_single_top">
            <h2>Yoga Class Pass</h2>
            <p>Single session with certified instructor</p>
          </div>

          <div>
            <h3>Class Credit Remaing: 20</h3>
          </div>
        </div>

        <h6>
          <img src="../images/calendar.png" alt="img" />
          05 Jul, 2025
        </h6>

       
      </div>

  
      <div className="class_history_main_all">
        <div className="class_history_main_single">
          <div className="class_history_main_single_top">
            <h2>Pilates Trial Session</h2>
            <p>One-on-one beginner pilates class</p>
          </div>

          <div>
            <h3>Class Credit Remaing: 20</h3>
          </div>
        </div>

        <h6>
          <img src="../images/calendar.png" alt="img" />
          28 Jun, 2025
        </h6>

        
      </div>

    </div>
  </div>
</div> */}
<div className="account_details_right_profile_info">
  <div className="class_history_main">
    <h5>Transaction History</h5>

    <div className="class_history_main_all_main">
      {transactions.map((item) => {
        const isMembership = item.history_type === "membership_purchase";
        const isClassBooking = item.history_type === "class_booking";

        return (
          <div className="class_history_main_all" key={item.id}>
            <div className="class_history_main_single">
              <div className="class_history_main_single_top">
                <h2>
                  {isMembership
                    ? item.membership?.title
                    : item.class_session?.title}
                </h2>

                <p>
                  {isMembership
                    ? `Membership Purchase (${item.membership?.class_count} Classes)`
                    : "Class Booking"}
                </p>
              </div>

              <div>
                <h3>
                  Total Class Credits: {item.total_class_credits}
                </h3>
              </div>
            </div>

            {/* Date */}
            <h6>
              <img src="../images/calendar.png" alt="img" />
              {item.date}
            </h6>

            {/* Amount (only for membership purchase) */}
            {isMembership && (
              <h6 className="transaction_amount success">
                + A${item.membership?.price}
              </h6>
            )}
          </div>
        );
      })}
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

export default memberships
