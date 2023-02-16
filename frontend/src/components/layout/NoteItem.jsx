/* =============================
📦 COMPONENT - NoteItem
============================= */
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/features/auth/authSlice.js';

const NoteItem = ({ note }) => {
  console.log(note);
  const auth = useSelector(authSelector.getAll);
  /* =============================
  📦 RENDERING
  ============================= */
  return <div
    className={`border border-2 p-3 ${note.isStaff ? '' : ''}`}
  >
    <h4 className='font-bold'>Note from {note.isStaff ? <span>Staff</span> : <span>{auth.user.name}</span>}</h4>
    <p>{note.text}</p>
    <div className=''>{new Date(note.createdAt).toLocaleString('en-US')}</div>
  </div>;
};

export default NoteItem;
