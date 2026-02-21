import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import {
  FaBalanceScale,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import './index.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to: string;
  authRequired: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', authRequired: false },
  { label: 'Intro', to: '/Intro', authRequired: true },
  { label: 'Food Controls', to: '/FoodControl', authRequired: true },
  { label: 'Work Plans', to: '/Works', authRequired: true },
  { label: 'Principles', to: '/Principles', authRequired: false },
  { label: 'General Rules', to: '/generalRules', authRequired: true },
];

const FORMULA_ITEMS: DropdownItem[] = [
  { label: 'Money Saving', to: '/moneySavingFormula' },
  { label: 'Reduce Speaking', to: '/reduceSpeakingFormula' },
  { label: 'Time Saving', to: '/timeSavingFormula' },
  { label: 'Tour Plan', to: '/tourPlanFormula' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Index = (): React.ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeFormula, setActiveFormula] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Scroll shadow
  useEffect((): (() => void) => {
    const onScroll = (): void => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return (): void => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect((): (() => void) => {
    const handler = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return (): void => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogin = (): void => {
    setIsLoggedIn((prev: boolean) => !prev);
    setMobileOpen(false);
  };

  const visibleNavItems: NavItem[] = NAV_ITEMS.filter(
    (item: NavItem) => !item.authRequired || isLoggedIn,
  );

  return (
    <>
      <nav className={`nx-nav${scrolled ? ' nx-nav--scrolled' : ''}`}>
        <div className="nx-inner">
          {/* ── BRAND ── */}
          <Link to="/" className="nx-brand">
            <FaBalanceScale className="nx-brand__icon" />
            <span className="nx-brand__text">MYLOS</span>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <div className="nx-links">
            {visibleNavItems.map((item: NavItem) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }: { isActive: boolean }): string =>
                  `nx-link${isActive ? ' nx-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Formulas dropdown */}
            <div className="nx-dropdown" ref={dropdownRef}>
              <button
                className={`nx-link nx-dropdown__trigger${dropdownOpen ? ' nx-link--active' : ''}`}
                onClick={(): void => setDropdownOpen((p: boolean) => !p)}
                aria-expanded={dropdownOpen}
              >
                Formulas
                <FaChevronDown
                  className={`nx-dropdown__chevron${dropdownOpen ? ' nx-dropdown__chevron--open' : ''}`}
                />
              </button>

              <div
                className={`nx-dropdown__menu${dropdownOpen ? ' nx-dropdown__menu--open' : ''}`}
              >
                <div className="nx-dropdown__label">Life-Changing Formulas</div>
                {FORMULA_ITEMS.map((f: DropdownItem) => (
                  <NavLink
                    key={f.to}
                    to={f.to}
                    className="nx-dropdown__item"
                    onMouseEnter={(): void => setActiveFormula(f.to)}
                    onMouseLeave={(): void => setActiveFormula(null)}
                    onClick={(): void => setDropdownOpen(false)}
                  >
                    <span
                      className={`nx-dropdown__dot${activeFormula === f.to ? ' nx-dropdown__dot--active' : ''}`}
                    />
                    {f.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* ── AUTH BUTTON ── */}
          <button
            className={`nx-auth${isLoggedIn ? ' nx-auth--out' : ' nx-auth--in'}`}
            onClick={handleLogin}
          >
            {isLoggedIn ? (
              <>
                <FaSignOutAlt className="nx-auth__icon" />
                <span>Log Out</span>
              </>
            ) : (
              <>
                <FaUser className="nx-auth__icon" />
                <span>Log In</span>
              </>
            )}
          </button>

          {/* ── HAMBURGER ── */}
          <button
            className={`nx-hamburger${mobileOpen ? ' nx-hamburger--open' : ''}`}
            onClick={(): void => setMobileOpen((p: boolean) => !p)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`nx-drawer${mobileOpen ? ' nx-drawer--open' : ''}`}
        ref={mobileRef}
      >
        <div className="nx-drawer__inner">
          {visibleNavItems.map((item: NavItem, i: number) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }: { isActive: boolean }): string =>
                `nx-drawer__link${isActive ? ' nx-drawer__link--active' : ''}`
              }
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={(): void => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="nx-drawer__divider">Formulas</div>
          {FORMULA_ITEMS.map((f: DropdownItem, i: number) => (
            <NavLink
              key={f.to}
              to={f.to}
              className="nx-drawer__link nx-drawer__link--sub"
              style={{
                animationDelay: `${(visibleNavItems.length + i) * 0.05}s`,
              }}
              onClick={(): void => setMobileOpen(false)}
            >
              {f.label}
            </NavLink>
          ))}

          <button
            className={`nx-drawer__auth${isLoggedIn ? ' nx-auth--out' : ' nx-auth--in'}`}
            onClick={handleLogin}
          >
            {isLoggedIn ? (
              <>
                <FaSignOutAlt /> Log Out
              </>
            ) : (
              <>
                <FaUser /> Log In
              </>
            )}
          </button>
        </div>
      </div>

      {/* Drawer backdrop */}
      {mobileOpen && (
        <div
          className="nx-backdrop"
          onClick={(): void => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Index;
