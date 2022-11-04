const submitForm = document.querySelector("#submitForm")
const savebtn = document.querySelector(".save-btn")
const username = document.querySelector('#username')
const myname = document.querySelector('#name');
const number = document.querySelector('#number')
const email = document.querySelector('#email')

savebtn.addEventListener('click',function(e){
    e.preventDefault()
    if(username.value.length == 0){
        alert("Enter valid username")
    }else if(myname.value.length == 0){
        alert("Enter valid name")
    }else if(number.value.length != 10){
        alert("Enter valid mobile number")
    }else if(validateEmail(email)){
        submitForm.click();
    }
})
function validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
     {
       return (true)
     }
       alert("You have entered an invalid email address!")
       return (false)
   }