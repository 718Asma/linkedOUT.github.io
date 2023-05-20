function login()
        {
            if(document.getElementById('user').value == 'CV' && document.getElementById('pwd').value == 'pwd2023')
            {
                window.location.href = "Espaceperso.html";
            }
            else if(document.getElementById('user').value != 'CV' && document.getElementById('pwd').value == 'pwd2023')
            {
                document.getElementById("loginFailed").innerHTML = "Login incorrect!";
                document.getElementById("loginFailed").style.textAlign = 'center';
                document.getElementById("loginFailed").style.width = '200px';
                document.getElementById("loginFailed").style.height = '25px'
                document.getElementById('user').value = '';
                document.getElementById('pwd').value = '';

            }
            else if(document.getElementById('user').value == 'CV' && document.getElementById('pwd').value != 'pwd2023')
            {
                document.getElementById("loginFailed").innerHTML = "Mot de passe incorrect!";
                document.getElementById("loginFailed").style.textAlign = 'center';
                document.getElementById("loginFailed").style.width = '200px';
                document.getElementById("loginFailed").style.height = '25px'
                document.getElementById('user').value = '';
                document.getElementById('pwd').value = '';
            }
            else
            {
                document.getElementById("loginFailed").innerHTML = "Login et Mot de passe incorrect!";
                document.getElementById("loginFailed").style.textAlign = 'center';
                document.getElementById("loginFailed").style.width = '200px';
                document.getElementById("loginFailed").style.height = '40px';
                document.getElementById('user').value = '';
                document.getElementById('pwd').value = '';
            }
        }