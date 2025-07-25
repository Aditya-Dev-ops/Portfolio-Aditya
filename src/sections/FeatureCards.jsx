import { useRef } from "react";
import { abilities } from "../constants/index"

const FeatureCards = () => {
 const cardRefs= useRef([]);
  
 const handleMouseMove = (index)=>(e) => {
  const card = cardRefs.current[index];
  if(!card) return;

  const rect = card.getBoundingClientRect();

  const mouseX = e.clientX - rect.left - rect.width/2;
  const mouseY = e.clientY - rect.top - rect.height/2;

  let angle = Math.atan2(mouseY , mouseX) * (180 / Math.PI);
  angle  = (angle + 360) % 360;

  card.style.setProperty('--start', angle + 60);
}

  return (
    <div className="w-full padding-x-lg">
     <div className="mx-auto grid-3-cols">
       {abilities.map(({imgPath , title , desc} , index)=>(
         <div 
         ref={(el)=> (cardRefs.current[index] = el)}
         onMouseMove={handleMouseMove(index)}  
         key={title} className="card-border timeline-card card rounded-xl p-8 flex-col gap-4  card">
          <div className="glow"/>
            <div className="size-14 flex items-center justify-center rounded-full">
               <img src={imgPath} alt={title} />
            </div>
             <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3> 
             <p className="text-white-50 text-lg">{desc}</p>
         </div>
       ))}  
     </div>
    </div>
  )
}

export default FeatureCards;

