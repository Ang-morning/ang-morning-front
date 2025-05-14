import Link from "next/link";
import posts from "@/data/posts.json";

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          앵무새 케어 정보
        </h1>
        <p className="text-gray-600">
          앵무새 건강 관리에 대한 전문적인 정보와 팁을 확인하세요.
        </p>
      </div>

      <div className="space-y-8">
        {posts.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{post.content}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              자세히 보기
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
        ))}
      </div>
    </div>
  );
}
