import axios from 'axios'
import { GuildMember } from 'discord.js'
import { event } from '../dispatcher'
import { EventHandler } from './handler'
import ROLE_MAPPING from './roles-config'

interface WikiUser {
    avatar: string
    discriminator: string
    id: string
    rank: number
    username: string
}

type WikiUserResponse = WikiUser & { message: string }

@event('guildMemberAdd')
export class AutoRole extends EventHandler {
    async handler([member]: [GuildMember]) {
        const user = await this.fetchWikiUser(member.id)
        if (user == null) return

        const role = member.guild.roles.cache.find(
            (role) => role.id == ROLE_MAPPING[String(user.rank)]
        )
        if (role === undefined) return
        member.roles.add(role)
    }

    async fetchWikiUser(id: string): Promise<WikiUser | null> {
        try {
            const res = await axios.get<WikiUserResponse>(
                `https://technicalmc.xyz/api/user/${id}`
            )
            return res.data
        } catch (err) {
            return null
        }
    }
}
