import React from 'react'

const Wrapper = ({
  children,
  className = "",
  padding = "default",
  rounded = true
}) => {
  // Define padding variants
  const paddingVariants = {
    none: "",
    sm: "px-4 py-2",
    default: "px-6 py-4 md:px-8 md:py-6",
    lg: "px-8 py-6 md:px-12 md:py-8",
    xl: "px-12 py-8 md:px-16 md:py-12"
  }


  // Define rounded variants
  const roundedClass = rounded ? "rounded-2xl" : ""

  return (
    <div className={`
      ${paddingVariants[padding]}
      ${roundedClass}
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </div>
  )
}

export default Wrapper