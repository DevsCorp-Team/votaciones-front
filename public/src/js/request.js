function auth() {
    const id = parseInt(document.getElementById('cc-ti').value)
    const pin = parseInt(document.getElementById('pin').value)
    const data = {
        id,
        pin
    }
    fetch ('http://localhost:3000/api/user/auth', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then( response => {
        if (response.status === 401) return alert("Introduciste mal tus credenciales.")
        location.href = "http://localhost:3000/personeria"
    }).catch ( err => {
        console.log(err)
    })
}

function votoPersoneria (id) {
    const data = { 
        "id": parseInt(id) 
     }
     fetch ('http://localhost:3000/api/user/personeria', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
     }).then(response => {
        if (response.status === 401) return alert("No se pudo votar, intenta de nuevo.")
        console.log(response)
        location.href = "http://localhost:3000/contraloria"
     }).catch(err => {
        alert(err)
    })
}

function votoContraloria (id) {
    const data = { 
        "id": parseInt(id) 
     }
     fetch ('http://localhost:3000/api/user/contraloria', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
     }).then(response => {
        if (response.status === 401) return alert("No se pudo votar, intenta de nuevo.")
        location.href = "http://localhost:3000/gracias"
     }).catch(err => {
        alert(err)
    })
}

function ok () {
    fetch('http://localhost:3000/api/user/userState', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        fetch('http://localhost:3000/api/user/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            setTimeout(() => {
                location.href = "http://localhost:3000/"
            }, 10000)
        })
    })
}
