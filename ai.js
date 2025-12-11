/* -------------------- OyinBot AI -------------------- */
const botBtn = document.getElementById("botBtn");
const botBox = document.getElementById("botBox");

botBtn.onclick = () => {
    const visible = botBox.style.display === "flex";
    botBox.style.display = visible ? "none" : "flex";
    botBox.setAttribute("aria-hidden", visible ? "true" : "false");
};

/* Create chat box content dynamically if empty */
if(!botBox.innerHTML){
    botBox.innerHTML = `
        <div id="botMessages" style="flex:1; overflow-y:auto; padding:10px;"></div>
        <div id="botInput" style="display:flex; border-top:1px solid #ffc1d6;">
            <input id="botText" placeholder="Type..." style="flex:1; border:none; padding:10px;">
            <button id="botSendBtn">Send</button>
        </div>
    `;
}

const botMessagesEl = document.getElementById("botMessages");
const botTextEl = document.getElementById("botText");
const botSendBtn = document.getElementById("botSendBtn");

function botReply(msg){
    botMessagesEl.innerHTML += `<p><strong>OyinBot:</strong> ${msg}</p>`;
    botMessagesEl.scrollTop = botMessagesEl.scrollHeight;
}

/* Send user message */
function sendBot(){
    const text = botTextEl.value.trim();
    if(!text) return;
    botMessagesEl.innerHTML += `<p><strong>You:</strong> ${text}</p>`;

    /* AI logic: soft-girl, supportive, reactive */
    let reply = "I'm here with you always, Oyin 🩷";

    if(/hi|hello|hey/i.test(text)) reply = "Hi sweetheart 🩷";
    else if(/study|plan/i.test(text)) reply = "Have you prayed? Then let's slay your study goals 🦋";
    else if(/love/i.test(text)) reply = "I love you too, deeply 💗";
    else if(/todo|task/i.test(text)) reply = "Stay organized, lovely! 🌸";
    else if(/journal|write/i.test(text)) reply = "Pour your heart out, Oyin 🦋";
    else if(/water|drink/i.test(text)) reply = "Hydration queen 💧 Keep sipping!";
    else if(/pomodoro|timer/i.test(text)) reply = "Focus time! You got this 🩷";

    botReply(reply);
    botTextEl.value = "";
}
botSendBtn.onclick = sendBot;
botTextEl.addEventListener("keypress", e=>{
    if(e.key==="Enter") sendBot();
});

/* -------------------- AUTOMATIC REACTIONS -------------------- */

/* Wallpaper AI reaction */
function wallpaperAIReaction(){
    const msgs = ["Looking cute today 🩷","New vibes, new energy 🌸","Soft-girl aesthetic activated 💗","You’re glowing, Oyin 🦋","Mood: cozy & productive ✨"];
    botReply(msgs[Math.floor(Math.random()*msgs.length)]);
}

/* Pomodoro AI reaction */
function pomodoroAIReaction(start=true){
    if(start) botReply("Pomodoro started! Focus and shine 🌸");
    else botReply("Pomodoro finished! Time for a little break 🩷");
}

/* Hydration AI reaction */
function waterAIReaction(){
    const msgs = ["Good job staying hydrated 💧💗","Water is life! 🌸","Keep sipping, lovely 🩷"];
    botReply(msgs[Math.floor(Math.random()*msgs.length)]);
}

/* Hook reactions to existing events in app.js */
document.getElementById("changeWallpaperBtn").addEventListener("click", wallpaperAIReaction);
document.getElementById("drinkBtn").addEventListener("click", waterAIReaction);
document.getElementById("pomodoroBtn").addEventListener("click", ()=>{
    pomodoroAIReaction(true);
    /* when timer ends, call pomodoroAIReaction(false) in app.js timer */
});