import React from 'react';
import { FileText, Download, Save } from 'lucide-react';
import Button from '../Button';

export default function CoverLetterBuilder() {
  const [formData, setFormData] = React.useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    introduction: '',
    body: '',
    closing: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            AI-Powered Cover Letter Builder
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Create personalized cover letters that highlight your unique value proposition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold">Cover Letter Editor</h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button variant="primary" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Mr. John Smith"
                      value={formData.recipientName}
                      onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Tech Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Senior Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Introduction
                  </label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Write your opening paragraph..."
                    value={formData.introduction}
                    onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body
                  </label>
                  <textarea
                    className="input-field"
                    rows={6}
                    placeholder="Describe your relevant experience and qualifications..."
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Closing
                  </label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Write your closing paragraph..."
                    value={formData.closing}
                    onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose max-w-none">
                <div className="mb-8">
                  <p className="text-right text-gray-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="mb-8">
                  <p>{formData.recipientName}</p>
                  <p>{formData.companyName}</p>
                </div>

                <p className="mb-6">
                  Dear {formData.recipientName || '[Recipient Name]'},
                </p>

                <div className="space-y-6">
                  <p>{formData.introduction || 'Your introduction will appear here...'}</p>
                  <p>{formData.body || 'Your main content will appear here...'}</p>
                  <p>{formData.closing || 'Your closing paragraph will appear here...'}</p>
                </div>

                <div className="mt-8">
                  <p>Sincerely,</p>
                  <p>[Your Name]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}