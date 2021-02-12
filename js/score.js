const users = JSON.parse(localStorage.getItem('users'));
users.sort((a,b) => (a.highestScore < b.highestScore) ? 1 : ((b.highestScore < a.highestScore) ? -1 : 0))


var html = '<table>';
html += '<tr>';
html += '<th>' + 'USERNAME' + '</th>';
html += '<th>' + 'Highest SCORE' + '</th>';

html += '</tr>';
for (var i = 0; i < users.length; i++) {
    html += '<tr>';
    html += '<td>' + users[i].username + '</td>';
    html += '<td>' + users[i].highestScore + '</td>';


    html += '</tr>';
}
html += '</table>';

document.getElementById('container').innerHTML = html;

var audio = document.getElementById("song");

function playSong() {
    return audio.paused ? audio.play() : audio.pause();
}