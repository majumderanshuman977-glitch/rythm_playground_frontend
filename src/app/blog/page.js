"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Blog() {
  const containerRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}blogs`)
        const data = await res.json();
        if (data.status) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ GSAP AFTER blogs are rendered
  useLayoutEffect(() => {
    if (!blogs.length) return;

    const ctx = gsap.context(() => {

      // Floating image animation
      gsap.to(".blog_detl_img", {
        x: 40,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray(".blog_page_main_single").forEach((card) => {
        const img = card.querySelector("img");
        const heading = card.querySelector(".blog_heading h3");
        const meta = card.querySelectorAll(".blog_cret_date p");

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",   // ✅ FIXED
            toggleActions: "play none none reverse",
          },
        })
        .from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(img, {
          opacity: 0,
          scale: 1.15,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .from(heading, {
          y: 25,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.3")
        .from(meta, {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.3");
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [blogs]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "50px" }}>Loading blogs...</p>;
  }

  return (
    <section className="blog_page_main_area" ref={containerRef}>
      <div className="blog_page_main_area_inner">
        <h2>Latest Blog of this Week</h2>

        <div className="blog_page_main_all">
          {blogs.map((blog) => (
            <div className="blog_page_main_single" key={blog.id}>
              <img src={blog.image_url} alt={blog.title} />

              <div className="blog_heading">
                <h3>{blog.title}</h3>
              </div>

              <div className="blog_cret_date">
                <p>
                  <img src="/images/user.png" alt="img" />
                  By : {blog.role}
                </p>
                <p>
                  <img src="/images/calendar.png" alt="img" />
                  {blog.published_date}
                </p>
              </div>

              <div className="blog_button">
                <Link href={`/blog/blog-details?id=${blog.id}`}>
                  <img src="/images/rarw2.png" alt="img" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <img className="blog_detl_img" src="/images/bd_cyc.png" alt="img" />
    </section>
  );
}

export default Blog;

// "use client";
// import Link from 'next/link';
// import { useEffect, useLayoutEffect } from 'react'
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { usePathname } from "next/navigation";

// gsap.registerPlugin(ScrollTrigger);

// function Blog() {

//   const pathname = usePathname();

//   useLayoutEffect(() => {
//     const id = requestAnimationFrame(() => {

//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//       gsap.to(".blog_detl_img", {
//         x: 50,               // move 30px to right
//         duration: 3,         // total duration of one cycle
//         ease: "sine.inOut",   // smooth easing
//         repeat: -1,           // infinite
//         yoyo: true,           // move back and forth
//         });

//       const cards = document.querySelectorAll(".blog_page_main_single");

//       cards.forEach((card) => {

//         const img = card.querySelector("img");
//         const heading = card.querySelector(".blog_heading h3");
//         const meta = card.querySelectorAll(".blog_cret_date p");

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: card,
//             start: "top 120%",
//             toggleActions: "play none none reverse",
//           }
//         });

//         tl.from(card, {
//           opacity: 0,
//           y: 80,
//           duration: 0.8,
//           ease: "power3.out",
//         })
//           .from(img, {
//             opacity: 0,
//             scale: 1.2,
//             duration: 0.7,
//             ease: "power2.out",
//           }, "-=0.4")
//           .from(heading, {
//             y: 30,
//             opacity: 0,
//             duration: 0.6,
//             ease: "power3.out",
//           }, "-=0.4")
//           .from(meta, {
//             y: 20,
//             opacity: 0,
//             stagger: 0.15,
//             duration: 0.45,
//             ease: "power2.out",
//           }, "-=0.3");

//       });

//       ScrollTrigger.refresh();
//     });

//     return () => cancelAnimationFrame(id);
//   }, [pathname]);

//   return (
//     <>
//       <section className='blog_page_main_area'>
//         <div className='blog_page_main_area_inner'>
//           <h2>Latest Blog of this Week</h2>
//           <div className='blog_page_main_all'>


//             <div className='blog_page_main_single'>
//               <img src='../images/blog1.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>

//             <div className='blog_page_main_single'>
//               <img src='../images/blog2.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>

//             <div className='blog_page_main_single'>
//               <img src='../images/blog3.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>

//             <div className='blog_page_main_single'>
//               <img src='../images/blog4.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>


//           </div>
//         </div>
//         <img className='blog_detl_img' src='../images/bd_cyc.png' alt='img' />
//       </section>
//     </>
//   )
// }

// export default Blog;


// "use client";
// import Link from 'next/link';
// import { useEffect, useLayoutEffect } from 'react'
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { usePathname } from "next/navigation";

// gsap.registerPlugin(ScrollTrigger);

// function Blog() {

//   const pathname = usePathname();

//   useLayoutEffect(() => {
//     const id = requestAnimationFrame(() => {

//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//       gsap.to(".blog_detl_img", {
//         x: 50,               // move 30px to right
//         duration: 3,         // total duration of one cycle
//         ease: "sine.inOut",   // smooth easing
//         repeat: -1,           // infinite
//         yoyo: true,           // move back and forth
//         });

//       const cards = document.querySelectorAll(".blog_page_main_single");

//       cards.forEach((card) => {

//         const img = card.querySelector("img");
//         const heading = card.querySelector(".blog_heading h3");
//         const meta = card.querySelectorAll(".blog_cret_date p");

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: card,
//             start: "top 120%",
//             toggleActions: "play none none reverse",
//           }
//         });

//         tl.from(card, {
//           opacity: 0,
//           y: 80,
//           duration: 0.8,
//           ease: "power3.out",
//         })
//           .from(img, {
//             opacity: 0,
//             scale: 1.2,
//             duration: 0.7,
//             ease: "power2.out",
//           }, "-=0.4")
//           .from(heading, {
//             y: 30,
//             opacity: 0,
//             duration: 0.6,
//             ease: "power3.out",
//           }, "-=0.4")
//           .from(meta, {
//             y: 20,
//             opacity: 0,
//             stagger: 0.15,
//             duration: 0.45,
//             ease: "power2.out",
//           }, "-=0.3");

//       });

//       ScrollTrigger.refresh();
//     });

//     return () => cancelAnimationFrame(id);
//   }, [pathname]);

//   return (
//     <>
//       <section className='blog_page_main_area'>
//         <div className='blog_page_main_area_inner'>
//           <h2>Latest Blog of this Week</h2>
//           <div className='blog_page_main_all'>


//             <div className='blog_page_main_single'>
//               <img src='../images/blog1.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>

//             <div className='blog_page_main_single'>
//               <img src='../images/blog2.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>

//             <div className='blog_page_main_single'>
//               <img src='../images/blog3.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>

//             <div className='blog_page_main_single'>
//               <img src='../images/blog4.png' alt='img' />
//               <div className='blog_heading'>
//                 <h3>Achieving Peak Body Fitness with Purpose</h3>
//               </div>
//               <div className='blog_cret_date'>
//                 <p><img src='../images/user.png' alt='img' /> By : Admin</p>
//                 <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
//               </div>
//               <div className='blog_button'>
//                   <Link href={'/blog/blog-details'}><img src='../images/rarw2.png' alt='img' /></Link>
//               </div>
//             </div>


//           </div>
//         </div>
//         <img className='blog_detl_img' src='../images/bd_cyc.png' alt='img' />
//       </section>
//     </>
//   )
// }

// export default Blog;
