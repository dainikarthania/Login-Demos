let express=require('express')
const app=express()
const { google } = require('googleapis');
const jwt = require('jsonwebtoken')
const OAuth2Data = require('./credentials.json')

const CLIENT_ID = `http://233568275047-fi0hob6juucp4e2jmtu3nmh48kh5mnhm.apps.googleusercontent.com`;
const CLIENT_SECRET = `W1MKnTPwOX1SFMQZCj7I57nb`;
const REDIRECT_URL = OAuth2Data.redirect_uris

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
console.log(oAuth2Client)
var authed = false;
// const apis = google.getSupportedAPIs();
// console.log("supported api",apis)

app.get('/', (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/user.birthday.read','https://www.googleapis.com/auth/user.gender.read']
        });
        console.log(url)
        res.redirect(url);
    } else {
        console.log(oAuth2Client)

    

        // const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        // gmail.users.labels.list({
        //     userId: 'me',
        // }, (err, res) => {
        //     if (err) return console.log('The API returned an error: ' + err);
        //     const labels = res.data.labels;
        //     if (labels.length) {
        //         console.log('Labels:');
        //         labels.forEach((label) => {
        //             console.log(`- ${label.name}`);
        //         });
        //     } else {
        //         console.log('No labels found.');
        //     }
        // });
        // // 
        // console.log(oAuth2Client.credentials.id_token)
        // let decodedToken = jwt.verify(oAuth2Client.credentials.id_token)

        res.send(`Logged in by ${JSON.stringify(oAuth2Client)}`)
    }
})

app.get('/auth/google/callback', function (req, res) {
    const code = req.query.code
    console.log("code",code)
    // res.send(code)
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/')
            }
        });
    }
});

app.get('/logout',(req,res)=>{
    var auth2 = OAuth2Data.getAuthInstance();
    res.send(auth2)

})

app.listen(5000, () => console.log(`Server running at `));


