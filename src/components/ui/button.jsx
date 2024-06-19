const Button = ({ children, ...props }) => {
  return (
    <button
      className="rounded-lg bg-[#3c3f46] px-3 py-1 font-mono text-lg text-white disabled:bg-[#272728]"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
