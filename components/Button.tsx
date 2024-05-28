import { Button as Btn } from "@nextui-org/react"
import { ReactNode } from "react"

export type Props = {
  children: ReactNode | string
  className?: string
  type?: "button" | "submit" | "reset"
}
const Button = ({
  children,
  className,
  type = "button"
}: Props) => {
  return (
    <Btn
      variant="solid"
      color="secondary"
      type={type}
      className={`${className} h-10 rounded text-primary`}>
      {children}
    </Btn>
  )
}
export default Button