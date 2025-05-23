import Link from "next/link";
import { Logo } from "../Logo";
import { MobileMenuButton } from "./MobileDrawer";

function MobileNavigation(props: { className?: string }) {
  // prop destruction
  const { className } = props;
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <nav className={className}>
      <div className="rounded border-2 border-blue-200 bg-blue-200/60 px-8 py-4 flex justify-between items-center font-gamja text-2xl text-black">
        <Logo />
        <MobileMenuButton />
      </div>
    </nav>
  );
}

function DesktopNavigation(props: { className?: string }) {
  // prop destruction
  const { className } = props;
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <nav className={className}>
      <div className="rounded border-2 border-blue-200 bg-blue-200/60 px-8 py-4 flex justify-between items-center font-gamja text-2xl text-black">
        <div className="flex-1 justify-start">
          <Logo />
        </div>
        <div className="flex items-center gap-8 cursor-pointer select-none flex-1">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Link href="/hospital">Find Hospital</Link>
          </div>
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </nav>
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
      <MobileNavigation className="w-full sm:hidden" />
      <DesktopNavigation className="w-full hidden sm:block" />
    </header>
  );
}

export { Navigation };
