const http = require('http')
const app = require('./serverside/app');
const port = process.env.PORT || 8080;

const { faker } = require('@faker-js//faker');
const randomData = {};
const dataArr = [];
function generateRandomData() {
    randomData.name = faker.name.fullName();
    randomData.email = `${randomData.name}@gmail.com`;
    randomData.contact = faker.phone.number('###-###-####');
    dataArr.push(randomData);
}

generateRandomData();



console.log("random data generated =====> ")
dataArr.forEach(function(data){
    console.log(data);
})

app.listen(port, () => {
    console.log((`server running http://localhost:${port}`))
})