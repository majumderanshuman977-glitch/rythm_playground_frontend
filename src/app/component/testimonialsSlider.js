"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";




function TestimonialsSlider() {
   var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: "myCustomCarousel"
  };

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  //console.log("testimonials : ", testimonials)

useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}testimonials`);

        if (!res.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const json = await res.json();

        // handle all API response shapes safely
        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.testimonials)
          ? json.testimonials
          : Array.isArray(json)
          ? json
          : [];

        setTestimonials(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


  return (
    <>
    <Slider {...settings}>

        {testimonials.map((item) => {
                  const {
                     name,
                     role,
                     review,
                     image_url,
                  } = item;

                  return (
                        <div className="testimonials_main_body" key={item._id}>
                            <div className="testi_imagebox">
                                <div className="testi_image">
                                    <img src={image_url} alt="icon" />
                                </div>
                                <div className="testi_info">
                                    <h4>{name}</h4>
                                    <h5>{role}</h5>
                                </div>
                            </div>
                            <div className="testi_content">
                            <p>{review}</p>
                            </div>
                        </div>
                  );
                  })}

        
        {/* <div className="testimonials_main_body">
            <div className="testi_imagebox">
                <div className="testi_image">
                    <img src="/images/testi_img1.png" alt="icon" />
                </div>
                <div className="testi_info">
                    <h4>Jhon Deo</h4>
                    <h5>Web Developer</h5>
                </div>
            </div>
            <div className="testi_content">
            <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
            </div>
        </div>

        <div className="testimonials_main_body">
            <div className="testi_imagebox">
                <div className="testi_image">
                    <img src="/images/testi_img1.png" alt="icon" />
                </div>
                <div className="testi_info">
                    <h4>Jhon Deo</h4>
                    <h5>Web Developer</h5>
                </div>
            </div>
            <div className="testi_content">
            <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
            </div>
        </div>

        <div className="testimonials_main_body">
            <div className="testi_imagebox">
                <div className="testi_image">
                    <img src="/images/testi_img1.png" alt="icon" />
                </div>
                <div className="testi_info">
                    <h4>Jhon Deo</h4>
                    <h5>Web Developer</h5>
                </div>
            </div>
            <div className="testi_content">
            <p>Semper nisi. Aenean vulputate eleifend tellus consequat vitae, eleifend  ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,  tellus. Phasellus viverra nulla ut metus varius laoreet..</p>
            </div>
        </div> */}

    </Slider>

    </>
  )
}

export default TestimonialsSlider
