"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function MobileDrawer(props: { isOpen: boolean; onClose: () => void }) {
  // prop destruction
  const { isOpen, onClose } = props;
  // lib hooks
  // state, ref, querystring hooks
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // form hooks
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // 다음 프레임에서 애니메이션 시작
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // handlers
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ease-out ${
        isAnimating ? "bg-opacity-30" : "bg-opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-500 ease-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div
            className={`flex justify-between items-center mb-8 transition-all duration-300 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isAnimating ? "200ms" : "0ms" }}
          >
            <h2 className="text-xl font-gamja">Menu</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav
            className={`space-y-6 transition-all duration-300 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isAnimating ? "300ms" : "0ms" }}
          >
            <Link
              href="/hospital"
              className="block text-lg font-gamja py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Find Hospital
            </Link>
            <Link
              href="/blog"
              className="block text-lg font-gamja py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

function MobileMenuButton() {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const handleMenuClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleMenuClick}>
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
      <MobileDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </>
  );
}

export { MobileMenuButton };
