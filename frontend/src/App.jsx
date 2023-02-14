import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, NewTicket, PrivateRoute, RegisterPage } from './pages/index.js';
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
            <Route path='/new-ticket' element={<NewTicket />} />
          </Route>
          {/*<Route path='/tickets' element={<RegisterPage />} />*/}
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
