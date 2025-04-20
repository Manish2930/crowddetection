import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

type AlertData = {
  reason: string;
  urgency: 'Low' | 'Medium' | 'High';
  location: string;
};

const SendAlert = () => {
  const [formData, setFormData] = useState<AlertData>({
    reason: '',
    urgency: 'Low',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Option 1: API call
      await fetch('/api/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Option 2: Replace above with state update if local only
      // console.log('Alert sent:', formData);

      setSuccessMessage('Alert successfully sent!');
      setFormData({ reason: '', urgency: 'Low', location: '' });
    } catch (err) {
      console.error('Failed to send alert:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <AlertTriangle className="text-red-500 w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Send Alert to Admin</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Describe the issue or concern..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g., North Wing Exit"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Alert'}
        </button>

        {successMessage && (
          <p className="text-green-600 mt-2 text-sm">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SendAlert;
