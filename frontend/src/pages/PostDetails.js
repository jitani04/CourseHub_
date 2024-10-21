import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header"; // Assuming you already have a Header component

function PostDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
    <Header/>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Sidebar */}
        <aside className="w-1/5 bg-white p-6">
          {/* Saved Posts */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Saved Posts</h3>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    navigate(`/postdetail`);
                  }}
                >
                  What is the difference between a list and an array?
                </a>
                <p className="text-xs text-green-700">Computer Science</p>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    navigate(`/postdetail`);
                  }}
                >
                  How can I implement a stack in python?
                </a>
                <p className="text-xs text-green-700">Computer Science</p>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Courses</h3>
            <ul>
              <li className="mb-2 text-sm text-gray-600">Computer Science</li>
              <li className="mb-2 text-sm text-gray-600">Mathematics</li>
              <li className="mb-2 text-sm text-gray-600">Business</li>
              <li className="mb-2 text-sm text-gray-600">Film</li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="w-4/5 bg-gray-50 p-6">
          {/* Post Title and Content */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              What is the difference between a list and an array?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              user12345 • September 17, 2024
            </p>
            <p>
              Hi everyone, I was trying to write a program for my Python class and I see that we have to use a list structure. I've used arrays in other classes, but my professor said that they are basically the same thing. But I was curious about the key difference between the two.
            </p>
          </div>

          {/* Replies */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Reply from user456</h3>
            <p className="text-sm text-gray-600 mb-2">September 14, 2024</p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`Lists are a type of array, but lists allow for you to have different data types in them. For example if I create a list in Python, I can populate it with ints, text and strings, and it will work as I want it to.
def myList():
    myMixedList = [1, 2, 3, 4, '5']
    mySecondList = [1, 2, 'hello', 5, 'world']
    print(myMixedList)
    print(mySecondList)
When I print these out, they'll behave the same way, despite the different types.`}
            </pre>
            <p>
              When I print these out, they'll behave the same way, despite the different types.
            </p>
          </div>

          {/* Reply Section */}
          <div>
            <textarea
              placeholder="Reply..."
              className="border rounded w-full py-2 px-3 mb-4"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Post Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;