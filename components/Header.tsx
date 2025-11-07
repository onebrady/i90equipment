'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/inventory", label: "Inventory" },
    { href: "/#financing", label: "Financing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/assets/i90-equipment-logo-header.webp"
              alt="I90 Equipment - Montana's Premier Heavy-Duty Trailer Dealer"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Button
            asChild
            className="hidden md:flex bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold"
          >
            <a href="/contact">Request a Quote</a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-secondary transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold mt-4"
                >
                  <a href="/contact" onClick={() => setOpen(false)}>Request a Quote</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
