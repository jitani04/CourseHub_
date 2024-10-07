import React, { useState, useEffect } from 'react';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Education from './Step2Education';
import Step3Interests from './Step3Interests';
import Step4Achievements from './Step4Achievements';
import { steps } from '../../constants/steps';
import { Card, CardContent } from '../ui/Card';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

function StudentProfile() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [graduationDate, setGraduationDate] = useState(null);
  const [gpa, setGpa] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [awards, setAwards] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [schools, setSchools] = useState([]);
  const [majors, setMajors] = useState([]);

  // Fetch schools and majors
  useEffect(() => {
    // fetchSchools().then(setSchools);
    // fetchMajors().then(setMajors);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

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
                    step === s.number ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      step === s.number ? 'bg-green-100' : 'bg-gray-100'
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
                <Step1PersonalInfo
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  bio={bio}
                  setBio={setBio}
                  avatar={avatar}
                  setAvatar={setAvatar}
                />
              )}
              {step === 2 && (
                <Step2Education
                  school={school}
                  setSchool={setSchool}
                  major={major}
                  setMajor={setMajor}
                  graduationDate={graduationDate}
                  setGraduationDate={setGraduationDate}
                  gpa={gpa}
                  setGpa={setGpa}
                  schools={schools}
                  majors={majors}
                />
              )}
              {step === 3 && (
                <Step3Interests
                  selectedTopics={selectedTopics}
                  setSelectedTopics={setSelectedTopics}
                />
              )}
              {step === 4 && (
                <Step4Achievements
                  awards={awards}
                  setAwards={setAwards}
                  clubs={clubs}
                  setClubs={setClubs}
                  certifications={certifications}
                  setCertifications={setCertifications}
                />
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