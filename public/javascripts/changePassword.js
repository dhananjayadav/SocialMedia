const pass = document.querySelector("#pass")
const cpass = document.querySelector("#cpass")
const saveBtn = document.querySelector("#saveBtn");
const submitForm = document.querySelector("#submitForm")
const warning = document.querySelector("#warningconfirm")
const closeEye = document.querySelector("#closeeye")
const openEye = document.querySelector('#openeye')


saveBtn.addEventListener('click',function(event){
    event.preventDefault();
    if(pass.value.length > 0){
        if(validatePassword(pass) && pass.value === cpass.value){
            submitForm.click();
        }else{
           warning.hidden = false;
        }
    }else{
        alert('Enter a valid password')
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
    pass.type='text'
    cpass.type='text'
})
openEye.addEventListener('click',function(){
    closeEye.hidden = false;
    openEye.hidden = true;
    pass.type='password',
    cpass.type='password'
})


