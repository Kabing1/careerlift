import React from 'react';
import { Users, UserCircle } from 'lucide-react';

export default function PanelSimulator() {
  const panelists = [
    { id: 1, name: 'Sarah Chen', role: 'Technical Lead' },
    { id: 2, name: 'Michael Rodriguez', role: 'HR Manager' },
    { id: 3, name: 'David Kim', role: 'Senior Engineer' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Interview Panel</h2>
      </div>

      <div className="space-y-4">
        {panelists.map((panelist) => (
          <div
            key={panelist.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <UserCircle className="h-10 w-10 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">{panelist.name}</h3>
              <p className="text-sm text-gray-500">{panelist.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Panel Interview Tips</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Address all panelists when responding</li>
          <li>• Make eye contact with the current speaker</li>
          <li>• Be prepared for follow-up questions</li>
        </ul>
      </div>
    </div>
  );
}