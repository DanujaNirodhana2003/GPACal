import { NavLink } from "react-router-dom";
import { Calculator, Settings, Info, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { to: "/", icon: Calculator, label: "Calculator" },
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/about", icon: Info, label: "About" },
  ];

  return (
    <aside className="fixed right-0 top-0 h-screen w-20 glass-card border-l flex flex-col items-center py-6 gap-8 z-50">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs font-bold gradient-text">GPA Cal</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : "hover:bg-secondary hover:scale-105"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="w-12 h-12 rounded-xl hover:bg-secondary transition-all duration-300 hover:scale-105"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </Button>
    </aside>
  );
};
