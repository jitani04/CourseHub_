import { useState } from "react";
import Header from "../components/layout/Header"; // Assuming the Header component is in the components folder
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input"; // Assuming an Input component for consistent styling

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Bethany Cruz",
    username: "bethcruz98",
    email: "bethany@example.com",
    education: "California State University, Long Beach",
    degrees: "Bachelors in Electrical Engineering",
    awards: "Dean's List",
    biography:
      "I am a passionate Engineering student who is in several clubs at my college and I am pursuing my master’s currently!",
  });

  const [editableUserData, setEditableUserData] = useState(userData);

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setUserData(editableUserData); // Save changes when toggling off edit mode
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
            <AvatarImage src="" alt={userData.name} />
            <AvatarFallback className="flex items-center justify-center h-full w-full text-xl font-bold text-gray-600">
              {userData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            {isEditing ? (
              <Input
                name="name"
                value={editableUserData.name}
                onChange={handleChange}
                className="text-2xl font-bold text-gray-800 text-center"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
            )}
            <p className="text-sm text-gray-500">@{userData.username}</p>
          </div>

          <Button
            onClick={toggleEdit}
            className="bg-green-600 text-white rounded-full"
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {["education", "degrees", "awards", "biography"].map((field, index) => (
            <div key={index} className="p-4 rounded-lg bg-white shadow-sm">
              <p className="text-sm text-gray-600 capitalize">{field}</p>
              {isEditing ? (
                <Input
                  name={field}
                  value={editableUserData[field]}
                  onChange={handleChange}
                  className="text-lg font-semibold text-gray-800 w-full"
                  multiline={field === "biography"}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">
                  {userData[field]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;