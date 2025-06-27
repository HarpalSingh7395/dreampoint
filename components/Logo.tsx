import Image from 'next/image'
import React from 'react'

export default function Logo({variant = "default", width, height, ...props}: React.ImgHTMLAttributes<HTMLImageElement> & {
    variant?: "default" | "unstyled"
}) {
  return (
    <Image alt='Logo' src={variant == "default" ? "/logo.svg" : "/logo-base.svg"} width={100} height={100} {...props} />
  )
}
