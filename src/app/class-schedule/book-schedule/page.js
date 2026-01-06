"use client";

import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Separate component that uses useSearchParams
function BookScheduleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [availableSlots, setAvailableSlots] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    console.log("Data updated:", data);
    console.log("Available Slots:", availableSlots);
    console.log("Capacity:", data?.capacity);
    console.log("Booked Count:", data?.booked_count);
  }, [data, availableSlots]);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}booking/${id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const json = await response.json();

        if (json.success) {
          setData(json.data);
          // Initialize available slots
          const slots = (json.data.capacity || 0) - (json.data.booked_count || 0);
          setAvailableSlots(slots);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleBookNow = async () => {
    if (!id) return;

    setBooking(true);
    setMessage({ type: "", text: "" });

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        router.push("/login");
        setBooking(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}booking/user/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message || "Booking failed");
        setBooking(false);
        return;
      }

      if (responseData.status === true) {
        // Update booked_count in data
        setData((prevData) => ({
          ...prevData,
          booked_count: (prevData?.booked_count || 0) + 1,
        }));

        // Decrease available slots immediately
        setAvailableSlots((prev) => prev - 1);

        setIsBooked(true);

        toast.success("Booking successful");
      } else {
        toast.error(responseData.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while booking");
      setMessage({
        type: "error",
        text: error.message || "An error occurred while booking",
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
    <section className="class_schedule_detail_main_area">
      <div className="close_icon">
        <Link href={"/class-schedule"}>
          <img src="../images/close.png" alt="img" />
        </Link>
      </div>

      <div className="class_schedule_detail_main_inner">
        <div className="class_schedule_detail_left">
          <img
            src={data.Instructor?.image_bio || "../images/class_detail_img.png"}
            alt="img"
          />
        </div>

        <div className="class_schedule_detail_right">
          <h2>{data.title}</h2>

          <h3>
            <img src="../images/trainer.png" alt="img" /> Instructor :
            <span> {data.instructor_name}</span>
          </h3>

          <div className="dt_tm_addrs">
            <p>
              <img src="../images/calendar.png" alt="img" />{" "}
              {data.formatted_date}
            </p>
            <p>
              <img src="../images/clock.png" alt="img" /> {data.formatted_time}
            </p>
          </div>

          <div className="overview_area">
            <h3>Overview</h3>
            <p>{data.description}</p>
          </div>

          <div className="booking_area">
            <h3>Single click booking now</h3>
            <p>Click on one of the spots below to instantly book into the class</p>
          </div>

          <div className="slot_available">
            <h3>Available Slot</h3>
            <h4>{availableSlots}</h4>
          </div>

          <button
            className="booknow_btn"
            onClick={handleBookNow}
            disabled={booking || isBooked || availableSlots <= 0}
          >
            {isBooked
              ? "BOOKED"
              : booking
              ? "BOOKING..."
              : availableSlots <= 0
              ? "FULLY BOOKED"
              : "BOOK NOW"}
          </button>
        </div>
      </div>
    </section>
  );
}

// Main component with Suspense boundary
function BookSchedule() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BookScheduleContent />
    </Suspense>
  );
}

export default BookSchedule;
// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useSearchParams,useRouter } from "next/navigation";
// import toast from "react-hot-toast";


// function BookSchedule() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id"); 

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [booking, setBooking] = useState(false);
//   const [isBooked, setIsBooked] = useState(false);
//   const [availableSlots, setAvailableSlots] = useState("");
//   const [message, setMessage] = useState({ type: "", text: "" });



//   useEffect(() => {
//     console.log("Data updated:", data);
//     console.log("Available Slots:", availableSlots);
//     console.log("Capacity:", data?.capacity);
//     console.log("Booked Count:", data?.booked_count);
//   }, [data, availableSlots]);
//   useEffect(() => {
//     if (!id) return;

//     const fetchBooking = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}booking/${id}`,
//           {
//             method: "GET",
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error ${response.status}`);
//         }

//         const json = await response.json();
        
//         if (json.success) {
//           setData(json.data);
//           // Initialize available slots
//           const slots = (json.data.capacity || 0) - (json.data.booked_count || 0);
//           setAvailableSlots(slots);
//         }
//       } catch (error) {
//         console.error("Error fetching booking:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooking();
//   }, [id]);

//   const handleBookNow = async () => {
//     if (!id) return;

//     setBooking(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const token = sessionStorage.getItem('token'); 
      
//       if (!token) {
//         // toast.error("Please login to book");
//          router.push("/login");
//         setBooking(false);
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/booking/user/${id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, 
//           },
//         }
//       );

//       const responseData = await response.json();

//       if (!response.ok) {
//         toast.error(responseData.message || "Booking failed");
//         setBooking(false);
//         return;
//       }

//       if (responseData.status ===true) {
       
//         // Update booked_count in data
//         setData(prevData => ({
//           ...prevData,
//           booked_count: (prevData?.booked_count || 0) + 1
//         }));
        
//         // Decrease available slots immediately
//         setAvailableSlots(prev => prev - 1);
        
//         setIsBooked(true);
        
//         toast.success("Booking successful");
       
//       } else {
//         toast.error(responseData.message || "Booking failed");
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred while booking");
//       setMessage({
//         type: "error",
//         text: error.message || "An error occurred while booking",
//       });
//     } finally {
//       setBooking(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!data) return <p>No data found</p>;

//   return (
//     <>
//       <section className="class_schedule_detail_main_area">
//         <div className="close_icon">
//           <Link href={"/class-schedule"}>
//             <img src="../images/close.png" alt="img" />
//           </Link>
//         </div>

//         <div className="class_schedule_detail_main_inner">
//           <div className="class_schedule_detail_left">
//             <img
//               src={data.Instructor?.image_bio || "../images/class_detail_img.png"}
//               alt="img"
//             />
//           </div>

//           <div className="class_schedule_detail_right">
//             <h2>{data.title}</h2>

//             <h3>
//               <img src="../images/trainer.png" alt="img" /> Instructor :
//               <span> {data.instructor_name}</span>
//             </h3>

//             <div className="dt_tm_addrs">
//               <p>
//                 <img src="../images/calendar.png" alt="img" />{" "}
//                 {data.formatted_date}
//               </p>
//               <p>
//                 <img src="../images/clock.png" alt="img" />{" "}
//                 {data.formatted_time}
//               </p>
//             </div>

//             <div className="overview_area">
//               <h3>Overview</h3>
//               <p>{data.description}</p>
//             </div>

//             <div className="booking_area">
//               <h3>Single click booking now</h3>
//               <p>Click on one of the spots below to instantly book into the class</p>
//             </div>

//             <div className="slot_available">
//               <h3>Available Slot</h3>
//               <h4>{availableSlots}</h4>
//             </div>

//             <button 
//               className="booknow_btn" 
//               onClick={handleBookNow}
//               disabled={booking || isBooked || availableSlots <= 0}
//             >
//               {isBooked 
//                 ? "BOOKED" 
//                 : booking 
//                 ? "BOOKING..." 
//                 : availableSlots <= 0 
//                 ? "FULLY BOOKED"
//                 : "BOOK NOW"}
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default BookSchedule;



// old
// import Link from 'next/link';
// import React from 'react'

// function bookSchedule() {
//   return (
//     <>
//        <section className='class_schedule_detail_main_area'>
//             <div className='close_icon'><Link href={'/class-schedule'}><img src="../images/close.png" alt='img' /></Link></div>
//             <div className='class_schedule_detail_main_inner'>
//                 <div className='class_schedule_detail_left'>
//                     <img src="../images/class_detail_img.png" alt='img' />
//                 </div>
//                 <div className='class_schedule_detail_right'>
//                     <h2>RIDE 45 (All levels)</h2>
//                     <h3><img src='../images/trainer.png' alt='img' /> Instructor : <span>Tyson</span></h3>
//                     <div className='dt_tm_addrs'>
//                        <p><img src='../images/calendar.png' alt='img' /> Thu 31st October 2025</p>
//                        <p><img src='../images/clock.png' alt='img' /> 7:00 AM (45mins)</p>
//                        <p><img src='../images/map.png' alt='img' /> Melbourns CBD Ride Chamber</p>
//                     </div>
//                     <div className='overview_area'>
//                       <h3>Overview</h3>
//                       <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It  has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at  Hampden-Sydney College in Virginia, looked up one of the more obscure  Latin words, consectetur, from a Lorem Ipsum passage, and going through  the cites of the word in classical literature, discovered the  undoubtable source.</p>
//                     </div>
//                     <div className='booking_area'>
//                       <h3>Single click booking now</h3>
//                       <p>Click on one of the spots below to instantly book into the class</p>
//                     </div>
//                     <div className='slot_available'>
//                        <h3>Available Slot</h3>
//                        <h4>150</h4>
//                     </div>

//                     <button className='booknow_btn'>BOOK NOW</button>
//                 </div>
                
//             </div>
//        </section>
//     </>
//   )
// }

// export default bookSchedule;
