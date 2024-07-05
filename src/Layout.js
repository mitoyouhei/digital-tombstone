import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import store, { logout } from "./store";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.username);
  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center py-3">
        <h1>
          <Link className="nav-link" to="/">
            Digital Tombstone
          </Link>
        </h1>
        <nav className="nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/create">
            Create Tombstone
          </Link>
          {user ? null : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
          {user ? null : (
            <Link className="nav-link" to="/register">
              Register
            </Link>
          )}
          <Link className="nav-link" to="/contact">
            Contact Us
          </Link>
          {user && (
            <Link className="nav-link" to="/profile">
              {user}
            </Link>
          )}
          {user && (
            <button
              className="nav-link btn btn-link"
              onClick={() => store.dispatch(logout())}
            >
              Logout
            </button>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="text-center py-4">
        <p>&copy; 2024 Digital Tombstone. All rights reserved.</p>
        <div className="d-flex justify-content-center">
          <a href="#facebook" className="mx-2">
            Facebook
          </a>
          <a href="#twitter" className="mx-2">
            Twitter
          </a>
          <a href="#instagram" className="mx-2">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
