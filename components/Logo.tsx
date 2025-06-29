import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function Logo({
  variant = "default",
  width = 100,
  height = 100,
  ...props
}: {
  variant?: "default" | "unstyled",
  height?: number,
  width?: number
} & Omit<ImageProps, "src" | "alt" | "width" | "height">) {
  return (
    <Image
      alt="Logo"
      src={variant === "default" ? "/logo.svg" : "/logo-base.svg"}
      width={width}
      height={height}
      {...props}
    />
  )
}
