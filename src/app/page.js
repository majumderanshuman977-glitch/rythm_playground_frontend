
"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import React from "react";
import HomeSlider from "./component/homeSlider";
import Link from "next/link";
import TestimonialsSlider from "./component/testimonialsSlider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // detect page change
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function Home() {

const pathname = usePathname(); // triggers on page change


  const [activeIndex, setActiveIndex] = useState(0); // default first active



const aboutRef = useRef(null);


const [instructors, setInstructors] = useState([]);
const [upcomingTranings, setUpcomingTranings] = useState([]);
const [ourTeams, setOurTeams] = useState([]);
const [servies, setServies] = useState([]);
const [loading, setLoading] = useState(true);

//console.log("Up Coming : ", upcomingTranings)

useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}instructor`);

        if (!res.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const json = await res.json();

        // handle all API response shapes safely
        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.teams)
          ? json.teams
          : Array.isArray(json)
          ? json
          : [];

        setOurTeams(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}services`);

        if (!res.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const json = await res.json();

        // handle all API response shapes safely
        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.services)
          ? json.services
          : Array.isArray(json)
          ? json
          : [];

        setServies(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);


useEffect(() => {
    const fetchUpcomTraning = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}upcoming-training`);

        const json = await res.json();

        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.upcomTraing)
          ? json.upcomTraing
          : Array.isArray(json)
          ? json
          : [];

        // const randomThree = list.slice(0, 3);

        setUpcomingTranings(list);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUpcomTraning();
  }, []);


useLayoutEffect(() => {
  if (!pathname) return;

  const ctx = gsap.context(() => {

    // 🧹 Clean all old ScrollTriggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    // ========= HOME CLASS GRID =========
    gsap.from(".home_class_single", {
      opacity: 0,
      y: 40,
      scale: 0.92,
      rotateX: 10,
      filter: "blur(10px)",
      duration: 1.3,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".all_home_class",
        start: "top 110%",
        once: true,
      }
    });

    // ========= BACKGROUND FLOAT =========
// Smooth fade-in + continuous floating loop
const floatingTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".clas_bg_main",
    start: "top 85%",
    once: true
  }
});

// Entry reveal
floatingTl.from(".clas_bg_main", {
  opacity: 0,
  scale: 1.1,
  y: 40,
  duration: 1.6,
  ease: "power3.out",
});

// Endless smooth float
floatingTl.to(".clas_bg_main", {
  y: "-=20",
  scale: 1,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

    // ========= ABOUT IMAGE =========
    gsap.from(".about_area_main_left img", {
      opacity: 0,
      scale: 1.15,
      x: -50,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about_area_main_inner",
        start: "top 75%"
      }
    });

    // ========= ABOUT TEXT =========
    gsap.from(".about_area_main_right h5, .about_area_main_right h2, .about_area_main_right h4", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about_area_main_inner",
        start: "top 70%"
      }
    });

    // ========= OPTIONS BOX =========
    gsap.from(".single_aboutopt", {
      opacity: 0,
      y: 60,
      stagger: 0.25,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about_area_main_right",
        start: "top 65%"
      }
    });

 // --- Team Section ---
      gsap.from(".team_area_main_section_left h4, .team_area_main_section_left h2, .team_area_main_section_left p", {
        opacity: 0,
        y: 40,
        stagger: 0.18,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team_area_main_section",
          start: "top 75%",
          once: true
        }
      });

      // MAIN IMAGE ON TOP (Ride Playground)
      gsap.from(".rid_plgnd", {
        opacity: 0,
        scale: 1.15,
        y: -50,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team_area_main_section",
          start: "top 80%",
          once: true
        },
      });

      // INSTRUCTOR CARDS
      const cards = gsap.utils.toArray(".single_instractor");

      cards.forEach((card, i) => {
        // Random premium direction
        const dir = i % 2 === 0 ? 80 : -80;

        gsap.from(card, {
          opacity: 0,
          y: 60,
          x: dir,
          scale: 0.9,
          duration: 1.3,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team_area_main_section_inner",
            start: "top 90%",
            once: true
          }
        });
      });

    // ========= TESTIMONIALS =========
    gsap.from(".testimonials_main_section", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonials_main_section",
        start: "top 80%"
      }
    });

    // ========= SERVICES =========
    gsap.from(".service_provide_area_single", {
      scale: 0.3,
      opacity: 0,
      stagger: 0.25,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".service_provide_area_all",
        start: "top 75%"
      }
    });

    ScrollTrigger.refresh();
  });

  return () => {
    ctx.revert();  // 🧽 clean GSAP + ScrollTrigger on route change
    ScrollTrigger.clearScrollMemory();
  };

}, [upcomingTranings]);



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <>
       <HomeSlider />

       <section className="homeclass_area_main">
        <img className="clas_bg_main" src='../images/home_graphic.png' alt='img' />
         <div className="homeclass_area_inner">
              <div className="all_home_class">
                  
                  {upcomingTranings.length > 0 ? (
  upcomingTranings.map((item) => (
    <div className="home_class_single" key={item.id}>
      <img className="clas_bg" src="../images/class_brap.png" alt="img" />
      <img className="staff_img" src={item.Instructor?.image || "../images/staff.png"} alt="img" />
      <div className="single_class">
        <h2>{item.title}</h2>
        <h3>
          <img src="../images/trainer.png" alt="img" /> Instructor:{" "}
          <span>{item.instructor_name}</span>
        </h3>
        <div className="mid_cont">
          <p>
            <img src="../images/calendar.png" alt="img" /> {item.formatted_date}
          </p>
          <p>
            <img src="../images/clock.png" alt="img" /> {item.formatted_time}
          </p>
        </div>
        <div className="book_btn">
          <Link href="/class-schedule">
            Book Now <img src="../images/rarw2.png" alt="img" />
          </Link>
        </div>
      </div>
    </div>
  ))
) :(
  <div className="no_classes_message">
    <p>No upcoming trainings available right now.</p>
    
  </div>
)}

              </div>
              </div>
       </section>
       {/* <section className="homeclass_area_main">
       
       


          <div className="homeclass_area_inner">
              <div className="all_home_class">


               


             <div className="home_class_single">
                  <img className="clas_bg" src='../images/class_brap.png' alt='img' />
                  <img className="staff_img" src='../images/staff.png' alt='img' />
                  <div className="single_class">
                     <h2>TECHNO THURSDAY</h2>
                     <h3><img src='../images/trainer.png' alt='img' /> Instructor : <span>Tyson</span></h3>
                     <div className="mid_cont">
                     <p><img src='../images/calendar.png' alt='img' /> Thu 31st October 2025</p>
                     <p><img src='../images/clock.png' alt='img' /> 7:00 AM (45mins)</p>
                     </div>
                     <h4><img src='../images/map.png' alt='img' /> Melbourns CBD Ride Chamber</h4>
                     <div className="book_btn">
                     <Link href={'/class-schedule'}>Book Now <img src='../images/rarw2.png' alt='img' /></Link>
                     </div>
                  </div>
               </div>

               <div className="home_class_single">
                  <img className="clas_bg" src='../images/class_brap.png' alt='img' />
                  <img className="staff_img" src='../images/staff2.png' alt='img' />
                  <div className="single_class">
                     <h2>TECHNO THURSDAY</h2>
                     <h3><img src='../images/trainer.png' alt='img' /> Instructor : <span>Tyson</span></h3>
                     <div className="mid_cont">
                     <p><img src='../images/calendar.png' alt='img' /> Thu 31st October 2025</p>
                     <p><img src='../images/clock.png' alt='img' /> 7:00 AM (45mins)</p>
                     </div>
                     <h4><img src='../images/map.png' alt='img' /> Melbourns CBD Ride Chamber</h4>
                     <div className="book_btn">
                     <Link href={'/class-schedule'}>Book Now <img src='../images/rarw2.png' alt='img' /></Link>
                     </div>
                  </div>
               </div>

                <div className="home_class_single">
                  <img className="clas_bg" src='../images/class_brap.png' alt='img' />
                  <img className="staff_img" src='../images/staff3.png' alt='img' />
                  <div className="single_class">
                     <h2>TECHNO THURSDAY</h2>
                     <h3><img src='../images/trainer.png' alt='img' /> Instructor : <span>Tyson</span></h3>
                     <div className="mid_cont">
                     <p><img src='../images/calendar.png' alt='img' /> Thu 31st October 2025</p>
                     <p><img src='../images/clock.png' alt='img' /> 7:00 AM (45mins)</p>
                     </div>
                     <h4><img src='../images/map.png' alt='img' /> Melbourns CBD Ride Chamber</h4>
                     <div className="book_btn">
                     <Link href={'/class-schedule'}>Book Now <img src='../images/rarw2.png' alt='img' /></Link>
                     </div>
                  </div>
               </div>









               </div>

          </div>
       </section> */}

       {/* ================= About Section Start ================= */}

        <section className="about_area_main">
            <img className="about_bg_upl_img" src='../images/shape-right.png' alt='img' />
            <img className="about_bg_upr_img" src='../images/shape-left.png' alt='img' />
            <div className="about_area_main_inner">
                <div className="about_area_main_left">
                    <img src='../images/about_img.png' alt='img' />
                </div>
                <div className="about_area_main_right" ref={aboutRef}>
                  <h5>Welcome</h5>
                  <h2>Rhythm <span>Ride</span></h2>
                  <h4>Ride Regularly <span>Stay Healthy</span></h4>

                  <div className="single_aboutopt">
                     <div className="single_aboutopt_left">
                        <img src='../images/abtg2.png' alt='img' />
                     </div>
                     <div className="single_aboutopt_right">
                        <h3>Increase Energy Levels</h3>
                        <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
                     </div>
                  </div>

                  <div className="single_aboutopt">
                     <div className="single_aboutopt_left">
                        <img src='../images/abtg3.png' alt='img' />
                     </div>
                     <div className="single_aboutopt_right">
                        <h3>Reduce Risk of Chronic Diseases</h3>
                        <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
                     </div>
                  </div>

                  <div className="single_aboutopt">
                     <div className="single_aboutopt_left">
                        <img src='../images/abtg4.png' alt='img' />
                     </div>
                     <div className="single_aboutopt_right">
                        <h3>Relax & Sleep Better</h3>
                        <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
                     </div>
                  </div>


                </div>
            </div>
        </section>

       {/* ================= About Section End ================= */}

       {/* ================= Team Instractor Area Start ================== */}

         <section className="team_area_main_section">
            <img className="rid_plgnd" src="/images/RidePlayground.png" alt="icon" />
            <div className="team_area_main_section_inner">
               <div className="team_area_main_section_left">
                  <h4>Our Team</h4>
                  <h2>Instructor</h2>
                  <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
               </div>
               <div className="team_area_main_section_right">
                  <div className="team_instrat_all">

                      {ourTeams.map((item, index) => (
                        <div
                           key={index}
                           className={`single_instractor ${activeIndex === index ? "active_team" : ""}`}
                           onMouseEnter={() => setActiveIndex(index)} // change active on hover
                        >
                           <img src={item.image} alt="img" />
                           <h2>{item.first_name}</h2>

                           <Link href="">
                              <img src="/images/rarw2.png" alt="icon" />
                           </Link>

                           <div className="team_layout"></div>
                        </div>
                        ))}

                  </div>
               </div>
            </div>
         </section>

       {/* ================= Team Instractor Area End ================== */}


       {/* ================= Testimonials Section Area Start ================== */}
         
         <section className="testimonials_main_section">
            <div className="testimonials_main_section_inner">
               <div className="testimonials_main_all">
                  <div className="testimonials_main_top">
                     <h3>Testimonials</h3>
                     <h2>What’s Our Client Say</h2>
                  </div>

                  <div className="testimonials_main_body_main">
                     <TestimonialsSlider />
                  </div>

               </div>
            </div>
         </section>

       {/* ================= Testimonials Section Area End ================== */}


       {/* ================= Service Provide Area Start ================== */}

         <section className="service_provide_area_main">
             <div className="service_provide_area_inner">
               <div className="service_provide_area_head">
                  <h2>Service we Provide</h2>
               </div>
               <div className="service_provide_area_all">


                  {servies.map((item) => {
                  const {
                    id,
                     name,
                     image,
                  } = item;

                  return (
                        <div className="service_provide_area_single" key={id}>
                           <img src={image} alt="img" />
                           <div className="srv_hovr_teat">
                              <h3>{name}</h3>
                           </div>
                           <div className="srv_button">
                              <Link href={{pathname:"/trainings", query: { categoryId: id }}}>Explore Training <span><img src="/images/rarw2.png" alt="img" /></span></Link>
                           </div>
                        </div>
                  );
                  })}





               </div>
             </div>        
         </section>

       {/* ================= Service Provide Area Start ================== */}

        
    </>
  );
}
