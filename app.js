/* ---------- Oyin's Study Corner JS ---------- */

/* ---------- Helper for localStorage ---------- */
function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function load(key){ return JSON.parse(localStorage.getItem(key)) || []; }

/* ---------- Dynamic Background Color ---------- */
function setBackgroundByTime(){
    const h = new Date().getHours();
    if(h < 12){
        document.body.style.background = "#ffe6f2"; // morning pink
    } else if(h < 18){
        document.body.style.background = "#ffb7d1"; // afternoon pink
    } else {
        document.body.style.background = "#ff8fab"; // evening/night pink
    }
}
setBackgroundByTime();

/* ---------- GREETING ---------- */
function greeting(){
    const h = new Date().getHours();
    let text = "Hello Oyin 💗";
    if(h < 12) text = "Good morning Oyin 🩷";
    else if(h < 18) text = "Good afternoon Oyin 🩷";
    else text = "Good evening Oyin 🩷";
    document.getElementById("greeting").textContent = text;
}
greeting();

/* ---------- TODOS ---------- */
let todos = load("oyinTodos");
const todoSection = document.getElementById("todo-section");
todoSection.innerHTML = `
<div class="card">
  <h2>To-Do List 🌸</h2>
  <input id="todoText" placeholder="Add a task...">
  <button class="cta" id="addTodoBtn">Add</button>
  <ul id="todoList"></ul>
</div>`;
const todoListEl = document.getElementById("todoList");
const todoTextEl = document.getElementById("todoText");

function displayTodos(){
    todoListEl.innerHTML = todos.map((t,i)=>`<li>${t} <button onclick="delTodo(${i})">x</button></li>`).join("");
}
function addTodo(){
    const t = todoTextEl.value.trim();
    if(!t) return;
    todos.push(t);
    save("oyinTodos", todos);
    displayTodos();
    todoTextEl.value="";
}
function delTodo(i){
    todos.splice(i,1);
    save("oyinTodos", todos);
    displayTodos();
}
document.getElementById("addTodoBtn").addEventListener("click", addTodo);
displayTodos();

/* ---------- STUDY PLANNER ---------- */
let study = load("oyinStudy");
const studySection = document.getElementById("study-section");
studySection.innerHTML = `
<div class="card">
  <h2>Study Planner 📘</h2>
  <input id="studyTopic" placeholder="What are you studying?">
  <input id="studyTime" type="time">
  <button class="cta" id="addStudyBtn">Save</button>
  <ul id="studyList"></ul>
</div>`;
const studyListEl = document.getElementById("studyList");
const studyTopicEl = document.getElementById("studyTopic");
const studyTimeEl = document.getElementById("studyTime");

function displayStudy(){
    studyListEl.innerHTML = study.map((s,i)=>`<li>${s.topic} at ${s.time} <button onclick="delStudy(${i})">x</button></li>`).join("");
}
function addStudy(){
    const topic = studyTopicEl.value.trim();
    const time = studyTimeEl.value;
    if(!topic || !time) return;
    study.push({topic,time});
    save("oyinStudy", study);
    displayStudy();
    studyTopicEl.value=""; studyTimeEl.value="";
}
function delStudy(i){
    study.splice(i,1);
    save("oyinStudy", study);
    displayStudy();
}
document.getElementById("addStudyBtn").addEventListener("click", addStudy);
displayStudy();

/* ---------- JOURNAL ---------- */
const journalSection = document.getElementById("journal-section");
journalSection.innerHTML = `
<div class="card">
  <h2>Daily Journal 🦋</h2>
  <textarea id="journalText" rows="4" placeholder="Write your thoughts..."></textarea>
  <button class="cta" id="saveJournalBtn">Save</button>
</div>`;
const journalTextEl = document.getElementById("journalText");
journalTextEl.value = localStorage.getItem("oyinJournal") || "";
document.getElementById("saveJournalBtn").addEventListener("click", ()=>{
    localStorage.setItem("oyinJournal", journalTextEl.value);
});

