
import { useEffect, useRef, useState } from "react";

const DraggableAudio = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement>(null!);
  const buttonWrapperRef = useRef<HTMLDivElement>(null!);
  const pos = useRef({ x: 100, y: 100 });

  useEffect(() => {
    isAudioPlaying
      ? audioElementRef.current.play()
      : audioElementRef.current.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
    const buttonEl = buttonWrapperRef.current;
    if (!buttonEl) return;

    let isDragging = false;
    let wasDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      wasDragging = false;
      offsetX = e.clientX - pos.current.x;
      offsetY = e.clientY - pos.current.y;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      wasDragging = true;

      pos.current = {
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      };

      buttonEl.style.left = `${pos.current.x}px`;
      buttonEl.style.top = `${pos.current.y}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => {
        wasDragging = false; // Reset after short time
      }, 100);

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    buttonEl.addEventListener("mousedown", onMouseDown);
    return () => {
      buttonEl.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const handleClick = () => {
    // Prevent toggle if drag occurred
    if (window.getSelection()?.toString()) return; // Skip if text was selected
    if ((window as any).wasDragging) return;

    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div
      ref={buttonWrapperRef}
      className="z-[9999] fixed"
      style={{ left: `${pos.current.x}px`, top: `${pos.current.y}px`, cursor: "grab" }}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      onMouseDown={() => ((window as any).wasDragging = false)}
      onMouseMove={() => ((window as any).wasDragging = true)}
    >
      <button
        className="flex items-center justify-center border-amber-50 border-2 h-10 w-15 bg-slate-950 p-2 rounded-full"
      >
        <audio ref={audioElementRef} className="hidden" src="/audio/aditya-intro.mp3" loop />
        {isAudioPlaying ? (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((bar) => (
              <div
                key={bar}
                className="indicator-line bg-white w-1 h-4 animate-pulse"
                style={{ animationDelay: `${bar * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          <span className="text-white">▶</span>
        )}
      </button>
    </div>
  );
};

export default DraggableAudio;
