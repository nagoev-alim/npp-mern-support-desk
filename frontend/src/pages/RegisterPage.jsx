import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Input, Spinner } from '../components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, registerUser, resetState } from '../redux/features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
/* =============================
📦 COMPONENT - RegisterPage
============================= */
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector.getAll);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = formData;

  useEffect(() => {
    if (auth.isError) {
      toast.error(auth.message);
    }
    if (auth.isSuccess || auth.user) {
      navigate('/');
    }
    dispatch(resetState());
  }, [auth.isError, auth.isSuccess, auth.user, auth.message, navigate, dispatch]);

  /* =============================
    📦 METHODS
    ============================= */
  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const onChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* =============================
  📦 RENDERING
  ============================= */
  if (auth.isLoading) return <Spinner />;

  return <div>

    <div className='grid place-items-center'>
      <h1 className='flex gap-3 items-center text-2xl font-bold'>
        <FaUser /> Register
      </h1>
      <p className='font-bold text-neutral-500'>Please create an account</p>
    </div>

    <form className='form' onSubmit={onSubmit}>
      <Input
        label='Name'
        type='text'
        name='name'
        id='name'
        placeholder='Enter your name'
        value={name}
        onChange={onChange}
      />
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
      <Input
        label='Confirm password'
        type='password'
        name='passwordConfirm'
        id='passwordConfirm'
        placeholder='Confirm your password'
        value={passwordConfirm}
        onChange={onChange}
      />
      <button
        type='submit'
        className='btn bg-neutral-800 hover:bg-neutral-600 focus:ring-neutral-500'
      >
        Submit
      </button>
    </form>
  </div>;
};

export default RegisterPage;
