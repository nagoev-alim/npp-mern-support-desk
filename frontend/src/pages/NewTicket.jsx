/* =============================
📦 COMPONENT - NewTicket
============================= */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/features/auth/authSlice.js';
import { Input, Select, Textarea } from '../components/index.js';

const NewTicket = () => {
  const auth = useSelector(authSelector.getAll);
  const [name] = useState(auth.user.name);
  const [email] = useState(auth.user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  /* =============================
   📦 METHODS
   ============================= */
  const onSubmit = (event) => {
    event.preventDefault();
    // if (product !== description) {
    //   toast.error('Passwords do not match');
    //   return;
    // }
    // dispatch(registerUser({ name, email, password }));
  };

  /* =============================
  📦 RENDERING
  ============================= */
  return <div>
    <div className='grid place-items-center'>
      <h1 className='flex gap-3 items-center text-2xl font-bold'>
        Create New Ticket
      </h1>
      <p className='font-bold text-neutral-500'>Please fill out the form below</p>
    </div>

    <form className='form' onSubmit={onSubmit}>
      <Input
        label='Customer Name'
        type='text'
        name='name'
        id='name'
        value={name}
        disabled
      />
      <Input
        label='Customer Email'
        type='email'
        name='email'
        id='email'
        value={email}
        disabled
      />
      <Select
        label='Product'
        name='product'
        id='product'
        options={['iPhone', 'Macbook Pro', 'iMac', 'iPad']}
        value={product}
        onChange={({ target: { value } }) => setProduct(value)}
      />
      <Textarea
        label='Description of the issue'
        name='description'
        id='description'
        placeholder='Description'
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
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

export default NewTicket;
