const file = document.querySelector('#postfile');
const postbtn = document.querySelector('#postbtn');
const submitbtn = document.querySelector('#submitPost');

postbtn.addEventListener('click',function(event){
    event.preventDefault();
     if(!file.value){
        file.style.border = '1px solid red'
    }else{
        if(file.value.includes(".jpeg")|| file.value.includes(".jpg")||file.value.includes(".png")||file.value.includes(".gif")||file.value.includes(".mp4")||file.value.includes(".avif")){
            submitbtn.click();
        }else{
            alert('Your file should be in format of jpeg/jpg/png/gif/mp4/avif');
        }
    }
})