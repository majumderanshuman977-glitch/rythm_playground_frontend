"use client";

import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* ---------------- INNER COMPONENT (uses useSearchParams) ---------------- */
function BlogDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [blog, setBlog] = useState(null);
  const [bloglist, setBloglist] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripHtml = (html = "") => {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};
  // Fetch single blog
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setBlog(null);

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}blogs/${id}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (data.status) {
          console.log("Fetched blog data:", data.data);
          setBlog(data.data);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Fetch blog list
  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}blogs`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (data.status) {
          setBloglist(data.data);
        }
      } catch (err) {
        console.error("Error fetching blog list:", err);
      }
    };

    fetchBlogList();
  }, []);

  if (loading) {
    return <p className="text-center py-5">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center py-5">Blog not found</p>;
  }

  return (
    <section className="blogdetail_area_main">
      <div className="blogdetail_area_inner">

        {/* LEFT BLOG DETAIL */}
        <div className="blogdetail_area_left">
          <h2>{blog.title}</h2>

          <div className="blog_cret_date_detl">
            <p>
              <img src="../images/user.png" alt="img" /> By : {blog.role}
            </p>
            <p>
              <img src="../images/calendar.png" alt="img" />{" "}
              {blog.published_date}
            </p>
          </div>

          <div className="blog_img">
            <img
              src={blog.image_url || "../images/blog1.png"}
              alt={blog.title}
            />
          </div>

          <div className="blog_content">
            {/* <p>{blog.content}</p> */}
            <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
          </div>
        </div>

        {/* RIGHT LATEST BLOGS */}
        <div className="blogdetail_area_right">
          <h3>Latest News</h3>

          <div className="latest_blg_all">
            {bloglist
              .filter((item) => item.id != id)
              .slice(0, 6)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/blog-details?id=${item.id}`}
                >
                  <div className="latest_blog_sing">
                    <img
                      src={item.image_url || "../images/blog1.png"}
                      alt={item.title}
                    />
                    <div className="latest_blg_cont">
                      <h3>{item.title}</h3>
                      <p>
  {item.content
    ? stripHtml(item.content).slice(0, 80) + "..."
    : ""}
</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- PAGE EXPORT (Suspense wrapper) ---------------- */
export default function Page() {
  return (
    <Suspense fallback={<p className="text-center py-5">Loading blog...</p>}>
      <BlogDetailsContent />
    </Suspense>
  );
}


// "use client";

// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { useSearchParams  } from "next/navigation";
// function page() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   console.log(id);

//   const [blog, setBlog] = useState(null);
//   const [bloglist, setBloglist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     if (!id) return; 

//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}blogs/${id}`,
//           { cache: "no-store" }
//         );
//         const data = await res.json();

//         if (data.status) {
//           setBlog(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchBlogList = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}blogs`, { cache: "no-store" });
//         const data = await res.json();
//         if (data.status) {
//           setBloglist(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching blog list:", error);
//       }
//     }
//     fetchBlogList();

//     fetchBlog();
//   }, [id]); // ✅ depend on id

//   if (loading) {
//     return <p className="text-center py-5">Loading blog...</p>;
//   }  if (!blog) {
//     return <p className="text-center py-5">Blog not found</p>;
//   }
//   return (
//     <>
//        <section className='blogdetail_area_main'>
//            <div className='blogdetail_area_inner'>
//                <div className='blogdetail_area_left'>
//                    <h2>{blog.title}</h2>
//                    <div className='blog_cret_date_detl'>
//                         <p><img src='../images/user.png' alt='img' /> By : {blog.role}</p>
//                         <p><img src='../images/calendar.png' alt='img' /> {blog.published_date}</p>
//                     </div>
//                    <div className='blog_img'>
//                       <img src='../images/blog1.png' alt='img' />
//                    </div>
//                    <div className='blog_content'>
//                       <p>{blog.content}</p>
//                    </div>
//                </div>

//                <div className="blogdetail_area_right">
//   <h3>Latest News</h3>

//   <div className="latest_blg_all">
//     {bloglist.slice(0, 6).map((item) => (
//       <Link
//         key={item.id}
//         href={`/blog/blog-details?id=${item.id}`}
//       >
//         <div className="latest_blog_sing">

//           {/* IMAGE */}
//           <img
//             src={item.image_url || "/images/blog1.png"}
//             alt={item.title}
//           />

//           {/* CONTENT */}
//           <div className="latest_blg_cont">
//             <h3>{item.title}</h3>
//             <p>
//               {item.short_description
//                 ? item.short_description
//                 : item.content?.slice(0, 80) + "..."}
//             </p>
//           </div>

//         </div>
//       </Link>
//     ))}
//   </div>
// </div>

              
//            </div>
//        </section>
//     </>
//   )
// }

// export default page;




 {/* <div className='blogdetail_area_right'>
                  <h3>Latest News</h3>
                  <div className='latest_blg_all'>
                    <Link href={''}>
                      <div className='latest_blog_sing'>
                          <img src='../images/blog1.png' alt='img' />
                          <div className='latest_blg_cont'>
                             <h3>Simply random text</h3>
                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                          </div>
                      </div>
                    </Link>
                    <Link href={''}>
                      <div className='latest_blog_sing'>
                          <img src='../images/blog1.png' alt='img' />
                          <div className='latest_blg_cont'>
                            <h3>Simply random text</h3>
                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                          </div>
                      </div>
                    </Link>
                    <Link href={''}>
                      <div className='latest_blog_sing'>
                          <img src='../images/blog1.png' alt='img' />
                          <div className='latest_blg_cont'>
                            <h3>Simply random text</h3>
                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                          </div>
                      </div>
                    </Link>
                    <Link href={''}>
                      <div className='latest_blog_sing'>
                          <img src='../images/blog1.png' alt='img' />
                          <div className='latest_blg_cont'>
                            <h3>Simply random text</h3>
                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                          </div>
                      </div>
                    </Link>
                    <Link href={''}>
                      <div className='latest_blog_sing'>
                          <img src='../images/blog1.png' alt='img' />
                          <div className='latest_blg_cont'>
                            <h3>Simply random text</h3>
                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                          </div>
                      </div>
                    </Link>
                    <Link href={''}>
                      <div className='latest_blog_sing'>
                          <img src='../images/blog1.png' alt='img' />
                          <div className='latest_blg_cont'>
                            <h3>Simply random text</h3>
                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                          </div>
                      </div>
                    </Link>
                  </div>
               </div> */}