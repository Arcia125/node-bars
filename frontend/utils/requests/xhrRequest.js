const xhrRequest = ({ method = `GET`, url, data = null }) => new Promise((resolve, reject) => {
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
    if (data !== null) {
        xhr.setRequestHeader(`Content-Type`, `application/json;charset=UTF-8`);
    }
    xhr.send(JSON.stringify(data));
});

export default xhrRequest;
