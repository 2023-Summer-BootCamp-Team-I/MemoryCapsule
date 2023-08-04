function newline(str: string, n: number): string {
    // \r\n을 \n으로 변경
    const normalizedStr = str.replace(/\r\n/g, '\n');
    
    // \n으로 문자열을 분리하여 각 줄을 처리
    const lines = normalizedStr.split('\n');

    const result = [];
    
    for (const line of lines) {
        if (line.length > n) {
            for (let i = 0; i < line.length; i += n) {
                result.push(line.substr(i, n));
            }
        } else {
            result.push(line);
        }
        // 각 원래의 줄마다 추가적인 줄바꿈을 적용
        result.push('\n');
    }

    // 끝에 있는 불필요한 줄바꿈 제거 후 반환
    return result.join('').trim();
}

export default newline;