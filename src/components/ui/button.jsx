const Button = ({ children, ...props }) => {
  return (
    <button
      className="rounded-lg border-emerald-200 bg-slate-400 px-2 py-1 text-black disabled:bg-red-400"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
