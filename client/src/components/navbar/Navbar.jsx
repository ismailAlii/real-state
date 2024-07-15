import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './navbar.scss';

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className='left'>
        <Link
          to='/'
          className='logo'
        >
          <img
            src='/logo.png'
            alt='Lama Estate'
          />
          <span>Lama Estate</span>
        </Link>
        <Link to='/'>Home</Link>
        <Link to='/'>About</Link>
        <Link to='/'>Contact</Link>
        <Link to='/'>Agents</Link>
      </div>
      <div className='right'>
        {currentUser ? (
          <>
            <div className='user-info'>
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : '/noavatar.jpg'
                }
                alt={currentUser.username}
              />
              <span>{currentUser.username}</span>
            </div>
            <Link
              to='/profile'
              className='profile'
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to='/login'>Sign in</Link>
            <Link
              to='/register'
              className='register'
            >
              Sign up
            </Link>
          </>
        )}
        <div
          className='menuIcon'
          onClick={() => setOpen((prev) => !prev)}
        >
          <img
            src='/menu.png'
            alt=''
          />
        </div>
        <div className={`menu ${open ? 'active' : ''}`}>
          {currentUser && (
            <>
              <div className='user-info'>
                <img
                  src={
                    currentUser.avatar
                      ? currentUser.avatar
                      : '/noavatar.jpg'
                  }
                  alt={currentUser.username}
                />
                <span>{currentUser.username}</span>
              </div>
              <Link
                to='/profile'
                className='profile'
              >
                Profile
              </Link>
            </>
          )}
          <a href='/'>Home</a>
          <a href='/'>About</a>
          <a href='/'>Contact</a>
          <a href='/'>Agents</a>
          {!currentUser && (
            <>
              <a href='/'>Sign in</a>
              <a href='/'>Sign up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
