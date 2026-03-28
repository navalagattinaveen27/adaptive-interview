import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, User, HelpCircle } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
          <span className="gradient-primary text-primary-foreground rounded-lg px-2 py-1 text-sm font-extrabold">AI</span>
          InterviewPro
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/help">
                  <HelpCircle className="mr-1.5 h-4 w-4" />
                  Help
                </Link>
              </Button>
              <span className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground px-2">
                <User className="h-3.5 w-3.5" />
                {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1.5 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
