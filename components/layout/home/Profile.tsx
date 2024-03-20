import Link from 'next/link'
import { LoginButton, LogoutButton } from '@/components/buttons.component'
import { MdVideoLibrary } from 'react-icons/md'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import { getUserSession } from './dataVideo'
export default function Account () {
  const [session, setsession] = useState<any>(null)
  const [Users, setUsers] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      const { session, users } = await getUserSession()
      setsession(session)
      setUsers(users)
    }
    getData()
  }, [])

  return (
    <>
      <div className=' gap-4 flex text-center place-items-center '>
        {session ? (
          <>
            <Link
              href='/profile'
              className='relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-lg text-white'
            >
              <ImgProfile users={Users} session={session} />
            </Link>
            <span>{session.user.name}</span>
            {(session.user.role.includes('Admin') ||
              session.user.role.includes('Staff')) && (
              <>
                <Link href='/studio'>
                  <div
                    className='z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover bg-green-800 rounded-md'
                    // type="button"
                    // data-hover="true"
                  >
                    Studio{' '}
                    <MdVideoLibrary className=' font-extrabold text-2xl' />{' '}
                  </div>
                </Link>
              </>
            )}
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
          </>
        )}
      </div>
    </>
  )
}

function ImgProfile ({ session, users }) {
  return (
    <>
      {users.img ? (
        <>
          {' '}
          <Image
            src={`data:image/png;base64,${users.img}`}
            width={100}
            height={100}
            alt='Profile'
            className=' rounded-full'
          />
        </>
      ) : (
        <>
          <div className={'w-[100] h-[100] rounded-full'}>
            {session.user.name.split('')[0]}
          </div>
        </>
      )}
    </>
  )
}
