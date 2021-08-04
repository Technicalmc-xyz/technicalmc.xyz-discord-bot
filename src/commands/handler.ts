import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { WikiBot } from '../bot'
import { CommandOptions } from '../types'

export abstract class CommandHandler {
    client: WikiBot
    options: CommandOptions

    constructor(client: WikiBot, options: CommandOptions) {
        this.client = client
        this.options = options
    }

    abstract build(builder: SlashCommandBuilder): SlashCommandBuilder
    abstract run(interaction: CommandInteraction): void
}
