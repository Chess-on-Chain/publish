export default ({ IDL }: any) => {
  const WebsocketMessageQueue = IDL.Record({
    method: IDL.Text,
    principal: IDL.Principal,
    body: IDL.Vec(IDL.Nat8),
  });
  return IDL.Service({
    pop_messages: IDL.Func([], [IDL.Vec(WebsocketMessageQueue)], []),
  });
};
