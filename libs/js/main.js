// let image = document.createElement('img')
// image.src = "https://countryflagsapi.com/png/brazil"
// document.getElementsByClassName('answerContainer').appendChild(image)
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
});

console.log("Running")
// console.log(data.query.count)

document.getElementById('ans1').innerHTML = "United States"
document.getElementById('ans2').innerHTML = "Mexico"
document.getElementById('ans3').innerHTML = "Russia"
document.getElementById('ans4').innerHTML = "France"