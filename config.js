if (!localStorage.getItem("metroConfig")) {
    const defaultConfig = {
        interval: 180, // 3분
        travelTime: 35 // 30~40초 기본값
    };
    localStorage.setItem("metroConfig", JSON.stringify(defaultConfig));
}

function getConfig() {
    return JSON.parse(localStorage.getItem("metroConfig"));
}

function setConfig(newConfig) {
    localStorage.setItem("metroConfig", JSON.stringify(newConfig));
}
