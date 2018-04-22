export function request(method, path, done) {
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {

        xhr.addEventListener('readystatechange', ({target}) => {

            if (target.readyState === 4 && target.status === 200) {
                resolve(JSON.parse(target.responseText));
            }

            if (target.readyState === 4 && target.status > 299) {
                reject(target.status);
            }

        });

        xhr.open(method.toUpperCase(), path);
        xhr.send();
    });


}


// request('GET', '/data.json', (data) => { console.log(data) })