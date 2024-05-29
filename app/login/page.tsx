'use client'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { HeaderContentContext } from '@/contexts';
import Link from 'next/link';
import Button from '@/components/Button';
import { Input } from '@nextui-org/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {}

const Login = (props: Props) => {
  const {
    content, setContent,
    contentRight, setContentRight,
    contentLeft, setContentLeft
  } = useContext(HeaderContentContext)
  useLayoutEffect(() => {
    setContentRight!(() => (
      <h2 className='md:text-xl'>Login</h2>
    ))
  }, [])

  const [form] = useState({
    email: 'user@gmail.com', // remove this in production
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

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!form.email) {
      toast.error('Your wallet address has not been resolved. Please try again.')
      return
    }
    // navigate to the next page
    router.push('/app')
  }

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='bg-white rounded p-6 md:p-20 w-[582px] md:max-w-[90%] border border-gray-custom-100'>
        <h1 className='font-bold'>Login to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
          <div className='space-y-5 select-none'>
            <Input
              value={form.email}
              // onValueChange={(value) => setForm({ ...form, wallet: value })}
              type="text"
              label="Your email address"
              variant="bordered"
              placeholder="user@gmail.com"
              isReadOnly
              isDisabled
              classNames={styles}
            />
          </div>
          
          <Button
            type='submit'
            className='uppercase'>
            Proceed
          </Button>
          <Link className='flex self-end' href='/register'>Sign up for free</Link>
        </form>
      </div>
    </div>
  )
}

export default Login