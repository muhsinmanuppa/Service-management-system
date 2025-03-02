import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm h-screen">
      <div className="py-4 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;