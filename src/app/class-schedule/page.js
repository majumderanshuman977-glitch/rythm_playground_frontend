// "use client";
// import Link from 'next/link';
// import { useEffect, useLayoutEffect, useState, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { usePathname } from "next/navigation";


// gsap.registerPlugin(ScrollTrigger);

// function Page() {
//   const pathname = usePathname();
//   const scrollRef = useRef(null);
  
//   const [dates, setDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [classSchedules, setClassSchedules] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Generate next 12 dates from today
//   useEffect(() => {
//     const generateDates = () => {
//       const today = new Date();
//       const dateArray = [];
      
//       for (let i = 0; i < 12; i++) {
//         const date = new Date(today);
//         date.setDate(today.getDate() + i);
        
//         const dayNum = date.getDate();
//         const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
//         const monthName = date.toLocaleDateString('en-US', { month: 'short' });
//         const apiDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        
//         dateArray.push({
//           id: `date-${i}`,
//           dayNum,
//           dayName,
//           monthName,
//           apiDate,
//           displayDate: `${dayNum < 10 ? '0' + dayNum : dayNum}`
//         });
//       }
      
//       setDates(dateArray);
  
//       if (dateArray.length > 0) {
//         setSelectedDate(dateArray[0].apiDate);
//       }
//     };
    
//     generateDates();
//   }, []);

//  useEffect(() => {
//   if (!selectedDate) return;

//   const fetchSchedules = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/class-schedules?date=${selectedDate}`,
//         {
//           method: "GET",

//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.status && result.data) {
//         setClassSchedules(result.data);
//       } else {
//         setClassSchedules([]);
//       }
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//       setClassSchedules([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchSchedules();
// }, [selectedDate]);

//   const handleScrollTo = (e) => {
//     const label = e.target;
//     const fullText = e.currentTarget.innerText; 
//     console.log("caldender", fullText);

//     if (!scrollRef.current) return;

//     const container = scrollRef.current;
//     const labelLeft = label.offsetLeft;
//     const labelWidth = label.offsetWidth;
//     const containerWidth = container.offsetWidth;

//     const scrollPosition = labelLeft - (containerWidth / 2 - labelWidth / 2);

//     container.scrollTo({
//       left: scrollPosition,
//       behavior: "smooth",
//     });
//   };


// useLayoutEffect(() => {
//   if (loading || classSchedules.length === 0) return;

//   const ctx = gsap.context(() => {

//     // Cards animation
//     gsap.from(".home_class_single", {
//       opacity: 0,
//       y: 40,
//       rotateX: 10,
//       scale: 0.92,
//       filter: "blur(10px)",
//       duration: 1.2,
//       ease: "power3.out",
//       stagger: 0.15,
//       scrollTrigger: {
//         trigger: ".all_home_class",
//         start: "top 80%",
//         once: true,
//       },
//       onComplete: () => {
//         gsap.to(".home_class_single", { filter: "blur(0px)" });
//       },
//     });

//     // Left image
//     gsap.from(".schd_lft_bgp", {
//       opacity: 0,
//       x: -120,
//       duration: 1.4,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".schedule_calendr_main_area",
//         start: "top 85%",
//         once: true,
//       },
//     });

//     // Right image
//     gsap.from(".schd_rit_bgp", {
//       opacity: 0,
//       x: 120,
//       duration: 1.4,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".schedule_calendr_main_area",
//         start: "top 85%",
//         once: true,
//       },
//     });

//     ScrollTrigger.refresh();
//   });

//   return () => ctx.revert();
// }, [classSchedules, loading]);

// return (
//     <>
//       <section className='class_sehedule_banner_main'>
//         <div className='class_sehedule_banner_inner'>
//           <img src='../images/class_schedule.png' alt='Key' />
//           <div className='innban_area'>
//             <h2>Class Schedule</h2>
//           </div>
//         </div>
//       </section>

//       <section className='banner_botton_class_schedule'>
//         <div className='banner_botton_class_schedule_inner'>
//           <div className='schedule_calender_main'>
//             <img src='../images/sched_ban_graphic.png' alt='img' />
            
