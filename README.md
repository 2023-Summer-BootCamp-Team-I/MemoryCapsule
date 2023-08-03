# MemoryCapsule
타임캡슐 생성 후 친구들을 초대해 사진과 이야기를 공유하고, 지정된 날짜에 합쳐진 컨텐츠를 모두에게 전송하는 플랫폼



### System Architecture


<img src="./readme_image/system_architecture_img.png" title="system architecture"/>

<hr style="border: none; border-top: 3px solid grey;">
<br>

### Tech Stack
| Area       | Tech Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Frontend   | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Backend    | <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white"> <img src="https://img.shields.io/badge/rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">  <img src="https://img.shields.io/badge/celery-37814A?style=for-the-badge&logo=celery&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">                                                                                                                                                                                                                                            |
| DevOps     | <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white"> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white"> <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">                                                                                                                                                                                                                                                                                                                               |
| AI         | <img src="https://img.shields.io/badge/opencv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white"> <img src="https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Monitoring | <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white"> <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">  <img src="https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white"> <img src="https://img.shields.io/badge/cadvisor-005571?style=for-the-badge&logo=cadvisor&logoColor=white"> <img src="https://img.shields.io/badge/node exporter-2496ED?style=for-the-badge&logo=node exporter&logoColor=white"> <img src="https://img.shields.io/badge/elastic stack-005571?style=for-the-badge&logo=elastic stack&logoColor=white">                                                                                                                                                                                                               |
| etc        | <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white"> <img src="https://img.shields.io/badge/gitkraken-179287?style=for-the-badge&logo=gitkraken&logoColor=white"> <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white"> <img src="https://img.shields.io/badge/pycharm-000000?style=for-the-badge&logo=pycharm&logoColor=white">   |


<hr>
<br>


<details>
<summary>Frontend</summary>
<div>

내용

</div>
</details>

<br>
<br>

<details>
<summary>Backend</summary>
<div>

## API
<hr>

### user
<img src="./readme_image/user.png" title="system architecture"/>

### capsule
<img src="./readme_image/capsule.png" title="system architecture"/>

### story
<img src="./readme_image/story.png" title="system architecture"/>

### video
<img src="./readme_image/video.png" title="system architecture"/>


swagger를 사용하여 API 명세서를 작성 하였습니다.



## Asynchronous
<hr>
<img src="./readme_image/async_process.png" title="system architecture"/>
![Screenshot-from-2022-12-10-22-34-49.png](..%2F..%2F..%2FDownloads%2FScreenshot-from-2022-12-10-22-34-49.png)

비디오 생성 작업은 celery 비동기 처리됩니다. 메세지 브로커는 rabbitmq가 사용됩니다. 

</div>
</details>