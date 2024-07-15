import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { listData } from '../../lib/dummyData';
import Card from '../../components/card/Card';
import './profilePage.scss';
import Chat from '../../components/chat/Chat';
import request from '../../lib/http';

import Error from '../../components/ui/Error';

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const data = listData;

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await request.post('/auth/logout');
      updateUser(null);
      navigate('/login');
    } catch (err) {
      setError(
        err?.response?.data || { message: 'Something went wrong!' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profilePage'>
      <div className='userData'>
        <div className='wrapper'>
          <div className='header'>
            <h1>User Information</h1>
            <Link to='/profile/update'>Update Profile</Link>
          </div>
          <div className='userProps'>
            <div>
              <span>Avatar:</span>
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : '/noavatar.jpg'
                }
                alt={currentUser.username}
              />
            </div>
            <div>
              <span>Username:</span>
              <span>{currentUser.username}</span>
            </div>
            <div>
              <span>E-mail:</span>
              <span>{currentUser.email}</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
            >
              Logout
            </button>
            {error && <Error message={error.message} />}
          </div>
          <div className='header'>
            <h1>My List</h1>
            <Link to='/profile'>Add New Post</Link>
          </div>
          <div className='posts'>
            {data.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className='chatContainer'>
        <Chat />
      </div>
    </div>
  );
}

export default ProfilePage;
