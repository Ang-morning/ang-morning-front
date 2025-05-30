import Link from "next/link";
import { Logo } from "../Logo";
import { MobileMenuButton } from "./MobileDrawer";

function MobileNavigation() {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return <MobileMenuButton />;
}

function DesktopNavigation() {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <>
      <div className="hidden sm:flex items-center justify-center">
        <div className="flex items-center gap-8 cursor-pointer select-none flex-1">
          <div className="flex items-center gap-2 cursor-pointer select-none hover:text-primary-700 transition-colors">
            <Link href="/hospital">병원 찾기</Link>
          </div>
          <div className="flex items-center gap-2 cursor-pointer select-none hover:text-secondary-700 transition-colors">
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </div>
      <div className="hidden flex-1 sm:flex"></div>
    </>
  );
}

function Navigation() {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <header>
      <nav>
        <div className="rounded border border-primary-100 bg-primary-100/50 backdrop-blur-sm px-8 py-4 flex justify-between items-center font-gamja text-2xl text-gray-800 shadow-sm">
          <Link href="/" className="flex-1 justify-start">
            <Logo />
          </Link>
          <MobileNavigation />
          <DesktopNavigation />
        </div>
      </nav>
    </header>
  );
}

export { Navigation };
