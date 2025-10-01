import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import { HelmetProvider } from "react-helmet-async";

import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";
import TagPosts from "./pages/TagPosts";
import Optimizer from "./pages/Optimizer";

import "./styles/globals.css";
import "./styles/blog.css";

export default function App() {
  return (
    <BlogProvider>
      <HelmetProvider>
        <BrowserRouter>
          <div className="app-container flex flex-col min-h-screen bg-gray-100">
            <Topbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-4 max-w-4xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/tags/:tag" element={<TagPosts />} />
                  <Route path="/optimizer" element={<Optimizer />} />
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="*"
                    element={
                      <h2 className="text-center text-2xl mt-10 text-gray-800">
                        404 – Page Not Found
                      </h2>
                    }
                  />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </BlogProvider>
  );
}