const URL = 'http://localhost:8081';
let users = [];

const deleteUser = (id) => {
    fetch(`${URL}/users/${id}`, {
        method: 'DELETE'
    }).then(() => {
        indexUsers();
    });
}

const indexUsers = () => {
    fetch(`${URL}/users`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            renderUsers();
        });
    });
    renderUsers();
};

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const createButton = (text, method) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.onclick = method;

    return button
}

const updateUser = () => {
    fetch(`${URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(users)
    }).then((response) => {
        var username = document.getElementById("username");
        var password = document.getElementById("password");

        if(username.value() === "" || password.value() === ""){
            document.getElementById("error").innerText = "You must set Username and password";
            document.getElementById("error").style.color = "red";
            return;
        } else {
            response.json().then((user) => {
                users.push(user);
                renderUsers();
            })
        }

    })
}

const renderUsers = () => {
    const list = document.querySelector('#usersList');
    list.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(user.id));
        row.appendChild(createCell(user.name));
        row.appendChild(createButton('delete', () => deleteUser(user.id)));
        row.appendChild(createButton("update", () => updateUser(user.id)));
        display.appendChild(row);
    });
};