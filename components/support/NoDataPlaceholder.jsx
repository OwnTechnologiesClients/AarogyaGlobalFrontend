import React from 'react';
import { MessageCircle, Plus } from 'lucide-react';

const NoDataPlaceholder = ({ type = 'tickets' }) => {
  if (type === 'tickets') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Support Tickets</h3>
        <p className="text-gray-500 mb-4 max-w-sm">
          You haven't submitted any support requests yet. Use the form on the left to get started.
        </p>
        <div className="flex items-center text-sm text-gray-400">
          <Plus className="w-4 h-4 mr-1" />
          <span>Submit your first support request</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
      <p className="text-gray-500">
        There's nothing to display at the moment.
      </p>
    </div>
  );
};

export default NoDataPlaceholder;



