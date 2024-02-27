import { FaComment, FaEye, FaHeart } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";

export default function VideoCards({ id }) {
  return (
    <>
      <Link href={`/watch/${id}`}>
        <div className=" transition duration-200 ease-in-out transform hover:scale-105 hover:z-50 each mb-10 m-2 shadow-lg border-gray-800 bg-gray-800 relative">
          <Image
            className="w-full"
            width={310}
            height={175}
            src="/assets/images/1280x720.png"
            alt=""
          />
          <div className="badge absolute top-0 right-0 bg-indigo-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
            10:53
          </div>
          <div className="info-box w-full text-xs flex p-1 font-semibold text-gray-500 bg-gray-300 text-center">
            <div className=" grow mr-1 p-1 px-2 font-bold flex flex-nowrap gap-1 items-center justify-center">
              <FaEye /> 105
            </div>
            <div className=" grow mr-1 p-1 px-2 font-bold border-l border-gray-400 flex flex-nowrap gap-1 items-center justify-center">
              <FaHeart className="text-red-700" /> 105
            </div>
            <div className=" grow mr-1 p-1 px-2 font-bold border-l border-gray-400 flex flex-nowrap gap-1 items-center justify-center">
              <FaComment /> 105
            </div>
          </div>
          <div className="desc p-4 text-gray-200">
            <div className="title font-bold block cursor-pointer hover:underline">
              Pubg Mobile
            </div>

            {/* <span className="description text-sm block py-2 border-gray-400 mb-2">
            lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
          </span> */}
          </div>
        </div>
      </Link>
    </>
  );
}
