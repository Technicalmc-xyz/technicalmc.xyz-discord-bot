import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { Command, dispatcher } from '../dispatcher'
import { CommandHandler } from './handler'

@Command('help', { helpMessage: 'Shows this message!' })
export class HelpCommand extends CommandHandler {
    build(builder: SlashCommandBuilder): SlashCommandBuilder {
        builder
            .setDescription('Get help for commands')
            .addStringOption((option) =>
                option
                    .setName('command')
                    .setDescription('The specific command to get help for')
            )

        return builder
    }

    run(interaction: CommandInteraction): void {
        const commands =
            interaction.options.getString('command') != null
                ? [interaction.options.getString('command')]
                : Object.values(dispatcher.commands)

        console.log(commands)
    }
}
