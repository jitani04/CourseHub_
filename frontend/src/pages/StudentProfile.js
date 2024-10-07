import { useState, useEffect, useRef } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Textarea from "../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import Calendar from "../components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/Popover";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import ScrollArea from "../components/ui/ScrollArea";
import {
  BookOpen,
  User,
  School,
  GraduationCap,
  Award,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ImagePlus,
  Search,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";

const topics = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Literature",
  "History",
  "Philosophy",
  "Psychology",
  "Sociology",
  "Economics",
  "Business",
  "Art",
  "Music",
  "Film Studies",
  "Environmental Science",
  "Political Science",
  "Linguistics",
  "Anthropology",
  "Engineering",
  "Pre-Med",
];

const diceBearCategories = [
  "adventurer",
  "adventurer-neutral",
  "avataaars",
  "avataaars-neutral",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "bottts-neutral",
  "croodles",
  "croodles-neutral",
  "fun-emoji",
  "icons",
  "identicon",
  "initials",
  "lorelei",
  "lorelei-neutral",
  "micah",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
  "shapes",
];

function StudentProfile() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [graduationDate, setGraduationDate] = useState(null);
  const [gpa, setGpa] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [awards, setAwards] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [schools, setSchools] = useState([]);
  const [majors, setMajors] = useState([]);
  const [customAvatar, setCustomAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(
    diceBearCategories[0],
  );
  const [avatarPage, setAvatarPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch schools and majors from API (replace with actual API calls)
    setSchools(["CSULB", "CSULA", "UCLA", "UCI"]);
    setMajors([
      "Computer Science",
      "Engineering",
      "Business",
      "Psychology",
      "Biology",
    ]);
  }, []);

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

  const handleAvatarSelect = (avatarUrl) => {
    setAvatar(avatarUrl);
    setCustomAvatar(null);
  };

  const generateAvatarUrl = (category, seed) => {
    return `https://api.dicebear.com/6.x/${category}/svg?seed=${seed}`;
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) => {
      return prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];
    });
  };

  const handleListItemAdd = (item, setter) => {
    if (item.trim()) {
      setter((prev) => [...prev, item.trim()]);
    }
  };

  const handleListItemRemove = (index, setter) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      bio,
      school,
      major,
      graduationDate,
      gpa,
      selectedTopics,
      awards,
      clubs,
      certifications,
      avatar: customAvatar ? "Custom Avatar" : avatar,
    });
  };

  const filteredCategories = diceBearCategories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleLoadMore = () => {
    setAvatarPage((prevPage) => prevPage + 1);
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: School },
    { number: 3, title: "Interests", icon: GraduationCap },
    { number: 4, title: "Achievements", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Complete Your Student Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Help us personalize your CourseHub experience
          </p>
        </div>
        <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-8">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className={`flex flex-col items-center ${
                    step === s.number ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      step === s.number ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-2 text-xs font-medium">{s.title}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-6">
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
                                <AvatarImage
                                  src={avatar}
                                  alt="Profile picture"
                                />
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
                                  <span className="sr-only">
                                    Upload profile picture
                                  </span>
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
                        <div className="flex-grow">
                          <p className="text-sm text-gray-500 mb-4">
                            Upload a photo or choose an avatar
                          </p>
                          <div className="mb-4">
                            <Select
                              onValueChange={setSelectedCategory}
                              value={selectedCategory}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select avatar category" />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="flex items-center px-3 pb-2">
                                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                  <Input
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                    className="h-8 w-full"
                                  />
                                </div>
                                {filteredCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <ScrollArea className="h-48">
                            <div className="grid grid-cols-5 gap-4">
                              {Array.from(
                                { length: avatarPage * 15 },
                                (_, i) => {
                                  const avatarUrl = generateAvatarUrl(
                                    selectedCategory,
                                    `avatar-${i}`,
                                  );
                                  const isSelected = avatar === avatarUrl;

                                  return (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={() =>
                                        handleAvatarSelect(avatarUrl)
                                      }
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
                                          alt={`${selectedCategory} avatar ${i + 1}`}
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
                                },
                              )}
                            </div>
                          </ScrollArea>
                          <div className="mt-4 flex justify-center">
                            <Button
                              type="button"
                              onClick={handleLoadMore}
                              variant="outline"
                              className="group relative py-2 px-4 border border-green-400 text-green-600 rounded-full hover:bg-green-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
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
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label
                          htmlFor="school"
                          className="block text-sm font-medium text-gray-700"
                        >
                          School
                        </Label>
                        <Select onValueChange={setSchool} value={school}>
                          <SelectTrigger className="w-full mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                            <SelectValue placeholder="Select your school" />
                          </SelectTrigger>
                          <SelectContent>
                            {schools.map((s, index) => (
                              <SelectItem
                                key={index}
                                value={s}
                                className="hover:bg-green-50"
                              >
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="major"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Major
                        </Label>
                        <Select onValueChange={setMajor} value={major}>
                          <SelectTrigger className="w-full mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                            <SelectValue placeholder="Select your major" />
                          </SelectTrigger>
                          <SelectContent>
                            {majors.map((m, index) => (
                              <SelectItem
                                key={index}
                                value={m}
                                className="hover:bg-green-50"
                              >
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="graduationDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expected Graduation Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal mt-1 border-green-200",
                                !graduationDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {graduationDate ? (
                                format(graduationDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={graduationDate}
                              onSelect={setGraduationDate}
                              initialFocus
                              className="rounded-md border-green-200"
                              classNames={{
                                day_selected:
                                  "bg-green-600 text-white hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white",
                                day_today: "bg-green-100 text-green-900",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label
                          htmlFor="gpa"
                          className="block text-sm font-medium text-gray-700"
                        >
                          GPA (Optional)
                        </Label>
                        <Input
                          type="number"
                          id="gpa"
                          value={gpa}
                          onChange={(e) => setGpa(e.target.value)}
                          min="0"
                          max="4"
                          step="0.01"
                          className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Topics of Interest</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {topics.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => handleTopicToggle(topic)}
                            className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              selectedTopics.includes(topic)
                                ? "bg-green-100 text-green-800 border-2 border-green-500"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {topic}
                            {selectedTopics.includes(topic) && (
                              <Check className="inline-block ml-2 h-4 w-4" />
                            )}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements and Involvement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label
                          htmlFor="awards"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Awards or Honors
                        </Label>
                        <div className="flex mt-1">
                          <Input
                            type="text"
                            id="awards"
                            placeholder="Add an award or honor"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleListItemAdd(
                                  e.currentTarget.value,
                                  setAwards,
                                );
                                e.currentTarget.value = "";
                              }
                            }}
                            className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById("awards");
                              if (input instanceof HTMLInputElement) {
                                handleListItemAdd(input.value, setAwards);
                                input.value = "";
                              }
                              handleListItemAdd(input.value, setAwards);
                              input.value = "";
                            }}
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {awards.map((award, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleListItemRemove(index, setAwards)
                              } // Handle the click to remove the item
                              className="relative inline-flex items-center text-sm py-1 pl-2 pr-6 bg-green-100 text-green-800 rounded-lg cursor-pointer transition-all hover:bg-red-100 hover:text-red-600 group"
                            >
                              <span>{award}</span>
                              <span className="absolute right-2 inset-y-0 flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <X className="h-4 w-4 font-bold" />{" "}
                                {/* Bold X icon */}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="clubs"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Clubs & Organizations
                        </Label>
                        <div className="flex mt-1">
                          <Input
                            type="text"
                            id="clubs"
                            placeholder="Add a club or organization"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleListItemAdd(
                                  e.currentTarget.value,
                                  setClubs,
                                );
                                e.currentTarget.value = "";
                              }
                            }}
                            className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById("clubs");
                              if (input instanceof HTMLInputElement) {
                                handleListItemAdd(input.value, setClubs);
                                input.value = "";
                              }
                            }}
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {clubs.map((club, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleListItemRemove(index, setClubs)
                              } // Handle the click to remove the item
                              className="relative inline-flex items-center text-sm py-1 pl-2 pr-6 bg-green-100 text-green-800 rounded-lg cursor-pointer transition-all hover:bg-red-100 hover:text-red-600 group"
                            >
                              <span>{club}</span>
                              <span className="absolute right-2 inset-y-0 flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <X className="h-4 w-4 font-bold" />{" "}
                                {/* Bold X icon */}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="certifications"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Additional Certifications or Achievements
                        </Label>
                        <div className="flex mt-1">
                          <Input
                            type="text"
                            id="certifications"
                            placeholder="Add a certification or achievement"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleListItemAdd(
                                  e.currentTarget.value,
                                  setCertifications,
                                );
                                e.currentTarget.value = "";
                              }
                            }}
                            className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const input =
                                document.getElementById("certifications");
                              if (input instanceof HTMLInputElement) {
                                handleListItemAdd(
                                  input.value,
                                  setCertifications,
                                );
                                input.value = "";
                              }
                            }}
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {certifications.map((cert, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleListItemRemove(index, setCertifications)
                              } // Handle the click to remove the item
                              className="relative inline-flex items-center text-sm py-1 pl-2 pr-6 bg-green-100 text-green-800 rounded-lg cursor-pointer transition-all hover:bg-red-100 hover:text-red-600 group"
                            >
                              <span>{cert}</span>
                              <span className="absolute right-2 inset-y-0 flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <X className="h-4 w-4 font-bold" />{" "}
                                {/* Bold X icon */}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="flex items-center border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                {step < steps.length ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="ml-auto flex items-center bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white"
                  >
                    Complete Profile
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StudentProfile;
