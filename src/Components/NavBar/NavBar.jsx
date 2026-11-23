import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

const LINKS = [
  { to: "/", label: "Home", icon: "M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10", end: true },
  { to: "/shop", label: "Shop", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { to: "/about", label: "About", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01" },
  { to: "/contact", label: "Contact", icon: "M3 6h18v12H3zM3 7l9 7 9-7" },
];
const CART = { to: "/cart", label: "Cart", icon: "M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" };

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// Logo is a transparent PNG used as a mask, so it takes the text colour (blue here, white on dark sections).
function Logo({ height = 28 }) {
  const url = `url(${import.meta.env.BASE_URL}logo-wordmark.png)`;
  return (
    <span
      role="img"
      aria-label="Monogloss"
      className="inline-block bg-current"
      style={{
        height,
        aspectRatio: 5.5914,
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
        WebkitMaskSize: "contain", maskSize: "contain",
        WebkitMaskPosition: "center", maskPosition: "center",
      }}
    />
  );
}

/**
 * Props
 *  cartCount    number of items in the cart (default 0)
 *  onOfferClick optional; when given, a "10% off" pill shows in the phone header
 */
export default function Navbar({ cartCount = 0, onOfferClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topLink = ({ isActive }) =>
    `border-b-2 py-2 transition-colors duration-100 hover:text-brand ${isActive ? "border-ink" : "border-transparent"}`;
  const tab = ({ isActive }) =>
    `relative flex h-16 flex-1 flex-col items-center justify-center gap-0.5 border-t-2 text-[12px] font-medium transition-colors ${
      isActive ? "border-brand text-brand" : "border-transparent text-muted"
    }`;

  return (
    <>
      {/* Top bar */}
      <header className={`sticky top-0 z-30 border-b border-line bg-white transition-shadow duration-300 ${scrolled ? "shadow-card" : ""}`}>
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-20">
          <Link to="/" aria-label="Monogloss home" className="text-brand">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden gap-8 md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={topLink}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/cart"
            className="hidden min-h-[44px] items-center gap-2 rounded-[10px] bg-brand px-5 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark active:translate-y-0 md:inline-flex"
          >
            Cart
            <span className="min-w-[22px] rounded-full bg-white px-1.5 text-center text-[13px] font-semibold text-brand">{cartCount}</span>
          </Link>

          {onOfferClick && (
            <button onClick={onOfferClick} className="min-h-[40px] rounded-[10px] bg-brand px-4 text-sm font-medium text-white md:hidden">
              10% off
            </button>
          )}
        </div>
      </header>

      {/* Phone tab bar */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {[LINKS[0], LINKS[1], CART, LINKS[2], LINKS[3]].map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={tab}>
            <span className="relative">
              <Icon d={l.icon} />
              {l.to === "/cart" && cartCount > 0 && (
                <span className="absolute -right-2.5 -top-1.5 min-w-[18px] rounded-full bg-brand px-1 text-center text-[11px] font-semibold leading-[18px] text-white">
                  {cartCount}
                </span>
              )}
            </span>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
