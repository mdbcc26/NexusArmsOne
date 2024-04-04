

const users = [
    {
        id: 1,
        name: "Tony Stark",
        hero:  "Iron Man",
        email: "ironman@avengers.com",
        info: "I am Iron Man!"
    },
    {
        id: 2,
        name: "Wanda Maximoff",
        hero: "Scarlett Witch",
        email: "scarletwitch@avengers.com",
        info: "You took everything from me."
    },
    {
        id: 3,
        name: "Peter Parker",
        hero: "Spider-Man",
        email: "spiderman@avengers.com",
        info: "With great power comes great responsibility."
    }
];

function getUsers() {
    return users;
}

function getUser(id) {
    let user = users.find(element => element.id === parseInt(id))
    if(typeof user !== "undefined") {
        return user;
    } else {
        return 'Error 404: This user could not be found.'
    }
}

module.exports = {
    getUsers,
    getUser
}