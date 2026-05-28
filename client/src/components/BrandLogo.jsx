import React from 'react'

export default function BrandLogo({
  className = '',
  markClassName = '',
  textClassName = '',
  size = 34,
  showText = true,
}) {
  return (
    <>
      <svg
        className={markClassName}
        width={size}
        height={size}
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 56V30L26 36"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 14L47 34V56"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M68 56V22L47 34"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 36V56"
          stroke="currentColor"
          strokeOpacity="0.34"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M56 39V56"
          stroke="currentColor"
          strokeOpacity="0.34"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M8 30L26 14"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M47 34L68 14"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className={`${className} ${textClassName}`.trim()}>
          De Interio Cafe
        </span>
      )}
    </>
  )
}
