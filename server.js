const express = require('express');
const bodyParser = require('body-parser');
const Twilio = require('twilio');
const MessagingResponse = Twilio.twiml.MessagingResponse;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const botPhone = process.env.TWILIO_BOT_PHONE;

// im-memory date storage
let store = new Map();

async function sendSMS(numbers, quiz) {
  const twilio = Twilio(sid, token);
  const response = [];

  for (let i = 0; i < numbers.length; i++) {
    // send SMS
    const sendResponse = await send(numbers[i]);
    response.push(sendResponse);
  }

  async function send(number) {
    try {
      const response = await twilio.messages.create({
        from: botPhone,
        to: number,
        body: quiz,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  return response;
}

app.get('/api/health', (req, res) => res.json('ok!'));

app.get('/api/result', (req, res) => {
  const result = store.get('winners') || [];
  // clear store
  store.clear();

  res.json(result);
})

app.post('/api/send-sms', async (req, res) => {
  const { body } = req;
  const { numbers = [], quiz, limitedTime = 30 } = body;

  // refresh store cache
  if (store) {
    store.clear();
  } else {
    store = new Map();
  }

  // cache game info
  store.set('startTime', Date.now());
  store.set('limitedTime', limitedTime);
  store.set('quiz', quiz);

  // cache player list
  store.set('players', numbers);

  let result;

  try {
    const quizContent = `${quiz.question} ${quiz.options.join(' | ')}`
    result = await sendSMS(numbers, quizContent);
  } catch (e) {
    result = e;
  }
  
  res.json(result);
});

app.post('/api/receive-sms', (req, res) => {
  const { body: { Body = {}, From } = {} } = req;

  const twiml = new MessagingResponse();
  let message = twiml.message();

  res.writeHead(200, { 'Content-Type': 'text/xml' });

  if (!store.size) {
    // no game and players
    message.body('Sorry, there is no game currently!');
    return res.end(twiml.toString());
  }

  // check is income a player
  const players = store.get('players');

  if (!players.includes(From)) {
    // not player
    message.body('Sorry, you are not player, still thanks for playing with us!');
    return res.end(twiml.toString());
  }

  // check answer correct
  const quiz = store.get('quiz');

  if (Body && Body !== quiz.answer) {
    // wrong answer

    // clear user from current list
    store.set('players', store.get('players').filter(player => player !== From));

    message.body('Sorry, wrong answer...');

    return res.end(twiml.toString());
  }

  // check in time
  const end = Date.now();
  const start = store.get('startTime');
  const limitedTime = store.get('limitedTime');
  const timeDiff = ~~((end - start) / 1000);
  if (timeDiff > limitedTime) {
    // time out

    // clear user from current list
    store.set('players', store.get('players').filter(player => player !== From));

    message.body('Oops, you are out of time or there is no game currently!');

    return res.end(twiml.toString());
  }

  // won!

  // clear user from current list
  const winners = store.get('winners');

  if (winners.length) {
    store.set('winners', winners.push(From));
  } else {
    store.set('winners', [From]);
  }

  store.set('players', store.get('players').filter(player => player !== From));

  message.body('Congrats! you just won the game!');

  return res.end(twiml.toString());
})

app.listen(8001, () => console.log('server listening on 8001'));
