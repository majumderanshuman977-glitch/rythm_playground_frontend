import Link from 'next/link';
import React from 'react'

function page() {
  return (
    <>
       <section className='blogdetail_area_main'>
           <div className='blogdetail_area_inner'>
               <div className='blogdetail_area_left'>
                   <h2>Achieving Peak Body Fitness with Purpose</h2>
                   <div className='blog_cret_date_detl'>
                        <p><img src='../images/user.png' alt='img' /> By : Admin</p>
                        <p><img src='../images/calendar.png' alt='img' /> Sept 25, 2025</p>
                    </div>
                   <div className='blog_img'>
                      <img src='../images/blog1.png' alt='img' />
                   </div>
                   <div className='blog_content'>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet.</p>
                   </div>
               </div>
               <div className='blogdetail_area_right'>
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
               </div>
           </div>
       </section>
    </>
  )
}

export default page;
