const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(let key in data) {
            const message = data[key];
            console.log(message);
        }
    });
}

const renderMessageAsHtml = (message) => {
    // Hide Input Form
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'none';
    // Render messageas HTML
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = message;
};

ctr = 0;

const findMessage = (myPass) => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);    
        for(let key in data) {
            const message = data[key];
            console.log(message);
            if (myPass == message.password) {
                console.log(myPass);
                renderMessageAsHtml(message.message);
            } else {
                if (ctr >= 5) {
                    alert('Password wrong too many times');
                    location.reload();
                    break;
                } else if (ctr < 5 && myPass.length > 0) {
                    ctr ++;
                    alert("Wrong Password, try again. you have " + ctr + " wrong attempts");
                    break;
                } 
            }
        }
    });
}

document.querySelector("#viewMsg").addEventListener("click", ()=>{
    const password = document.querySelector("#passcode").value;
    findMessage(password);
});

