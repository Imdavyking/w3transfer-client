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

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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
    if(!form.email || !form.password) {
      toast.error('Please fill all fields')
      return
    }
    console.log(form)
  }

  return (
    <main className='flex-1 flex justify-center items-center'>
      <div className='bg-white rounded p-10 md:p-20 w-[582px] max-w-[90%] border border-gray-custom-100'>
        <h1 className='font-bold'>Signup to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
          <div className='space-y-5'>
            <Input
              value={form.email}
              onValueChange={(value) => setForm({ ...form, email: value })}
              type="email"
              label="Enter your email / wallet address"
              variant="bordered"
              placeholder="1FRMM8PEiWXYax7rpS6X4X..."
              classNames={styles}
            />

            <Input
              value={form.password}
              onValueChange={(value) => setForm({ ...form, password: value })}
              label="Enter your password"
              variant="bordered"
              placeholder="****************"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <span>Show</span>
                    // <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <span>Hide</span>
                    // <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              classNames={styles}
            />
          </div>
          <Button
            type='submit'
            className='mt-10 uppercase'>
            Login
          </Button>
        </form>
      </div>
    </main>
  )
}

export default login