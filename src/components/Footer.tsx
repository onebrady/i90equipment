import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Inventory
                </a>
              </li>
              <li>
                <a href="#financing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Financing
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Trailer Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Lowboy Trailers
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Side Dump Trailers
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Belly Dump Trailers
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Flatbed Trailers
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Step Deck Trailers
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  RGN Trailers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Brands</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  XL Specialized
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Smithco
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Ranco
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Dragon
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Midland
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Choice
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Manac
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic space-y-2 text-primary-foreground/80">
              <p>70 Pipkin Way</p>
              <p>Belgrade, MT 59714</p>
              <p>
                <a href="tel:+14069392153" className="hover:text-primary-foreground transition-colors">
                  (406) 939-2153
                </a>
              </p>
              <p>
                <a href="mailto:I90equipment@gmail.com" className="hover:text-primary-foreground transition-colors">
                  I90equipment@gmail.com
                </a>
              </p>
              <p className="pt-2">Monday-Friday: 8-5 PM MT</p>
            </address>

            {/* Social Media */}
            <div className="mt-4">
              <a 
                href="https://www.facebook.com/p/I90-Equipment-100064037703676/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80 text-sm">
          <p>© {currentYear} I90 Equipment. All rights reserved. | Montana's Premier Heavy-Duty Construction Trailer Dealer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
