const URL = 'http://localhost:8081';

const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};
    user['username'] = formData.get('username');
    user['password'] = formData.get('password');


    fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((result) => {
        if(result.status === 403){
            document.getElementById("error").innerHTML = "Access Denied";
            document.getElementById("error").style.color = "red";
        }
        else if(result.status === 200) {
            localStorage.setItem('token', result.headers.get('Authorization'));
            localStorage.setItem('username', user['username']);
            window.location.href = 'http://localhost:8081/index.html';
        }

    });
};

const register = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};
    user['username'] = formData.get('username');

    const password =  formData.get('password');
    const confirmpassword =  formData.get('confirmpassword');

    if(formData.get('username').length < 5){
        document.getElementById("error").innerHTML = "The username has to be at least 5 characters long";
        document.getElementById("error").style.color = "red";
        return;
    }

    if(password.valueOf() !== confirmpassword.valueOf()){
        document.getElementById("error").innerHTML = "Password conformation failed!";
        document.getElementById("error").style.color = "red";
        return;
    }

    user['password'] = password;

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((result) => {
        if(result.status === 403){
            document.getElementById("error").innerHTML = "Access Denied";
            document.getElementById("error").style.color = "red";
        }
        else if(result.status === 400){
            document.getElementById("error").innerHTML = "Something went wrong!!";
            document.getElementById("error").style.color = "red";
        }
        else if(result.status === 200){
            window.location.href = 'http://localhost:8081/login.html';
        }
    });
};



document.addEventListener('DOMContentLoaded', function(){
    const registerForm = document.querySelector('#registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', register);
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.querySelector('#loginForm');
    if (loginForm){
        loginForm.addEventListener('submit', login);
    }
});