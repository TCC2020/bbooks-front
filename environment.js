const fs = require('fs');

const heroku = `export const environment = {
    production: true,
    api: '${process.env.USERS_API}',
    gauth: '${process.env.GOOGLELOGIN}',
    fbauth: '${process.env.FACEBOOKLOGIN}',
    apicep: '${process.env.APICEP}',
    feedApi: '${process.env.FEED_API}',
    competitionApi: '${process.env.COMPETITION_API}'
};`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
    if (err) {
        console.log('Falha ao escrever arquivo');
    }
});
