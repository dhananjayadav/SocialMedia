const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitbtn = document.querySelector('#submitbtn');
const submitForm = document.querySelector("#submitForm");
const closeEye = document.querySelector("#closeeye")
const openEye = document.querySelector('#openeye')

submitbtn.addEventListener('click',function(event){
    event.preventDefault();
    if(username.value.length == 0){
        username.style.border = '1px solid red';
    }else{
        username.style.border = '2px solid grey';
        if(validatePassword(password)){
            submitForm.click();
        }
    } 
})
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
