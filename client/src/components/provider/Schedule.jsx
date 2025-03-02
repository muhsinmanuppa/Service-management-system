import { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

const Schedule = ({ appointments, onUpdateAvailability }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekStart = startOfWeek(selectedDate);

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {weekDays.map((day) => (
              <th key={day.toString()} className="border p-2">
                {format(day, 'EEE do')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((hour) => (
            <tr key={hour}>
              <td className="border p-2">
                {format(new Date().setHours(hour), 'ha')}
              </td>
              {weekDays.map((day) => {
                const dateTime = new Date(day).setHours(hour);
                const hasAppointment = appointments.some(
                  apt => new Date(apt.scheduledAt).getTime() === dateTime
                );
                
                return (
                  <td 
                    key={`${day}-${hour}`} 
                    className={`border p-2 ${hasAppointment ? 'bg-gray-100' : ''}`}
                    onClick={() => onUpdateAvailability(dateTime)}
                  >
                    {hasAppointment && (
                      <div className="text-sm">
                        {appointments.find(apt => 
                          new Date(apt.scheduledAt).getTime() === dateTime
                        )?.client.name}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;