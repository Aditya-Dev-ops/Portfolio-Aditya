import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BentoTilt from "../components/BentoTilt";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const ZentryRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  
  const leftTextRef = useRef(null);
  const RightTextRef = useRef(null);
  const videoRef = useRef(null);
  const [mouseEnter , setMouseEnter] = useState(false);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [ZentryRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

 // For Video Playing on mouse enter
  // useEffect(() => {
  //   const video = videoRef.current;
    
  //   if(!video) return;

  //   if (mouseEnter) {
  //     video.play();
  //     // video.muted = false;      // 👈 Make sure audio is not muted
  //   } else {
  //     video.pause();
  //   }
  // }, [mouseEnter]);
  

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        {/* Parent div of Projects */}
        <div className="showcaselayout">
          {/* First Project */}
          <BentoTilt>
           <div 
            onClick={()=>(
              window.open("https://zentry-aditya.netlify.app/", "_blank")
            )}
             className="first-project-wrapper" ref={ZentryRef}>
             <div className="image-wrapper" onMouseEnter={()=>setMouseEnter(true)} onMouseLeave={()=> setMouseEnter(false)}>
             <h2 className="special-font uppercase z-30 text-7xl flex flex-col ">   
              <p className="absolute top-0 z-40 "
               ref={leftTextRef}
              >
                Ze<b>n</b>try 
              </p>
              <p
               ref={RightTextRef}
              className="ml-20vw absolute bottom-0 z-40 right-10">
              G<b>A</b>MING 
              </p>
            </h2>

              <video ref={videoRef} src="/videos/hero-cut-1.mp4"  loop muted playsInline autoPlay />
              {/* <img src="/public/images/project1" alt="Ryde" /> */}
             </div>
             <div className="text-content">
               <h2 className="special-font uppercase">Zentry A G<b>A</b>MING Platform </h2>
               <div>

               <p className="text-white-50 md:text-xl flex gap-5">
                An Web built with React , TailwindCSS , Gsap.
               </p>
               </div>
             </div>
           </div>
          </BentoTilt>

          {/* two project container */}

          <div className="project-list-wrapper overflow-hidden">
            {/* second project */}
          <BentoTilt>
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/project2.png"
                  alt="Library Management Platform"
                  />
              </div>
              <h2>The Library Management Platform</h2>
            </div>
          </BentoTilt>
            {/* third Project */}
           <BentoTilt>
            <div className="project w-full h-full" ref={ycDirectoryRef}
            onClick={()=>(
              window.open("https://project-management-aditya.vercel.app/", "_blank")
            )}
            >
              <div className="image-wrapper p-0 m-0 bg-[#FFE7EB] rounded-2xl">
                <img src="images/project-management-images.jpg" alt="YC Directory App" 
                 className="object-cover"
                />

              </div>
              <h2>Project-Management - A Project Handling App</h2>
            </div>
          </BentoTilt>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;