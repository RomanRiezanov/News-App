const menuBtn = document.getElementById('menu-btn');
let menuOpen = false;

// menuBtn.addEventListener('click', ()=> {
//     if(!menuOpen) {
//         menuBtn.classList.add('open');
//         menuOpen = true;
//     }
//     else {
//         menuBtn.classList.remove('open');
//         menuOpen = false;
//     }
// })

 let clickToBurger = ()=> {
     if(!menuOpen) {
         menuBtn.classList.add('open');
         menuOpen = true;
     }
     else {
         menuBtn.classList.remove('open');
         menuOpen = false;
     }

     export {menuBtn, menuOpen, clickToBurger}