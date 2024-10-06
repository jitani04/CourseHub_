import { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import Textarea from '../components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import Calendar from '../components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/Popover';
import Badge from '../components/ui/Badge';
import { BookOpen, User, School, GraduationCap, Award, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Upload } from "lucide-react";
import { format } from 'date-fns';
import { cn } from '../lib/utils';


const topics = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Literature", "History", "Philosophy", "Psychology", "Sociology",
  "Economics", "Business", "Art", "Music", "Film Studies",
  "Environmental Science", "Political Science", "Linguistics", "Anthropology", "Engineering"
];

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
];

export function StudentProfile() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [graduationDate, setGraduationDate] = useState(undefined);
  const [gpa, setGpa] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [awards, setAwards] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [customAvatar, setCustomAvatar] = useState(null);
  const [schools, setSchools] = useState([]);
  const [majors, setMajors] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('https://api.example.com/schools')
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Error fetching schools:', error));

    fetch('https://api.example.com/majors')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomAvatar(e.target.files[0]);
      setAvatar('');
    }
  };

  const handleListItemAdd = (item, setter) => {
    if (item.trim()) {
      setter(prev => [...prev, item.trim()]);
    }
  };

  const handleListItemRemove = (index, setter) => {
    setter(prev => prev.filter((_, i) => i !== index));
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
      avatar: customAvatar ? 'Custom Avatar' : avatar,
    });
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Complete Your Student Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Help us personalize your CourseHub experience
          </p>
        </div>
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className={`flex flex-col items-center ${
                    step === s.number ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div className={`rounded-full p-2 ${
                    step === s.number ? "bg-green-100" : "bg-gray-100"
                  }`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-2 text-xs font-medium">{s.title}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Your Profile Picture</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-32 h-32 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-green-400" />
                            <p className="text-xs text-green-500 text-center">Upload your photo</p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleAvatarChange}
                            accept="image/*"
                            ref={fileInputRef}
                          />
                        </label>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm text-gray-500 mb-2">Or choose an avatar:</p>
                        <div className="flex space-x-2">
                          {avatars.map((a, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setAvatar(a);
                                setCustomAvatar(null);
                              }}
                              className={`p-1 rounded-lg transition-colors duration-200 ${
                                avatar === a ? "ring-2 ring-green-500" : "hover:bg-green-100"
                              }`}
                              title={`Select Avatar ${index + 1}`}
                            >
                              <img src={a} alt={`Avatar ${index + 1}`} width={50} height={50} className="rounded-full" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {customAvatar && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected file: {customAvatar.name}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</Label>
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
                      <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</Label>
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
                    <Label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</Label>
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
                  <div>
                    <Label htmlFor="school" className="block text-sm font-medium text-gray-700">School</Label>
                    <Select onValueChange={setSchool} value={school}>
                      <SelectTrigger className="w-full mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                        <SelectValue placeholder="Select your school" />
                      </SelectTrigger>
                      <SelectContent>
                        {schools.map((s, index) => (
                          <SelectItem key={index} value={s} className="hover:bg-green-50">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="major" className="block text-sm font-medium text-gray-700">Major</Label>
                    <Select onValueChange={setMajor} value={major}>
                      <SelectTrigger className="w-full mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                        <SelectValue placeholder="Select your major" />
                      </SelectTrigger>
                      <SelectContent>
                        {majors.map((m, index) => (
                          <SelectItem key={index} value={m} className="hover:bg-green-50">{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700">Expected Graduation Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1 border-green-200",
                            !graduationDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {graduationDate ? format(graduationDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={graduationDate}
                          onSelect={setGraduationDate}
                          className="rounded-md border-green-200"
                          modifiersClassNames={{
                            selected: "bg-green-600 text-white hover:bg-green-600 focus:bg-green-600",
                            today: "bg-green-100 text-green-900",
                            outside: "text-muted-foreground opacity-50",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="gpa" className="block text-sm font-medium text-gray-700">GPA (Optional)</Label>
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
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Topics of Interest</Label>
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
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="awards" className="block text-sm font-medium text-gray-700">Awards or Honors</Label>
                    <div className="flex mt-1">
                      <Input
                        type="text"
                        id="awards"
                        placeholder="Add an award or honor"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleListItemAdd(e.currentTarget.value, setAwards);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('awards');
                          handleListItemAdd(input.value, setAwards);
                          input.value = '';
                        }}
                        className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {awards.map((award, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-2 bg-green-100 text-green-800">
                          {award}
                          <button
                            type="button"
                            onClick={() => handleListItemRemove(index, setAwards)}
                            className="ml-1 text-green-600 hover:text-green-800"
                            title="Remove award"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="clubs" className="block text-sm font-medium text-gray-700">Clubs & Organizations</Label>
                    <div className="flex mt-1">
                      <Input
                        type="text"
                        id="clubs"
                        placeholder="Add a club or organization"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleListItemAdd(e.currentTarget.value, setClubs);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('clubs');
                          handleListItemAdd(input.value, setClubs);
                          input.value = '';
                        }}
                        className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {clubs.map((club, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-2 bg-green-100 text-green-800">
                          {club}
                          <button
                            type="button"
                            onClick={() => handleListItemRemove(index, setClubs)}
                            className="ml-1 text-green-600 hover:text-green-800"
                            title="Remove club"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Additional Certifications or Achievements</Label>
                    <div className="flex mt-1">
                      <Input
                        type="text"
                        id="certifications"
                        placeholder="Add a certification or achievement"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleListItemAdd(e.currentTarget.value, setCertifications);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('certifications');
                          handleListItemAdd(input.value, setCertifications);
                          input.value = '';
                        }}
                        className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-2 bg-green-100 text-green-800">
                          {cert}
                          <button
                            type="button"
                            onClick={() => handleListItemRemove(index, setCertifications)}
                            className="ml-1 text-green-600 hover:text-green-800"
                            title="Remove certification"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
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
                  <Button type="submit" className="ml-auto bg-green-600 hover:bg-green-700 text-white">
                    Complete Profile
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
