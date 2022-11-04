const editBtn = document.querySelector("#edit-profile");
const infoBtns = document.querySelectorAll(".userInfo");
const profileBtns = document.querySelector("#show-profile-buttons");
const profileImg = document.querySelector('.profileImage');
const inableImage = document.querySelector('.inableImage');
const avatar = document.querySelector("#avatar");
const changeProfileBox = document.querySelector(".changeProfileBox");
const newImage = document.querySelector(".newImageCircle");
const newImageCancel = document.querySelector("#newimagecancel");
const genderhider = document.querySelector("#genderhider");
const genderSelector = document.querySelector(".genderSelector")


editBtn.addEventListener('click',function(event){
    event.preventDefault();

    profileBtns.style.display='flex';
    
    editBtn.style.display='none';
    profileImg.classList.add('inableImage');
    genderSelector.hidden = false;
    genderhider.hidden = true;
    infoBtns.forEach(function(btn){
        btn.disabled = false;
        btn.style.border="1px solid grey";
        btn.style.backgroundColor='white';
        btn.style.borderRadius='2px';
    })

})

profileImg.addEventListener('click',function(event){
    if(profileImg.classList.contains('inableImage')){
        avatar.click();
    }
})
avatar.addEventListener('change',function(){
    const file = avatar.files[0];
    if(file){
        newImage.src = URL.createObjectURL(file);
    }
    changeProfileBox.hidden = false;
})
newImageCancel.addEventListener('click',function(event){
    event.preventDefault();
    changeProfileBox.hidden = true;
    avatar.value = "";
})
