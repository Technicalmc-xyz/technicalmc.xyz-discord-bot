import { Client } from 'discord.js'
import { dispatcher } from './dispatcher'

export class WikiBot extends Client {
    constructor() {
        super()

        this.once('ready', async () => {
            console.log('Wiki Bot is Ready!')
            await this.loadEvents()
        })
    }

    async loadEvents() {
        await import('./events')
        for (const [name, event] of Object.entries(dispatcher.events)) {
            this.on(name, (...args) => event.handler([...args]))
        }
    }
}
