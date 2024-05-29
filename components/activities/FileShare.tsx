import { subDays } from "date-fns"
import Activity from "./Activity"

type Props = {}

const FileShare = (props: Props) => {
  return (
    <section className="grid gap-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <Activity
          key={i}
          isCompleted={i % 2 === 0}
          title='Shared: file.pdf'
          createdAt={subDays(new Date(), 3)}
        />
      ))}
    </section>
  )
}

export default FileShare