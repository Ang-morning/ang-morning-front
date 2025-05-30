import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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

async function getPost(id: string): Promise<Post | null> {
  try {
    const postsPath = path.join(process.cwd(), "src/data/posts.json");
    const postsData = fs.readFileSync(postsPath, "utf8");
    const posts: Post[] = JSON.parse(postsData);

    const post = posts.find((p) => p.id === id);
    return post || null;
  } catch (error) {
    console.error("Failed to load post:", error);
    return null;
  }
}

async function getPostContent(filename: string): Promise<string> {
  try {
    const markdownPath = path.join(process.cwd(), "src/data/posts", filename);

    if (!fs.existsSync(markdownPath)) {
      return "포스트 내용을 찾을 수 없습니다";
    }

    const content = fs.readFileSync(markdownPath, "utf8");
    return content;
  } catch (error) {
    console.error("Failed to load post content:", error);
    return "내용을 불러오는데 실패했습니다";
  }
}

function Markdown(props: { content: string }) {
  const { content } = props;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mb-3 mt-6 text-gray-800">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 ml-6 list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 ml-6 list-decimal">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="mb-2 text-gray-700">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-600">
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => {
          if (!src || typeof src !== "string") return null;

          return <Image src={src} alt={alt || ""} width={400} height={300} />;
        },
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                {children}
              </code>
            );
          }
          return <code className={className}>{children}</code>;
        },
        pre: ({ children }) => (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default async function BlogPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  // prop destruction
  const { params } = props;
  const resolvedParams = await params;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values
  const post = await getPost(resolvedParams.id);

  if (!post) {
    notFound();
  }

  const content = await getPostContent(post.file);

  // effects

  // handlers

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/blogs"
        className="inline-flex items-center text-green-600 hover:text-green-500 transition-colors mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        블로그 목록으로 돌아가기
      </Link>

      <article className="bg-white">
        {/* Title and Meta */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
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
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <span>Updated {post.date}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
          <Markdown content={content} />
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const postsPath = path.join(process.cwd(), "src/data/posts.json");
    const postsData = fs.readFileSync(postsPath, "utf8");
    const posts: Post[] = JSON.parse(postsData);

    return posts.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}
