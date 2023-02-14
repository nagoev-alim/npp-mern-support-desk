import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetTicketsState, ticketsFetchAll, ticketsSelector } from '../redux/features/tickets/ticketsSlice.js';
import { BackButton, Spinner, TicketItem } from '../components/index.js';
/* =============================
📦 COMPONENT - Tickets
============================= */
const TicketsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tickets = useSelector(ticketsSelector.getAll);

  useEffect(() => {
    return () => {
      if (tickets.isSuccess) {
        dispatch(resetTicketsState());
      }
    };
  }, [tickets.isSuccess, dispatch]);

  useEffect(() => {
    dispatch(ticketsFetchAll());
  }, [dispatch]);

  /* =============================
  📦 RENDERING
  ============================= */
  if (tickets.isLoading) return <Spinner />;

  return <div className='p-4'>
    <div className='container mx-auto '>
      <BackButton url='/' />

      <div className='grid place-items-center mb-4'>
        <h1 className='flex gap-3 items-center text-2xl font-bold'>
          Tickets
        </h1>
      </div>

      <div className='grid gap-2 md:grid-cols-4 mb-2'>
        <div className='font-bold bg-neutral-200 p-2 text-center'>
          Date
        </div>
        <div className='font-bold bg-neutral-200 p-2 text-center'>
          Product
        </div>
        <div className='font-bold bg-neutral-200 p-2 text-center'>
          Status
        </div>
        <div className='font-bold bg-neutral-200 p-2 text-center hidden md:block ' />
      </div>

      {tickets.tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket} />)}
    </div>
  </div>;
};

export default TicketsPage;
