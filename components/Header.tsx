'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, ChevronDown } from "lucide-react";
import { getAllCategories } from "@/lib/categories";
import { cn } from "@/lib/utils";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showInventorySubmenu, setShowInventorySubmenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Use functional setState to avoid unnecessary re-renders when value hasn't changed
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      setScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = getAllCategories();

  const navItems = [
    { href: "/#financing", label: "Financing" },
    { href: "/contact", label: "Contact" },
  ];

  // Header state logic
  const isTransparent = isHome && !scrolled;

  // Text color classes
  const textColorClass = isTransparent ? "text-white hover:text-secondary" : "text-foreground hover:text-secondary";
  const triggerColorClass = isTransparent
    ? "text-white bg-transparent hover:bg-transparent hover:text-secondary data-[state=open]:bg-transparent data-[state=open]:text-secondary"
    : "text-foreground bg-transparent hover:bg-transparent hover:text-secondary data-[state=open]:bg-transparent";

  return (
    <header
      className={cn(
        "w-full z-50 transition-all duration-300",
        isHome ? "fixed top-0" : "sticky top-0",
        isTransparent
          ? "bg-transparent border-b-0"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src="/assets/i90-equipment-logo-header.webp"
              alt="I90 Equipment - Montana's Premier Heavy-Duty Trailer Dealer"
              width={180}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={cn("text-sm font-medium transition-colors px-4 py-2", textColorClass)}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn("text-sm font-medium", triggerColorClass)}>
                  Inventory
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/inventory"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">All Inventory</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/categories/${category.slug}`}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">{category.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className={cn("text-sm font-medium transition-colors px-4 py-2", textColorClass)}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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
              <Button variant="ghost" size="icon" className={isTransparent ? "text-white hover:bg-white/20" : ""}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <a
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-secondary transition-colors py-2"
                >
                  Home
                </a>

                {/* Inventory with Submenu */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setShowInventorySubmenu(prev => !prev)}
                    className="text-lg font-medium text-foreground hover:text-secondary transition-colors py-2 flex items-center justify-between"
                  >
                    Inventory
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        showInventorySubmenu && "rotate-180"
                      )}
                    />
                  </button>
                  {showInventorySubmenu && (
                    <div className="flex flex-col space-y-2 pl-4 border-l-2 border-muted">
                      <Link
                        href="/inventory"
                        onClick={() => setOpen(false)}
                        className="text-base font-medium text-muted-foreground hover:text-secondary transition-colors py-2"
                      >
                        View All Inventory
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/categories/${category.slug}`}
                          onClick={() => setOpen(false)}
                          className="text-base text-muted-foreground hover:text-secondary transition-colors py-2"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

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
