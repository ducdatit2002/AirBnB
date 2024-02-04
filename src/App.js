import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import HomePage from "./PagesUser/HomePage/HomePage";
import Admin from "./PagesAdmin/Admin";
import Spiner from "./Components/Spiner/Spiner";
import User from "./PagesAdmin/User/User";
import UserEdit from "./PagesAdmin/User/UserEdit";
import UserAddNew from "./PagesAdmin/User/UserAddNew";
import Room from "./PagesAdmin/Room/Room";
import Layout from "./HOC/Layout";
import Detail from "./PagesUser/Detail/Detail";
import RoomUser from "./PagesUser/Room/Room";
import UserInfo from "./PagesUser/PersonalInfo/UserInfo";
import AddRoom from "./PagesAdmin/Room/AddRoom";
import NotFound from "./PagesUser/404/NotFound";
import EditRoom from "./PagesAdmin/Room/EditRoom";
import Position from "./PagesAdmin/Position/Position";
import AddPosition from "./PagesAdmin/Position/AddPosition";
import EditPosition from "./PagesAdmin/Position/EditPosition";
import BookRoom from "./PagesAdmin/BookRoom/BookRoom";
import AddBook from "./PagesAdmin/BookRoom/AddBook";
import EditBooked from "./PagesAdmin/BookRoom/EditBooked";
import AlwaysTop from "./Components/ScrollTop/AlwaysTop";
function App() {
  return (
    <div className="">
      <Spiner />
      <BrowserRouter>
      <AlwaysTop/>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/detail/:id"
            exact
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />
          <Route
            path="/room/:id/*"
            element={
              <Layout>
                <RoomUser />
              </Layout>
            }
          />
          <Route
            path="/userInfo"
            exact
            element={
              <Layout>
                <UserInfo />
              </Layout>
            }
          />
          <Route path="*" exact element={<NotFound />} />
          <Route path="/admin" exact element={<Admin Component={User} />} />
          <Route
            path="/admin/user"
            exact
            element={<Admin Component={User} />}
          />
          <Route
            path="/admin/user/edit/:id"
            exact
            element={<Admin Component={UserEdit} />}
          />
          <Route
            path="/admin/user/addnew"
            exact
            element={<Admin Component={UserAddNew} />}
          />
          <Route
            path="/admin/room"
            exact
            element={<Admin Component={Room} />}
          />
          <Route
            path="/admin/addRoom"
            exact
            element={<Admin Component={AddRoom} />}
          />
          <Route
            path="/admin/editRoom/:id"
            exact
            element={<Admin Component={EditRoom} />}
          />
          <Route
            path="/admin/position"
            exact
            element={<Admin Component={Position} />}
          />
          <Route
            path="/admin/addPosition"
            exact
            element={<Admin Component={AddPosition} />}
          />
          <Route
            path="/admin/editPosition/:id"
            exact
            element={<Admin Component={EditPosition} />}
          />
          <Route
            path="/admin/booked"
            exact
            element={<Admin Component={BookRoom} />}
          />
          <Route
            path="/admin/addBook"
            exact
            element={<Admin Component={AddBook} />}
          />
          <Route
            path="/admin/editBooked/:id"
            exact
            element={<Admin Component={EditBooked} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
