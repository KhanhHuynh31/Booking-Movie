import { Routes, Route } from 'react-router-dom';
import './App.css';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from './util/history'
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Checkout from './pages/Checkout/Checkout';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Loading from './components/Loading/Loading';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Film';
import AddNewFilm from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import User from './pages/Admin/User/User';
import ShowTime from './pages/Admin/Showtime/Showtime';
import Profile from './pages/Profile/Profile';
import AddNewUser from './pages/Admin/User/AddNew/AddNew';
import EditUser from './pages/Admin/User/Edit/Edit';
import NotFound from './pages/NotFound';

function App() {
  return (

    <HistoryRouter history={history}>
      <Loading />
      <Routes>
        <Route path='*' element={<NotFound />}></Route>
        <Route element={<HomeTemplate />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route element={<CheckoutTemplate />}>
            <Route path='/checkout/:id' element={<Checkout />}></Route>
          </Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dangky' element={<Register />}></Route>
        <Route path='/admin' element={<AdminTemplate />}>
          <Route path='films' element={<Films />}></Route>
          <Route path='films/addnew' element={<AddNewFilm />}></Route>
          <Route path='films/edit/:id' element={<Edit />}></Route>
          <Route path='films/showtime/:id/:tenphim' element={<ShowTime />}></Route>
          <Route path='users' element={<User />}></Route>
          <Route path='users/addnew' element={<AddNewUser />}></Route>
          <Route path='users/edit/:tuKhoa' element={<EditUser />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
