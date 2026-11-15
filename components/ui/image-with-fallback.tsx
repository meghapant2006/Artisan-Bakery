"use client"

import React, { useState, useEffect, ImgHTMLAttributes } from "react"

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

/**
 * ImageWithFallback
 * Automatically swaps to fallback if the primary image 404s or errors.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = "/image-not-found.svg",
  onError,
  loading = "lazy",
  decoding = "async",
  className,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setErrored(false)
  }, [src])

  return (
    <img
      {...rest}
      src={imgSrc || fallbackSrc}
      alt={alt || "Bakery item"}
      loading={loading}
      decoding={decoding}
      className={className}
      onError={(e) => {
        if (!errored) {
          setErrored(true)
          setImgSrc(fallbackSrc)
        }
        onError?.(e as any)
      }}
    />
  )
}