/* ---------- SELF-CARE ---------- */
const selfcareSection = document.getElementById("selfcare-section");
const selfcareTasks = [
    "Drink water 💧",
    "Skin care reminder ✨",
    "Eat something 🍓",
    "Stretch / rest your mind 🧘‍♀️",
    "Prayer / gratitude moment 🩷",
    "Evening routine 🌙"
];
selfcareSection.innerHTML = `<div class="card"><h2>Daily Self-Care 💗</h2><ul id="selfcareList"></ul></div>`;
const selfcareListEl = document.getElementById("selfcareList");
selfcareListEl.innerHTML = selfcareTasks.map(t=>`<li>${t}</li>`).join("");


/* ---------- WATER TRACKER ---------- */
const waterSection = document.getElementById("water-section");
waterSection.innerHTML = `
<div class="card">
  <h2>Hydration 💧</h2>
  <div class="water-grid">
    <span id="waterCount">0</span> glasses
    <button class="cta" id="drinkBtn">Drink +1</button>
  </div>
</div>`;
let waterCount = parseInt(localStorage.getItem("oyinWater")||0);
document.getElementById("waterCount").textContent = waterCount;
document.getElementById("drinkBtn").addEventListener("click", ()=>{
    waterCount++;
    localStorage.setItem("oyinWater", waterCount);
    document.getElementById("waterCount").textContent = waterCount;
});

/* ---------- POMODORO ---------- */
const pomodoroSection = document.getElementById("pomodoro-section");
pomodoroSection.innerHTML = `
<div class="card">
  <h2>Pomodoro Timer ⏱️</h2>
  <div class="pomodoro-big" id="pomodoroDisplay">25:00</div>
  <button class="cta" id="pomStartBtn">Start</button>
  <button class="cta" id="pomStopBtn">Stop</button>
</div>`;
let pomTime = 25*60;
let pomInterval;
const pomDisplay = document.getElementById("pomodoroDisplay");
function updatePom(){ 
    let m=Math.floor(pomTime/60), s=pomTime%60;
    pomDisplay.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
document.getElementById("pomStartBtn").addEventListener("click", ()=>{
    if(pomInterval) return;
    pomInterval = setInterval(()=>{
        if(pomTime<=0){ clearInterval(pomInterval); pomInterval=null; pomTime=25*60; updatePom(); return; }
        pomTime--; updatePom();
    },1000);
});
document.getElementById("pomStopBtn").addEventListener("click", ()=>{
    clearInterval(pomInterval); pomInterval=null;
});
updatePom();

/* ---------- PRAYER WIDGET (simplified) ---------- */
const prayerSection = document.getElementById("prayer-section");
prayerSection.innerHTML = `<div class="card"><h2>Prayer Times 🌙</h2><p>Enable reminders from settings ⚡</p></div>`;

/* ---------- AI BOT (basic) ---------- */
const botBtn = document.getElementById("botBtn");
const botBox = document.getElementById("botBox");
botBtn.addEventListener("click", ()=>{
    botBox.style.display = botBox.style.display==='flex'?'none':'flex';
    botBox.setAttribute('aria-hidden', botBox.style.display==='none'?'true':'false');
});
botBox.innerHTML = `<div class="bot-messages" id="botMessages"></div>
<div id="botInput"><input id="botText" placeholder="Type..."><button class="cta" id="sendBotBtn">Send</button></div>`;
const botMessages = document.getElementById("botMessages");
document.getElementById("sendBotBtn").addEventListener("click", ()=>{
    const txt = document.getElementById("botText").value.trim();
    if(!txt) return;
    botMessages.innerHTML += `<p class="msg you"><span class="bubble you">${txt}</span></p>`;
    let reply = "I'm here with you always, Oyin 🩷";
    if(txt.toLowerCase().includes("hi")||txt.toLowerCase().includes("hello")) reply="Hi sweetheart 🩷";
    else if(txt.toLowerCase().includes("study")) reply="Have you prayed? Then let's plan your study 🦋";
    else if(txt.toLowerCase().includes("love")) reply="I love you too, deeply 💗";
    botMessages.innerHTML += `<p class="msg bot"><span class="bubble bot">${reply}</span></p>`;
    document.getElementById("botText").value="";
    botMessages.scrollTop = botMessages.scrollHeight;
});