import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} ULN Blog. All rights reserved.</p>
        <nav className="space-x-4 mt-4 md:mt-0">
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
        </nav>
      </div>
    </footer>
  );
}

// export default function Footer() {
//   return (
//     <footer className="bg-gray-800 text-gray-200 mt-8">
//       <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
//         <p>&copy; {new Date().getFullYear()} ULN Blog. All rights reserved.</p>
//         <nav className="space-x-4">
//           <a href="#" className="hover:text-white">Privacy</a>
//           <a href="#" className="hover:text-white">Terms</a>
//         </nav>
//       </div>
//     </footer>
//   );
// }
