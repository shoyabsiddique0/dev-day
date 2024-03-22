const express = require("express");
const app = express();
const Fuse = require("fuse.js");

app.use(express.json());

class BlogPost {
  constructor(id, title, content, publicationDate, author) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.publicationDate = publicationDate;
    this.author = author;
  }
}

let blogPosts = [];

app.post("/api/posts", (req, res) => {
  const { title, content, author } = req.body;
  const id = blogPosts.length + 1;
  const publicationDate = new Date();
  const newPost = new BlogPost(id, title, content, publicationDate, author);
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

app.get("/api/posts", (req, res) => {
  const { sortBy, order, author } = req.query;

  let sortedPosts = blogPosts;

  if (sortBy === "date") {
    sortedPosts = sortBlogPostsByDate(order);
  } else if (sortBy === "author") {
    sortedPosts = sortBlogPostsByAuthor(order);
  }

  if (author) {
    sortedPosts = filterBlogPostsByAuthor(author);
  }

  res.json(sortedPosts);
});

app.get("/api/posts/:id", (req, res) => {
  const post = getBlogPostById(parseInt(req.params.id));

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.put("/api/posts/:id", (req, res) => {
  const { title, content, author } = req.body;
  const updatedPost = {
    title: title || undefined,
    content: content || undefined,
    author: author || undefined,
  };

  const post = updateBlogPost(parseInt(req.params.id), updatedPost);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.delete("/api/posts/:id", (req, res) => {
  const deletedPost = deleteBlogPost(parseInt(req.params.id));

  if (deletedPost) {
    res.json(deletedPost);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

function sortBlogPostsByDate(order = "asc") {
  return blogPosts.sort((a, b) => {
    if (order === "asc") {
      return new Date(a.publicationDate) - new Date(b.publicationDate);
    } else {
      return new Date(b.publicationDate) - new Date(a.publicationDate);
    }
  });
}

function sortBlogPostsByAuthor(order = "asc") {
  return blogPosts.sort((a, b) => {
    if (order === "asc") {
      return a.author.localeCompare(b.author);
    } else {
      return b.author.localeCompare(a.author);
    }
  });
}

function createFuseInstance() {
  return new Fuse(blogPosts, {
    keys: ["author"],
    includeMatches: true,
  });
}

function filterBlogPostsByAuthor(authorQuery) {
  const fuse = createFuseInstance();
  const result = fuse.search(authorQuery);
  return result.map((item) => item.item);
}

function getBlogPostById(id) {
  return blogPosts.find((post) => post.id === id);
}

function updateBlogPost(id, updatedPost) {
  const index = blogPosts.findIndex((post) => post.id === id);
  if (index !== -1) {
    blogPosts[index] = { ...blogPosts[index], ...updatedPost };
    return blogPosts[index];
  }
  return null;
}

function deleteBlogPost(id) {
  const index = blogPosts.findIndex((post) => post.id === id);
  if (index !== -1) {
    const deletedPost = blogPosts[index];
    blogPosts.splice(index, 1);
    return deletedPost;
  }
  return null;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
