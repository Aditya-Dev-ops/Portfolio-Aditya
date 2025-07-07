import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import DraggableAudio from "./components/DraggableAudio";
import { useEffect, useState } from "react";

const App = () => {
 const [isLoading , setIsLoading] =useState(true);
useEffect(()=>{
  setTimeout(()=>{
   setIsLoading(false);
  },2000);
},[]);

 
return ( 
 <>{ isLoading && (
    <div className="flex-center absolute z-[999999]
      h-dvh w-screen overflow-hidden bg-violet-50">
      <div className="three-body">
         <div className="three-body__dot"></div>
         <div className="three-body__dot"></div>
         <div className="three-body__dot"></div>
      </div>
    </div>
    )}
    
    <DraggableAudio/>
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    {/* <Experience /> */}
    <TechStack />
    {/* <Testimonials /> */}
    <Contact />
    <Footer />
  </>
);
};


export default App;