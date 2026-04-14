import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, User, HelpCircle, Sparkles } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-foreground group">
          <span className="gradient-primary text-primary-foreground rounded-xl px-2.5 py-1 text-sm font-extrabold shadow-md group-hover:shadow-lg transition-shadow">
            ES
          </span>
          <span className="hidden sm:inline">EvalSmart</span>
        </Link>

        <nav className="flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-lg">
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="rounded-lg">
                <Link to="/help">
                  <HelpCircle className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Help</span>
                </Link>
              </Button>
              <span className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground px-3 py-1.5 bg-muted/50 rounded-lg">
                <User className="h-3.5 w-3.5" />
                {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-lg ml-1">
                <LogOut className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button size="sm" asChild className="gradient-primary text-primary-foreground rounded-lg px-5">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
