// admission-management/src/components/Sidebar.js
export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white p-4">
            <ul>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/subadmin">Subadmin</a></li>
                <li><a href="/user">User</a></li>
            </ul>
        </aside>
    );
}