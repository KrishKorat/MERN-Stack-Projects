import { Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";

import EditItem from "./pages/EditItem";

import Categories from "./pages/Categories";
import CategoryItems from "./pages/CategoryItems";
import ActiveItems from "./pages/ActiveItems";

import AdminRoute from "./components/AdminRoutes";
import Dashboard from "./pages/admin/Dashboard";

import AdminItems from "./pages/admin/AdminItems";
import AdminEditItem from "./pages/admin/AdminEditItem";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminEditUser from "./pages/admin/AdminEditUser";


function App() {
  return (
    <Routes>

      {/* User Routes */}
      <Route 
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          <UserLayout>
            <Register />
          </UserLayout>
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <UserLayout>
            <Login />
          </UserLayout>
        }
      />

      {/* Items main page */}
      <Route 
        path="/items"
        element={
          <UserLayout>
            <Items />
          </UserLayout>
        }
      />

      {/* Specific Item */}
      <Route 
        path="/items/:id"
        element={
          <UserLayout>
            <ItemDetail />
          </UserLayout>
        }
      />

      {/* Add Item */}
      <Route 
        path="/items/add"
        element={
          <UserLayout>
            <AddItem />
          </UserLayout>
        }
      />

      {/* Edit Item */}
      <Route 
        path="/items/:id/edit"
        element={
          <UserLayout>
            <EditItem />
          </UserLayout>
        }
      />

      <Route 
        path="/categories"
        element={
          <UserLayout>
            <Categories />
          </UserLayout>
        }
      />

      <Route 
        path="/categories/:category"
        element={
          <UserLayout>
            <CategoryItems />
          </UserLayout>
        }
      />

      <Route 
        path="/active"
        element={
          <UserLayout>
            <ActiveItems />
          </UserLayout>
        }
      />

      {/* Admin Route */}
      <Route 
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route 
        path="/admin/items"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminItems />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route 
        path="/admin/items/:id/edit"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminEditItem />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route 
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route 
        path="/admin/users/:id/edit"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminEditUser />
            </AdminLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App
