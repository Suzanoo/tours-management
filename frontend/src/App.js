import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Landing from './pages/Landing';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPwd from './pages/ForgotPwd';
import ResetPwd from './pages/ResetPwd';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Nav />
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-pwd" element={<ForgotPwd />} />

            <Route path="/:token" element={<ResetPwd />} />
            {/* TODO : Solve to use  path="/reset-pwd:token" instead */}
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
