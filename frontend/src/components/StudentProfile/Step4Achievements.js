import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

function Step4Achievements({
  awards,
  setAwards,
  clubs,
  setClubs,
  certifications,
  setCertifications,
}) {
  const handleListItemAdd = (item, setter) => {
    if (item.trim()) {
      setter((prev) => [...prev, item.trim()]);
    }
  };

  const handleListItemRemove = (index, setter) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Achievements and Involvement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Awards or Honors */}
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
                    handleListItemAdd(e.currentTarget.value, setAwards);
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
                  onClick={() => handleListItemRemove(index, setAwards)}
                  className="relative inline-flex items-center text-sm py-1 pl-2 pr-6 bg-green-100 text-green-800 rounded-lg cursor-pointer transition-all hover:bg-red-100 hover:text-red-600 group"
                >
                  <span>{award}</span>
                  <span className="absolute right-2 inset-y-0 flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <X className="h-4 w-4 font-bold" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clubs & Organizations */}
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
                    handleListItemAdd(e.currentTarget.value, setClubs);
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
                  onClick={() => handleListItemRemove(index, setClubs)}
                  className="relative inline-flex items-center text-sm py-1 pl-2 pr-6 bg-green-100 text-green-800 rounded-lg cursor-pointer transition-all hover:bg-red-100 hover:text-red-600 group"
                >
                  <span>{club}</span>
                  <span className="absolute right-2 inset-y-0 flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <X className="h-4 w-4 font-bold" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Certifications or Achievements */}
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
                    handleListItemAdd(e.currentTarget.value, setCertifications);
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-grow border-green-200 focus:ring-green-500 focus:border-green-500"
              />
              <Button
                type="button"
                onClick={() => {
                  const input = document.getElementById("certifications");
                  if (input instanceof HTMLInputElement) {
                    handleListItemAdd(input.value, setCertifications);
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
                  onClick={() => handleListItemRemove(index, setCertifications)}
                  className="relative inline-flex items-center text-sm py-1 pl-2 pr-6 bg-green-100 text-green-800 rounded-lg cursor-pointer transition-all hover:bg-red-100 hover:text-red-600 group"
                >
                  <span>{cert}</span>
                  <span className="absolute right-2 inset-y-0 flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <X className="h-4 w-4 font-bold" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Step4Achievements;
