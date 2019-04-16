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

ajax ('https://jsonplaceholder.typicode.com/users',
      'GET',
      function cb(evt) {
          
      })