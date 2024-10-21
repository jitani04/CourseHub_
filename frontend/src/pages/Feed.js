import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header"; // Import your Header

function Feed() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showCreateForumModal, setShowCreateForumModal] = useState(false); // New state for the create forum modal
  const [newPost, setNewPost] = useState({ title: "", body: "", forum: "", attachment: null });
  const [newForum, setNewForum] = useState({ title: "", description: "", tags: "" }); // State for new forum
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const posts = [
    {
      title: "What is the difference between a list and an array?",
      author: "user12345",
      comments: 12,
      date: "September 17, 2024",
      image: "https://via.placeholder.com/150",
      forum: "Computer Science",
    },
    {
      title: "How can I implement a stack in python?",
      author: "user12345",
      comments: 15,
      date: "September 14, 2024",
      image: "https://via.placeholder.com/150",
      forum: "Computer Science",
    },
    {
      title: "Is it easy to get started with VR development?",
      author: "user12345",
      comments: 12,
      date: "September 13, 2024",
      image: "https://via.placeholder.com/150",
      forum: "Technology",
    },
    {
      title: "What is the difference between inner and outer joins in SQL?",
      author: "user12345",
      comments: 15,
      date: "September 10, 2024",
      image: "https://via.placeholder.com/150",
      forum: "Computer Science",
    },
  ];

  const subscribedForums = ["Computer Science", "Technology", "Business", "Film"];

  const filteredPosts = posts.filter((post) => {
    const matchesForum =
      selectedFilter === "All" || post.forum === selectedFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesForum && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewPost({ ...newPost, attachment: e.target.files[0] });
  };

  const handleCreatePostSubmit = () => {
    console.log("New Post Created:", newPost);
    setShowCreatePostModal(false);
    setNewPost({ title: "", body: "", forum: "", attachment: null });
  };

  // Handle Create Forum modal input change
  const handleForumInputChange = (e) => {
    const { name, value } = e.target;
    setNewForum({ ...newForum, [name]: value });
  };

  const handleCreateForumSubmit = () => {
    console.log("New Forum Created:", newForum);
    setShowCreateForumModal(false);
    setNewForum({ title: "", description: "", tags: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />

      <div className="feed-content flex p-4">
        {/* Sidebar */}
        <div className="flex flex-col space-y-4">

          {/* Saved Posts Section */}
          <div className="m-12 top-20 w-64 h-full p-8 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Saved Posts</h3>
            <ul>
              {filteredPosts.slice(0, 2).map((post, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => navigate(`/postdetail`)}
                  >
                    {post.title}
                  </a>
                  <p className="text-xs text-green-700">{post.forum}</p>
                </li>
              ))}
            </ul>
          </div>
            {/* Courses Section */}
            <div className="m-12 w-64 h-full p-11 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Courses</h3>
            <ul>
              {["Computer Science", "Mathematics", "Business", "Film"].map((course, index) => (
                <li key={index} className="mb-2 text-sm text-gray-600">{course}</li>
              ))}
            </ul>
            {/* Create Forum Button moved under Courses */}
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setShowCreateForumModal(true)}
            >
              Create Forum
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-4/5 bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="forumFilter" className="text-sm font-semibold mr-2">
                  Filter by forum:
                </label>
                <select
                  id="forumFilter"
                  className="border rounded px-3 py-1"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {["All", ...subscribedForums].map((forum, index) => (
                    <option key={index} value={forum}>
                      {forum}
                    </option>
                  ))}
                </select>
              </div>
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-3 py-1"
              />
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setShowCreatePostModal(true)}
            >
              Create Post
            </button>
          </div>

          {/* Posts Feed */}
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            {selectedFilter}
          </h2>
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex items-start space-x-4 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/postdetail`)}
              >
                <img
                  src={post.image}
                  alt="Post Thumbnail"
                  className="w-16 h-16 rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.author}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span>{post.comments} comments</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Creating Post */}
        {showCreatePostModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Post Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Body:</label>
                  <textarea
                    name="body"
                    value={newPost.body}
                    onChange={handleInputChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Forum:</label>
                  <select
                    name="forum"
                    value={newPost.forum}
                    onChange={handleInputChange}
                    className="border rounded w-full px-3 py-2"
                  >
                    {subscribedForums.map((forum, index) => (
                      <option key={index} value={forum}>
                        {forum}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Attachment:</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreatePostSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreatePostModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Creating Forum */}
        {showCreateForumModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Create a New Forum</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Forum Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newForum.title}
                    onChange={handleForumInputChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Description:</label>
                  <textarea
                    name="description"
                    value={newForum.description}
                    onChange={handleForumInputChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Tags:</label>
                  <input
                    type="text"
                    name="tags"
                    value={newForum.tags}
                    onChange={handleForumInputChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreateForumSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForumModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;