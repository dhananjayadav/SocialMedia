const myname = document.querySelector('#name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submitSignBtn = document.querySelector('#submitSignBtn');
const submitForm = document.querySelector('#submitForm');
const closeEye = document.querySelector("#closeeye")
const openEye = document.querySelector('#openeye')

submitSignBtn.addEventListener('click',function(event){
    event.preventDefault();
    if(validate(myname) && validate(username) && validatePassword(password) && validateEmail(email)){
        submitForm.click();
    }
})
function validate(obj){
    if(obj.value.length == 0){
        obj.style.border = ' 1px solid red'
        return false;
    }else{
        obj.style.border = '2px solid grey'
        return true;
    }
}
function validateEmail(email){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
function validatePassword(password){
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password.value)){
        return true;
    }
    alert('please enter a valid password , consists of alteast 8 characters , one uppercase , one lowercase , one special character and one digit')
}
closeEye.addEventListener('click',function(){
    openEye.hidden = false;
    closeEye.hidden = true;
    password.type='text'
})
openEye.addEventListener('click',function(){
    closeEye.hidden = false;
    openEye.hidden = true;
    password.type='password'
})