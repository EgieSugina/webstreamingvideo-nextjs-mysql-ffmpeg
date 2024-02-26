import React, { useEffect } from "react";

import Glide from "@glidejs/glide";

export default function CarouselControlsInside({ children }) {
  useEffect(() => {
    const slider = new Glide(".glide-01", {
      type: "slider",
      //   focusAt: "left",
      perView: 6,
      autoplay: 3000,
      animationDuration: 700,
      hoverpause: true,
      gap: 12,
      classNames: {
        nav: {
          active: "[&>*]:bg-slate-700"
        }
      }
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      {/*<!-- Component: Carousel with controls inside --> */}
      <div className="glide-01 w-full">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {children}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center text-slate-700 transition duration-300"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            {"<"}
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center text-slate-700 transition duration-300"
            data-glide-dir=">"
            aria-label="next slide"
          >
            {">"}
          </button>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script>
      {/*<!-- End Carousel with controls inside --> */}
    </>
  );
}
