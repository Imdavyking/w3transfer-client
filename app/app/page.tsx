'use client'
import { Key, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { HeaderContentContext } from '@/contexts';
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { toast } from 'sonner';
import Button from '@/components/Button';
import Envelope from '@/components/activities/Envelope';
import FileShare from '@/components/activities/FileShare';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

enum AppOptions {
  ENVELOPES = 'envelopes',
  FILES = 'files',
}

const envelopeOption = {
  id: AppOptions.ENVELOPES,
  jumboCard: {
    title: 'Sign or get signatures',
    link: '/app/new/envelopes',
    buttonText: 'Start',
  },
  activities: {
    link: '/activities/envelopes',
    component: () => <Envelope />
  }
}

const fileOption = {
  id: AppOptions.FILES,
  jumboCard: {
    title: 'Send Files',
    link: '/app/new/files',
    buttonText: 'Start',
  },
  activities: {
    link: '/activities/files',
    component: () => <FileShare />
  }
}

type Props = {}
const Dashboard = (props: Props) => {
  const {
    content, setContent,
    contentRight, setContentRight,
    contentLeft, setContentLeft
  } = useContext(HeaderContentContext)
  useLayoutEffect(() => {
    setContentLeft!(() => (
      <h2 className='md:text-xl truncate'>000aff6865635ae...</h2>
    ))
  }, [])

  const router = useRouter()
  let appOptions = [
    {
      id: AppOptions.ENVELOPES,
      label: "Send Envelopes",
    },
    {
      id: AppOptions.FILES,
      label: "Send Files",
    },
  ];
  const [selected, setSelected] = useState<string | number>(AppOptions.ENVELOPES);
  const renderedOption = selected === AppOptions.ENVELOPES ? envelopeOption : fileOption

  return (
    <div className='flex-1 flex flex-col gap-5'>
      <section className='bg-white rounded p-2.5 border border-gray-custom-100'>
        <div className="flex justify-center">
          <Tabs
            aria-label="App options"
            items={appOptions}
            selectedKey={selected}
            onSelectionChange={setSelected}
            radius='sm'>
            {(item) => (<Tab key={item.id} title={item.label}></Tab>)}
          </Tabs>
        </div>

        <div className='pt-11 pb-20 flex flex-col items-center'>
          <h2 className='text-xl font-bold text-primary'>{ renderedOption.jumboCard.title }</h2>
          <Button
            className='mt-5'
            onPress={()=>router.push(renderedOption.jumboCard.link)}>
            { renderedOption.jumboCard.buttonText }
          </Button>
        </div>
      </section>

      <section>
        <div className='flex justify-between md:text-xl'>
          <span className='font-semibold'>Recent activities</span>
          <Link href={renderedOption.activities.link}>
            All activities
          </Link>
        </div>

        <hr className='border-gray-custom-100 my-5' />

        <div>
          {/* hey */}
        </div>
      </section>
    </div>
  )
}

export default Dashboard