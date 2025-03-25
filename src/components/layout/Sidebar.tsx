
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Store, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: SidebarItem[] = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Store, label: 'Stores', path: '/stores' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar transition-all duration-300 ease-in-out border-r border-border relative z-10",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={cn(
          "flex items-center p-6 transition-all duration-300",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-candy-pink to-candy-purple flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-xl">C</span>
          </div>
          {!collapsed && (
            <span className="ml-3 font-medium text-xl tracking-tight animate-fade-in">Candy</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg text-sidebar-foreground transition-all duration-200 group hover:bg-sidebar-accent",
                      isActive && "bg-sidebar-accent text-primary font-medium",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-primary",
                    )} />
                    {!collapsed && (
                      <span className={cn(
                        "ml-3 transition-opacity duration-200",
                        isActive ? "text-primary" : ""
                      )}>
                        {item.label}
                      </span>
                    )}
                    {collapsed && (
                      <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-black/80 text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button 
            className={cn(
              "flex items-center p-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0 text-sidebar-foreground" />
            {!collapsed && <span className="ml-3">Exit</span>}
          </button>
        </div>

        {/* Collapse button */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-20 bg-background shadow-md border border-border rounded-full p-1.5 text-sidebar-foreground hover:text-primary transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
