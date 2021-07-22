const messagesRef = firebase.database().ref();

messagesRef.push({
    message: "This was made with Javascript",
    password: "Javascript"
});