import React from 'react';
import { Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react';

interface CVPreviewProps {
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      summary: string;
    };
    experience: Array<{
      id: string;
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      degree: string;
      institution: string;
      location: string;
      graduationDate: string;
    }>;
    skills: string[];
    languages: Array<{ language: string; proficiency: string }>;
    certifications: Array<{ name: string; issuer: string; date: string }>;
  };
}

export default function CVPreview({ data }: CVPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 min-h-[297mm] w-full">
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.personalInfo.location}
            </div>
          )}
        </div>
        {data.personalInfo.summary && (
          <p className="mt-4 text-gray-700">{data.personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-indigo-600 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-indigo-600 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-500">{edu.graduationDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{lang.language}</span>
                <span className="text-gray-500">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}