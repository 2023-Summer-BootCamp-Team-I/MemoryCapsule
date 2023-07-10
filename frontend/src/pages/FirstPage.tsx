import React from 'react';
import MainOpenCapsule from '../components/MainOpenCapsule';
import MainUnOpenCapsule from '../components/MainUnopenCapsule';

// 로그인/ 회원가입
//  import TextInput from '../components/TextInput';
// <form method="post" action="서버의url" id="login-form">
//         <TextInput label="ID" placeholder="아이디를 입력해주세요" title="login" type="text" />
//         <TextInput
//           label="비밀번호"
//           placeholder="아이디를 입력해주세요"
//           title="join"
//           type="password"
//         />
//       </form>

export default function FirstPage() {
  return (
    <div className="h-[42rem] w-[75rem] border">
      <div>FirstPage</div>
      <MainOpenCapsule />
      <MainUnOpenCapsule />
    </div>
  );
}
