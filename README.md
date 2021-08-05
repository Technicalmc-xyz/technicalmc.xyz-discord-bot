# Technical Minecraft Wiki Bot

## Developing

If you would like to start developing this bot on your own local
test server here is how to get setup.

**NODE.JS version 14.16.0 is required**

First install the dependices

```
npm i
```

Create a .env file with your discord token and guild ID

```
cp .env.example .env
```

Add roles to `roles-config.ts` by adding the **role id** for example:

```js
const ROLE_MAPPING: Record<string, string> = {
    1: '798936821081309215',
    2: '724141734639960096',
    3: '798936690219286549',
    4: '722653920849035375',
    5: '724141628599828521',
}
```

Run in development mode

```
npm run dev
```
