import { instance } from ".";
import { WikiBot } from "./bot";
import { EventHandler } from "./events/handler";
import { Events } from "./types";

class Dispatcher {
  events: Record<string, EventHandler> = {};

  constructor() {
    this.events = {};
  }

  registerEvent(name: Events, event: EventHandler) {
    this.events[name] = event;
  }
}

export const dispatcher = new Dispatcher();

export const event = (name: Events) => {
  return (constructor: new (client: WikiBot) => EventHandler) => {
    const handler = new constructor(instance);
    dispatcher.registerEvent(name, handler);
  };
};
