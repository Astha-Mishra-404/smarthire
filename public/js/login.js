// Progress Bar
window.addEventListener('scroll',()=>{
  const st=window.scrollY,dh=document.body.scrollHeight-window.innerHeight;
  document.getElementById('progress-bar').style.width=(st/dh)*100+'%';
});

// Dark Mode
const darkToggle=document.querySelector('.dark-toggle');
darkToggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent=document.body.classList.contains('dark-mode')?"Light Mode":"Dark Mode";
});

// ScrollReveal
ScrollReveal().reveal('.login-card',{distance:'40px',duration:1000,easing:'ease-out',origin:'bottom'});
