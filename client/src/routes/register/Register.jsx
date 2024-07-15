import { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import request from '../../lib/http';

import Error from '../../components/ui/Error';

import './register.scss';

function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      const res = await request.post(
        '/auth/register',
        {
          username,
          email,
          password,
        }
      );
      navigate('/login', {
        state: {
          message:
            'Your Account has created Successfully!',
        },
      });
    } catch (err) {
      setError(
        err?.response?.data || {
          message:
            'Something went wrong!\nPlease try again later',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name='username'
            type='text'
            placeholder='Username'
          />
          <input
            name='email'
            type='text'
            placeholder='Email'
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
          />
          <button disabled={loading}>
            Register
          </button>
          {error && (
            <Error message={error.message} />
          )}
          <Link to='/login'>
            Do you have an account?
          </Link>
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

export default Register;
