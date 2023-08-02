import http from "k6/http";
import { check } from "k6";
import { sleep } from 'k6';
import { FormData } from 'k6/formdata';

export default function () {
    let uniqueId = `${__VU}-${__ITER}`; // VU 번호와 반복 횟수를 조합하여 고유한 ID 생성
    let imgData = open('../image.jpg', 'b');

    let signUpFormData = new FormData();
    signUpFormData.append('id', "유재윤" + uniqueId);
    signUpFormData.append('password', "유재윤" + uniqueId);
    signUpFormData.append('phone_number', uniqueId);
    signUpFormData.append('nickname', "유재윤" + uniqueId);
    signUpFormData.append('email', "유재윤@" + uniqueId + ".com");
    signUpFormData.append('img_file', http.file(imgData, 'image.jpg', 'image/jpeg'));

    // 회원 가입 요청 보내기
    const signUpRes = http.post('https://memorycapsule.co.kr/api/v1/users/sign-up', signUpFormData.body(), {headers: signUpFormData.headers()});

    check(signUpRes, {
        'sign up: status was 200': (r) => r.status === 200,
    });

    // 로그인 데이터 준비
    const loginData = {
        id: "유재윤" + uniqueId,
        password: "유재윤" + uniqueId,
    };

    let ContentTypeForSignIn = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // 로그인 요청 보내기
    const loginRes = http.post('https://memorycapsule.co.kr/api/v1/users/sign-in', JSON.stringify(loginData), ContentTypeForSignIn);

    check(loginRes, {
        'login: status was 200': (r) => r.status === 200,
    });

    // 로그인 응답에서 JWT 토큰 추출
    const token = JSON.parse(loginRes.body).jwt_token;

    //캡슐 생성 & 스토리 생성
    let successfulCapsuleCount = new Counter('successful_capsule_count');

    let makeCapsuleFormData = new FormData();
    makeCapsuleFormData.append('jwt_token', token);
    makeCapsuleFormData.append('theme_id', 1);
    makeCapsuleFormData.append('capsule_name', `hello Capsule ${uniqueId}`);
    makeCapsuleFormData.append('due_date', "2023-08-4 21:40:00");
    makeCapsuleFormData.append('limit_count', 30);
    makeCapsuleFormData.append('capsule_password', 1);
    makeCapsuleFormData.append('img_file', http.file(imgData, 'image.jpg', 'image/jpeg'));

    const makeCapsuleRes = http.post('https://memorycapsule.co.kr/api/v1/capsules', makeCapsuleFormData.body(), {headers: makeCapsuleFormData.headers()});

    if (makeCapsuleRes.status === 200) {
        const capsuleId = makeCapsuleRes.json().capsule_id;
        successfulCapsuleCount.add(1);
        for (let i = 0; i < 10; i++) {
            let makeStoryFormData = new FormData();
            makeStoryFormData.append('jwt_token', token);
            makeStoryFormData.append('story_title', `hello story ${uniqueId}`);
            makeStoryFormData.append('story_content', "this is K6 test code");
            makeStoryFormData.append('filename', http.file(imgData, 'image.jpg', 'image/jpeg'));

            let makeStoryRes = http.post(`https://memorycapsule.co.kr/api/v1/stories/${capsuleId}`, makeStoryFormData.body(), {headers: makeStoryFormData.headers()});

            check(makeStoryRes, {
                'story created: status was 200': (r) => r.status === 200,
            });
        }

        check(makeCapsuleRes, {
            'capsule created: status was 200': (r) => r.status === 200,
        });
    }

    //캡슐 조회
    let open_capsule = {
        url: 'https://memorycapsule.co.kr/api/v1/capsules',
        params: {
            count: -1,
            is_open: true,
            jwt_token: token
        }
    };

    let close_capsule = {
        url: 'https://memorycapsule.co.kr/api/v1/capsules',
        params: {
            count: -1,
            is_open: false,
            jwt_token: token
        }
    };

    // 스토리 조회
    for (let i = 1; i === successfulCapsuleCount; i++) {
        let checkCapsules = http.get(`https://memorycapsule.co.kr/api/v1/stories/${i}`);
    }
}




