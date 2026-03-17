import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { fetchPosts, type Post } from "@/lib/api";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts(15)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Feed" subtitle="Latest posts from the community" />

      {loading && <Spinner />}

      {error && (
        <div className="mx-4 mt-4 p-4 rounded-2xl text-center" style={{ backgroundColor: "rgba(255, 59, 48, 0.08)" }}>
          <p style={{ color: "var(--tg-theme-destructive-text-color)" }} className="text-[15px]">
            Failed to load: {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="mt-2 flex flex-col gap-3 px-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl p-4"
              style={{ backgroundColor: "var(--tg-theme-section-bg-color)" }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: "var(--tg-theme-button-color)",
                    color: "var(--tg-theme-button-text-color)",
                  }}
                >
                  {String.fromCharCode(65 + (post.userId % 26))}
                </div>
                <div>
                  <div
                    className="text-[15px] font-semibold leading-tight"
                    style={{ color: "var(--tg-theme-text-color)" }}
                  >
                    User {post.userId}
                  </div>
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--tg-theme-hint-color)" }}
                  >
                    {post.id}h ago
                  </div>
                </div>
              </div>

              <h3
                className="text-[15px] font-semibold leading-snug mb-1.5 capitalize"
                style={{ color: "var(--tg-theme-text-color)" }}
              >
                {post.title}
              </h3>
              <p
                className="text-[14px] leading-relaxed line-clamp-3"
                style={{ color: "var(--tg-theme-hint-color)" }}
              >
                {post.body}
              </p>

              <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: "0.5px solid var(--tg-theme-section-separator-color)" }}>
                <button
                  className="text-[13px] font-medium bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--tg-theme-accent-text-color)" }}
                >
                  Like
                </button>
                <button
                  className="text-[13px] font-medium bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--tg-theme-hint-color)" }}
                >
                  Comment
                </button>
                <button
                  className="text-[13px] font-medium bg-transparent border-none cursor-pointer ml-auto"
                  style={{ color: "var(--tg-theme-hint-color)" }}
                >
                  Share
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Bottom spacer for scroll */}
      <div className="h-4" />
    </>
  );
}
