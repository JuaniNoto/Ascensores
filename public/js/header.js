window.onload = function (){

    let userOptions = document.querySelector('#userOptions');
    let desplegable = document.querySelector('#desplegable');

    let main = document.querySelector('main');
    let header = document.querySelector('header');

    userOptions.addEventListener( "click" , function(){
        desplegable.style.display = 'block';
    })

};