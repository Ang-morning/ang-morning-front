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
              당신의 소중한 가족를 위한 모든 정보를 한 곳에서 만나보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 주요 콘텐츠 섹션 */}
      <section className="px-4 flex justify-center items-center">
        <div className="w-[50%]">
          <Link href="/hospitals">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                전문 병원 찾기
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                가까운 앵무새 전문 병원을 찾아보세요. 정기 검진과 상담으로 우리
                아이의 건강을 지켜주세요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
