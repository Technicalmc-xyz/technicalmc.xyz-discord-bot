import { SlashCommandBuilder } from '@discordjs/builders'
import { Client, CommandInteraction, Intents, Interaction } from 'discord.js'
import { dispatcher } from './dispatcher'

export class WikiBot extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
            ],
        })

        this.once('ready', async () => {
            console.log('Wiki Bot is Ready!')
            await this.loadEvents()
            await this.loadCommands()
        })

        this.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return
            await this.dispatchCommand(interaction)
        })
    }

    async loadEvents() {
        await import('./events')
        for (const [name, event] of Object.entries(dispatcher.events)) {
            this.on(name, (...args) => event.handler([...args]))
        }
    }

    async loadCommands() {
        await import('./commands')
        const commandData: any[] = []

        for (const [name, command] of Object.entries(dispatcher.commands)) {
            commandData.push(
                command.build(new SlashCommandBuilder().setName(name)).toJSON()
            )
        }

        console.log(commandData)
        await this.application?.commands.set(commandData)
    }

    async dispatchCommand(interaction: CommandInteraction) {
        dispatcher.commands[interaction.commandName].run(interaction)
    }
}
