const mongoose = require('mongoose');

async function connectDatabase(database_uri) {
    await mongoose.connect(database_uri).then(res =>  {
        console.log('connected');
    }).catch(err => console.error(err));
}

module.exports = connectDatabase;