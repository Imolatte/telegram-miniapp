import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useTelegram } from "@/hooks/useTelegram";
import { createPost } from "@/lib/api";

interface FormErrors {
  title?: string;
  body?: string;
}

export function Create() {
  const { haptic, showAlert } = useTelegram();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("general");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Title is required";
    else if (title.trim().length < 3)
      errs.title = "Title must be at least 3 characters";

    if (!body.trim()) errs.body = "Description is required";
    else if (body.trim().length < 10)
      errs.body = "Description must be at least 10 characters";

    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      haptic("medium");
      return;
    }

    setSubmitting(true);
    try {
      await createPost({ title: title.trim(), body: body.trim() });
      haptic("heavy");
      showAlert("Post created successfully!");
      setTitle("");
      setBody("");
      setCategory("general");
      setErrors({});
    } catch {
      showAlert("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const categories = [
    { value: "general", label: "General" },
    { value: "tech", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
  ];

  return (
    <>
      <PageHeader title="Create Post" subtitle="Share something with the community" />

      <form onSubmit={handleSubmit} className="mt-2">
        {/* Title */}
        <div className="tg-section-header">Title</div>
        <div className="tg-section">
          <input
            className="tg-input"
            type="text"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
          />
        </div>
        {errors.title && (
          <p className="px-4 pt-1 text-[13px]" style={{ color: "var(--tg-theme-destructive-text-color)" }}>
            {errors.title}
          </p>
        )}

        {/* Category */}
        <div className="tg-section-header mt-4">Category</div>
        <div className="tg-section">
          <div className="flex gap-2 p-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => {
                  haptic("light");
                  setCategory(cat.value);
                }}
                className="px-4 py-2 rounded-full text-[14px] font-medium whitespace-nowrap border-none cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    category === cat.value
                      ? "var(--tg-theme-button-color)"
                      : "var(--tg-theme-secondary-bg-color)",
                  color:
                    category === cat.value
                      ? "var(--tg-theme-button-text-color)"
                      : "var(--tg-theme-text-color)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="tg-section-header mt-4">Description</div>
        <div className="tg-section">
          <textarea
            className="tg-input resize-none"
            rows={5}
            placeholder="Write your post content..."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (errors.body) setErrors((prev) => ({ ...prev, body: undefined }));
            }}
          />
        </div>
        {errors.body && (
          <p className="px-4 pt-1 text-[13px]" style={{ color: "var(--tg-theme-destructive-text-color)" }}>
            {errors.body}
          </p>
        )}

        {/* Character count */}
        <div className="px-4 pt-1 text-right">
          <span className="text-[12px]" style={{ color: "var(--tg-theme-hint-color)" }}>
            {body.length} / 500
          </span>
        </div>

        {/* Submit */}
        <div className="px-4 mt-6">
          <button type="submit" className="tg-button" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>

      <div className="h-6" />
    </>
  );
}
