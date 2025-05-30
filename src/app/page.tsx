import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="py-24 overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-accent/20 to-primary-400/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent leading-tight">
              우리 아이의
              <br />
              가장 친한 친구
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
              앵무새 전문 병원 찾기, 전문 정보, 그리고 팁까지
              <br />
              <span className="text-primary-600 font-semibold">
                깃털 달린 가족과 함께하는 일상을 공유합니다
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                병원 찾기
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-primary-600 hover:text-primary-600 transition-all duration-200 cursor-pointer">
                블로그 둘러보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 콘텐츠 섹션 */}
      <section className="py-20 mt-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              앵무새 정보 모음
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              앵무새를 키우며 공부하고 정리한 유용한 정보들을 모아두었어요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 병원 찾기 */}
            <Link href="/hospitals" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🏥</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary-600 transition-colors">
                  병원 찾기
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  전국의 앵무새를 진료하는 동물병원 정보를 모아두었어요
                </p>
                <div className="text-primary-600 font-semibold group-hover:text-primary-700">
                  병원 찾아보기 →
                </div>
              </div>
            </Link>

            {/* 블로그 */}
            <Link href="/blog" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-secondary-600 transition-colors">
                  블로그
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  케어 지식과 실제 경험을 정리한 블로그예요
                </p>
                <div className="text-secondary-600 font-semibold group-hover:text-secondary-700">
                  블로그 읽기 →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 개인 소개 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                앵모닝
                <span className="text-primary-600"> 소개</span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600 text-sm">💙</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      실제 경험 바탕
                    </h3>
                    <p className="text-gray-600">
                      직접 앵무새를 키우며 겪은 경험들을 정리해서 올려요
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600 text-sm">📖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      지속적인 학습
                    </h3>
                    <p className="text-gray-600">
                      더 나은 케어를 위해 계속 공부하고 배운 내용을 정리해요
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600 text-sm">📝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      정보 정리
                    </h3>
                    <p className="text-gray-600">
                      유용한 정보들을 찾기 쉽게 정리해서 보관하고 있어요
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br gap-x-48 from-primary-50 to-secondary-50 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <Image
                src="/images/junbae.jpg"
                alt="parrot"
                width={150}
                height={100}
                className="rounded-full"
              />
              <h3 className="text-2xl font-bold text-gray-800 ">
                개인 기록 공간
              </h3>
              <p className="text-gray-600 text-lg">
                앵무새와 함께하는 일상과 배운 것들을 기록하는 개인 블로그예요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            앵무새 정보가 필요하다면
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            병원 정보부터 케어 팁까지, 유용한 정보들을 정리해두었어요
          </p>
          <button className="px-10 py-4 bg-white text-primary-600 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer">
            블로그 둘러보기
          </button>
        </div>
      </section>
    </div>
  );
}
