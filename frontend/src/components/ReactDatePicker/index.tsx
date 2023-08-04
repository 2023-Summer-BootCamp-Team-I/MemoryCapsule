import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, format, addDays } from 'date-fns';
import styles from './style.module.css';

interface DateProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleGetDate: Function;
}

function ReactDatePicker({ handleGetDate }: DateProps) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // 오늘 이후의 날짜를 선택할 수 있도록 설정

  // 처음 선택 창에 표시되는 디폴트 날짜를 오늘보다 하루 뒤로 설정
  const defaultDate = addDays(new Date(), 1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChangeData = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate) {
      const formatted = format(selectedDate, 'yyyy-MM-dd HH:mm:ss');
      handleGetDate(formatted);
    } else {
      handleGetDate(null); // Send null when no date is selected
    }
  }, [selectedDate, handleGetDate]);

  return (
    <div className="flex">
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={selectedDate}
        onChange={(date: Date | null) => handleChangeData(date)}
        selectsStart
        minDate={minDate}
        startDate={selectedDate || defaultDate}
        className="w-40 text-center bg-transparent outline-none cursor-pointer focus:outline-none custom-datepicker"
        showPopperArrow={false}
        dayClassName={(d) =>
          getDate(d) === getDate(selectedDate || defaultDate) &&
          getMonth(d) === getMonth(selectedDate || defaultDate)
            ? ` ${styles['selected-day']}`
            : styles['normal-day']
        }
        placeholderText="날짜를 선택해주세요"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
    </div>
  );
}

export default ReactDatePicker;
