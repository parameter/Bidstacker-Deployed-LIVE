import base64 from 'base-64';

let url = 'https://api.bastaonline.se/v2/integration/product';
let username = 'amin.smires@outlook.com';
let password = 'Markolio89';

let headers = new Headers();

headers.set(
  'Authorization',
  'Basic ' + base64.encode(username + ':' + password)
);

export default async function handler(req, res) {
  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
  });
  // .then((response) => response.json())
  // .then((json) => console.log(json));

  res.status(200).json(response);
}
