// var homebtn = document.querySelector('#homebtn');
// var profilebtn = document.querySelector('#profilebtn');
// const proB
// if(window.location.pathname == '/navbar'){
//     profilebtn.classList.remove("underline");
//     homebtn.classList.add("underline");
// }else{
//     profilebtn.classList.add("underline");
//     homebtn.classList.remove("underline");
// }
const proBtn = document.querySelector(".usernav");
const navdetail = document.querySelector(".navdetail");

proBtn.addEventListener('mouseover',function(){
    navdetail.hidden=false;
})
proBtn.addEventListener('mouseleave',function(){
    navdetail.hidden = true;
})
navdetail.addEventListener('mouseover',function(){
    navdetail.hidden=false;
})
navdetail.addEventListener('mouseleave',function(){
    navdetail.hidden = true;
})
