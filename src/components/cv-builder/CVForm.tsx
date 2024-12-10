import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface CVFormProps {
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
  onUpdate: (data: CVFormProps['data']) => void;
}

export default function CVForm({ data, onUpdate }: CVFormProps) {
  const handlePersonalInfoChange = (field: string, value: string) => {
    onUpdate({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    onUpdate({
      ...data,
      experience: [
        ...data.experience,
        {
          id: crypto.randomUUID(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onUpdate({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onUpdate({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    onUpdate({
      ...data,
      education: [
        ...data.education,
        {
          id: crypto.randomUUID(),
          degree: '',
          institution: '',
          location: '',
          graduationDate: '',
        },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onUpdate({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onUpdate({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map((skill) => skill.trim());
    onUpdate({ ...data, skills });
  };

  return (
    <form className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={data.personalInfo.fullName}
            onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={data.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input-field"
            value={data.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="input-field"
            value={data.personalInfo.location}
            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
          />
        </div>
        <textarea
          placeholder="Professional Summary"
          className="input-field"
          rows={4}
          value={data.personalInfo.summary}
          onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
        />
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Experience</h3>
          <button
            type="button"
            onClick={addExperience}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="input-field"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="input-field"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="input-field"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="month"
                    placeholder="Start Date"
                    className="input-field"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                  <input
                    type="month"
                    placeholder="End Date"
                    className="input-field"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  />
                </div>
                <textarea
                  placeholder="Job Description"
                  className="input-field md:col-span-2"
                  rows={3}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
          <button
            type="button"
            onClick={addEducation}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Degree"
                  className="input-field"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Institution"
                  className="input-field"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="input-field"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                />
                <input
                  type="month"
                  placeholder="Graduation Date"
                  className="input-field"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <input
          type="text"
          placeholder="Enter skills separated by commas"
          className="input-field"
          value={data.skills.join(', ')}
          onChange={handleSkillsChange}
        />
      </div>
    </form>
  );
}