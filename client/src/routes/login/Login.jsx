import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import request from '../../lib/http';
import Error from '../../components/ui/Error';
import './login.scss';

function Login() {
  const { updateUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      const res = await request.post('/auth/login', {
        username,
        password,
      });
      updateUser(res.data.data);
      navigate('/');
    } catch (err) {
      setError(
        err?.response?.data || {
          message: 'Something went wrong!\nPlease try again later',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          {data && (
            <p
              style={{
                color: 'lightGreen',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              {data.message}
            </p>
          )}
          <h1>Welcome back</h1>
          <input
            name='username'
            type='text'
            required
            minLength={3}
            maxLength={20}
            placeholder='Username'
          />
          <input
            name='password'
            type='password'
            required
            placeholder='Password'
          />
          <button disabled={loading}>Login</button>
          {error && <Error message={error.message} />}
          <Link to='/register'>{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img
          src='/bg.png'
          alt=''
        />
      </div>
    </div>
  );
}

export default Login;
