const xhrRequest = ({ method = `GET`, url }) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        }
    };
    xhr.onerror = (event) => {
        reject(xhr.statusText);
    };
    xhr.send(null);
});

export default xhrRequest;
