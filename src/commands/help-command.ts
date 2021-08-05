import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageEmbed } from 'discord.js'
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
        let commands
        const command = interaction.options.getString('command')

        if (command == null) commands = Object.values(dispatcher.commands)
        else if (dispatcher.commands[command] === undefined)
            throw new Error(`No command found with name: ${command}`)
        else commands = [dispatcher.commands[command]]

        const embed = new MessageEmbed().setColor('#56ad56').setTitle('Help')

        for (const command of commands) {
            embed.addField(
                `${
                    command.name.charAt(0).toUpperCase() + command.name.slice(1)
                } Command:`,
                command.options.helpMessage,
                false
            )
        }

        interaction.reply({ embeds: [embed] })
    }
}
