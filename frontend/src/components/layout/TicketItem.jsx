/* =============================
📦 COMPONENT - TicketItem
============================= */
import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  /* =============================
  📦 RENDERING
  ============================= */
  return <div className='grid gap-2 md:grid-cols-4 mb-2'>
    <div className='font-bold  p-2 text-center border-2 grid place-items-center'>
      {new Date(ticket.createdAt).toLocaleString('en-US')}
    </div>
    <div className='font-bold p-2 text-center border-2 grid place-items-center'>
      {ticket.product}
    </div>
    <div className='font-bold p-2 text-center border-2 grid place-items-center'>
      <span className={`px-4 py-2 rounded-md ${ticket.status === 'new' ? 'bg-green-400' : ticket.status === 'open' ? 'bg-blue-400' : 'bg-red-400'}`}>
        {ticket.status}
      </span>
    </div>
    <div className='font-bold p-2 text-center border-2'>
      <Link className='btn bg-neutral-800 hover:bg-neutral-600 focus:ring-neutral-500' to={`/tickets/${ticket._id}`}>
        View
      </Link>
    </div>
  </div>;
};

export default TicketItem;
