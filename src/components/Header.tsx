import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/i90-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="I90 Equipment - Montana's Premier Heavy-Duty Trailer Dealer" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/inventory" 
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Inventory
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Button 
            asChild
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold"
          >
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
