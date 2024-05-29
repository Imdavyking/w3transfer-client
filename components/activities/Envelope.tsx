import { subDays } from "date-fns"
import Activity from "./Activity"

type Props = {}

const Envelope = (props: Props) => {
  return (
    <section className="grid gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Activity
          key={i}
          isCompleted={i % 2 === 0}
          title={`Complete with ${process.env.NEXT_PUBLIC_APP_NAME}: mou-david-favour.pdf`}
          createdAt={subDays(new Date(), 3)}
        />
      ))}
    </section>
  )
}

export default Envelope