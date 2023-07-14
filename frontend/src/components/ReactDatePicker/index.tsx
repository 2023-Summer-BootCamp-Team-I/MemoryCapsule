import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate } from 'date-fns';
import styles from './style.module.css';

function ReactDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="flex">
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd (eee)"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        minDate={new Date()}
        startDate={startDate}
        className="w-40 text-center bg-transparent outline-none cursor-pointer focus:outline-none custom-datepicker"
        showPopperArrow={false}
        dayClassName={(d) =>
          getDate(d) === getDate(startDate) && getMonth(d) === getMonth(startDate)
            ? ` ${styles['selected-day']}`
            : styles['normal-day']
        }
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
