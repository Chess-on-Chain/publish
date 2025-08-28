import type { Principal } from "@dfinity/principal";

interface WebsocketMessageQueue {
  method: string;
  principal: Principal;
  body: Uint8Array;
}

export interface ActorType {
  get_messages: () => Promise<WebsocketMessageQueue[]>;
  clear_messages: () => Promise<void>;
}
