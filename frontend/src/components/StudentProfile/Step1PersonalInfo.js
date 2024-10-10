import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";
import ScrollArea from "../ui/ScrollArea";
import { cn } from "../../lib/utils";
import { ImagePlus, User, Check, ChevronDown, Search } from "lucide-react";
import { generateAvatarSvg, getAvailableStyles } from "../../utils/avatarUtils";

function Step1PersonalInfo({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  avatar,
  setAvatar,
}) {
  const [customAvatar, setCustomAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState(getAvailableStyles()[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatarPage, setAvatarPage] = useState(1);

  const handleAvatarChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatar(file);
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (seed) => {
    const svg = generateAvatarSvg(selectedStyle, seed);
    const avatarUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    setAvatar(avatarUrl);
    setCustomAvatar(null);
  };

  const filteredStyles = getAvailableStyles().filter((style) =>
    style.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const avatarsToDisplay = Array.from({ length: avatarPage * 15 }, (_, i) => {
    const seed = `avatar-${i}`;
    const svg = generateAvatarSvg(selectedStyle, seed);
    const avatarUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    return { seed, avatarUrl };
  });

  const handleLoadMore = () => {
    setAvatarPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            {/* Avatar Preview and Upload */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <Avatar
                  className={cn(
                    "w-32 h-32 transition-all duration-300 ease-in-out",
                    (avatar || customAvatar) &&
                      "ring-4 ring-green-500 ring-offset-4",
                  )}
                >
                  {avatar ? (
                    <AvatarImage src={avatar} alt="Profile picture" />
                  ) : (
                    <AvatarFallback>
                      <User className="w-16 h-16 text-gray-400" />
                    </AvatarFallback>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <label
                      htmlFor="avatar-upload"
                      className="cursor-pointer p-2 bg-green-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                      <ImagePlus className="w-8 h-8 text-white" />
                      <span className="sr-only">Upload profile picture</span>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      onChange={handleAvatarChange}
                      accept="image/*"
                      ref={fileInputRef}
                    />
                  </div>
                </Avatar>
              </div>
            </div>
            {/* Avatar Selection */}
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-4">
                Upload a photo or choose an avatar
              </p>
              <div className="mb-4">
                <Select onValueChange={setSelectedStyle} value={selectedStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select avatar style" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="flex items-center px-3 pb-2">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <Input
                        placeholder="Search styles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 w-full"
                      />
                    </div>
                    {filteredStyles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-48">
                <div className="grid grid-cols-5 gap-4">
                  {avatarsToDisplay.map(({ seed, avatarUrl }) => {
                    const isSelected = avatar === avatarUrl;

                    return (
                      <button
                        key={seed}
                        type="button"
                        onClick={() => handleAvatarSelect(seed)}
                        className={cn(
                          "flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110",
                          isSelected
                            ? "ring-2 ring-green-500 ring-offset-2"
                            : "hover:ring-2 hover:ring-green-300 hover:ring-offset-2",
                        )}
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={avatarUrl}
                            alt={`${selectedStyle} avatar ${seed}`}
                          />
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-50 rounded-full">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="mt-4 flex justify-center">
                <Button
                  type="button"
                  onClick={handleLoadMore}
                  variant="outline"
                  className="group relative py-2 px-4 border border-green-400 text-green-600 rounded-full hover:bg-green-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ml-[-30px]"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ChevronDown className="h-5 w-5 text-green-500 group-hover:text-green-400 transition-colors duration-300 ease-in-out" />
                  </span>
                  <span className="pl-6">Load More Avatars</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Personal Information Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </Label>
          <Input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </Label>
          <Input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
          placeholder="Write your bio here e.g. your hobbies, interests ETC"
        />
      </div>
    </div>
  );
}

export default Step1PersonalInfo;
