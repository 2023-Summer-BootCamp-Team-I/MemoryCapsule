import React, { useEffect, useState } from 'react';

type TextInputProps = {
  label: string;
  placeholder: string;
  title: string;
  type: string;
};

function TextInput({ label, placeholder, title, type }: TextInputProps) {
  const [colorToShow, setColorToShow] = useState('');
  const [borderToShow, setBorderToShow] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (title === 'login') {
      setColorToShow('placeholder-[#9B8EF8]');
      setBorderToShow('border-b border-dotted border-black');
    } else if (title === 'join') {
      setColorToShow('placeholder-neutral-300');
    }
  }, [title]);

  return (
    <div
      className={`h-10 flex items-center justify-center items-start ${borderToShow} bg-transparent`}
    >
      <label className="w-24 text-sm text-left p-4">{label}</label>
      <input
        className={`w-40 text-sm text-center ${colorToShow} outline=none focus:outline-none bg-transparent`}
        type={type}
        id={user}
        placeholder={placeholder}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default TextInput;
