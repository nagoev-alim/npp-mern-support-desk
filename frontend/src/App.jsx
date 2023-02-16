import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  NewTicketPage,
  PrivateRoute,
  RegisterPage,
  TicketPage,
  TicketsPage,
} from './pages/index.js';
import { Header } from './components/index.js';
import { Toaster } from 'react-hot-toast';
/* =============================
📦 COMPONENT - App
============================= */
const App = () => (
  <Router>
    <div className='min-h-screen grid grid-rows-[auto_1fr]'>
      <Header />
      <div className='py-4'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/new-ticket' element={<PrivateRoute />}>
            <Route path='/new-ticket' element={<NewTicketPage />} />
          </Route>
          <Route path='/tickets' element={<PrivateRoute />}>
            <Route path='/tickets' element={<TicketsPage />} />
          </Route>
          <Route path='/tickets/:id' element={<PrivateRoute />}>
            <Route path='/tickets/:id' element={<TicketPage />} />
          </Route>
        </Routes>
      </div>
    </div>
    <Toaster
      position='bottom-center'
      reverseOrder={false}
    />
  </Router>
);

export default App;
