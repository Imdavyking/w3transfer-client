import { Button as Btn, ButtonVariantProps } from "@nextui-org/react"
import { ReactNode } from "react"

export type Props = {
  children: ReactNode | string
  className?: string
  type?: "button" | "submit" | "reset"
  href?: string
  onPress?: () => void
  variant?: ButtonVariantProps['variant']
  color?: ButtonVariantProps['color']
  size?: ButtonVariantProps['size']
}
const Button = ({
  children,
  className,
  type = "button",
  href,
  onPress,
  variant = "solid",
  color = "secondary",
  size
}: Props) => {
  return (
    <Btn
      type={type}
      href={href}
      onPress={onPress}
      variant={variant}
      color={color}
      size={size}
      className={`${className} h-10 rounded text-primary`}>
      {children}
    </Btn>
  )
}
export default Button