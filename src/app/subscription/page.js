// payment new
"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

 
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Subscription() {
  const [memberships, setMemberships] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const router = useRouter();
  const { token } = useAuth();

  // 🔹 Fetch memberships
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}memberships`);
        const json = await res.json();
        setMemberships(Array.isArray(json.data) ? json.data : []);
      } catch (err) {

        toast.error("Can't fetch the membership list");
      }
    };

    fetchMemberships();
  }, []);

const searchParams = useSearchParams();
const sessionId = searchParams.get("session_id");
  useEffect(() => {
  if (!sessionId || !token) return;

  const verifyPayment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}stripe/verify-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.status) {
     
        toast.error("Payment verification failed");
        return;
      }

  
      toast.success("Payment successful! Membership activated");

      // Optional: clean URL
      router.replace("/subscription");

    } catch (err) {
      console.log("Verification error:", err);
   
      toast.error("Something went wrong during verification");
    }
  };

  verifyPayment();
}, [sessionId, token]);

  // 🔹 GSAP animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".subscription_single", {
        onEnter: batch => {
          gsap.fromTo(
            batch,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.25, duration: 1.2 }
          );
        },
        start: "top 90%",
      });
    });

    return () => ctx.revert();
  }, [memberships]);


  const handleBuy = async (membershipId) => {
    if (!token) {
      router.push("/login");
      return;
    }

     try {
      setLoadingId(membershipId);

     
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}stripe/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ membership_id: membershipId }),
        }
      );

         const data = await res.json();

     if (!data.data.checkoutUrl) {
      toast.error("Failed to redirect to payment");
      return;
    }

    window.location.href = data.data.checkoutUrl;

     
        setLoadingId(null);
      

    } catch (err) {
      console.error(err);
      toast.error("Failed to redirect to payment");
      setLoadingId(null);
    }
  };

  return (
    <section className="subscription_main_page_area">
      <div className="subscription_main_page_inner">
        <div className="subscription_heading">
          <h2>Subscription</h2>
          <p>Rides Packages Pricing Table</p>
        </div>

        <div className="subscription_main_slider">
          {memberships.map((item) => (
            <div className="subscription_single" key={item.id}>
              <div className="subscription_single_left">
                <h4>
                  {item.title} <span>Credits</span>
                </h4>
              </div>

              <div className="subscription_single_right">
                <div className="subscrip_price">
                  <h3>
                    <span>$</span>
                    {item.price}
                  </h3>
                </div>

                <div className="subscrip_body">
                  <ul>
                    <li>
                      <img src="/images/rarw.png" alt="" />
                      {item.class_count} Class
                      {item.class_count > 1 ? "es" : ""}
                    </li>

                    {Array.isArray(item.description) &&
                      item.description.map((desc, idx) => (
                        <li key={idx}>
                          <img src="/images/rarw.png" alt="" /> {desc}
                        </li>
                      ))}
                  </ul>

                  <div className="subscrip_btn">
                    <button
                      disabled={loadingId === item.id}
                      onClick={() => handleBuy(item.id)}
                    >
                      {loadingId === item.id ? "BUYING..." : "BUY NOW"}
                      <span>
                        <img src="/images/rarw.png" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!memberships.length && <p>No memberships available</p>}
        </div>
      </div>
    </section>
  );
}

export default Subscription;

// payment new
// dynamic new one 
// "use client";
// import { useEffect, useLayoutEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/authContext";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { loadStripe } from "@stripe/stripe-js";
// gsap.registerPlugin(ScrollTrigger);

// function Subscription() {
//   const [memberships, setMemberships] = useState([]);
//   const router = useRouter();
//   const {token } = useAuth(); 


//   const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

//   useEffect(() => {
//     const fetchMemberships = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/memberships");
//         const json = await res.json();

//         const list = Array.isArray(json.data) ? json.data : [];
//         setMemberships(list);
//       } catch (err) {
//         console.error("Error fetching memberships:", err);
//       }
//     };

//     fetchMemberships();
//   }, []);

//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
//       ScrollTrigger.batch(".subscription_single", {
//         onEnter: batch => {
//           gsap.fromTo(
//             batch,
//             { y: 100, opacity: 0 },
//             { y: 0, opacity: 1, stagger: 0.25, duration: 1.2 }
//           );
//         },
//         start: "top 90%",
//       });
//     });

//     return () => ctx.revert();
//   }, [memberships]);

//   // 🔥 BUY HANDLER
//   const handleBuy = async (membershipId) => {

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     try {
//       const res = await fetch(
//         "http://localhost:5000/api/user-memberships",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ membership_id: membershipId }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok || !data.status) {
//         alert(data.message || "Purchase failed");
//         return;
//       }

//       alert("Membership purchased successfully ");
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <section className="subscription_main_page_area">
//       <div className="subscription_main_page_inner">
//         <div className="subscription_heading">
//           <h2>Subscription</h2>
//           <p>Rides Packages Pricing Table</p>
//         </div>

//         <div className="subscription_main_slider">
//           {memberships.map((item) => (
//             <div className="subscription_single" key={item.id}>
//               <div className="subscription_single_left">
//                 <h4>{item.title} <span>Credits</span></h4>
//               </div>

//               <div className="subscription_single_right">
//                 <div className="subscrip_price">
//                   <h3><span>$</span>{item.price}</h3>
//                 </div>

//                 <div className="subscrip_body">
//                   <ul>
//                     <li>
//                       <img src="/images/rarw.png" alt="" />
//                       {item.class_count} Class{item.class_count > 1 ? "es" : ""}
//                     </li>

//                     {Array.isArray(item.description) &&
//                       item.description.map((desc, idx) => (
//                         <li key={idx}>
//                           <img src="/images/rarw.png" alt="" /> {desc}
//                         </li>
//                       ))}
//                   </ul>

//                   <div className="subscrip_btn">
//                     <button onClick={() => handleBuy(item.id)}>
//                       BUY NOW <span><img src="/images/rarw.png" alt="" /></span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Subscription;

// dynamic new one 

// "use client";
// import { useEffect, useLayoutEffect,useState } from 'react'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { usePathname } from "next/navigation";

// gsap.registerPlugin(ScrollTrigger);


// function Subscription() {
//  const [memberships, setMemberships] = useState([]);
// const pathname = usePathname();
//    useEffect(() => {
//      const fetchMemberships = async () => {
//        try {
//          const res = await fetch("http://localhost:5000/api/memberships");
//          const json = await res.json();
  
//           const list = Array.isArray(json.data)
//             ? json.data
//             : Array.isArray(json.upcomTraing)
//             ? json.upcomTraing
//             : Array.isArray(json)
//             ? json
//             : [];
  
//           setMemberships(list);
//        } catch (err) {
//          console.error("Error fetching memberships:", err);
//        }
//      };
   
//      fetchMemberships();
//    }, []); 
//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {

//       // Batch animation for subscription cards
//       ScrollTrigger.batch(".subscription_single", {
//         onEnter: batch => {
//           gsap.fromTo(
//             batch,
//             { y: 100, opacity: 0 },
//             { y: 0, opacity: 1, stagger: 0.25, duration: 1.2, ease: "power3.out" }
//           );
//         },
//         start: "top 90%",
//         end: "bottom 30%",
//         toggleActions: "play reverse play reverse",
//       });

//     });

//     return () => {
//       // Cleanup GSAP animations & ScrollTriggers
//       ctx.revert();
//       ScrollTrigger.refresh();
//     };
//   }, [memberships]);


//   return (
//     <>
//        <section className='subscription_main_page_area'>
//             <div className='subscription_main_page_inner'>
//                 <div className='subscription_heading'>
//                     <h2>Subscription</h2>
//                     <p>Rides Packages Pricing Table</p>
//                 </div>
//                 {/* <div className='subscription_main_slider'>
//                     <div className='subscription_single'>
//                         <div className='subscription_single_left'>
//                           <h4>Single <span>Class</span></h4>
//                         </div>
//                         <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>36</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> 1 Class</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> $36 per class cost</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Valid to book ride + reformfit</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Cannot be shared</li>
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>
//                     </div>

//                     <div className='subscription_single'>
//                         <div className='subscription_single_left'>
//                           <h4>5 Class <span>Credits</span></h4>
//                         </div>
//                         <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>150</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> 5 Class</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> $30 per class cost</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Valid to book ride + reformfit</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Cannot be shared</li>
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>
//                     </div>

//                     <div className='subscription_single'>
//                         <div className='subscription_single_left'>
//                           <h4>10 Class <span>Credits</span></h4>
//                         </div>
//                         <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>260</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> 10 Class</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> $26 per class cost</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Valid to book ride + reformfit</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Cannot be shared</li>
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>
//                     </div>

//                     <div className='subscription_single'>
//                         <div className='subscription_single_left'>
//                           <h4>15 Class <span>Credits</span></h4>
//                         </div>
//                         <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>320</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> 20 Class</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> $23 per class cost</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Valid to book ride + reformfit</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Cannot be shared</li>
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>
//                     </div>


//                     <div className='subscription_single'>
//                         <div className='subscription_single_left'>
//                           <h4>20 Class <span>Credits</span></h4>
//                         </div>
//                         <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>400</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> 20 Class</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> $23 per class cost</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Valid to book ride + reformfit</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Cannot be shared</li>
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>
//                     </div>


//                     <div className='subscription_single'>
//                         <div className='subscription_single_left'>
//                           <h4>30 Class <span>Credits</span></h4>
//                         </div>
//                         <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>500</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> 20 Class</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> $23 per class cost</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Valid to book ride + reformfit</li>
//                                 <li><img src="/images/rarw.png" alt="icon" /> Cannot be shared</li>
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>
//                     </div>




//                 </div> */}

//                  <div className="subscription_main_slider">

   

//      {memberships.map(item => (


//      <div className='subscription_single' key={item.id}>
//       <div className='subscription_single_left'>
//          <h4>{item.title} <span>Credits</span></h4>
//       </div>
//       <div className='subscription_single_right'>
//                            <div className='subscrip_price'>
//                               <h3><span>$</span>{item.price}</h3>
//                            </div>
//                            <div className='subscrip_body'>
//                               <ul>
//                                 <li><img src="/images/rarw.png" alt="icon" /> {item.class_count} Class{item.class_count > 1 ? "es" : ""}</li>
//                                 {item.description.map((desc, idx) => (
//                                   <li key={idx}><img src="/images/rarw.png" alt="icon" /> {desc}</li>
//                                 ))}
//                               </ul>
//                               <div className='subscrip_btn'> 
//                                 <button>BUY NOW <span><img src="/images/rarw.png" alt="icon" /></span></button>
//                               </div>
//                            </div>
//                         </div>

//      </div>
//   ))}
//     </div>
//             </div>
//        </section>
//     </>
//   )
// }

// export default Subscription;
