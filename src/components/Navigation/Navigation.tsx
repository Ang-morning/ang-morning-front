function MobileNavigation() {
  return (
    <nav className="w-full mt-6 sm:hidden">
      <div className="mx-7 rounded border-2 border-blue-200 bg-blue-200/60 px-8 py-4 flex justify-between items-center font-gamja text-2xl text-black">
        <span>Menu</span>
        {/* TODO: Implement hamburger icon or similar */}
        <button type="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* TODO: Implement mobile menu items (e.g., dropdown, off-canvas) */}
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
    <>
      <MobileNavigation />

      <nav className="w-full mt-6 hidden sm:block">
        <div className="mx-7 rounded border-2 border-blue-200 bg-blue-200/60 px-8 py-4 flex gap-12 font-gamja text-2xl text-black">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            자유게시판
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 cursor-pointer select-none">
            앵위키
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </nav>
    </>
  );
}

export { Navigation };
