console.log('the js is connected.');

// OBTAIN USERS
var body = document.querySelector('body');
body.addEventListener('onload', check());
var userId = "";
var postId = "";

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

function check() {
    // https://stackoverflow.com/questions/4758103/last-segment-of-url
    var curLoc = (location.pathname.substr(location.pathname.lastIndexOf('/')+1));
    console.log(curLoc);
    switch (curLoc) {
        case 'index.html':
            indexAjax();
            break;
        case 'articles.html':
            if (hasPost()){
                postAjax(userId, postId);
            }
            else {
                userAjax(userId);
            }
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

function userAjax(userId) {
    // Build breadcrumb
    function breadcrumbbuilder() {
        var breadcrumb = document.querySelector('ol.breadcrumblist');
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.setAttribute('aria-current', 'page');
        span.innerHTML="User"
    
        breadcrumb.appendChild(li);
        li.appendChild(span);
    }

    breadcrumbbuilder();
    
    // Build page
    var articleList = document.createElement('div');
    var h1 = document.createElement('h1');
    var main = document.querySelector('div.main');

    // h1.innerHTML = 'Hello';
    // articleList.setAttribute('class', 'article-list');
    // main.appendChild(articleList);


    // AJAX
    ajax('https://jsonplaceholder.typicode.com/posts?userId=' + userId,
        'GET',
        function cb(evt){
            if (evt.target.status === 200) {
                var posts = JSON.parse(evt.target.response);
                console.log(posts);
                posts.forEach(function(post){
                    // var div = document.createElement('div');
                    // div.setAttribute('class', 'article');
                    // div.innerHTML = post.id;
                    // body.appendChild(div);
                })
            }
        })
}

function postAjax(userId, postId){
    // ajax('https://jsonplaceholder.typicode.com/posts?userId=' + userId,
    //     'GET',
    //     function cb(evt){
    //         if (evt.target.status === 200) {
    //             var posts = JSON.parse(evt.target.response);
    //             posts.forEach(function(post){
    //                 if (post.id === postId) {
    //                     var body = document.querySelector('body');
    //                     var p = document.createElement('p');
    //                     p.innerHTML = post.title;
    //                     body.appendChild(p);
    //                 }
    //             })
    //         }
    //     }) 
    console.log(userId + " " + postId);
}

function hasPost() {
    // Obtain user id
    var url = window.location.href;
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    userId = queryString.substring(2,3);

    // Check if post is present
    var queryString2 = url ? url.split('&')[1] : window.location.search.slice(1);
    if (queryString2) {
        postId = queryString2.substring(2,5);
        return true;
    }
    else {
        return false;
    }
}
