import React from 'react';
import { topics } from '../../constants/topics';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

function Step3Interests({ selectedTopics, setSelectedTopics }) {
  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
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
                    ? 'bg-green-100 text-green-800 border-2 border-green-500'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
  );
}

export default Step3Interests;