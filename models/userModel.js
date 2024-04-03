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

];

function getUsers() {
    return users;
}

function getUser(id) {
    let user = users.find(element => element.id === parseInt(id));
    if(typeof user !== "undefined") {
        return user;
    } else {
        return 'Error 404: User not found.'
    }
}

module.exports = {
    getUsers,
    getUser
}