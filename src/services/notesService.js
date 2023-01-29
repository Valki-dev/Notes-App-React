const endpoint = "http://localhost:3000/notes";

const getAll = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(endpoint, requestOptions)
        .then(response => response.json())
}

const createNote = (note) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(note);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const deleteNote = (id) => {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(endpoint + "/" + id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const updateNote = (note) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(note);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(endpoint + "/" + note.id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default {
    getAll,
    createNote,
    deleteNote,
    updateNote
}