import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/60 bg-card/50 backdrop-blur-sm py-10 mt-auto">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="gradient-primary text-primary-foreground rounded-lg px-2 py-0.5 text-xs font-extrabold">AI</span>
        <p>&copy; {new Date().getFullYear()} InterviewPro. All rights reserved.</p>
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-primary transition-colors text-sm">Terms</a>
        <a href="#" className="hover:text-primary transition-colors text-sm">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors text-sm">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
