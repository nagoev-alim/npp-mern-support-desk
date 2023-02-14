import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Input, Spinner } from '../components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, loginUser, resetState } from '../redux/features/auth/authSlice.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
/* =============================
📦 COMPONENT - LoginPage
============================= */
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector.getAll);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  useEffect(() => {
    if (auth.isError) {
      toast.error(auth.message);
    }
    if (auth.isSuccess || auth.user) {
      navigate('/');
    }
    dispatch(resetState());
  }, [auth.isError, auth.isSuccess, auth.user, auth.message, navigate, dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const onChange = ({ target: { name, value } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  /* =============================
  📦 RENDERING
  ============================= */
  if (auth.isLoading) return <Spinner />;

  return <div>
    <div className='grid place-items-center'>
      <h1 className='flex gap-3 items-center text-2xl font-bold'>
        <FaSignInAlt /> Login
      </h1>
      <p className='font-bold text-neutral-500'>Please log in to get support</p>
    </div>
    <form className='form' onSubmit={onSubmit}>
      <Input
        label='Email'
        type='email'
        name='email'
        id='email'
        placeholder='Enter your email'
        value={email}
        onChange={onChange}
      />
      <Input
        label='Password'
        type='password'
        name='password'
        id='password'
        placeholder='Enter your password'
        value={password}
        onChange={onChange}
      />
      <button
        type='submit'
        className='btn bg-neutral-800 hover:bg-neutral-600 focus:ring-neutral-500'
      >
        Login
      </button>
    </form>
  </div>;
};

export default LoginPage;
