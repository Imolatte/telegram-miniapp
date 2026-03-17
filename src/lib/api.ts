/** Mock API layer — uses JSONPlaceholder for demo data */

const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export async function fetchPosts(limit = 20): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?_limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchTodos(limit = 15): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos?_limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createPost(data: {
  title: string;
  body: string;
}): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: 1 }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}
