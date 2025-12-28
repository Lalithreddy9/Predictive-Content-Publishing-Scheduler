import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Wand2,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-5 text-xl font-semibold">
        ContentOpt
      </div>

      <nav className="flex-1 px-4 space-y-1 text-sm">
        <NavItem to="/" label="Dashboard" Icon={LayoutDashboard} />
        <NavItem to="/calendar" label="Calendar" Icon={CalendarDays} />
        <NavItem to="/ai-scheduler" label="AI Scheduler" Icon={Wand2} />
      </nav>
    </aside>
  );
}

function NavItem({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `rounded-md transition block ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <div className="flex items-center gap-3 px-4 py-2">
        <Icon size={18} className="text-current" />
        <span>{label}</span>
      </div>
    </NavLink>
  );
}
