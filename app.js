/* --- LOCAL STORAGE HELPERS --- */
function save(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function load(k){ return JSON.parse(localStorage.getItem(k)) || []; }

/* --- GREETING --- */
function greeting(){
    let h = new Date().getHours();
    let t = "Hello Oyin 🩷";
    if(h<12) t="Good morning Oyin 🩷";
    else if(h<18) t="Good afternoon Oyin 🩷";
    else t="Good evening Oyin 🩷";
    document.getElementById("greeting").textContent = t;
}

/* --- NOTIFICATION SOUND --- */
function playNotification(){
    const audio = new Audio('assets/audio/notification.mp3');
    audio.play().catch(()=>console.log("Interaction needed first for mobile."));
}

/* --- TO-DO LIST --- */
let todos = load("todos");
function displayTodo(){
    document.getElementById("todoList").innerHTML = todos.map((t,i)=>`<li>${t} <button onclick="delTodo(${i})">x</button></li>`).join("");
}
function addTodo(){
    let t = document.getElementById("todoText").value;
    if(!t) return;
    todos.push(t);
    save("todos", todos);
    displayTodo();
    document.getElementById("todoText").value="";
    playNotification();
}
function delTodo(i){
    todos.splice(i,1);
    save("todos",todos);
    displayTodo();
}
displayTodo();
document.getElementById("addTodoBtn").onclick = addTodo;

/* --- STUDY PLANNER --- */
let study = load("study");
function displayStudy(){
    document.getElementById("studyList").innerHTML = study.map((s,i)=>`<li>${s.topic} at ${s.time} <button onclick="delStudy(${i})">x</button></li>`).join("");
}
function addStudy(){
    let topic = document.getElementById("studyTopic").value;
    let time = document.getElementById("studyTime").value;
    if(!topic||!time) return;
    study.push({topic,time});
    save("study", study);
    displayStudy();
    playNotification();
}
function delStudy(i){
    study.splice(i,1);
    save("study",study);
    displayStudy();
}
displayStudy();
document.getElementById("addStudyBtn").onclick = addStudy;

/* --- DAILY JOURNAL --- */
document.getElementById("journal").value = localStorage.getItem("journal") || "";
function saveJournal(){
    localStorage.setItem("journal", document.getElementById("journal").value);
    playNotification();
}
document.getElementById("saveJournalBtn").onclick = saveJournal;

/* --- SELF-CARE: WATER --- */
let waterCount = parseInt(localStorage.getItem("waterCount")) || 0;
document.getElementById("waterCount").textContent = waterCount;
document.getElementById("drinkBtn").onclick = () => {
    waterCount++;
    localStorage.setItem("waterCount", waterCount);
    document.getElementById("waterCount").textContent = waterCount;
    playNotification();

    const waterMsgs = [
        "Good job staying hydrated 💧💗",
        "Water is life! 🌸",
        "Keep sipping, lovely 🩷"
    ];
    botReply(waterMsgs[Math.floor(Math.random()*waterMsgs.length)]);
}

/* --- POMODORO TIMER --- */
let pomodoroTimerEl = document.getElementById("pomodoroTimer");
let pomodoroBtn = document.getElementById("pomodoroBtn");
let pomodoroSeconds = 25*60;
let pomodoroInterval;
pomodoroBtn.onclick = () => {
    clearInterval(pomodoroInterval);
    pomodoroSeconds = 25*60;
    pomodoroInterval = setInterval(()=>{
        let m = Math.floor(pomodoroSeconds/60).toString().padStart(2,'0');
        let s = (pomodoroSeconds%60).toString().padStart(2,'0');
        pomodoroTimerEl.textContent = `${m}:${s}`;
        if(pomodoroSeconds<=0){
            clearInterval(pomodoroInterval);
            playNotification();
            botReply("Pomodoro finished! Time for a little break 🩷");
        }
        pomodoroSeconds--;
    },1000);
    botReply("Pomodoro started! Focus and shine 🌸");
}

/* --- DHIKR --- */
let dhikrCount = parseInt(localStorage.getItem("dhikr")) || 0;
document.getElementById("dhikrCount").textContent = dhikrCount;
document.getElementById("dhikrBtn").onclick = () => {
    dhikrCount++;
    localStorage.setItem("dhikr", dhikrCount);
    document.getElementById("dhikrCount").textContent = dhikrCount;
    playNotification();
}

/* --- PRAYER REMINDERS --- */
let prayers = ["Fajr 🌅","Zuhur ☀️","Asr 🌤️","Maghrib 🌇","Isha 🌌"];
document.getElementById("prayerBtn").onclick = () => {
    let list = document.getElementById("prayerList");
    list.innerHTML = prayers.map(p=>`<li>${p} - Reminder enabled</li>`).join("");
    playNotification();
}

/* --- WALLPAPER ROTATION + AI REACTION --- */
const wallpapers = [
    "assets/images/wallpapers/wp1.jpg",
    "assets/images/wallpapers/wp2.jpg",
    "assets/images/wallpapers/wp3.jpg",
    "assets/images/wallpapers/wp4.jpg",
    "assets/images/wallpapers/wp5.jpg"
];
let currentWallpaper = parseInt(localStorage.getItem("wallpaper")) || 0;
const wallpaperMessages = [
    "Looking cute today 🩷",
    "New vibes, new energy 🌸",
    "Soft-girl aesthetic activated 💗",
    "You’re glowing, Oyin 🦋",
    "Mood: cozy & productive ✨"
];
function initWallpaper(){ 
    document.body.style.backgroundImage = `url(${wallpapers[currentWallpaper]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
initWallpaper();
document.getElementById("changeWallpaperBtn").onclick = () => {
    currentWallpaper++;
    if(currentWallpaper>=wallpapers.length) currentWallpaper=0;
    initWallpaper();
    localStorage.setItem("wallpaper", currentWallpaper);
    playNotification();
    botReply(wallpaperMessages[Math.floor(Math.random()*wallpaperMessages.length)]);
}

/* --- DAILY QUOTES + QUR’AN VERSE --- */
const dailyVerses = [
    "Indeed, with hardship comes ease. (94:6)",
    "So remember Me; I will remember you. (2:152)",
    "And He is with you wherever you are. (57:4)"
];
const dailyQuotes = [
    "Take a deep breath and shine ✨",
    "Small steps, big dreams 🩷",
    "Soft heart, strong mind 💗",
    "You are enough today 💕"
];
function showDailyVerseAndQuote(){
    const verseEl = document.createElement("p");
    verseEl.textContent = dailyVerses[Math.floor(Math.random()*dailyVerses.length)];
    document.getElementById("main").prepend(verseEl);

    const quoteEl = document.createElement("p");
    quoteEl.textContent = dailyQuotes[Math.floor(Math.random()*dailyQuotes.length)];
    document.getElementById("main").prepend(quoteEl);
}
showDailyVerseAndQuote();

/* --- INITIALIZE GREETING --- */
greeting();