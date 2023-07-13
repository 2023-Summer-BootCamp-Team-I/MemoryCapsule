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
  const [heightToShow, setHeightToShow] = useState('');
  const [widthToShow, setWidthToShow] = useState('');
  const [labelToShow, setLabelToShow] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (title === 'login') {
      setColorToShow('placeholder-[#9B8EF8]');
      setBorderToShow('border-b border-dotted border-black');
      setHeightToShow('h-10');
      setWidthToShow('w-40');
      setLabelToShow('w-24');
    } else if (title === 'join') {
      setColorToShow('placeholder-neutral-300');
      setBorderToShow('');
      setHeightToShow('h-8');
      setWidthToShow('w-30');
      setLabelToShow('w-20');
    }
  }, [title]);

  return (
    <div
      className={`${heightToShow} flex items-center justify-center items-start ${borderToShow} bg-transparent`}
    >
      <label className={`${labelToShow} text-sm text-left p-4`}>{label}</label>
      <input
        className={`${widthToShow}text-sm text-center ${colorToShow} outline=none focus:outline-none bg-transparent`}
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
