import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import ScrollProgress from './components/ScrollProgress'

export const metadata: Metadata = {
  title: "Scrawl: the webs news, and news critics",
  description: "Your source for the latest web news and critical analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
        <ScrollProgress />
        {/* Header */}
        <header className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 overflow-hidden rounded-md">
                  {/* Using a div with background image as fallback if Image component doesn't work in layout */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    style={{
                      backgroundImage: "url('/logo.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold">Scrawl</h1>
                <span className="text-gray-500 dark:text-gray-400 text-sm italic">the webs news, and news critics</span>
              </div>
              <div className="hidden md:flex space-x-3">
                <button className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Login</button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700">Sign Up</button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex space-x-16 overflow-x-auto py-4">
              <a href="#" className="font-medium text-blue-600 whitespace-nowrap px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/30">Home</a>
              <a href="#" className="font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md hover:text-blue-600 dark:hover:text-blue-500">Latest News</a>
              <a href="#" className="font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md hover:text-blue-600 dark:hover:text-blue-500">Tutorials</a>
              <a href="#" className="font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md hover:text-blue-600 dark:hover:text-blue-500">Resources</a>
              <a href="#" className="font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md hover:text-blue-600 dark:hover:text-blue-500">Showcase</a>
              <a href="#" className="font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md hover:text-blue-600 dark:hover:text-blue-500">Jobs</a>
            </div>
          </div>
        </nav>

        {/* Main Content with Sidebar Layout */}
        <div className="container mx-auto px-4 py-6 flex-grow bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg my-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <main className="w-full md:w-2/3 lg:w-3/4">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm p-6">
                {children}
              </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full md:w-1/3 lg:w-1/4 space-y-6">
              {/* Search Box */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-3">Search</h3>
                <div className="relative">
                  <input type="text" placeholder="Search Scrawl..." className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-700" />
                  <button className="absolute right-2 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-3">Trending Topics</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                      <p className="font-medium">#1 New Blender 4.0 Features</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">32 comments • 2 hours ago</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                      <p className="font-medium">#2 Maya vs 3ds Max in 2025</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">47 comments • 5 hours ago</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                      <p className="font-medium">#3 Best GPUs for Rendering</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">18 comments • 1 day ago</p>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-3">Recent Posts</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Texture packing workflow tips</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">by Alex • 35 min ago</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-200 to-green-300 dark:from-green-800 dark:to-green-900 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Need help with rigging</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">by Taylor • 2 hours ago</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Show off your latest model!</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">by Jordan • 5 hours ago</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600 dark:text-gray-400">© 2025 Scrawl: the webs news, and news critics. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">Terms</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">Privacy</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">Guidelines</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">FAQ</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}