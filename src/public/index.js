const socket = io()
let user
Swal.fire({
    title: "Log In",
    input: "text",
    text: "Enter your nick:",
    allowOutsideClick: false,
    inputValidator: value => !value && "You need to enter a nick!"
}).then(response => {
    user = response.value
    socket.emit('registered', user)
})

let chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', e => {
    if (e.key==="Enter") {
        if (chatBox.value.trim().length>0) {
            socket.emit('message', { user, message: chatBox.value.trim() })
            chatBox.value = ""
        }
    }
})


socket.on('newUser', data => {
    Swal.fire({
        icon: "success",
        text: `New user ${data} has connected!`,
        toast: true,
        position: "top-right"
    })
})

socket.on('log', data => {
    let log = document.getElementById('history')
    let messages = ""
    data.forEach(message => messages += `[${message.user}] dice: ${message.message}<br />`)
    log.innerHTML = messages
})