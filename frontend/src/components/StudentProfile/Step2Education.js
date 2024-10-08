import React, { useState, useEffect, useCallback } from 'react';
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/Popover";
import Calendar from "../ui/Calendar";
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

const API_KEY = process.env.REACT_APP_COLLEGE_SCORECARD_API_KEY;
const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';

function Step2Education({
  school,
  setSchool,
  major,
  setMajor,
  graduationDate,
  setGraduationDate,
  gpa,
  setGpa,
}) {
  const [schools, setSchools] = useState([]);
  const [majors, setMajors] = useState([]);
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [majorSearchTerm, setMajorSearchTerm] = useState('');
  const [isLoadingSchools, setIsLoadingSchools] = useState(false)

  const fetchSchools = useCallback(async (search = '') => {
    setIsLoadingSchools(true)
    try {
      const response = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&school.name=${search}&fields=id,school.name&per_page=20`
      );
      const data = await response.json();
      setSchools(
        data.results.map((school) => ({
          id: school.id,
          name: school['school.name'],
        }))
      );
    } catch (error) {
        console.error('Error fetching schools:', error);
}     finally {
        setIsLoadingSchools(false)
    }
  }, [])

  const fetchMajors = useCallback(async (schoolId) => {
    try {
      const response = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&id=${schoolId}&fields=id,latest.programs.cip_4_digit.title&per_page=100`
      );
      const data = await response.json();
      const majorsSet = new Set(
        data.results[0]['latest.programs.cip_4_digit'].map((program) => program.title)
      );
      setMajors(Array.from(majorsSet));
    } catch (error) {
      console.error('Error fetching majors:', error);
    }
  }, []);

  // Fetch schools when search term changes
  useEffect(() => {
    if (schoolSearchTerm && schoolSearchTerm !== school) {
      const delayDebounceFn = setTimeout(() => {
        fetchSchools(schoolSearchTerm);
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSchools([]);
    }
  }, [schoolSearchTerm, fetchSchools, school]);

  // Fetch majors when school is selected
  useEffect(() => {
    if (school) {
    } else {
      setMajors([]);
    }
  }, [school, fetchMajors]);

  const handleSchoolSelect = (schoolId, schoolName) => {
    setSchool(schoolName);
    setSchoolSearchTerm(schoolName);
    fetchMajors(schoolId);
    setSchools([]);
  };

  const handleMajorSelect = (selectedMajor) => {
    setMajor(selectedMajor);
    setMajorSearchTerm(selectedMajor);
    setMajors([]); 
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Education Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* School Selection */}
          <div>
            <Label htmlFor="school" className="block text-sm font-medium text-gray-700">
              School
            </Label>
            <div className="relative mt-1">
              <Input
                type="text"
                id="school"
                placeholder="Start typing to search for your school..."
                value={schoolSearchTerm}
                onChange={(e) => {
                  setSchoolSearchTerm(e.target.value);
                  setSchool('');
                }}
                className="w-full border-green-200 focus:ring-green-500 focus:border-green-500"
              />
              {isLoadingSchools && (
              <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
            )}
              {schools.length > 0 && schoolSearchTerm && schoolSearchTerm !== school && (
                <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {schools.map((schoolItem) => (
                    <li
                      key={schoolItem.id}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-green-50"
                      onClick={() => handleSchoolSelect(schoolItem.id, schoolItem.name)}
                    >
                      {schoolItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Major Selection */}
          {school && (
            <div>
              <Label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Major
              </Label>
              <div className="relative mt-1">
                <Input
                  type="text"
                  id="major"
                  placeholder="Start typing to search for your major..."
                  value={majorSearchTerm}
                  onChange={(e) => {
                    setMajorSearchTerm(e.target.value);
                    setMajor('');
                  }}
                  className="w-full border-green-200 focus:ring-green-500 focus:border-green-500"
                />
                {majors.length > 0 && majorSearchTerm && majorSearchTerm !== major && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {majors
                      .filter((m) => m.toLowerCase().includes(majorSearchTerm.toLowerCase()))
                      .map((m, index) => (
                        <li
                          key={index}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-green-50"
                          onClick={() => handleMajorSelect(m)}
                        >
                          {m}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Graduation Date Picker */}
          <div>
            <Label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700">
              Expected Graduation Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal mt-1 border-green-200 ${
                    !graduationDate && 'text-muted-foreground'
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {graduationDate ? format(graduationDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={graduationDate}
                  onSelect={setGraduationDate}
                  initialFocus
                  className="rounded-md border-green-200"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* GPA Input */}
          <div>
            <Label htmlFor="gpa" className="block text-sm font-medium text-gray-700">
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
  );
}

export default Step2Education;
