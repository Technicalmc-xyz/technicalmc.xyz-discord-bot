import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { WikiBot } from '../bot'
import { CommandOptions } from '../types'

export abstract class CommandHandler {
    client: WikiBot
    name: string
    options: CommandOptions

    constructor(name: string, client: WikiBot, options: CommandOptions) {
        this.client = client
        this.name = name
        this.options = options
    }

    abstract build(builder: SlashCommandBuilder): SlashCommandBuilder
    abstract run(interaction: CommandInteraction): void
}
