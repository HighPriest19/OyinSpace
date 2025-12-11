/* --------- INIT APP (called after unlock) --------- */
function initApp(){
  // load components
  const comps = {
    "selfcare-section":"components/selfcare-widget.html",
    "prayer-section":"components/prayer-widget.html",
    "wallpapers-section":"components/wallpapers.html",
    "todo-section":"components/todo-widget.html",
    "study-section":"components/study-widget.html",
    "journal-section":"components/journal-widget.html",
    "pomodoro-section":"components/pomodoro-widget.html",
    "period-section":"components/period-widget.html",
    "water-section":"components/water-widget.html"
  };

  Object.keys(comps).forEach(id=>{
    fetch(comps[id]).then(r=>r.text()).then(html=>{
      // if file missing, use fallback
      document.getElementById(id).innerHTML = html;
      runComponentInit(id);
    }).catch(()=> {
      document.getElementById(id).innerHTML = `<div class="card"><h2>Missing component</h2></div>`;
    });
  });

  // theme button
  const themeBtn = document.getElementById("themeBtn");
  themeBtn?.addEventListener("click", ()=> toggleTheme());
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", ()=> {
    // show lock screen
    document.getElementById("main").style.display = "none";
    document.getElementById("lock-screen").style.display = "flex";
  });

  // load profile pic if any
  const pp = localStorage.getItem("oyin_profile");
  if(pp) document.getElementById("profilePic").src = pp;

  // set greeting
  setGreeting();
  // restore theme
  applyTheme(localStorage.getItem("oyin_theme") || "pink");
}

/* small helper to call in-component init functions if defined */
function runComponentInit(id){
  try{
    const fnName = id.replace(/-([a-z])/g, g => g[1].toUpperCase()) + "Init";
    if(window[fnName]) window[fnName]();
  }catch(e){console.warn(e)}
}

/* greeting */
function setGreeting(){
  const h = new Date().getHours();
  const g = h<12 ? "Good morning 🌅 Oyin 💗" : (h<18 ? "Good afternoon 🌼 Oyin 💗" : "Good evening 🌙 Oyin 💗");
  document.getElementById("greeting").textContent = g;
}

/* theme */
function applyTheme(theme){
  if(theme === "pink"){
    document.documentElement.style.setProperty('--bg','#fff1f6');
    document.documentElement.style.setProperty('--accent','#ff8fab');
    document.documentElement.style.setProperty('--accent-2','#ffb7d1');
  } // extendable
  localStorage.setItem("oyin_theme", theme);
}
function toggleTheme(){
  const cur = localStorage.getItem("oyin_theme") || "pink";
  const next = cur === "pink" ? "lavender" : "pink";
  applyTheme(next);
}

/* Expose initApp so lock.js can call it after unlock */
window.initApp = initApp;

/* --- PRAYER TIMES REMINDERS --- */

// Set prayer times (you can adjust to her location)
const prayerTimes = {
    fajr: "05:10",
    zuhur: "12:45",
    asr: "16:15",
    maghrib: "18:30",
    isha: "20:00"
};

// Display prayer times
document.getElementById("fajrTime").textContent = prayerTimes.fajr;
document.getElementById("zuhurTime").textContent = prayerTimes.zuhur;
document.getElementById("asrTime").textContent = prayerTimes.asr;
document.getElementById("maghribTime").textContent = prayerTimes.maghrib;
document.getElementById("ishaTime").textContent = prayerTimes.isha;

// Enable / Disable reminders
let remindersEnabled = JSON.parse(localStorage.getItem("prayerReminders")) || false;
const btn = document.getElementById("enablePrayerBtn");

function updateBtn() {
    btn.textContent = remindersEnabled ? "Reminders Enabled ✅" : "Enable Reminders";
}
updateBtn();

btn.addEventListener("click", () => {
    remindersEnabled = !remindersEnabled;
    localStorage.setItem("prayerReminders", remindersEnabled);
    updateBtn();
});

// Check every minute if it's prayer time
setInterval(() => {
    if(!remindersEnabled) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    for(const [prayer, time] of Object.entries(prayerTimes)) {
        if(currentTime === time) {
            showPrayerNotification(prayer);
        }
    }
}, 60000);

// Function to show notification
function showPrayerNotification(prayer) {
    const prayerNames = {
        fajr: "Fajr 🌅",
        zuhur: "Zuhur ☀️",
        asr: "Asr 🌤️",
        maghrib: "Maghrib 🌇",
        isha: "Isha 🌌"
    };
    // Cute popup
    alert(`It's time for ${prayerNames[prayer]}!\nRemember to say your dhikr 🌙✨`);

    // Optional sound
    const audio = new Audio("assets/audio/notification.mp3");
    audio.play();
}

// Array of wallpapers
const wallpapers = [
    "assets/images/wallpapers/wp1.jpg",
    "assets/images/wallpapers/wp2.jpg",
    "assets/images/wallpapers/wp3.jpg",
];

// Load saved wallpaper
let currentWallpaper = localStorage.getItem("wallpaper") || 0;
document.body.style.backgroundImage = `url(${wallpapers[currentWallpaper]})`;

// Change wallpaper on click
document.body.addEventListener("click", () => {
    currentWallpaper++;
    if(currentWallpaper >= wallpapers.length) currentWallpaper = 0;
    document.body.style.backgroundImage = `url(${wallpapers[currentWallpaper]})`;
    localStorage.setItem("wallpaper", currentWallpaper);
});