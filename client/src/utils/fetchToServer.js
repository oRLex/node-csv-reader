const url = "/api/v1";


export const sendFile = (formdata) => {
    return fetch(`${url}/file/sendfile/`, {
        method: 'POST',
        body: formdata
    })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    return data;
                });
            };