//             <div className='date-scroll-wrapper'>
//               <div className='schedule_calender_area'>
//                 <h2>studio <span>timetable</span></h2>
//                 <div className='schedule_calender' ref={scrollRef}>
//                   <div className="boxed">
//                     {dates.map((date) => {
//                       const inputId = date.id;
//                       const isChecked = selectedDate === date.apiDate;
                      
//                       return (
//                         <div key={date.id} style={{ display: 'contents' }}>
//                           <input 
//                             type="radio" 
//                             id={inputId} 
//                             name="skills"
//                             checked={isChecked}
//                             onChange={() => setSelectedDate(date.apiDate)}
//                           />
//                           <label 
//                             htmlFor={inputId} 
//                             onClick={handleScrollTo}
//                           >
//                             {date.displayDate}
//                             <span>{date.dayName}, {date.monthName}</span>
//                           </label>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className='schedule_calendr_main_area'>
//             <img className='schd_lft_bgp' src='../images/left_cycle.png' alt='img' />
//             <img className='schd_rit_bgp' src='../images/right_cycle.png' alt='img' />
            
//             <div className="all_home_class">
//               {loading ? (
//                 <div style={{ 
//                   textAlign: 'center', 
//                   padding: '60px 20px', 
//                   color: '#fff',
//                   fontSize: '18px',
//                   fontWeight: '500'
//                 }}>
//                   Loading schedules...
//                 </div>
//               ) : classSchedules.length === 0 ? (
//                 <div style={{ 
//                   textAlign: 'center', 
//                   padding: '60px 20px', 
//                   color: '#fff',
//                   fontSize: '18px',
//                   fontWeight: '500'
//                 }}>
//                   No classes scheduled for this date.
//                 </div>
//               ) : (
//                 classSchedules.map((schedule) => (
//                   <div className="home_class_single" key={schedule.id}>
//                     <img className="clas_bg" src='../images/class_brap.png' alt='img' />
//                     <img 
//                       className="staff_img" 
//                       src={schedule.Instructor?.image || '../images/staff.png'} 
//                       alt={schedule.instructor_name}
//                       onError={(e) => {
//                         e.target.src = '../images/staff.png';
//                       }}
//                     />
//                     <div className="single_class">
//                       <h2>{schedule.title.toUpperCase()}</h2>
//                       <h3>
//                         <img src='../images/trainer.png' alt='img' /> 
//                         Instructor : <span>{schedule.instructor_name}</span>
//                       </h3>
//                       <div className="mid_cont">
//                         <p>
//                           <img src='../images/calendar.png' alt='img' /> 
//                           {schedule.formatted_date}
//                         </p>
//                         <p>
//                           <img src='../images/clock.png' alt='img' /> 
//                           {schedule.formatted_time}
//                         </p>
                  
//                       </div>
//                       <div className="book_btn">
//                         <Link href={`/class-schedule/book-schedule?id=${schedule.id}`}>
//                           Book Now <img src='../images/rarw2.png' alt='img' />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Page;



"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

