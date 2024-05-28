'use client'
import { useContext, useEffect, useState } from 'react'
import { HeaderContentContext } from '@/contexts';
import Link from 'next/link';
import Button from '@/components/Button';
import { Input } from '@nextui-org/react';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

type Props = {}

const login = (props: Props) => {
  const {
    content, setContent,
    contentRight, setContentRight,
    contentLeft, setContentLeft
  } = useContext(HeaderContentContext)
  useEffect(() => {
    setContentRight!(() => (
      <h2>Lets get you all set-up</h2>
    ))
  }, [])

  const [form, setForm] = useState({
    wallet: '',
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
    if(!form.wallet || !form.password) {
      toast.error('Please fill all fields')
      return
    }
    console.log(form)
  }

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='bg-white rounded p-6 md:p-20 w-[582px] md:max-w-[90%] border border-gray-custom-100'>
        <h1 className='font-bold'>Signup to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
          <div className='space-y-5'>
            <Input
              value={form.wallet}
              // onValueChange={(value) => setForm({ ...form, wallet: value })}
              type="text"
              label="Enter your wallet address"
              variant="bordered"
              placeholder="1FRMM8PEiWXYax7rpS6X4X..."
              isReadOnly
              isDisabled
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
                  <Icon
                    className='text-2xl'
                    icon={isVisible ? "solar:eye-bold": "solar:eye-closed-bold"}
                  />
                </button>
              }
              type={isVisible ? "text" : "password"}
              classNames={styles}
            />
          </div>
          <Button
            type='submit'
            className='mt-5 uppercase'>
            Proceed
          </Button>
          <Link className='flex self-end' href='/login'>Or Login?</Link>
        </form>
      </div>
    </div>
  )
}

export default login