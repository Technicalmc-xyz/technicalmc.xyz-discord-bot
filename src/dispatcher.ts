import { instance } from '.'
import { WikiBot } from './bot'
import { CommandHandler } from './commands/handler'
import { EventHandler } from './events/handler'
import { CommandOptions, Events } from './types'

class Dispatcher {
    events: Record<string, EventHandler> = {}
    commands: Record<string, CommandHandler> = {}

    constructor() {
        this.events = {}
    }

    registerEvent(name: Events, event: EventHandler) {
        this.events[name] = event
    }

    registerCommand(name: string, command: CommandHandler) {
        this.commands[name] = command
    }
}

export const dispatcher = new Dispatcher()

export const Event = (name: Events) => {
    return (constructor: new (client: WikiBot) => EventHandler) => {
        const handler = new constructor(instance)
        dispatcher.registerEvent(name, handler)
    }
}

export const Command = (name: string, options: CommandOptions) => {
    return (
        constructor: new (
            client: WikiBot,
            options: CommandOptions
        ) => CommandHandler
    ) => {
        const handler = new constructor(instance, options)
        dispatcher.registerCommand(name, handler)
    }
}
