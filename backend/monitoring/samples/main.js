import http from "k6/http";
import { check } from "k6";
import { sleep } from 'k6';
export let options = { 2sa
    stages: [
        // Ramp-up from 1 to 30 VUs in 30s
        { duration: "30s", target: 30 },

        // Stay on 30 VUs for 60s
        { duration: "60s", target: 30 },

        // Ramp-down from 30 to 0 VUs in 10s
        { duration: "10s", target: 0 }
    ]
};

export default function () {
  const uniqueId = Math.random().toString(36).substring(2); // 고유한 ID 생성
  const data = {
    id: "유재윤22" + uniqueId,
    password: "ㄷㅈ3" + uniqueId,
    phone_number: uniqueId,
    nickname: "유재윤34" + uniqueId,
    email: "유재2윤2@" + uniqueId + ".com", // 고유한 이메일 주소 생성
    // img_file: http.file('Hello, world!', 'test.txt'),
    user_img_url: "유재2윤2@" + uniqueId + ".com"
  };

  const res = http.post('http://host.docker.internal:8080/api/v1/users/sign-up', data);

  check(res, {
    'status was 200': (r) => r.status == 200,
  });

  sleep(1);
}
