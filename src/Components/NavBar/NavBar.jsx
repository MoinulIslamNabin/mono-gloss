import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ChevronDown, House, Info, LayoutGrid, Mail, Menu, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Cleanser", "Serum", "Moisturizer", "SPF", "Treatment"];
const catPath = (c) => `/shop/${c.toLowerCase()}`;

const LINKS = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/shop", label: "Shop", icon: LayoutGrid },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];
const CART = { to: "/cart", label: "Cart", icon: ShoppingBag };

// Blue wordmark image: /public/logo-wordmark-blue.png
function Logo({ height = 28 }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-wordmark-blue.png`}
      alt="Monogloss"
      style={{ height }}
      className="w-auto"
    />
  );
}

// Same look as a shadcn ghost button, with an active state for the current page.
const topLink = ({ isActive }) =>
  cn(buttonVariants({ variant: "ghost" }), "text-base", isActive && "bg-secondary text-secondary-foreground");

/**
 * Props
 *  cartCount    number of items in the cart (default 0)
 *  onOfferClick optional; when given, a "10% off" button shows in the phone header
 */
export default function Navbar({ cartCount = 0, onOfferClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const shopActive = pathname.startsWith("/shop");
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ---------- Top bar ---------- */}
      <header
        className={cn(
          "sticky top-0 z-30 border-b bg-background/90 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-card"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:h-20">
          <Link to="/" aria-label="Monogloss home">
            <Logo />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            <NavLink to="/" end className={topLink}>
              Home
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-base",
                  shopActive && "bg-secondary text-secondary-foreground"
                )}
              >
                Shop <ChevronDown className="size-4" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/shop">All products</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {CATEGORIES.map((c) => (
                  <DropdownMenuItem key={c} asChild>
                    <Link to={catPath(c)}>{c}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to="/about" className={topLink}>
              About
            </NavLink>
            <NavLink to="/contact" className={topLink}>
              Contact
            </NavLink>
          </nav>

          {/* Desktop cart */}
          <Button asChild size="lg" className="hidden md:inline-flex">
            <Link to="/cart">
              <ShoppingBag aria-hidden />
              Cart
              <Badge variant="secondary" className="min-w-5 justify-center rounded-full px-1.5">
                {cartCount}
              </Badge>
            </Link>
          </Button>

          {/* Phone: offer + menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {onOfferClick && (
              <Button size="sm" onClick={onOfferClick}>
                10% off
              </Button>
            )}
            <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* ---------- Phone menu (slides in from the right) ---------- */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-[300px] gap-0 p-0">
          <SheetHeader className="border-b p-5 text-left">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <Logo height={24} />
          </SheetHeader>

          <nav aria-label="Menu" className="grid gap-1 p-3">
            {[...LINKS, CART].map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium transition-colors",
                    isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                  )
                }
              >
                <Icon className="size-5" aria-hidden />
                {label}
                {to === "/cart" && cartCount > 0 && <Badge className="ml-auto rounded-full">{cartCount}</Badge>}
              </NavLink>
            ))}
          </nav>

          <div className="border-t p-5">
            <p className="mb-3 text-sm text-muted-foreground">Shop by step</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to={catPath(c)}
                  onClick={closeMenu}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ---------- Phone tab bar ---------- */}
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {[LINKS[0], LINKS[1], CART, LINKS[2], LINKS[3]].map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex h-16 flex-1 flex-col items-center justify-center gap-0.5 border-t-2 text-xs font-medium transition-colors",
                isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              )
            }
          >
            <span className="relative">
              <Icon className="size-6" aria-hidden />
              {to === "/cart" && cartCount > 0 && (
                <Badge className="absolute -right-3 -top-2 h-[18px] min-w-[18px] justify-center rounded-full px-1 text-[11px]">
                  {cartCount}
                </Badge>
              )}
            </span>
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}