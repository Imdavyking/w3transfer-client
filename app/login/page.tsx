'use client'
import { useContext, useEffect, useState } from 'react'
import { HeaderContentContext } from '@/contexts';
import Link from 'next/link';
import Button from '@/components/Button';
import { Input } from '@nextui-org/react';
import { toast } from 'sonner';

type Props = {}

const login = (props: Props) => {
  const {
    content, setContent,
    contentRight, setContentRight,
    contentLeft, setContentLeft
  } = useContext(HeaderContentContext)
  useEffect(() => {
    setContentRight!(() => (
      <h2>Login</h2>
    ))
  }, [])

  const [form] = useState({
    wallet: '',
  })

  const styles = {
    label: "text-gray-custom-200",
    input: [
      'placeholder:text-gray-custom-200/70',
    ],
    inputWrapper: [
      'rounded',
    ]
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!form.wallet) {
      toast.error('Your wallet address has not been resolved. Please try again.')
      return
    }
    console.log(form)
  }

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='bg-white rounded p-6 md:p-20 w-[582px] md:max-w-[90%] border border-gray-custom-100'>
        <h1 className='font-bold'>Login to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
          <div className='space-y-5'>
            <Input
              value={form.wallet}
              // onValueChange={(value) => setForm({ ...form, wallet: value })}
              type="text"
              label="Enter your email / wallet address"
              variant="bordered"
              placeholder="1FRMM8PEiWXYax7rpS6X4X..."
              isReadOnly
              isDisabled
              classNames={styles}
            />
          </div>
          <Button
            type='submit'
            className='uppercase'>
            Login
          </Button>
          <Link className='flex self-end' href='/register'>Sign up for free</Link>
        </form>
      </div>
    </div>
  )
}

export default login