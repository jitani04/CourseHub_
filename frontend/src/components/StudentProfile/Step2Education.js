import React from 'react';
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/Popover";
import Calendar from "../ui/Calendar";
import { fetchSchools, fetchMajors } from '../../utils/schoolService';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  // Fetch the schools and majors
  useEffect(() => {
    const loadSchoolsAndMajors = async () => {
      const fetchedSchools = await fetchSchools();
      const fetchedMajors = await fetchMajors();
      setSchools(fetchedSchools);
      setMajors(fetchedMajors);
    };

    loadSchoolsAndMajors();
  }, []);

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
            <Select onValueChange={setSchool} value={school}>
              <SelectTrigger className="w-full mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                <SelectValue placeholder="Select your school" />
              </SelectTrigger>
              <SelectContent>
                {schools.map((s, index) => (
                  <SelectItem key={index} value={s} className="hover:bg-green-50">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Major Selection */}
          <div>
            <Label htmlFor="major" className="block text-sm font-medium text-gray-700">
              Major
            </Label>
            <Select onValueChange={setMajor} value={major}>
              <SelectTrigger className="w-full mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                <SelectValue placeholder="Select your major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((m, index) => (
                  <SelectItem key={index} value={m} className="hover:bg-green-50">
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Graduation Date Picker */}
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
                  variant="outline"
                  className={`w-full justify-start text-left font-normal mt-1 border-green-200 ${
                    !graduationDate && 'text-muted-foreground'
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {graduationDate ? (
                    format(graduationDate, 'PPP')
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
                      'bg-green-600 text-white hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white',
                    day_today: 'bg-green-100 text-green-900',
                  }}
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
