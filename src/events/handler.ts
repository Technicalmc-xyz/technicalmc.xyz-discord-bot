import { WikiBot } from '../bot'

export abstract class EventHandler {
    client: WikiBot

    constructor(client: WikiBot) {
        this.client = client
    }

    abstract handler(args: any[]): void
}
