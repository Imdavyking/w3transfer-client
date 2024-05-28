import { Button as Btn } from "@nextui-org/react"
import { ReactNode } from "react"

export type Props = {
  children: ReactNode | string
  className?: string
  type?: "button" | "submit" | "reset"
  href?: string
  onPress?: () => void
}
const Button = ({
  children,
  className,
  type = "button",
  href,
  onPress,
}: Props) => {
  return (
    <Btn
      variant="solid"
      color="secondary"
      type={type}
      href={href}
      onPress={onPress}
      className={`${className} h-10 rounded text-primary`}>
      {children}
    </Btn>
  )
}
export default Button