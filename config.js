diff --git a/config.js b/config.js
index 82f7f41aa4f813071066b1fc1550aeccc5a50a12..5258e98093e6517dc8bb80c1c5f8b0babdae3409 100644
--- a/config.js
+++ b/config.js
@@ -1,15 +1,84 @@
 if (!localStorage.getItem("metroConfig")) {
     const defaultConfig = {
-        interval: 180, // 3분
-        travelTime: 35 // 30~40초 기본값
+        interval: 180,
+        travelTime: 35
     };
     localStorage.setItem("metroConfig", JSON.stringify(defaultConfig));
 }
 
+function sanitizeConfig(rawConfig) {
+    const interval = Math.max(10, Number(rawConfig?.interval) || 180);
+    const travelTime = Math.max(5, Number(rawConfig?.travelTime) || 35);
+    return { interval, travelTime };
+}
+
 function getConfig() {
-    return JSON.parse(localStorage.getItem("metroConfig"));
+    const parsed = JSON.parse(localStorage.getItem("metroConfig"));
+    return sanitizeConfig(parsed);
 }
 
 function setConfig(newConfig) {
-    localStorage.setItem("metroConfig", JSON.stringify(newConfig));
+    localStorage.setItem("metroConfig", JSON.stringify(sanitizeConfig(newConfig)));
+}
+
+function updateClock(locale = 'ko-KR') {
+    const now = new Date();
+    const clock = document.getElementById("clock");
+    if (!clock) return;
+    clock.innerText = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
+}
+
+function formatSeconds(totalSeconds) {
+    const minutes = Math.floor(totalSeconds / 60);
+    const seconds = totalSeconds % 60;
+    if (minutes === 0) {
+        return `${seconds}초`;
+    }
+    return `${minutes}분 ${String(seconds).padStart(2, '0')}초`;
+}
+
+function startStationBoard({ locale = 'ko-KR', stationName, destinationName } = {}) {
+    const config = getConfig();
+    const interval = config.interval;
+    const travel = config.travelTime;
+
+    const stationEl = document.getElementById("stationName");
+    const destinationEl = document.getElementById("destinationName");
+    const travelEl = document.getElementById("travelTime");
+    const countdownEl = document.getElementById("countdown");
+
+    if (stationEl && stationName) {
+        stationEl.innerText = stationName;
+    }
+
+    if (destinationEl && destinationName) {
+        destinationEl.innerText = destinationName;
+    }
+
+    if (travelEl) {
+        travelEl.innerText = formatSeconds(travel);
+    }
+
+    const cycleStart = Math.floor(Date.now() / 1000 / interval) * interval;
+
+    function renderCountdown() {
+        const nowSec = Math.floor(Date.now() / 1000);
+        const elapsed = (nowSec - cycleStart) % interval;
+        const timeLeft = interval - elapsed;
+        if (countdownEl) {
+            countdownEl.innerText = formatSeconds(timeLeft);
+        }
+    }
+
+    updateClock(locale);
+    renderCountdown();
+
+    setInterval(() => updateClock(locale), 1000);
+    setInterval(renderCountdown, 1000);
+
+    window.addEventListener('storage', (event) => {
+        if (event.key === 'metroConfig') {
+            location.reload();
+        }
+    });
 }
