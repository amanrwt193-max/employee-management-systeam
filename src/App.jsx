
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/navbar";
import Sidebar from "./components/slidebar";
import Login from "./components/login";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EmployeeDetails from "./pages/EmployeeDetail";
import EditEmployee from "./pages/EditEmployee";

import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import Cities from "./pages/Cities";
import CityDetails from "./pages/CityDetails";

function MainLayout() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/employees" element={<Employees />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />

            {/* Companies */}
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/:name" element={<CompanyDetails />} />

            {/* Cities */}
            <Route path="/cities" element={<Cities />} />
            <Route path="/city/:name" element={<CityDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/*"
        element={user ? <MainLayout /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
