import Menu from "./menu";

export default function Layout({ children }) {
  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Menu />
        <main class="main flex flex-col flex-grow -ml-64 lg:ml-0 transition-all duration-150 ease-in">
          <header class="header bg-white shadow py-4 px-4">
            <div class="header-content flex items-center flex-row">
              <div class="flex ml-auto">
                <a href class="flex flex-row items-center">
                  <img
                    src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
                    alt
                    class="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                  <span class="flex flex-col ml-2">
                    <span class="truncate w-20 font-semibold tracking-wide leading-none">
                      John Doe
                    </span>
                    <span class="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      Manager
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </header>
          <div class="main-content flex flex-col flex-grow p-4">
            <h1 class="font-bold text-2xl text-gray-700">INI ISI</h1>

            <div class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4"></div>
          </div>
          <footer class="footer px-4 py-6">
            <div class="footer-content">
              <p class="text-sm text-gray-600 text-center">
               
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
