import Link from "next/link";

function Footer() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <footer className="bg-primary-900 text-white pt-10 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-between">
          <div className="flex flex-col gap-2 items-start">
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <p className="text-primary-300 mb-2">
              평일 10:00 - 19:00 (주말, 공휴일 제외)
            </p>
            <Link
              href="mailto:window95pill@gmail.com"
              className="text-primary-300 hover:text-primary-200 transition-colors mb-4"
            >
              window95pill@gmail.com
            </Link>
            <Link
              href="mailto:window95pill@gmail.com"
              className="inline-block border border-primary-300 px-6 py-2 text-center w-full max-w-48 text-primary-200 hover:bg-primary-800 hover:border-primary-200 transition-all duration-200"
            >
              1:1 문의하기
            </Link>
          </div>

          {/* 앵모닝 */}
          <div className="flex flex-col gap-2 items-end">
            <h3 className="text-lg font-medium mb-4">앵모닝</h3>
            <ul className="space-y-2 text-primary-300">
              <li>
                <Link
                  href="/hospitals"
                  className="hover:text-primary-200 transition-colors"
                >
                  병원 찾기
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-secondary-200 transition-colors"
                >
                  블로그
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-4 text-xs text-primary-400">
          <p className="mb-1">
            앵모닝 | 만든사람 황창환 | 연락처: window95pill@gmail.com
          </p>
          <p className="mb-2">
            Copyright © 2025 ANGMORNING INC. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/terms"
              className="hover:text-primary-200 transition-colors"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
