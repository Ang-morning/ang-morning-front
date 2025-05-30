import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  thumbnail: string;
  file: string;
};

function PostCard(props: { post: Post }) {
  // prop destruction
  const { post } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <Link href={`/blogs/${post.id}`}>
      <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
        {/* Thumbnail Image */}
        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6">
          <h2
            className="text-lg font-bold mb-3 text-gray-800 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center text-green-600 hover:text-green-500 transition-colors text-sm">
            자세히 보기
            <svg
              className="w-3 h-3 ml-1"
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
          </div>
        </div>
      </article>
    </Link>
  );
}

async function getPosts(): Promise<Post[]> {
  try {
    const postsPath = path.join(process.cwd(), "src/data/posts.json");
    const postsData = fs.readFileSync(postsPath, "utf8");
    const posts = JSON.parse(postsData);
    return posts;
  } catch (error) {
    console.error("Failed to load posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values
  const posts = await getPosts();

  // effects

  // handlers

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
