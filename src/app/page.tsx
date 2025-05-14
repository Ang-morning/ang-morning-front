import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 히어로 섹션 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              우리 아이를 위한 최고의 케어
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              앵무새 건강 관리, 영양 관리, 그리고 전문가의 케어 팁까지
              <br />
              당신의 소중한 친구를 위한 모든 정보를 한 곳에서 만나보세요.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                케어 정보 보기
              </Link>
              <Link
                href="/hospitals"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/5 transition-colors"
              >
                병원 찾기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 콘텐츠 섹션 */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              최신 케어 정보
            </h2>
            <div className="space-y-6">
              <article className="border-b border-gray-100 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  앵무새 건강 관리의 기본
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  앵무새의 일상적인 건강 관리 방법과 주의해야 할 점들을
                  알아보세요. 전문가의 조언으로 더 건강한 생활을 시작하세요.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  더 보기
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              전문 병원 찾기
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              가까운 앵무새 전문 병원을 찾아보세요. 정기 검진과 상담으로 우리
              아이의 건강을 지켜주세요.
            </p>
            <Link
              href="/hospitals"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg w-full"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              병원 찾기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
