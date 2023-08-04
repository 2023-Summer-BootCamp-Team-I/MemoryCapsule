import { useEffect, useState } from 'react';

type TextInputProps = {
  label: string;
  placeholder: string;
  title: string;
  type: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  handleGetInputData: (name: string, value: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleOnKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // 변경됨
};

function TextInput({
  label,
  placeholder,
  title,
  type,
  name,
  handleGetInputData,
  handleOnKeyPress,
}: TextInputProps) {
  const [colorToShow, setColorToShow] = useState('');
  const [borderToShow, setBorderToShow] = useState('');
  const [widthToShow, setWidthToShow] = useState('');
  const [labelToShow, setLabelToShow] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (title === 'login') {
      setColorToShow('placeholder-[#aaaaaa] opacity-60');
      setBorderToShow('border-b border-dotted border-black');
      setWidthToShow('w-40');
      setLabelToShow('w-24');
    } else if (title === 'join') {
      setColorToShow('placeholder-neutral-300');
      setBorderToShow('');
      setWidthToShow('w-44');
      setLabelToShow('w-20 font-bold');
    }
  }, [title]);

  return (
    <div className={`flex items-center justify-center ${borderToShow} h-10 bg-transparent`}>
      <label className={`${labelToShow} text-sm text-left p-4`}>{label}</label>
      <input
        className={`${widthToShow} text-center ${colorToShow} outline=none focus:outline-none bg-transparent`}
        type={type}
        value={data}
        placeholder={placeholder}
        onChange={(e) => {
          setData(e.target.value);
          handleGetInputData(name, e.target.value);
        }}
        onKeyPress={type === 'password' && handleOnKeyPress ? handleOnKeyPress : undefined} // 적용부
      ></input>
    </div>
  );
}

export default TextInput;
