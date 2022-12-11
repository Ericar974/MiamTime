let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

let nameOfPerso = ''
socket.on('chat message', function (msg) {

    document.querySelectorAll('#room p').forEach(x=>{
        if(x.className === 'selected'){
            nameOfPerso = x.innerText
        }
    })

    let item = document.createElement('li');
    //console.log(msg)
    //react
    if (msg.match(/\/changeHour [0-23]{1,2}h[0-59]{2}$/)) {
        hRencontre = parseInt(msg.match(/\/changeHour (\d{1,2})h\d\d/)[1])
        mRencontre = parseInt(msg.match(/\/changeHour \d{1,2}h(\d\d)/)[1])
        //refresh the page
        estimate()
    } else if(msg.match(/^\//)){
        alert("commande inconnu")
    } else {
        item.textContent = nameOfPerso === '' ? '' + msg : nameOfPerso + ': ' +  msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }
});