import { Link } from "react-router-dom"

const variantClass = {
  primary: "camp-btn camp-btn-primary",
  secondary: "camp-btn camp-btn-secondary",
  ghost: "camp-btn camp-btn-ghost",
  danger: "camp-btn camp-btn-danger",
  admin: "camp-btn camp-btn-admin",
}

function CampButton({
  to,
  type = "button",
  variant = "primary",
  className = "",
  children,
  disabled = false,
  onClick,
  ...props
}) {
  const classes = `${variantClass[variant] || variantClass.primary} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default CampButton
