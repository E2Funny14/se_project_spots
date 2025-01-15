// class Api {
//   constructor(options) {}

//   getInitialCards() {
//     fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//       headers: {
//         authorization: "4b311c15-cf37-4436-8f59-6b4ee6874c8c"
//       }
//     }).then((res) => res.json());
//   }
// }
//   getUserInfo() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       headers: this._headers,
//     }).then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       Promise.reject(`Error: ${res.status}`);
//     });
// }

//   addCard({ name, link }) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         link,
//       }),
//     }).then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       Promise.reject(`Error: ${res.status}`);
//     });
//   }
// }

// export default Api;
