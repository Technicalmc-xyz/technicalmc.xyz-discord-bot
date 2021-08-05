import { instance } from '.'
import { WikiBot } from './bot'
import { CommandHandler } from './commands/handler'
import { EventHandler } from './events/handler'
import { CommandOptions, Events } from './types'

export const Event = (name: Events) => {
    return (constructor: new (client: WikiBot) => EventHandler) => {
        const handler = new constructor(instance)
        instance.registerEvent(name, handler)
    }
}

export const Command = (name: string, options: CommandOptions) => {
    return (
        constructor: new (
            name: string,
            client: WikiBot,
            options: CommandOptions
        ) => CommandHandler
    ) => {
        const handler = new constructor(name, instance, options)
        instance.registerCommand(name, handler)
    }
}
