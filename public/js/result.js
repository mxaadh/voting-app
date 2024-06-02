
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
