export function getThemeFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'theme') {
            if (value == 'dark' || value == 'light') {
                return value;
            } else {
                return "dark";
            }
        }
    }
    return "dark"; // 如果没找到theme cookie则返回null
}

export function playUkPronunciation(word?: string) {
    if (!word) {
        return;
    }
    console.log("playUkPronunciation", word);
}

export function playUsPronunciation(word?: string) {
    if (!word) {
        return;
    }
}