import React from "react"
import Heading from "../../Common/Heading"
import "./Hero.css"
const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Rent Your Dream House with Us' subtitle='Find new & featured property located in your local city.' />
        </div>
      </section>
    </>
  )
}

export default Hero