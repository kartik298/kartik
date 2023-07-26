import './Logout.css'
import {logoutimg} from '../../assets/logout.gif'

const Logout = () => {
  return (
    <>
      <header className='h-screen p-5'>
        {/* <div className="ripple-1"></div>
        <div className="ripple-2"></div>
        <div className="ripple-3"></div>
        <div className="ripple-4"></div>
        <div className="ripple-5"></div> */}
        <img src={require('../../assets/logout.gif')} alt="loading..." className='-left-20 relative' />
        <p className='main-text'>Thank You for visiting <br /> BQPhy !!!</p>
      </header>
    </>
  )
}

export default Logout