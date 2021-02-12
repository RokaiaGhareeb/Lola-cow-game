var loginBtn = document.getElementById("loginBtn");
var loginInput = document.getElementById("loginInput");
var warning = document.getElementsByClassName("warning");


// initialize localstorage list of users if it is not existed */

LocalStorageStart = function () {
    if (JSON.parse(localStorage.getItem('users')) === null) {
        let users = [];
        localStorage.setItem('users', JSON.stringify(users));
    }
    else {
        return 'located';
    }
}()


// Check if user already exits

function checkUser(username) {
    const users = JSON.parse(localStorage.getItem('users'));
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            found = true;
            break;
        }
    }
    return found;
}

/* Generate a new user if he is not existed */

function generateUser(username) {
    if (!checkUser(username)) {
        let user = {
            "username": username,
            "currentScore": 0,
            "highestScore": 0,
            "level": 1,
        }
        let users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

    }
}

/* User Login function */

function login() {
    if (loginInput.value === "") {
        warning[0].style.display = "inline";
        return false;
    } else {
        generateUser(loginInput.value);
        localStorage.setItem('username', loginInput.value);
        window.location = './menu.html'
        warning[0].style.display = "none";
        return true;
    }
}