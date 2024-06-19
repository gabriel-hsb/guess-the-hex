import { GlobalContext } from '@/GlobalStorage'
import { useContext } from 'react'

const Footer = () => {
  const global = useContext(GlobalContext)

  return (
    <footer className="text-center">
      <p className="relative inline-block bg-gradient-to-r from-red-400 via-gray-300 to-blue-500 bg-clip-text py-3 font-kanit text-2xl text-transparent">
        Made by{' '}
        <a
          href="http://github.com/gabriel-hsb"
          className="after:absolute after:right-0 after:top-11 after:ml-0.5 after:inline-block after:h-[3px] after:w-[126px] after:bg-gradient-to-r after:from-green-200 after:via-green-400 after:to-purple-700 after:content-['']"
        >
          gabriel-hsb
        </a>
      </p>
      {global.foo}
    </footer>
  )
}

export default Footer
