// 기본 설정값
if (!localStorage.getItem("metroConfig")) {
    const defaultConfig = {
        interval: 180, // 3분 (초 단위)
        travelTime: 35 // 기본 35초
    };
    localStorage.setItem("metroConfig", JSON.stringify(defaultConfig));
}

function getConfig() {
    return JSON.parse(localStorage.getItem("metroConfig"));
}

function setConfig(newConfig) {
    localStorage.setItem("metroConfig", JSON.stringify(newConfig));
}
