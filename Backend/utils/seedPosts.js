import BlogPost from "../models/BlogPost.js";

export const seedPosts = async (adminId) => {
  const topics = [
    {
      title: "JavaScript Basics",
      subtitle: "Start your dev journey",
      category: "JavaScript",
      tags: ["js", "basics"],
      content: "Learn variables, loops, functions, arrays, objects...",
      author: adminId,
      published: true
    },
    {
      title: "React Guide",
      subtitle: "Frontend mastery",
      category: "React",
      tags: ["react"],
      content: "Components, hooks, routing, APIs...",
      author: adminId,
      published: true
    }
  ];

  for (let t of topics) await BlogPost.create(t);
};
