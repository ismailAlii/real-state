import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { toast } from 'react-toastify';

import './profileUpdatePage.scss';

import request from '../../lib/http';

import Error from '../../components/ui/Error';
import ImgUploader from '../../components/imgUploader/ImgUploader';

function ProfileUpdatePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const sendFormData = new FormData();
    sendFormData.append('username', username);
    sendFormData.append('email', email);
    sendFormData.append('password', password);
    sendFormData.append('avatar', img);

    try {
      const res = await request.put(
        `/user/${currentUser.id}`,
        sendFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { password: userPass, ...userData } = res.data.user;
      updateUser(userData);
      toast.success('User Data Successfully Updated!');
      navigate('/profile');
    } catch (error) {
      setError(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profileUpdatePage'>
      <div className='formContainer'>
        <form onSubmit={handleUpdateUser}>
          <h1>Update Profile</h1>
          <div className='item'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              defaultValue={currentUser.username}
            />
          </div>
          <div className='item'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              defaultValue={currentUser.email}
            />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
            />
          </div>
          <button disabled={loading}>
            {loading ? 'Loading..' : 'Update'}
          </button>
          {error && <Error message={error.message} />}
        </form>
      </div>
      <div className='sideContainer'>
        <ImgUploader
          currentUser={currentUser}
          img={img}
          setImg={setImg}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
