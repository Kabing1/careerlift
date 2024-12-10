import React from 'react';
import { Briefcase, Building2, MapPin, Calendar } from 'lucide-react';

const SAMPLE_JOBS = [
  {
    id: '1',
    title: 'Senior Product Manager',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    postedDate: '2 days ago',
    matchScore: 95,
    description: 'Leading product strategy and development for our flagship SaaS platform...',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Digital Solutions Co.',
    location: 'Remote',
    postedDate: '1 week ago',
    matchScore: 88,
    description: 'Join our fast-growing team to drive product innovation and user experience...',
  },
];

export default function JobMatching() {
  const [jobs] = React.useState(SAMPLE_JOBS);
  const [filters, setFilters] = React.useState({
    location: '',
    jobType: '',
    matchScore: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Matched Jobs</h2>
            <p className="text-sm text-gray-600 mt-1">
              AI-powered job recommendations based on your profile
            </p>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{job.postedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-indigo-600">
                        {job.matchScore}% match
                      </span>
                      <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-600">{job.description}</p>
                  
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Save for later
                    </button>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}