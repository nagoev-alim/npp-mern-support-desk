/* =============================
📦 COMPONENT - TicketPage
============================= */
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ticketsClose, ticketsFetchSingle, ticketsSelector } from '../redux/features/tickets/ticketsSlice.js';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { BackButton, NoteItem, Spinner } from '../components/index.js';
import { notesCreate, notesFetchAll, notesSelector } from '../redux/features/notes/notesSlice.js';
import { FaPlus, FiX } from 'react-icons/all.js';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const TicketPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tickets = useSelector(ticketsSelector.getAll);
  const notes = useSelector(notesSelector.getAll);

  useEffect(() => {
    if (tickets.isError || notes.isError) {
      toast.error(tickets.message || notes.message);
    }
    dispatch(ticketsFetchSingle(id));
    dispatch(notesFetchAll(id));
  }, [tickets.isError, tickets.message, id]);

  const onClose = () => {
    dispatch(ticketsClose(id));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(notesCreate({ noteText, id }))
      .unwrap()
      .then(() => {
        setNoteText('');
        toggleModal();
      })
      .catch(toast.error);
  };

  const toggleModal = () => setModalIsOpen(prev => !prev);
  /* =============================
  📦 RENDERING
  ============================= */
  if (tickets.isLoading || notes.isLoading) return <Spinner />;
  if (tickets.isError || notes.isError) return <p className='text-red-500 font-bold'>Something went wrong</p>;

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

      {notes.notes.length !== 0 && <h3>Notes</h3>}

      {tickets.ticket.status !== 'closed' &&
        <button className='btn gap-2 bg-blue-800 hover:bg-blue-600 focus:ring-blue-500' onClick={toggleModal}>
          <FaPlus /> Add Note</button>}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={toggleModal}>
          <FiX />
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.notes.map((note) => <NoteItem key={note._id} note={note} />)}

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
