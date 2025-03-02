import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RequestForm = ({ service, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (data) => {
    try {
      setLoading(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferred Date
        </label>
        <input
          type="date"
          {...register('date', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">Date is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferred Time
        </label>
        <input
          type="time"
          {...register('time', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.time && (
          <p className="mt-1 text-sm text-red-600">Time is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default RequestForm;