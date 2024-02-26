import Menu from "./menu";

export default function HomeLayout({ children }) {
  return (
    <>
      <div class="min-h-full">
        <nav class="glass">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">NAMA WEB</div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline space-x-4">
                    <Menu name="Home" href="/home" />
                    <Menu name="Movie" href="/movie" />
                  </div>
                </div>
              </div>
              <div class="hidden md:block">AAA</div>
            </div>
          </div>
        </nav>
        <main>
          <div class="mx-auto  py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
