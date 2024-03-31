import { Menu, X } from "lucide-react";
import { useState,useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import {Link,useLocation} from "react-router-dom";


const Navbar = () => {
  // console.log("user",user);
  // console.log("admin",admin)
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const isSigninPage = location.pathname === '/Signin';
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname === '/admin';
  const [user,setUser] = useState({});
  const [admin,setAdmin] = useState({});

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log("1",userData)
      setUser(userData);
      // Do something with userData, such as updating the state
    }
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setAdmin(adminData)
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/"  className="flex items-center">
            <img className="h-10 w-15 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">VOTE!</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex justify-center space-x-12 items-center">
         
          {!isProfilePage && isHomePage && (
              <Link to="/Signin" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md">
                Sign IN
              </Link>
            )}

          {isSigninPage &&(
              <Link to="/" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md">
                Home
              </Link>
             )}

          {isProfilePage && user && (
              <div>
              <p>Name: {user.name}</p>
              <p>Aadhar: {user.aadhar}</p>
            </div>
            )}

            {isAdminPage && admin && (
              <div>
              <p>Admin Name: {admin.admin}</p>
             
            </div>
            )}


            {isHomePage && (
              <Link to="/adminsignin" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md">
                Admin
              </Link>
            )}
           

            
            
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
