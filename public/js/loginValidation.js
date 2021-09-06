window.onload = function (){

    //FORMULARIO
    let form = document.querySelector('#form-register');

    //INPUTS
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    //FORM GROUPS
    let emailGroup = document.querySelector('#email-group');
    let passwordGroup = document.querySelector('#password-group');

    //SPAN
    let span = document.querySelector('span');

    //Errors
    let errors = {
        email:true,
        password:true
    };


    //CONTRASEÑA VISIBLE
    span.addEventListener( 'click', function(){
        span.classList.toggle('show');
        span.classList.toggle('hide');
        if(span.classList.contains('show')){
            password.type = 'text';
        }
        if(span.classList.contains('hide')){
            password.type = 'password';
        }
    });



    email.addEventListener('blur',function(e){
        console.log(email.value.length);

    });
    



};

