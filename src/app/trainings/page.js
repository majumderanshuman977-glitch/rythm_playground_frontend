"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Main component logic
function TrainingsContent() {
  const wrapperRef = useRef(null);
  const itemsRef = useRef([]);
  const rafRef = useRef(null);

  const progressRef = useRef(0);
  const startXRef = useRef(0);
  const draggingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const enabledRef = useRef(false);

  const speedWheel = 0.02;
  const speedDrag = -0.15;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState(null);

  console.log("categoryId : ", categoryId);
  console.log("Videos : ", videos);

  useEffect(() => {
    const id = searchParams.get("categoryId");
    setCategoryId(id);
  }, [searchParams]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}short-videos`;

        if (categoryId) {
          url += `?classType=${categoryId}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];

        console.log("List Videos : ", list);

        const filteredVideos = categoryId
          ? list.filter(
              (item) =>
                item.service_id &&
                String(item.service_id) === String(categoryId)
            )
          : list;

        setVideos(filteredVideos);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [categoryId]);

  const getZindex = (array, index) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  const displayItems = (item, index, active) => {
    if (!item) return;
    const zIndex = getZindex(itemsRef.current, active)[index];

    item.style.setProperty("--zIndex", zIndex);
    item.style.setProperty(
      "--active",
      (index - active) / itemsRef.current.length
    );

    item.classList.toggle("active-slide", index === active);
  };

  const animate = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const items = itemsRef.current.filter(Boolean);
      if (!items.length) return;

      progressRef.current = Math.max(0, Math.min(100, progressRef.current));
      activeIndexRef.current = Math.floor(
        (progressRef.current / 100) * (items.length - 1)
      );

      items.forEach((item, index) =>
        displayItems(item, index, activeIndexRef.current)
      );
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        enabledRef.current = entry.intersectionRatio > 0.5;
      },
      { threshold: 0.5 }
    );
    io.observe(wrapper);

    const onWheel = (e) => {
      if (!enabledRef.current) return;

      const next = progressRef.current + e.deltaY * speedWheel;
      if (next <= 0 || next >= 100) return;

      e.preventDefault();
      progressRef.current = next;
      animate();
    };

    const onPointerDown = (e) => {
      if (!enabledRef.current) return;
      draggingRef.current = true;
      startXRef.current = e.clientX;
    };

    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      startXRef.current = e.clientX;
      progressRef.current += dx * speedDrag;
      animate();
    };

    const onPointerUp = () => {
      draggingRef.current = false;
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    wrapper.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    animate();

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [videos]);

  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (videoUrl) => {
    setActiveVideo(videoUrl);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div ref={wrapperRef} className="carousel-wrapper">
        <div className="carousel">
          {videos.map((item, idx) => (
            <div key={item._id || idx} className="carousel-item-wrapper">
              <div
                className="carousel-item"
                ref={(el) => (itemsRef.current[idx] = el)}
                style={{
                  backgroundImage: `url(${item.thumbnail || item.image})`,
                }}
              >
                <div className="single_tranning_video">
                  <h2>{item.title || `${idx + 1}`}</h2>

                  <div
                    className="play_btn"
                    onClick={() => openVideo(item.video)}
                  >
                    <img src="../images/play.png" alt="play" />
                  </div>

                  <div className="tranin_overlay" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="video_popup" onClick={closeVideo}>
          <div
            className="video_popup_inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close_btn" onClick={closeVideo}>
              ✕
            </button>

            <video controls autoPlay>
              <source src={activeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}

// Wrapper with Suspense
export default function Trainings() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TrainingsContent />
    </Suspense>
  );
}
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function Trainings() {
//   const wrapperRef = useRef(null);
//   const itemsRef = useRef([]);
//   const rafRef = useRef(null);

//   const progressRef = useRef(0);
//   const startXRef = useRef(0);
//   const draggingRef = useRef(false);
//   const activeIndexRef = useRef(0);
//   const enabledRef = useRef(false);

//   const speedWheel = 0.02;
//   const speedDrag = -0.15;

//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ------------------ API FETCH ------------------ */

//   const searchParams = useSearchParams();
//   const [categoryId, setCategoryId] = useState(null);

//   console.log("categoryId : ", categoryId)
//   console.log("Videos : ", videos)

//   useEffect(() => {
//     const id = searchParams.get("categoryId");
//     setCategoryId(id);
//   }, [searchParams]);





// useEffect(() => {
//   const fetchVideos = async () => {
//     try {
//       let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}short-videos`;

//       // ✅ condition: add classType only if categoryId exists
//       if (categoryId) {
//         url += `?classType=${categoryId}`;
//       }

//       const res = await fetch(url);
//       const json = await res.json();

//       const list = Array.isArray(json.data)
//         ? json.data
//         : Array.isArray(json)
//         ? json
//         : [];

//         console.log("List Videos : ", list)

//       const filteredVideos = categoryId
//         ? list.filter(
//             (item) =>
//               item.service_id &&
//               String(item.service_id) === String(categoryId)
//           )
//         : list;

//       setVideos(filteredVideos);
//     } catch (err) {
//       console.error("API Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchVideos();
// }, [categoryId]);


//   const getZindex = (array, index) =>
//     array.map((_, i) =>
//       index === i ? array.length : array.length - Math.abs(index - i)
//     );

//   const displayItems = (item, index, active) => {
//     if (!item) return;
//     const zIndex = getZindex(itemsRef.current, active)[index];

//     item.style.setProperty("--zIndex", zIndex);
//     item.style.setProperty(
//       "--active",
//       (index - active) / itemsRef.current.length
//     );

//     item.classList.toggle("active-slide", index === active);
//   };

//   const animate = () => {
//     cancelAnimationFrame(rafRef.current);
//     rafRef.current = requestAnimationFrame(() => {
//       const items = itemsRef.current.filter(Boolean);
//       if (!items.length) return;

//       progressRef.current = Math.max(0, Math.min(100, progressRef.current));
//       activeIndexRef.current = Math.floor(
//         (progressRef.current / 100) * (items.length - 1)
//       );

//       items.forEach((item, index) =>
//         displayItems(item, index, activeIndexRef.current)
//       );
//     });
//   };

//   /* ------------------ EVENTS ------------------ */
//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;

//     const io = new IntersectionObserver(
//       ([entry]) => {
//         enabledRef.current = entry.intersectionRatio > 0.5;
//       },
//       { threshold: 0.5 }
//     );
//     io.observe(wrapper);

//     const onWheel = (e) => {
//       if (!enabledRef.current) return;

//       const next = progressRef.current + e.deltaY * speedWheel;
//       if (next <= 0 || next >= 100) return;

//       e.preventDefault();
//       progressRef.current = next;
//       animate();
//     };

//     const onPointerDown = (e) => {
//       if (!enabledRef.current) return;
//       draggingRef.current = true;
//       startXRef.current = e.clientX;
//     };

//     const onPointerMove = (e) => {
//       if (!draggingRef.current) return;
//       const dx = e.clientX - startXRef.current;
//       startXRef.current = e.clientX;
//       progressRef.current += dx * speedDrag;
//       animate();
//     };

//     const onPointerUp = () => {
//       draggingRef.current = false;
//     };

//     wrapper.addEventListener("wheel", onWheel, { passive: false });
//     wrapper.addEventListener("pointerdown", onPointerDown);
//     window.addEventListener("pointermove", onPointerMove);
//     window.addEventListener("pointerup", onPointerUp);

//     animate();

//     return () => {
//       io.disconnect();
//       cancelAnimationFrame(rafRef.current);
//       wrapper.removeEventListener("wheel", onWheel);
//       wrapper.removeEventListener("pointerdown", onPointerDown);
//       window.removeEventListener("pointermove", onPointerMove);
//       window.removeEventListener("pointerup", onPointerUp);
//     };
//   }, [videos]);





  

//   const [activeVideo, setActiveVideo] = useState(null);

//   const openVideo = (videoUrl) => {
//     setActiveVideo(videoUrl);
//   };

//   const closeVideo = () => {
//     setActiveVideo(null);
//   };

//   /* ------------------ JSX ------------------ */
//   if (loading) return <p>Loading...</p>;

//  return (
//     <>
//       {/* Carousel */}
//       <div ref={wrapperRef} className="carousel-wrapper">
//         <div className="carousel">
//           {videos.map((item, idx) => (
//             <div key={item._id || idx} className="carousel-item-wrapper">
//               <div
//                 className="carousel-item"
//                 ref={(el) => (itemsRef.current[idx] = el)}
//                 style={{
//                   backgroundImage: `url(${item.thumbnail || item.image})`,
//                 }}
//               >
//                 <div className="single_tranning_video">
//                   <h2>{item.title || `${idx + 1}`}</h2>

//                   {/* PLAY BUTTON */}
//                   <div
//                     className="play_btn"
//                     onClick={() => openVideo(item.video)}
//                   >
//                     <img src="../images/play.png" alt="play" />
//                   </div>

//                   <div className="tranin_overlay" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* VIDEO POPUP */}
//       {activeVideo && (
//         <div className="video_popup" onClick={closeVideo}>
//           <div
//             className="video_popup_inner"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button className="close_btn" onClick={closeVideo}>
//               ✕
//             </button>

//             <video controls autoPlay>
//               <source src={activeVideo} type="video/mp4" />
//             </video>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }