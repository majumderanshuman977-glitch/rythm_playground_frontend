"use client";
import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // detect page change

gsap.registerPlugin(ScrollTrigger);

function About() {

const pathname = usePathname(); // triggers on page change

   const [activeIndex, setActiveIndex] = useState(0); // default first active

   const [instructors, setInstructors] = useState([]);
   const [loading, setLoading] = useState(true);

  const team = [
    { img: "/images/team1.jpg", name: "Dani" },
    { img: "/images/team2.jpg", name: "Angelina" },
    { img: "/images/team3.jpg", name: "Emily" },
  ];


useEffect(() => {
  const fetchInstructors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/instructor");
      const json = await res.json();

      if (json.success) {
        setInstructors(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch instructors", error);
    } finally {
      setLoading(false);
    }
  };

  fetchInstructors();
}, []);


//    useLayoutEffect(() => {
//       if (loading) return; 
//     // Ensure DOM is ready
//     const id = requestAnimationFrame(() => {

//       // Kill previous triggers to avoid duplicates
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
// // IMAGE premium fade + slight zoom-out
//       gsap.from(".about_area_main_left img", {
//         opacity: 0,
//         scale: 1.15,
//         x: -80,
//         duration: 1.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".about_area_main_inner",
//           start: "top 75%",
//         },
//       });

//       // HEADINGS stagger with slide-up
//       gsap.from(".about_area_main_right h5, .about_area_main_right h2, .about_area_main_right h4", {
//         opacity: 0,
//         y: 40,
//         duration: 1.4,
//         ease: "power3.out",
//         stagger: 0.15,
//         scrollTrigger: {
//           trigger: ".about_area_main_inner",
//           start: "top 70%",
//           once: false,
//         },
//       });

//       // OPTION BOXES — premium floating reveal
//       gsap.from(".single_aboutopt", {
//         opacity: 0,
//         y: 50,
//         duration: 1.3,
//         ease: "power2.out",
//         stagger: 0.25,
//         scrollTrigger: {
//           trigger: ".about_area_main_right",
//           start: "top 60%",
//           once: false,
//         },
//       });

//       // --- Our Values Section ---
//       const valueItems = document.querySelectorAll(".ourvalue_area_main_single");
//       if (valueItems.length) {
//         gsap.from(valueItems, {
//           opacity: 0,
//           y: 280,
//           duration: 1.5,
//           stagger: 0.3,
//           scrollTrigger: {
//             trigger: ".ourvalue_area_main",
//             start: "top 80%",
//             end: "bottom 20%",
//             toggleActions: "play none play none",
//           },
//         });
//       }

//       // --- Team Section ---
//       gsap.from(".team_area_main_section_left h4, .team_area_main_section_left h2, .team_area_main_section_left p", {
//         opacity: 0,
//         y: 40,
//         stagger: 0.18,
//         duration: 1.4,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".team_area_main_section",
//           start: "top 75%",
//           once: true
//         }
//       });

//       // MAIN IMAGE ON TOP (Ride Playground)
//       gsap.from(".rid_plgnd", {
//         opacity: 0,
//         scale: 1.15,
//         y: -50,
//         duration: 1.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".team_area_main_section",
//           start: "top 80%",
//           once: true
//         },
//       });

//       // INSTRUCTOR CARDS
//       const cards = gsap.utils.toArray(".single_instractor");

//       cards.forEach((card, i) => {
//         // Random premium direction
//         const dir = i % 2 === 0 ? 80 : -80;

//         gsap.from(card, {
//           opacity: 0,
//           y: 60,
//           x: dir,
//           scale: 0.9,
//           duration: 1.3,
//           delay: i * 0.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".team_area_main_section_inner",
//             start: "top 90%",
//             once: true
//           }
//         });
//       });

//       // Refresh ScrollTrigger positions
//       ScrollTrigger.refresh();
//     });

//     return () => cancelAnimationFrame(id);

//   }, [pathname,instructors]);

useLayoutEffect(() => {
  // Wait for instructors to load before running animations
  if (loading || instructors.length === 0) return;
  
  // Ensure DOM is ready
  const id = requestAnimationFrame(() => {

    // Kill previous triggers to avoid duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // IMAGE premium fade + slight zoom-out
    gsap.from(".about_area_main_left img", {
      opacity: 0,
      scale: 1.15,
      x: -80,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about_area_main_inner",
        start: "top 75%",
      },
    });

    // HEADINGS stagger with slide-up
    gsap.from(".about_area_main_right h5, .about_area_main_right h2, .about_area_main_right h4", {
      opacity: 0,
      y: 40,
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".about_area_main_inner",
        start: "top 70%",
        once: false,
      },
    });

    // OPTION BOXES — premium floating reveal
    gsap.from(".single_aboutopt", {
      opacity: 0,
      y: 50,
      duration: 1.3,
      ease: "power2.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".about_area_main_right",
        start: "top 60%",
        once: false,
      },
    });

    // --- Our Values Section ---
    const valueItems = document.querySelectorAll(".ourvalue_area_main_single");
    if (valueItems.length) {
      gsap.from(valueItems, {
        opacity: 0,
        y: 280,
        duration: 1.5,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".ourvalue_area_main",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none play none",
        },
      });
    }

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

    // Refresh ScrollTrigger positions
    ScrollTrigger.refresh();
  });

  return () => cancelAnimationFrame(id);

}, [pathname, loading, instructors]); 


  return (
    <>
       <section className="about_area_main">
            <img className="about_bg_upl_img" src='../images/shape-right.png' alt='img' />
            <img className="about_bg_upr_img" src='../images/shape-left.png' alt='img' />
            <div className="about_area_main_inner">
                <div className="about_area_main_left">
                    <img src='../images/about_img.png' alt='img' />
                </div>
                <div className="about_area_main_right">
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

       <section className='ourvalue_area_main_section'>
           <div className='ourvalue_area_main_section_inner'>
                <div className='ourvalue_area_main'>

                     <div className='ourvalue_area_main_single'>
                         <div className='ourvalue_area_single_left'>
                              <img src='../images/valu1.png' alt='img' />
                         </div>
                         <div className='ourvalue_area_single_right'>
                             <h2>01</h2>
                             <h3>Our Values</h3>
                             <p>At Ride Playground, our mission is to create a space where everyone feels welcome, empowered, and supported. We believe in fostering an environment that prioritizes inclusivity, authenticity, and the freedom to move without judgment. Here's what we stand for:</p>
                         </div>
                     </div>

                     <div className='ourvalue_area_main_single'>
                         <div className='ourvalue_area_single_right'>
                             <h2>02</h2>
                             <h3>Inclusivity</h3>
                             <p>Fitness is for everyone, regardless of age, body type, ability, or experience. At Ride Playground, we embrace and celebrate the unique qualities that make each person who they are. Whether you're just starting your fitness journey or are a seasoned athlete, you belong here. We are committed to creating a diverse community where all individuals can feel safe and supported as they explore their potential.</p>
                         </div>
                         <div className='ourvalue_area_single_left'>
                              <img src='../images/valu2.png' alt='img' />
                         </div>
                     </div>

                     <div className='ourvalue_area_main_single'>
                         <div className='ourvalue_area_single_left'>
                              <img src='../images/valu3.png' alt='img' />
                         </div>
                         <div className='ourvalue_area_single_right'>
                             <h2>03</h2>
                             <h3>No Judgement Space</h3>
                             <p>We believe in the power of movement to heal, strengthen, and transform—but it’s important that you feel free to show up as you are. There's no competition here, no pressure to be anything other than your authentic self. At Ride Playground, we create a space where everyone is free to move without fear of judgment, comparison, or expectations. We lift each other up, no matter where we are on our personal fitness paths.</p>
                         </div>
                     </div>

                     <div className='ourvalue_area_main_single'>
                         <div className='ourvalue_area_single_right'>
                             <h2>04</h2>
                             <h3>Authenticity</h3>
                             <p>We are committed to being true to who we are, both as individuals and as a community. Our instructors bring their real selves to every class, creating a genuine, supportive atmosphere where you can do the same. Authenticity isn’t just about how we show up on the bike or mat—it’s about honoring your body, listening to your needs, and embracing the journey in its entirety. We encourage you to show up, not just for your workout, but as your truest self, knowing you are valued and celebrated for it.Together, these values form the heart of Ride Playground. We believe in cultivating a community where you can move with confidence, embrace your journey, and feel a deep connection to others who share in the ride.</p>
                         </div>
                         <div className='ourvalue_area_single_left'>
                              <img src='../images/valu4.png' alt='img' />
                         </div>
                     </div>

                </div>
           </div>
       </section> 



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
                      {loading && <p>Loading instructors...</p>}
                      {!loading &&
                instructors.map((item, index) => (
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



  
    </>
  )
}

export default About;
