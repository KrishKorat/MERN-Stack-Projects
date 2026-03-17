import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AddBlog from "./pages/AddBlog";
import BlogPage from "./pages/BlogPage";
import EditBlog from "./pages/EditBlog";


function App() {

  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/add" element={ <AddBlog /> } />
        <Route path="/blogs/:id" element={ <BlogPage /> } />
        <Route path="/blogs/:id/edit" element={ <EditBlog /> } />
      </Routes>
    </div>
  )
}

export default App
