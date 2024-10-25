import Image from "next/image";
import React from "react";

import aboutImg from "../../../../public/images/about.jpg";
import Hero from "@/components/sections/Hero/Hero";


const About = () => {
  return (
    <section className=" pt-40">
      <div className="container  ">
        <Hero />
        <div className="grid grid-cols-2  items-center ">
          <h1 className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, dicta!
          </h1>
          <Image
            src={aboutImg}
            width={500}
            height={500}
            priority={true}
            alt="about"
            className="rounded-md shadow-xl"
          />
        </div>

        
      </div>
    </section>
  );
};

export default About;
