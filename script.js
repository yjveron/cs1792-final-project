console.log('the js is connected.');

function ajax(url, method, cb, data){
    let request = new XMLHttpRequest();
    request.addEventListener('load', cb);
    request.open(method, url);
    switch(method) {
        case 'POST':
        case 'PATCH':
        case 'PUT':
            request.send(data);
            break;
        default:
            request.send();
    }
}

// OBTAIN USERS
var body = document.querySelector('body');
body.addEventListener('onload', check())

function check() {
    // https://stackoverflow.com/questions/4758103/last-segment-of-url
    var curLoc = (location.pathname.substr(location.pathname.lastIndexOf('/')+1));
    console.log(curLoc);
    switch (curLoc) {
        case 'index.html':
            indexAjax();
            break;
        case 'articles.html':
            userAjax();
    }
}

function indexAjax() {
    ajax('https://jsonplaceholder.typicode.com/users',
    'GET',
    function cb(evt){
        if (evt.target.status === 200) {
            var users = JSON.parse(evt.target.response);
            var parentdiv = document.querySelector('div.users');
            
            users.forEach(function(user) {
                var a = document.createElement('a');
                var div = document.createElement('div');
                var h1 = document.createElement('h1');

                var param = encodeURIComponent('u');
                var test = 'articles.html';

                a.setAttribute('href', "file:///C:/xampp/htdocs/cs1792-final-project/" + test + "?" + param + "=" + user.id);
                a.setAttribute('tabindex', 1);
                div.setAttribute('class', "user");
                h1.innerHTML = user.name;

                parentdiv.appendChild(a);
                a.appendChild(div);
                div.appendChild(h1);
            })
        }
    })
}

function userAjax() {
    var url = window.location.href;
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var userId = queryString.substring(2,3);

    // ONLY WORKS IF AN ARTICLE PAGE HAS BEEN CLICKED.
    // QUERY STRING IS FOR CHECKING IF ARTICLE PAGE EXISTS
    var queryString2 = url ? url.split('&')[1] : window.location.search.slice(1);
    if (queryString2){
        console.log("exists");
        var postId = Number(queryString2.substring(2,5));
        console.log(postId);

        // FOLLOWING CODE BELOW RETURNS THE TITLE OF THE POST
        postAjax(userId, postId);
    }
    else {
        console.log("does not exist");
    }
}

function postAjax(userId, postId){
    ajax('https://jsonplaceholder.typicode.com/posts?userId=' + userId,
        'GET',
        function cb(evt){
            if (evt.target.status === 200) {
                var posts = JSON.parse(evt.target.response);
                posts.forEach(function(post){
                    if (post.id === postId) {
                        var body = document.querySelector('body');
                        var p = document.createElement('p');
                        p.innerHTML = post.title;
                        body.appendChild(p);
                    }
                })
            }
        }) 
}

// get location
      // if location = index, do ajax on users
      // else if location = users, do ajax on articles
      // else if location = article, do ajax on article post