const socket = io("ws://localhost:8000");


const activity = document.getElementById("activity");
const messageInput = document.getElementById("message");

console.log(activity)

function updateActivity(msg) {
    activity.textContent = msg;
}

messageInput.addEventListener('keypress', (event) => {
    console.log("typing....")
    socket.emit("activity", socket.id.substring(0, 3));
})

let activityTimer;
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`;

    //clear after 3 seconds
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        activity.textContent = "";
    }, 3000)
})

function sendMessage(event) {
    event.preventDefault();

    console.log("sending message.......")

    const handle = document.getElementById("handle");
    
    socket.emit("message", messageInput.value);
    
    messageInput.focus();
}

document.getElementById("send").addEventListener("click", (event) => sendMessage(event));

//listen for keyboard events
document.getElementById("message").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        sendMessage(event);
    }
});

const getBtn = () => {
    const btn = document.getElementById("send");
    console.log(btn);
}
getBtn();

//listen for messages
socket.on("message", function(data) {
    console.log(data);
    const li = document.createElement("li");
    li.textContent = data;
    document.querySelector("ul").appendChild(li);
});
