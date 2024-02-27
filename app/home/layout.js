import Menu from "./menu";

export default function HomeLayout({ children }) {
  return (
    <>
      <div className="min-h-full">
        <nav className="glass">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">NAMA WEB</div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Menu name="Home" href="/home" />
                    <Menu name="Movie" href="/movie" />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">AAA</div>
            </div>
          </div>
        </nav>
        <main>
          <div className="mx-auto  py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
