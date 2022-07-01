const axios = require('axios');

async function fetchSecret(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Vault-Token': 'hvs.DnsnMiUnyDa1xDrzGo1DOxzL'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const vaultURL = "http://54.165.243.121:8200/v1/testPathV1/reactAdminERP"


// module.exports = {
//     mongoURI,
//     secretOrKey: "FxUum76z"
// };


// module.exports = {
//     fetchSecret: () => fetchSecret(vaultURL)
// }


module.exports = {
    mongoURI: "mongodb+srv://sampleUsername:samplePassword@cluster0.d8pjn.mongodb.net/adminERPDB?retryWrites=true&w=majority",
    secretOrKey: "FxUum76z"
};