const socket = io("ws://localhost:8000");

function sendMessage(event) {
    event.preventDefault();

    console.log("sending message.......")

    const handle = document.getElementById("handle");
    const message = document.getElementById("message");

    socket.emit("message", message.value);
    /*socket.emit({
        handle: handle.value,
        message: message.value
    });*/

    //handle.value = "";
    //message.value = "";

    message.focus();
}

document.getElementById("send").addEventListener("click", (event) => sendMessage(event));

//listen for keyboard events
document.getElementById("message").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        sendMessage(event);
    }
});

//blob reader
const reader = new FileReader();
//blob messages reader
reader.onload = function(e) {
  console.log(e.target.result);  
  const li = document.createElement("li");
  li.textContent = e.target.result;
  document.querySelector("ul").appendChild(li);
};

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
