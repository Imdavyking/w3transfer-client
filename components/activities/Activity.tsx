import { formatDistance } from "date-fns";

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
    <div className="grid grid-cols-4">
      <div className="col-span-2 flex flex-col gap-1">
        <h2 className="leading-none">{ title }</h2>
        <p className="text-gray-custom-200">{ formatedDate }</p>
      </div>
      <div className="col-span-1">Activity</div>
      <div className="col-span-1">Activity</div>
    </div>
  )
}

export default Activity