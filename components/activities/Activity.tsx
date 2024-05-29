import { formatDistance } from "date-fns";
import Button from "../Button";
import { Icon } from '@iconify/react';
import { Progress } from "@nextui-org/react";

type Props = {
  title: string
  createdAt: Date
  isCompleted?: boolean
}
const Activity = ({
  title,
  createdAt,
  isCompleted = false
}: Props) => {

  const formatedDate = formatDistance(createdAt, new Date(), { addSuffix: true });

  return (
    <div className="grid grid-cols-4 gap-2 bg-white/50 p-2 rounded">
      <div className="col-span-2 flex flex-col gap-1">
        <h2 className="md:leading-none max-md:text-sm">{title}</h2>
        <p className="text-gray-custom-200 max-md:text-xs">{formatedDate}</p>
      </div>
      <div className="col-span-1 max-md:row-start-2 max-md:col-span-full">
        {
          isCompleted ?
            <CompletedLable /> :
            <InProgress fraction={1 / 3} text="waiting for 2 people" />
        }
      </div>
      <div className="col-span-1 col-start-4 justify-self-end">
        <Button variant="flat" className="bg-white">
          Download
        </Button>
      </div>
    </div>
  )
}

export default Activity

const CompletedLable = () => (
  <div className="flex items-center gap-2 max-md:text-sm">
    <span
      className="bg-secondary min-h-5 min-w-5 max-h-5 max-w-5
      rounded-full flex items-center justify-center">
      <Icon icon="akar-icons:check" className="text-primary" />
    </span>
    <span className="leading-none select-none">Completed</span>
  </div>
)

const InProgress = ({
  fraction,
  text
}: {
  fraction: number
  text: string
}) => {
  const progress = Math.floor((1 / 3) * 100);

  return (
    <div className="flex flex-col gap-1 max-md:text-sm">
      <Progress
        aria-label="Completion progress" value={progress}
        color="secondary"
        className="max-w-md"
        classNames={{
          track: "h-2 border border-primary",
          indicator: "ring-1 ring-primary",
        }}
      />
      <p className="text-xs md:text-sm text-gray-custom-300">{ text }</p>
    </div>
  )
}