import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        setShowAdmin(true);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">
        <Link to="/">ULN Blog</Link>
      </h1>
      <nav className="space-x-6 flex items-center">
        <Link className="hover:text-blue-600" to="/">Home</Link>
        <Link className="hover:text-blue-600" to="/blog">Blog</Link>
        <Link className="hover:text-blue-600" to="/about">About</Link>
        <Link className="hover:text-blue-600" to="/contact">Contact</Link>
        {showAdmin && (
          <Link className="text-red-600 hover:underline" to="/dashboard">
            Admin
          </Link>
        )}
      </nav>
    </header>
  );
}


// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Topbar() {
//   const [showAdmin, setShowAdmin] = useState(false);

//   // Reveal Admin link when user presses Ctrl+Shift+A
//   useEffect(() => {
//     function handleKeydown(e) {
//       if (e.ctrlKey && e.key.toLowerCase() === "m") {
//         setShowAdmin(true);
//       }
//     }
//     window.addEventListener("keydown", handleKeydown);
//     return () => window.removeEventListener("keydown", handleKeydown);
//   }, []);

//   return (
//     <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-blue-600">
//         <Link to="/">ULN Blog</Link>
//       </h1>
//       <nav className="space-x-6">
//         <Link className="hover:text-blue-600" to="/">Home</Link>
//         <Link className="hover:text-blue-600" to="/blog">Blog</Link>
//         {showAdmin && (
//           <Link className="text-red-600 hover:underline" to="/dashboard">
//             Admin
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// }
