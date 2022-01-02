let express=require('express')
const app=express()
const request = require('request');
let app_id=`2405651956409273`
let query=`clienid=${app_id}&redirect_uri=http://localhost:5000/auth/facebook&response_type=code&auth_type=rerequest&display=popup`



app.get('/', (req, res) => {
let furl=`https://www.facebook.com/v8.0/dialog/oauth?client_id=${app_id}&redirect_uri=http://localhost:5000/auth/facebook&response_type=code&&auth_type=rerequest&state=123&scope=public_profile,email`

    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${query}`
    res.redirect(furl)
})

app.get('/auth/facebook',async(req,res)=>{
    let code=req.query.code
    let urls=`https://graph.facebook.com/v8.0/oauth/access_token?client_id=${app_id}&redirect_uri=http://localhost:5000/auth/facebook&client_secret=c3935da402395459ace00e3b2b72447a&code=${code}`

    try{
     let data=await new Promise((rs,rj)=>{
        request(urls, function (error, response, body) {
            if(error) return rj(error)
            else{
                console.log(response)
                return rs(response)
            }});
     })
     let op=data.body
     res.send(op)
    }
    catch(e){
        res.send(e)
    }
})

app.get('/validate',async (req,res)=>{
    let token=req.query.token

    let data=await new Promise((rs,rj)=>{
        let url=`https://graph.facebook.com/debug_token?input_token=${token}&access_token=689450731658383`

        let furl=`https://graph.facebook.com/me?fields=id,name,gender,birthday,email,location,picture&access_token=${token}`

        request(furl, function (error, response, body) {
            if(error) return rj(error)
            else{
                return rs(response)
         }});

    })
    res.send(data)
    
})




app.listen(5000, () => console.log(`Server running at `));
