import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/features/auth/authSlice.js';
import { BackButton, Input, Select, Spinner, Textarea } from '../components/index.js';
import { resetTicketsState, ticketsCreate, ticketsSelector } from '../redux/features/tickets/ticketsSlice.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/* =============================
📦 COMPONENT - NewTicket
============================= */
const NewTicketPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector.getAll);
  const tickets = useSelector(ticketsSelector.getAll);
  const [name] = useState(auth.user.name);
  const [email] = useState(auth.user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (tickets.isError) {
      toast.error(tickets.message);
    }
    if (tickets.isSuccess) {
      dispatch(resetTicketsState());
      navigate('/tickets');
    }
    dispatch(resetTicketsState());
  }, [dispatch, tickets.isError, tickets.isSuccess, navigate, tickets.message]);

  /* =============================
   📦 METHODS
   ============================= */
  const onSubmit = (event) => {
    event.preventDefault();
    if (description.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }
    dispatch(ticketsCreate({ product, description }));
  };

  /* =============================
  📦 RENDERING
  ============================= */
  if (tickets.isLoading) return <Spinner />;

  return <div className='p-4'>
    <div className='container mx-auto'>
      <BackButton url='/' />
      <div className='grid place-items-center'>
        <h1 className='flex gap-3 items-center text-2xl font-bold'>
          Create New Ticket
        </h1>
        <p className='font-bold text-neutral-500'>Please fill out the form below</p>
      </div>
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

export default NewTicketPage;