function Page() {
  const pathname = usePathname();
  const scrollRef = useRef(null);

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [classSchedules, setClassSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- Generate Dates ---------------- */
  useEffect(() => {
    const today = new Date();
    const dateArray = [];

    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dateArray.push({
        id: `date-${i}`,
        dayNum: date.getDate(),
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        monthName: date.toLocaleDateString("en-US", { month: "short" }),
        apiDate: date.toISOString().split("T")[0],
        displayDate:
          date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      });
    }

    setDates(dateArray);
    setSelectedDate(dateArray[0].apiDate);
  }, []);

  /* ---------------- Fetch Schedules ---------------- */
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}upcoming-training/class-schedules/?date=${selectedDate}`
        );
        const result = await res.json();

        if (result.status && result.data) {
          setClassSchedules(result.data);
        } else {
          setClassSchedules([]);
        }
      } catch (err) {
        console.error(err);
        setClassSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedDate]);

  /* ---------------- Calendar Scroll ---------------- */
  const handleScrollTo = (e) => {
    const label = e.target;
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollPosition =
      label.offsetLeft -
      (container.offsetWidth / 2 - label.offsetWidth / 2);

    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  /* ---------------- GSAP Animations ---------------- */
  useLayoutEffect(() => {
    if (loading || classSchedules.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".home_class_single", {
        opacity: 0,
        y: 40,
        rotateX: 10,
        scale: 0.92,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".all_home_class",
          start: "top 80%",
          once: true,
        },
        onComplete: () =>
          gsap.to(".home_class_single", { filter: "blur(0px)" }),
      });

      gsap.from(".schd_lft_bgp", {
        opacity: 0,
        x: -120,
        duration: 1.4,
        scrollTrigger: {
          trigger: ".schedule_calendr_main_area",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".schd_rit_bgp", {
        opacity: 0,
        x: 120,
        duration: 1.4,
        scrollTrigger: {
          trigger: ".schedule_calendr_main_area",
          start: "top 85%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [classSchedules, loading]);

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* Banner */}
      <section className="class_sehedule_banner_main">
        <div className="class_sehedule_banner_inner">
          <img src="../images/class_schedule.png" alt="Key" />
          <div className="innban_area">
            <h2>Class Schedule</h2>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="banner_botton_class_schedule">
        <div className="banner_botton_class_schedule_inner">
          <div className="schedule_calender_main">
            <img src="../images/sched_ban_graphic.png" alt="img" />

            <div className="schedule_calender_area">
              <h2>
                studio <span>timetable</span>
              </h2>

              <div className="schedule_calender" ref={scrollRef}>
                <div className="boxed">
                 {dates.map((date) => (
  <div key={date.id} style={{ display: "contents" }}>
    <input
      type="radio"
      id={date.id}
      name="skills"
      checked={selectedDate === date.apiDate}
      readOnly
    />

    <label
      htmlFor={date.id}
      onClick={(e) => {
        setSelectedDate(date.apiDate); 
        handleScrollTo(e);
      }}
    >
      {date.displayDate}
      <span>
        {date.dayName}, {date.monthName}
      </span>
    </label>
  </div>
))}

                </div>
              </div>
            </div>
          </div>

          {/* Schedules */}
          <div className="schedule_calendr_main_area">
            <img className="schd_lft_bgp" src="../images/left_cycle.png" />
            <img className="schd_rit_bgp" src="../images/right_cycle.png" />

            <div className="all_home_class">
              {loading ? (
                <p className="loading_text">Loading schedules...</p>
              ) : classSchedules.length === 0 ? (
                <p className="loading_text"></p>
              ) : (
                classSchedules.map((schedule) => {
                  const capacity = Number(schedule.capacity) || 0;
                  const booked = Number(schedule.booked_count) || 0;
                  const openings = capacity - booked;
                  const isBooked = openings <= 0;

                  return (
                    <div
                      key={schedule.id}
                      className={`home_class_single ${
                        isBooked ? "booked" : ""
                      }`}
                    >
                      <img
                        className="clas_bg"
                        src="../images/class_brap.png"
                        alt=""
                      />

                      <img
                        className="staff_img"
                        src={
                          schedule.Instructor?.image || "../images/staff.png"
                        }
                        alt={schedule.instructor_name}
                        onError={(e) =>
                          (e.target.src = "../images/staff.png")
                        }
                      />

                      <div className="single_class">
                        <h2>{schedule.title.toUpperCase()}</h2>

                        <h3>
                          <img src="../images/trainer.png" alt="" />
                          Instructor :{" "}
                          <span>{schedule.instructor_name}</span>
                        </h3>

                        <div className="mid_cont">
                          <p>
                            <img src="../images/calendar.png" alt="" />
                            {schedule.formatted_date}
                          </p>

                          <p>
                            <img src="../images/clock.png" alt="" />
                            {schedule.formatted_time}
                          </p>

                          <p>
                            <img src="../images/seat.png" alt="" />
                            Openings : <span>{openings > 0 ? openings : 0}</span>
                          </p>
                        </div>

                        <div className="book_btn">
                          {isBooked ? (
                           <Link
                              href={`/class-schedule/book-schedule?id=${schedule.id}`}
                            >
                              Booked{" "}
                              <img src="../images/rarw2.png" alt="" />
                            </Link>
                          ) : (
                            <Link
                              href={`/class-schedule/book-schedule?id=${schedule.id}`}
                            >
                              Book Now{" "}
                              <img src="../images/rarw2.png" alt="" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
