
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <header className="navbar">
            <div className="navbar-logo">
                EmployeeMS
            </div>

            <div className="navbar-right">
                {user && (
                    <>
                        <span>
                            Welcome, {user.name}
                        </span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navbar;
