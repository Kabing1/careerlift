import http from 'k6/http';
import ws from 'k6/ws';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const url = 'ws://localhost:4000/graphql';
  
  const params = {
    headers: {
      'Authorization': `Bearer ${__ENV.TEST_TOKEN}`,
    },
  };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => {
      socket.send(JSON.stringify({
        type: 'connection_init',
        payload: {},
      }));
    });

    socket.on('message', (data) => {
      const message = JSON.parse(data);
      check(message, {
        'is connection ack': (msg) => msg.type === 'connection_ack',
      });
    });

    // Simulate interview feedback subscription
    socket.send(JSON.stringify({
      id: '1',
      type: 'subscribe',
      payload: {
        query: `
          subscription {
            interviewFeedback(interviewId: "test") {
              feedback
            }
          }
        `,
      },
    }));

    sleep(30);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}