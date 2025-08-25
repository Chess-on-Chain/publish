import Pusher from "pusher";

export default new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });
