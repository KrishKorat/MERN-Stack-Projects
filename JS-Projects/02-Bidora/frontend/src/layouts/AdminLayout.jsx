import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout({ children }) {
    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
            <AdminHeader />
            <main className="lg:mx-20">{children}</main>
            <AdminFooter />
        </div>
    );
}