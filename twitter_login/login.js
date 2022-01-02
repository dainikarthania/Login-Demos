let express=require('express')
const app=express()
const oauth = require('oauth')
const request = require('request');

const TWITTER_CONSUMER_API_KEY = `oxfENXHtUNFbINpeFevwnvkH4`
const TWITTER_CONSUMER_API_SECRET_KEY = `j6U13tWsw9UUA96QrcXV5EiPyRugkM6IGVvfHNFsgGeRujQ52m`

const oauthConsumer = new oauth.OAuth(
    `https://twitter.com/oauth/request_token`, `https://twitter.com/oauth/access_token`,
    TWITTER_CONSUMER_API_KEY,
    TWITTER_CONSUMER_API_SECRET_KEY,
    '1.0A', 'http://127.0.0.1:5000/twitter/callback', 'HMAC-SHA1')

let secreat;
app.get('/',(req,res)=>{
    oauthConsumer.getOAuthRequestToken(function (error, oauthToken,   oauthTokenSecret, results) {
        console.log("error",error)
        console.log("eoauthTokenrror",oauthToken)
        console.log("oauthTokenSecret",oauthTokenSecret)
        console.log("results",results)
        secreat=oauthTokenSecret
    // let url=`https://twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
    let url=`https://twitter.com/oauth/authorize?oauth_token=${oauthToken}`

            
    res.redirect(url)

    })
})

app.get('/twitter/callback',(req,res)=>{
    console.log("ss",req.query)
    var requestToken = req.query.oauth_token,
    verifier = req.query.oauth_verifier;

    let access_token;
    let access_secret;
    let Verify_url=``
    console.log(requestToken,verifier)

    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: TWITTER_CONSUMER_API_KEY,
          consumer_secret: TWITTER_CONSUMER_API_SECRET_KEY,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      }, function (err, r, body) {
          console.log(err)
        if (err) {
          return res.send(500, { message: err.message });
        }
  
        console.log(body);
    })

    // oauthConsumer.getOAuthAccessToken(requestToken,secreat,verifier,function(err, accessToken, accessSecret,results) {
    //     console.log("jj",results)
    //     access_token=accessToken
    //     access_secret=accessSecret

    //     console.log(results)
    //     console.log(access_secret)
    //     console.log(access_token)

    //     //  Verify_url=`https://api.twitter.com/1.1/account/verify_credentials.json?user_id=${results.user_id}&screen_name=${results.screen_name}&include_email=true`

    //     //  oauthConsumer.get(Verify_url,access_token,access_secret,function(error, data, response) {
    //     //         console.log("error",error)
    //     //         console.log("data",data)
    //     //         // console.log("response",response)

    //     //  })
            


    // })

    res.send("fghjk")
    

    // oauthConsumer._verifyCredentials(access_token, access_secret,{}, function(err, user) {
    //     if (err)
    //         res.status(500).send(err);
    //     else
    //         res.send(user);
    // });


})

app.listen(5000, () => console.log(`Server running at `));