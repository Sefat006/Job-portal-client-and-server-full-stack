import React from 'react';
import { motion } from "motion/react"
import team1 from '../assets/office.jpg'
import team2 from '../assets/programmers.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='flex-1'>
    <motion.img
      src={team1}
      animate={{y: [50, 100, 50]}}
      transition={{
        duration: 10,
        repeat: Infinity
      }}
      className="max-w-sm w-64 rounded-tl-3xl rounded-br-3xl border-l-4 border-b-4 border-blue-300 shadow-2xl"
    />
    <motion.img
      src={team2}
      animate={{x: [100, 150, 100]}}
      transition={{
        duration: 10,
        repeat: Infinity
      }}
      className="max-w-sm w-64 rounded-tl-3xl rounded-br-3xl border-l-4 border-b-4 border-blue-300 shadow-2xl"
    />
    </div>
    <div className='flex-1'>
      <motion.h1 className="text-5xl font-bold">Job Portal For you</motion.h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Banner;