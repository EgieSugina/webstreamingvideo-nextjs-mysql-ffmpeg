"use client"
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import React, { useEffect } from "react";

import Glide from "@glidejs/glide";
import Script from "next/script";

export default function CarouselControlsInside({
  children,
  id,
  type = "slider",
  autoplay = 3000
}) {
  useEffect(() => {
    const slider = new Glide(`.${id}`, {
      type: type,
      //   focusAt: "left",
      perView: 6,
      autoplay: autoplay,
      animationDuration: 700,
      hoverpause: true,
      gap: 4,
      classNames: {
        nav: {
          active: "[&>*]:bg-slate-700"
        }
      }
    }).mount();

    return () => {
      slider.destroy();
    };
  }, [id, type, autoplay]);

  return (
    <>
      {/*<!-- Component: Carousel with controls inside --> */}
      <div className={`${id} w-full grid min-h-[13rem] max-h-[13rem] relative`}>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 flex items-center justify-between w-full h-0 px-4 place-self-center z-50"
          data-glide-el="controls"
        >
          {/* <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 bg-white/40 shadow-lg rounded-full  lg:w-12 lg:h-12   hover:border-slate-700 hover:text-green-700  focus-visible:outline-none hover:bg-gray-800 text-white"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <FaAngleLeft />
          </button>
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 bg-white/40 shadow-lg rounded-full lg:w-12 lg:h-12  hover:border-slate-700 hover:text-green-900  focus-visible:outline-none hover:bg-gray-800 text-white"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <FaAngleRight />
          </button> */}
        </div>
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {children}
          </ul>
        </div>
      </div>

      <Script src="./glide.js" />
      {/*<!-- End Carousel with controls inside --> */}
    </>
  );
}
