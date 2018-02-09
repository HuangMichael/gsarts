import axios from 'axios'
let Units = [];
let url = `http://localhost:8080/api/unit/`;
axios.get(url).then(function (response) {
    let u = JSON.parse(JSON.stringify(response.data));
    console.log("u----------------" + JSON.stringify(u));
        for (var x of u) {
        Units.push(x);
    }
});
console.log("Units----------------" + JSON.stringify(Units));
export {Units};
