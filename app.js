// Display user list in table
// Add filter:
//  - Show only mens
//  - Show only woman
//  - Show only peple from Kyiv
//  - Show All
// Add summary
//  Average age
// Number of students in each city
// Number of girl
// Number of boys
// Longest student name

// console.log(globalData.users);
let usersArray = globalData.users;


let template = document.querySelector("#users-report").innerHTML;
let outputUsers = document.querySelector("#outputUsers");
let usersFilter = document.querySelector("#usersFilter");

document.querySelector("#show").addEventListener("click", function () {
    createTable(usersArray)
});

// массивы
let onlyMenArray = usersArray.filter((user) => user.gender == "male");
let onlyWomenArray = usersArray.filter((user) => user.gender == "female");
let onlyKyiv = usersArray.filter((user) => user.city == "Kyiv");

usersFilter.addEventListener("change", function () {


    switch (usersFilter.selectedIndex) {
        case 0:
            createTable(usersArray);
            break;
        case 1:
            createTable(onlyMenArray);
            break;
        case 2:
            createTable(onlyWomenArray);
            break;
        case 3:
            createTable(onlyKyiv);
            break;
    }
})

/////////////////////////////////////////////////////////
function createTable(usersArray) {

    outputUsers.textContent = "";

    let table = document.createElement("table");

    let tr = document.createElement("tr");
    let thName = document.createElement("th");
    thName.textContent = "Name";
    let thAge = document.createElement("th");
    thAge.textContent = "Age";
    let thGender = document.createElement("th");
    thGender.textContent = "Gender";
    let thCity = document.createElement("th");
    thCity.textContent = "City";

    tr.append(thName);
    tr.append(thAge);
    tr.append(thGender);
    tr.append(thCity);

    table.append(tr);

    outputUsers.append(table);


    usersArray.forEach(user => {
        let html = Mustache.render(template, user);
        document.querySelector("table").insertAdjacentHTML("beforeend", html);
    })
}

/////////////////////////////////////////////////
let showResumeBtn = document.querySelector("#showResume");

// showResumeBtn.addEventListener("click", showResume());

class CreateResume {
    array;
    url;

    constructor(array) {
        this.array = array;
        this.url = document.querySelector("#outputResume");
    }

    create() {
        this.array.forEach(text => {
            let li = document.createElement("li");
            li.innerHTML = text;
            this.url.append(li);
        });

        // console.log(this.text);


    }
}

class Resume {
    arrayUsers;
    arrayResult;

    constructor(array) {
        this.arrayUsers = array;
        this.arrayResult = [];
    }

    averageAge() {
        let allAge = 0;
        for (let i = 0; i < this.arrayUsers.length; i++) {
            let user = this.arrayUsers[i];
            allAge += user.age;
        }
        // this.arrayUsers.forEach(user => allAge += user.age);
        this.arrayResult.push(`Average age - ${allAge / this.arrayUsers.length}`);
    }

    allMen() {
        let i = 0;
        this.arrayUsers.forEach(user => {
            if (user.gender == "male") i++;
        })
        this.arrayResult.push(`Number of men - ${i} `);
    }

    allGirl() {
        let i = 0;
        this.arrayUsers.forEach(user => {
            if (user.gender == "female") i++;
        })
        this.arrayResult.push(`Number of girls - ${i} `);
    }

    theLongestName() {
        let maxName = "";
        maxName = this.arrayUsers.sort((a, b) => b.name.length - a.name.length)
        // .forEach(user => console.log(user));
        this.arrayResult.push(`MAx name is ${maxName[0].name}`);
    }

    getArray() {
        // console.log(this.arrayResult);
        this.averageAge();
        this.allMen();
        this.allGirl();
        this.theLongestName();
        return this.arrayResult;
    }

}

let resume1 = new Resume(usersArray);
// resume1.averageAge();
let arr = resume1.getArray();
let createResume1 = new CreateResume(arr);
createResume1.create();

// console.log(arr);



//////////////////////////////////////////////////////////

let ul = document.querySelector("#user-list");
let liArray = document.querySelectorAll("img");
let first = document.querySelector("#choosePage");


first.addEventListener("click", function (e) {
    if (e.target.dataset.page == 1) {
        jsonRun("https://reqres.in/api/users?page=1");
    }
    if (e.target.dataset.page == 2) {
        jsonRun("https://reqres.in/api/users?page=2");
    }
});

function jsonRun(url) {
    fetch(url)
        .then(response => response.json())
        //.then((json) => showUsers(json.data));
        .then((json) => showUserMax(json.data));
}

function showUserMax(users) {
    let usersList = document.querySelector("#userList");
    usersList.textContent = "";

    users.forEach(user => {
        // console.log(user);
        let div = document.createElement("div");
        div.classList.add("border")

        let p = document.createElement("p");
        p.textContent = user.first_name + " " + user.last_name;

        let img = document.createElement("img");
        img.setAttribute("src", user.avatar);

        div.append(p);
        div.append(img);

        usersList.append(div);
    });
}






