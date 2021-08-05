import { SlashCommandBuilder } from '@discordjs/builders'
import { Client, CommandInteraction, Intents, MessageEmbed } from 'discord.js'
import { CommandHandler } from './commands/handler'
import { EventHandler } from './events/handler'
import { Events } from './types'

export class WikiBot extends Client {
    events: Record<string, EventHandler> = {}
    commands: Record<string, CommandHandler> = {}

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

    registerEvent(name: Events, event: EventHandler) {
        this.events[name] = event
    }

    registerCommand(name: string, command: CommandHandler) {
        this.commands[name] = command
    }

    async loadEvents() {
        await import('./events')
        for (const [name, event] of Object.entries(this.events)) {
            this.on(name, (...args) => event.handler([...args]))
        }
    }

    async loadCommands() {
        await import('./commands')
        for (const [name, command] of Object.entries(this.commands)) {
            await this.guilds.cache
                .get(process.env.GUILD_ID)
                ?.commands.create(
                    <any>(
                        command
                            .build(new SlashCommandBuilder().setName(name))
                            .toJSON()
                    )
                )
        }
    }

    async dispatchCommand(interaction: CommandInteraction) {
        try {
            this.commands[interaction.commandName].run(interaction)
        } catch (err) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Unfortunately, an error occured!')
                        .setDescription('```\n' + err + '```'),
                ],
            })
        }
    }
}
