# react-trivia-game
Play trivia game with SMS! Random quiz!

You insert player's phone number, and pick a random quiz, then click `play`! Wait for the SMS message, enjoy answering it and wait for the result after 30 seconds😊🎉

## Stack
- JavaScript/Node.js
- React/Express
- [Twilio](https://www.twilio.com/docs/)
- [now](https://zeit.co/now)
- [Create React App](https://github.com/facebook/create-react-app)

## SETUP
This project use [now](https://zeit.co/now) for deployment, so you just need
1. Get your `Twilio` token, sid and phone number  

See here https://www.twilio.com/docs/iam/test-credentials  

2. Install `now`  
```
> yarn global add now
```
See here https://zeit.co/docs/v2/getting-started/installation/  

3. Clone this project

4. Deploy
```
> cd /to-your-project

> now -e TWILIO_SID=<your Twilio sid> -e TWILIO_TOKEN=<your Twilio token> -e TWILIO_BOT_PHONE=<your Twilio phone number>
```

5. Wait and you will get your URL for it!  

**you may need to auth the `now` first, don't worry, it's also a very simple step!**

## OTHERS
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
