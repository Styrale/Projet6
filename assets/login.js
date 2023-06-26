const formElement = document.getElementById("login")
const errorEl = document.getElementById("error")
const login = async(data) => {
    const user = {
        email: data.get("email"),
        password: data.get("password")
    }
    console.log(user)
    return await fetch('http://localhost:5678/api/users/login',{
        method: "post",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        body: JSON.stringify(user)
    })
}

formElement.addEventListener("submit", async(event)=>{
    event.preventDefault();
    const data = new FormData(formElement)
    const response = await login(data)
    const user = await response.json()
    console.log(user)

    if (response.status === 404 || response.status === 401) {
        errorEl.style.display = 'flex';
        errorEl.style.visibility = 'visible';
        errorEl.innerHTML = 'Erreur dans l’identifiant ou le mot de passe';
        setTimeout(() => {
            errorEl.style.display = 'none';
            errorEl.style.visibility = 'hidden';
            errorEl.innerHTML = '';
        }, 3000);
        return;
    }

    if (response.ok) {
        sessionStorage.setItem("user", user.token);
        return window.location.assign("./index.html");
    }
 });