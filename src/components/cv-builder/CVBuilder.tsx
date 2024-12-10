import React from 'react';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import { FileText, Download, Save } from 'lucide-react';

export default function CVBuilder() {
  const [cvData, setCVData] = React.useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
  });

  const handleCVUpdate = (newData: typeof cvData) => {
    setCVData(newData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Create Your Professional CV
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Our AI-powered CV builder helps you create a professional CV tailored to your industry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold">CV Editor</h2>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Draft
                  </button>
                  <button className="btn-primary flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export PDF
                  </button>
                </div>
              </div>
              <CVForm data={cvData} onUpdate={handleCVUpdate} />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <CVPreview data={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
}