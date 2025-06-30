import { useEffect, useRef, useState } from "react";
import { socialImgs } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
 
const Footer = () => {
  const [checkCopy , setCheckCopy] = useState(false);
  const copyRef = useRef(null);

  const copied = (e)=>{
    e.preventDefault();
    navigator.clipboard.writeText("aditya.developer.33@gmail.com");
     setCheckCopy(true);
  };

  useEffect(()=>{
   if(checkCopy && copyRef.current){
    const tl = gsap.timeline();
    tl.fromTo(copyRef.current,
      {y:10 , opacity:0},{y:0,opacity:1,duration:0.3}
    )
    .to(copyRef.current,{
      opacity:0,
      duration:0.2,
      delay:0.5,
      y:10,
      onComplete: ()=> setCheckCopy(false),
    })
   }
  },[checkCopy])

 

  return (
    <footer className="footer ">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Aditya Sharma </p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className={`${socialImg.name === "GitHub" ?"icon2":"icon1"}`}
            onClick={()=>
              window.location.href = socialImg.url
            }
            >
              <img src={socialImg.imgPath} alt="social icon" />
            </div>
          ))}
        </div>
        
        <div className="flex `flex-col justify-center items-center ml-4"
         onClick={copied}
        >          
              aditya.developer.33@gmail.com
              
                <span 
                 ref={copyRef}
                 className="text-sm absolute flex flex-row gap-2 -mt-8 opacity-0">
                  <img src="/images/copy.jpeg" alt="copy"  className="size-4"/>
                  Copy 
                </span>
              
        </div>
      </div>
    </footer>
  );
};

export default Footer;


