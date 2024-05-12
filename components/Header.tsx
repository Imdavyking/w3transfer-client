'use client'
import { useContext } from 'react';
import { HeaderContentContext } from '@/contexts';

type Props = {}

const Header = ({}: Props) => {
  const {
    content, setContent,
    contentRight, setContentRight,
    contentLeft, setContentLeft
  } = useContext(HeaderContentContext)

  // a use effect that watches if route changes and the content was not updated
  // that would mean that the page we just visited doesn't intend to set its
  // header so, we set header content to undefined so default header is used

  return (
    <header className='bg-white border-b border-gray-custom-100'>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-5 flex justify-between">
        { content || ((!contentLeft && !contentRight) && <h2 className='text-xl font-bold text-gray-custom-300'>{ process.env.NEXT_PUBLIC_APP_NAME }</h2>)}
        { (!content && (contentRight || contentLeft)) && (
          <>
          {contentLeft || <h2 className='text-xl font-bold text-gray-custom-300'>{ process.env.NEXT_PUBLIC_APP_NAME }</h2>}
          {contentRight}
          </>
        )}
      </div>
    </header>
  )
}

export default Header