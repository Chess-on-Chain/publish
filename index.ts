import { Actor, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import idlFactory from "./lib/idlFactory";
import type { ActorType } from "./lib/types";
import pusher from "./lib/pusher";

const ICP_IDENTITY_SECRET_KEY = process.env.ICP_IDENTITY_SECRET_KEY as string;
const ICP_API_HOST = process.env.ICP_API_HOST as string;
const ICP_COC_CANISTER_ID = process.env.ICP_COC_CANISTER_ID as string;

const identity = Ed25519KeyIdentity.fromSecretKey(
  Buffer.from(ICP_IDENTITY_SECRET_KEY, "hex")
);

const agent = await HttpAgent.create({
  host: ICP_API_HOST,
  identity,
});

const actor: ActorType = Actor.createActor(idlFactory, {
  canisterId: ICP_COC_CANISTER_ID,
  agent,
});

while (true) {
  try {
    const messages = await actor.get_messages();

    messages.forEach(async (message) => {
      const target_principal = message.principal.toText();
      pusher
        .trigger(target_principal, message.method, message.body)
        .catch(console.error);
    });

    if (messages.length >= 1) {
      console.log({ messages });

      await actor.clear_messages();
    }
  } catch (e) {
    console.error(e);
  }
}
