'use server'

import Aside from '@/components/layout/studio'
import Header from '@/components/layout/studio/header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
export default async function Layout ({ children }) {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <div className='flex flex-row min-h-screen bg-gray-700 text-gray-800'>
          <Aside Sesio={session} />
          <main className='main flex flex-col flex-grow -ml-64 lg:ml-0 transition-all duration-150 ease-in'>
            <Header />
            <div className='main-content flex flex-col flex-grow p-4'>
              <div className='flex flex-col flex-grow border-gray-400 border-dashed rounded mt-4'>
                {children}
              </div>
            </div>
            <footer className='footer px-4 py-6'>
              <div className='footer-content'>
                <p className='text-sm text-gray-600 text-center'></p>
              </div>
            </footer>
          </main>
        </div>
      </>
    )
  }
  return redirect('/login')
}
