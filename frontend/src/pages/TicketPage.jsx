/* =============================
📦 COMPONENT - TicketPage
============================= */
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ticketsClose, ticketsFetchSingle, ticketsSelector } from '../redux/features/tickets/ticketsSlice.js';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BackButton, Spinner, TicketItem } from '../components/index.js';

const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tickets = useSelector(ticketsSelector.getAll);

  useEffect(() => {
    if (tickets.isError) {
      toast.error(tickets.message);
    }
    dispatch(ticketsFetchSingle(id));
  }, [tickets.isError, tickets.message, id]);

  const onClose = () => {
    dispatch(ticketsClose(id))
    toast.success('Ticket Closed');
    navigate('/tickets');
  };
  /* =============================
  📦 RENDERING
  ============================= */
  if (tickets.isLoading) return <Spinner />;
  if (tickets.isError) return <p className='text-red-500 font-bold'>Something went wrong</p>;

  return <div className='p-4'>
    <div className='container mx-auto '>
      <BackButton url='/tickets' />

      <div className='grid place-items-center mb-4'>
        <h1 className='flex flex-wrap gap-3 items-center text-2xl font-bold break-all	'>
          Ticket ID: {tickets.ticket._id}
          <span className={`text-xs px-4 py-2 rounded-md ${tickets.ticket.status === 'new'
            ? 'bg-green-400'
            : tickets.ticket.status === 'open'
              ? 'bg-blue-400' : 'bg-red-400'}`}>
            {tickets.ticket.status}
          </span>
        </h1>
        <h3>Date Submitted:{new Date(tickets.ticket.createdAt).toLocaleString('en-US')}</h3>
        <p>Product: {tickets.ticket.product}</p>
      </div>

      <div className='p-4 bg-gray-100 border border-neutral-800 mb-4'>
        <h3 className='font-bold'>Description of Issue</h3>
        <p>{tickets.ticket.description}</p>
      </div>

      {tickets.ticket.status !== 'closed' &&
        <button
          className='btn gap-2 bg-red-800 hover:bg-red-600 focus:ring-red-500'
          onClick={onClose}
        >
          Close Ticket
        </button>
      }
    </div>


  </div>;
};

export default TicketPage;
