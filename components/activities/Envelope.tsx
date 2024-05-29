import { subDays } from "date-fns"
import Activity from "./Activity"

type Props = {}

const Envelope = (props: Props) => {
  return (
    <section className="grid gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Activity
          key={i}
          isCompleted={i % 2 === 0}
          title='Complete with DocuSign: mou-david-favour.pdf'
          createdAt={subDays(new Date(), 3)}
        />
      ))}
    </section>
  )
}

export default Envelope