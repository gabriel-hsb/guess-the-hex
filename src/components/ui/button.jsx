import { twMerge } from 'tailwind-merge'

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'inline-block w-fit rounded-lg bg-[#3c3f46] px-3 py-1 font-mono text-lg text-white hover:bg-[#47494e] disabled:bg-[#272728]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
