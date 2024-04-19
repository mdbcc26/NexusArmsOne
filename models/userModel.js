<<<<<<< HEAD


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
=======
const users = [
    {
        id: 1,
        name: 'Tony Stark',
        hero: 'Ironman',
        email: 'ironman@vangers.com',
        info: 'I am Ironman!'
    },

    {
        id: 2,
        name: 'Bruce Wane',
        hero: 'Batman',
        email: 'batman@batcave.com',
        info: 'I am Batman'
    },

    {
        id: 3,
        name: 'Peter Parker',
        hero: 'Spiderman',
        email: 'spider@man.com',
        info: 'The human spider!'
    },

    {
        id: 4,
        name: 'Paul Atredies',
        hero: 'Lisan Al-Gaib',
        email: 'emperor@oftheknownuniverse.tm',
        info: 'May your blade chip and shatter'
    },

    {
        id: 5,
        name: 'Stilgar',
        hero: 'Fedykin',
        email: 'sietch@tabr.fm',
        info: 'As written.'
    },

    {
        id: 6,
        name: 'Vladimir Harkonnen',
        hero: 'The Baron',
        email: 'baron@harkonnen.gp',
        info: 'My desert. My Arrakis. My Dune.'
    },
>>>>>>> 333f70b40c65406d75ccf5b67fcf9d4442c38aad
];

function getUsers() {
    return users;
}

function getUser(id) {
<<<<<<< HEAD
    let user = users.find(element => element.id === parseInt(id))
    if(typeof user !== "undefined") {
        return user;
    } else {
        return 'Error 404: This user could not be found.'
=======
    let user = users.find(element => element.id === parseInt(id));
    if(typeof user !== 'undefined') {
        return user;
    }
    else {
        return 'Error 404: User not found.';
>>>>>>> 333f70b40c65406d75ccf5b67fcf9d4442c38aad
    }
}

module.exports = {
    getUsers,
    getUser
}