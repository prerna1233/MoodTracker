// import LoginPage from './components/LoginPage'
// import Signup from './components/Signup'
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// import Mainpage from './components/Mainpage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<LoginPage/>}/>
//         <Route path='/signup' element={<Signup/>}/>
//         <Route path="/mainpage" element={<Mainpage />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App


































// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import Signup from "./components/Signup";
// import Mainpage from "./components/Mainpage";
// import { jwtDecode } from "jwt-decode"; 

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Function to check if user is authenticated
//   function checkAuth() {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.exp * 1000 < Date.now()) {
//         localStorage.removeItem("token"); // Remove expired token
//         return false; // Token expired
//       }
//       return true; // Token is valid
//     } catch (error) {
//       return false; // Invalid token
//     }
//   }

//   useEffect(() => {
//     setIsAuthenticated(checkAuth()); // Check auth when app loads
//   }, []);

//   return (
//   <Router>
//     <Routes>
//       {/* Show Signup Page first */}
//       <Route path="/" element={isAuthenticated ? <Navigate to="/mainpage" /> : <Signup />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/mainpage" element={isAuthenticated ? <Mainpage /> : <Navigate to="/login" />} />
//     </Routes>
//   </Router>
// );

// }

// export default App;





// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import Signup from "./components/Signup";
// import Mainpage from "./components/Mainpage";
// import { jwtDecode } from "jwt-decode"; 

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Function to check if user is authenticated
//   function checkAuth() {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.exp * 1000 < Date.now()) {
//         localStorage.removeItem("token"); // Remove expired token
//         return false;
//       }
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   // 🔹 Update authentication state when localStorage changes
//   useEffect(() => {
//     const updateAuth = () => setIsAuthenticated(checkAuth());
//     updateAuth();
//     window.addEventListener("storage", updateAuth);
//     return () => window.removeEventListener("storage", updateAuth);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/mainpage" element={isAuthenticated ? <Mainpage /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;







import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Mainpage from "./components/Mainpage";
import { jwtDecode } from "jwt-decode"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return checkAuth(); // ✅ Check authentication when the app loads
  });

  // Function to check if the user is authenticated
  function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token"); // Remove expired token
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // 🔹 Use `useEffect` to listen for token changes
  useEffect(() => {
    setIsAuthenticated(checkAuth());
    window.addEventListener("storage", () => setIsAuthenticated(checkAuth()));
    return () => window.removeEventListener("storage", () => setIsAuthenticated(checkAuth()));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/mainpage" /> : <Signup />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/mainpage" /> : <LoginPage />} />
        <Route path="/mainpage" element={isAuthenticated ? <Mainpage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
