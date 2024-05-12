import React from 'react'

type Props = {}

const Footer = ({}: Props) => {
  return (
    <footer className='bg-white border-t border-gray-custom-100'>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 bg-white py-5">
        <h2 className='text-xl font-bold text-gray-custom-100'>{ process.env.NEXT_PUBLIC_APP_NAME }</h2>
      </div>
    </footer>
  )
}

export default Footer