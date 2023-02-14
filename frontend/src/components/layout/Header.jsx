/* =============================
📦 COMPONENT - Header
============================= */
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logoutUser, resetState } from '../../redux/features/auth/authSlice.js';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector.getAll);

  const onClick = () => {
    dispatch(logoutUser());
    dispatch(resetState());
    navigate('/');
  };

  /* =============================
  📦 RENDERING
  ============================= */
  return <header className='p-4 border-b'>
    <div className='container mx-auto flex items-center justify-between'>
      <Link className='font-bold' to='/'>Support Desk</Link>
      <ul className='flex gap-4 items-center'>
        {auth.user
          ?
          <li>
            <button className='flex items-center gap-1' onClick={onClick}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
          :
          <>
            <li>
              <Link className='flex items-center gap-1' to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link className='flex items-center gap-1' to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        }

      </ul>
    </div>
  </header>;
};

export default Header;
