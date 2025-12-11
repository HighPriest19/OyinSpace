/* LOAD LOCK SCREEN */
fetch("components/lock-screen.html")
  .then(r=> r.text())
  .then(html => {
    document.getElementById("lock-screen").innerHTML = html;
    attachLockEvents();
  });

function attachLockEvents(){
  const pass = document.getElementById("pass");
  const err = document.getElementById("err");
  const panel = document.querySelector(".lock-panel");

  // Enter key
  pass.addEventListener("keyup", e=>{
    if(e.key === "Enter") tryUnlock();
  });

  // unlock attempt
  window.tryUnlock = function(){
    const code = pass.value.trim();
    if(code === "OH25"){
      // success animation
      panel.style.transform = "translateY(-8px)";
      panel.style.opacity = "0";
      setTimeout(()=> {
        document.getElementById("lock-screen").style.display = "none";
        document.getElementById("main").style.display = "block";
        // load main UI (run app init)
        if(window.initApp) initApp();
      }, 520);
      // play chime if available
      const a = new Audio("assets/audio/notification.mp3");
      a.volume = 0.28;
      a.play().catch(()=>{});
    } else {
      // shake
      panel.style.animation = "shake .35s";
      setTimeout(()=> panel.style.animation = "", 360);
      err.textContent = "Incorrect code 💔";
    }
  };

  // logout button shows lock again
  const logoutBtn = document.getElementById("logoutBtn");
  if(logoutBtn) logoutBtn.addEventListener("click", ()=> {
    document.getElementById("main").style.display = "none";
    document.getElementById("lock-screen").style.display = "flex";
    document.getElementById("lock-screen").style.opacity = "1";
  });
}