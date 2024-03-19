export default function Header() {
  return (
    <>
      {" "}
      <header className="header bg-[#212129] shadow py-4 px-4 h-10  ">
        <div className="header-content flex items-center flex-row">
          <div className="flex ml-auto">
            {/* <a className="flex flex-row items-center">
              {"{{"} GAMBAR {"}}"}
              <img
            src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
            alt
            className="h-10 w-10 bg-gray-200 border rounded-full"
          />
              <span className="flex flex-col ml-2">
                <span className="truncate w-20 font-semibold tracking-wide leading-none">
                  {"{{"} NAMA USER {"}}"}
                </span>
                <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                  {"{{"} ROLE {"}}"}
                </span>
              </span>
            </a> */}
          </div>
        </div>
      </header>
    </>
  );
}
