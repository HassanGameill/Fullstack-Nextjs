import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import React from "react";

const Hero = () => {
  return (
    <section
      className={` relative z-10 overflow-hidden pb-16 pt-[120px] dark:bg-slate-900 md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]`}
    >
      <div className="container">

      <SectionTitle
          titleEn="Vision to Reality"
          titleAr="من الرؤية إلى الواقع"
          paragraphEn="Goal-Oriented Growth: Marketing That Delivers Results, We are your partners in success goals."
          paragraphAr="نمو موجه باالتخطيط و الأهداف: تسويق يقدم نتائج ملموسه, نحن شركاء في اهداف النجاح"
          center
        />

        

      </div>
    </section>
  );
};

export default Hero;
