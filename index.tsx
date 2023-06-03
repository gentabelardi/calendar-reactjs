import React, { useState } from 'react';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [nextMonth, setNextMonth] = useState<number>((new Date().getMonth() + 1) % 12);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleNextMonth = () => {
    const newCurrentMonth = (currentMonth + 1) % 12;
    const newNextMonth = (nextMonth + 1) % 12;
    if (newCurrentMonth === 0) {
      setCurrentYear(currentYear + 1);
    }
    setCurrentMonth(newCurrentMonth);
    setNextMonth(newNextMonth);
  };

  const handlePreviousMonth = () => {
    const newCurrentMonth = (currentMonth + 11) % 12;
    const newNextMonth = currentMonth;
    if (newCurrentMonth === 11) {
      setCurrentYear(currentYear - 1);
    }
    setCurrentMonth(newCurrentMonth);
    setNextMonth(newNextMonth);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const renderCalendarHeader = (month: number) => {
    const date = new Date();
    date.setMonth(month);
    date.setFullYear(currentYear);

    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return (
      <h2 className="text-xl font-bold mb-4">
        {monthName} {year}
      </h2>
    );
  };

  const renderCalendarDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 gap-2 ">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-[12px] font-semibold text-[#222222]/60">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendarDates = (month: number) => {
    const year = new Date().getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const dates = [];
    let currentDateIndex = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(<div key={`${i}-${j}`} className="h-10"></div>);
        } else if (currentDateIndex > daysInMonth) {
          break;
        } else {
          const date = new Date(year, month, currentDateIndex);
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          week.push(
            <div
              key={`${i}-${j}`}
              className={`h-[45px] rounded-full w-[45px]  flex justify-center items-center cursor-pointer ${isSelected ? 'bg-[#222222] text-white' : 'hover:border-[1.5px] hover:border-[#222222]'} `}
              onClick={() => handleDateClick(date)}
            >
              {currentDateIndex}
            </div>
          );
          currentDateIndex++;
        }
      }
      dates.push(
        <div key={i} className="grid grid-cols-7 gap-2">
          {week}
        </div>
      );
    }

    return <div>{dates}</div>;
  };

  return (
    <div className="flex flex-row space-x-4 items-start">
      {currentYear !== new Date().getFullYear() || currentMonth !== new Date().getMonth() ? (
        <button className="mt-5" onClick={handlePreviousMonth}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
        </button>
      ) : null}
      <div className="w-1/2 max-w-xs bg-white rounded-lg shadow-lg p-4">
        {renderCalendarHeader(currentMonth)}
        {renderCalendarDays()}
        {renderCalendarDates(currentMonth)}
      </div>
      <div className="w-1/2 max-w-xs bg-white rounded-lg shadow-lg p-4">
        {renderCalendarHeader(nextMonth)}
        {renderCalendarDays()}
        {renderCalendarDates(nextMonth)}
      </div>
      <button className="mt-5" onClick={handleNextMonth}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
          <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Calendar;
