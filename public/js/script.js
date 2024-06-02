
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});


///////////////start votingg//////////////////////
document.getElementById('result-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var x = parseInt(document.getElementById('contestant-x').value);
    var y = parseInt(document.getElementById('contestant-y').value);
    var z = parseInt(document.getElementById('contestant-z').value);

    var winner;
    var maxScore = Math.max(x, y, z);

    if (maxScore === x) {
        winner = 'X';
    } else if (maxScore === y) {
        winner = 'Y';
    } else {
        winner = 'Z';
    }

    document.getElementById('result').innerHTML = 'The winner is: ' + winner;
});
