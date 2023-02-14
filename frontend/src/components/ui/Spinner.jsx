import { Ping } from '@uiball/loaders';
/* =============================
📦 COMPONENT - Spinner
============================= */
const Spinner = () => (
  <div
    className='fixed right-0 top-0 bottom-0 left-0 bg-neutral-800/70 grid place-items-center min-h-screen min-w-max transition-all'>
    <Ping
      size={100}
      speed={2.5}
      color='#ffffff'
    />
  </div>
)

export default Spinner;
