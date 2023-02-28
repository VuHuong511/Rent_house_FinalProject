import React from "react"
import Back from "../Common/Back"
import "../Home/Recent/Recent.css"
import RecentCard from "../Home/Recent/RecentCard"
import img from "../images/about.jpg"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
        <div className='container recent'>
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Blog