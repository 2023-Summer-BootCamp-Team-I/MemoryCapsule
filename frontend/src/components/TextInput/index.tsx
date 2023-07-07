import React, { useEffect, useState } from 'react';

type TextInputProps = {
  label: string;
  placeholder: string;
  title: string;
};

function TextInput({ label, placeholder, title }: TextInputProps) {
  const [colorToShow, setColorToShow] = useState('');
  const [borderToShow, setBorderToShow] = useState('');

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
      className={`h-10 w-72 flex items-center justify-center items-start ${borderToShow} bg-transparent`}
    >
      <label className="w-20 text-xs text-left">{label}</label>
      <input
        className={`text-xs text-center ${colorToShow} outline=none focus:outline-none bg-transparent`}
        type="text"
        name="DD"
        placeholder={placeholder}
      ></input>
    </div>
  );
}

export default TextInput;
