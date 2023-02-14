import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
/* =============================
📦 COMPONENT - HomePage
============================= */
const HomePage = () => {
  /* =============================
  📦 RENDERING
  ============================= */
  return <div className='grid gap-4'>

    <div className='grid place-items-center'>
      <h1 className='flex gap-3 items-center text-2xl font-bold'>
        What do you need help with?
      </h1>
      <p className='font-bold text-neutral-500'>Please choose from an option below</p>
    </div>

    <div className='max-w-md mx-auto grid gap-3 w-full'>
      <Link to='/new-ticket' className='btn gap-3 text-neutral-800 border-2 border-neutral-800 focus:ring-neutral-500'>
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to='/tickets' className='btn gap-3 bg-neutral-800 hover:bg-neutral-600 focus:ring-neutral-500 w-full'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </div>

  </div>;
};

export default HomePage;
