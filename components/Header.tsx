'use client'
import { useContext, useEffect } from 'react';
import { HeaderContentContext } from '@/contexts';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {}

const Header = ({}: Props) => {
  const {
    content, setContent,
    contentRight, setContentRight,
    contentLeft, setContentLeft
  } = useContext(HeaderContentContext)

  const path = usePathname()
  // reset header to default so page can control which what show
  useEffect(()=>{
    setContent!(undefined)
    setContentRight!(undefined)
    setContentLeft!(undefined)
  },[path])

  return (
    <header className='bg-white border-b border-gray-custom-100'>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-5 flex justify-between">
        { content || ((!contentLeft && !contentRight) && <Link href='/' className='text-xl font-bold text-gray-custom-300'>{ process.env.NEXT_PUBLIC_APP_NAME }</Link>)}
        { (!content && (contentRight || contentLeft)) && (
          <>
          {contentLeft || <Link href='/' className='text-xl font-bold text-gray-custom-300'>{ process.env.NEXT_PUBLIC_APP_NAME }</Link>}
          {contentRight}
          </>
        )}
      </div>
    </header>
  )
}

export default Header