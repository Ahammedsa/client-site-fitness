import { Link } from 'react-router-dom'
import Container from '../Container'
import logoImg from '../../../assets/the-fitness-logo.avif'
import MenuDropdown from './MenuDropdown'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                className='hidden md:block'
                src={logoImg}
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
            <div className="navbae-center flex">
              <Link
                to='/all-trainer'
                className='btn btn-ghost text-sm'
              >
                All Trainer
              </Link>

              <div className="">
                <a className="btn btn-ghost text-sm">All Class</a>
              </div>
              <div className="">
                <a className="btn btn-ghost  text-sm">Community</a>
              </div>
            </div>

            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
