const users = [
    {
        id: 1,
        name: 'Paul Atredies',
        hero: 'Lisan Al-Gaib',
        email: 'emperor@oftheknownuniverse.tm',
        info: 'May your blade chip and shatter'
    },
    {
        id: 2,
        name: 'Stilgar',
        hero: 'Fedykin',
        email: 'sietch@tabr.fm',
        info: 'As written.'
    },
    {
        id: 3,
        name: 'Vladimir Harkonnen',
        hero: 'The Baron',
        email: 'baron@harkonnen.gp',
        info: 'My desert. My Arrakis. My Dune.'
    },
];

function getUsers() {
    return users;
}

function getUser(id) {
    let user = users.find(element => element.id === parseInt(id));
    if(typeof user !== 'undefined') {
        return user;
    }
    else {
        return 'Error 404: User not found';
    }
}

module.exports = {
    getUsers,
    getUser
}