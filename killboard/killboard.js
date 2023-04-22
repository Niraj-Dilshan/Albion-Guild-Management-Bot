require('dotenv').config();
const axios = require('axios');

const url = 'https://gameinfo-sgp.albiononline.com/api/gameinfo/events?limit=1&offset=0&guildId=DE07m4WqTMyJLVU4C90DLg';

axios.get(url)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err);
  });