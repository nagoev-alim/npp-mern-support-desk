import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/all.js';

/* =============================
📦 COMPONENT - BackButton
============================= */
const BackButton = ({ url }) => (
  <Link className='btn gap-2 bg-neutral-800 hover:bg-neutral-600 focus:ring-neutral-500 mb-6' to={url}>
    <FaArrowCircleLeft /> Back
  </Link>
);

export default BackButton;
