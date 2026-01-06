import Link from 'next/link'
import React, { useEffect } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

function footer() {



// useEffect(() => {
//     const elements = gsap.utils.toArray(".foot_sing");

//     gsap.from(elements, {
//       y: 120,               // ↓ starts down
//       opacity: 0,
//       duration: 1.2,
//       stagger: 0.3,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".main_footer_area_inner",
//         start: "top 0%",       // when footer enters screen
//         toggleActions: "play reverse play reverse",  
//       }
//     });

//   }, []);


  return (
    <>
      <section className='main_footer_area'>
          <div className='main_footer_area_inner'>
             <div className='footer_left foot_sing'>
                <img src="/images/logo.png" alt="icon" />
             </div>
             <div className='footer_second foot_sing'>
                <h3>Company</h3>
                <ul>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> All Business & Membership Terms</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Privacy policy</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Terms and Conditions</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Career</Link></li>
                </ul>
             </div>
             <div className='footer_third foot_sing'>
                <h3>Usefull links</h3>
                <ul>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Home</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> About us</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Class Schedule</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Blog</Link></li>
                  <li><Link href={''}><img src="/images/rarw.png" alt="icon" /> Contact us</Link></li>
                </ul>
             </div>
             <div className='footer_fourth foot_sing'>
                <h3>Whatsapp Channel</h3>
                <Link href={''}>
                    <img src="/images/whatsapp.png" alt="icon" />
                    <div className='joinchnl'>
                        <p>Join Our</p>
                        <h4>Whatsapp Channel</h4>
                    </div>
                </Link>
             </div>
          </div>
          <div className='footer_bottom_area'>
             <p>@ Copy Right 2025</p>
             <p>Powered by :<Link href={''}>Codebuzzers Technologies</Link></p>
          </div>
      </section>
    </>
  )
}

export default footer
