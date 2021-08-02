import { WikiBot } from "./bot";
import { config } from "dotenv";

config();

export const instance = new WikiBot();
instance.login(process.env.DISCORD_TOKEN);
