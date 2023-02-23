---
title: "Create a Discord Bot, the easy way"
comments: true
share: false
related: false
categories:
  - Bot Discord
tags:
  - Bot
  - node.js discord.js
---

# A small, fun and interesting weekend project

The past weekend was a fantastic opportunity for me to embark on a new project that I thoroughly enjoyed. Not only was it a breeze to put together, but it also has the potential to lead to countless other projects. The best part is that it provides an excellent foundation for future bots that can be used to automate repetitive tasks or provide useful information to users.

In fact, I'm already planning on implementing a bot that can access a database to retrieve specific values and display them on Discord for easy access by users. As we all know, pairing with a popular, functional app like Discord is a great way to spark new ideas and create exciting new applications.



# Your first steps into creating your own discord bot.

Discord is a widely used messaging and chat application with millions of users worldwide. One of Discord's unique features is the ability to create bots that can interact with users on a server. In this tutorial, we will guide you through the process of creating a Discord bot using Node.js and Visual Studio Code. You'll learn how to set up your Discord bot, install the necessary software, and write code. Before we begin, make sure you have a Discord account and have created a server where you can test your bot.


# Prerequisites
To create a Discord bot, you will need the following:

* [Node.js](https://nodejs.org/en/download/) installed on your computer.
* [Visual Studio Code](https://code.visualstudio.com) or any other code editor.
* A Discord account.

* A server where you can add the bot.

## Step 1: Setting Up Your Discord Bot.

To create a Discord bot, head to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.

 Follow these steps:

* Go to the Applications tab and click the New Application button.
* Give your application a name and click Create.
* Go to the newly added Bot section.
* Click Add Bot, then Yes, do it!
* Click Copy under Token and paste it into a Notepad file. This will be your bot's password that you will later use in a .env file with a constant named TOKEN.
* Go to the Privileged Gateway Intents and enable all three options.
* Save changes.
* Go to OAuth2 separator.
* Go to the URL Generator separator.
* Click on Application Commands in the Scopes table.
* Click on Bot.
* Click on Administrator in the Bot Permissions table.
* Copy and store the URL link.
* Open a new Chrome tab and paste the link.
* Select the server you want to allow the bot to join.
* You now have your very own Discord bot!

# You now have your very own discord bot.

If all goes well, go into the Discord app, and you will see the bot on the server you selected, but it will be offline.

## Step 2: Creating a New Project.

To create a new project for your Discord bot, follow these steps:

* Create a new folder in your file explorer and name it whatever you'd like, for example, "new bot". 
* Click on the folder URL and type "cmd." This will open a command prompt on the newly created directory folder.
![cmd](/assets/images/foldercmd.png)
* Type "code ." (with the dot) in the command prompt to open a new project with Visual Studio Code.
* Inside the new project, go to the terminal and type:

```java
npm init -y
```
This will create a package.json file with default values.


* Click on package.json and change the "main" value to "src/bot.js".
* Change the "test" value in the "scripts" tab to "node .".
* Input your author name.

![package.json](/assets/images/author.png)


* In the terminal, install the following packages:

```java
npm i discord.js discord-api-types @discordjs/rest dotenv chalk@4.1.2
```


### Step 3: Organising folder directories.

Organize your folders by following these steps:
	
* Add a new folder named "src" to the main folder structure.
* Inside the "src" folder, create a new file named "bot.js".
* Inside the "src" folder, create three more subfolders named "commands", "functions", and "events".
* Inside the "functions" folder, create a new subfolder named "handlers".
* Inside the "handlers" folder, create two new files named "handlecommands.js" and "HandleEvents.js".
* Inside the "commands" folder, create a new subfolder named "tools".
* Inside the "events" folder, create a new subfolder named "client".
* inside the client subfolder, create 2 new files, named "interactionCreate.js" and "ready.js".
* create a new file and name it .env. This file should be in the main folder structure.

This is how your directories should look.



```bash
New Bot
├── node_modules 
├── src
|   ├──commands 
|   |  └── tools 
|   |      └── ping.js
|   | 
|   ├── Events
|   |   └── client
|   |       ├── interactionCreate.js
|   |       └── ready.js
|   |
|   ├── functions
|   |   └── handlers
|   |       ├── handlecommand.js
|   |       └── handleEvents.js
|   |
|   └── bot.js        
|                                   
├── .env                               
├── package-lock.json
└── package.json 
```


**Warning Notice:** The .env file should be outside the main folder structure with package.json file.
{: .notice--warning}
**Warning Notice:** The bot.js file should be inside the src folder.
{: .notice--warning}

# Now that you have set up your development environment and organized the basic file structure for your Discord bot project, it's time to start programming your bot. Here's a step-by-step guide to help you get started:

#### Step 4: Code implementation.



* Open the interactionCreate.js file and paste the following code.

```javascript
module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);   
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Error`,
                    ephemeral: true,
                });
            }
        }
    }
}
```

* Open the ready.js file and paste the following code.

```java
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`ready!!! ${client.user.tag} logged in and online`);
    }
}
```


* Open the handleCommands.js file and paste the following code.


```java
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }
        const clientId = 'XXXXXXXXXX';
        const guildId = 'XXXXXXXXXXX';
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        try {
            console.log("starded refreshing application (/) commands.");
            await rest.put(Routes.applicationCommands(clientId, guildId), {
                body: client.commandArray,
            });
            console.log("successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);   
        }
    };
};
```
**Warning Notice:** In this code you will need to input your Guild id and your client ID. this is easely done by going into discord, click on your bot profile and get your clientid, then click on the server you want to add the bot to, and get the guildID.
{: .notice--warning}

* Open the handleEvents.js file and paste the following code.

```java
const fs = require('fs');
module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./src/events`);
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith('.js'));
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(... args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
```

* Open the bot.js file and paste the following code.

```java
require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) 
    require(`./functions/${folder}/${file}`)(client);
}
client.handleEvents();
client.handleCommands();
client.login(token);
```

* Open the .env file and paste the following code.
 This is where you paste your bot token you copied from discord developer portal.

```java
token=XXXXX 
```

##### You are finally done with setting up and coding your very own discord bot.

If everything goes to plan, you should now be able to get your bot online and ready to go.
 Before we create a custom function for our bot to do as we please, we should run the bot to see if its working so far.

 * Open up a new terminal, and type in:

 ```java
 npm test
 ```

 Your bot should now be online and ready to go. Just open your discord, browse into the server you set the bot to run on and check if its working.

 At this point you should save this project. Name it starter pack or something and store it for future projects. This will be your base.

##### Creating a test function.

Now that we have a working bot, lets implement a test function to get a better grasp of future implementations.

* Create a new file inside the commands/tools subfolder and name it ping.js.

* Add the following code:

```java
// add the required slashcommandbuilder
const { SlashCommandBuilder} = require('discord.js');
// create a new module
// name it ping. this will be your /command name. it will look like /ping on discord
//give it a description
module.exports = {
    data: new SlashCommandBuilder() // create new instance
        .setName('ping') // name it
        .setDescription('What is your latency'), // describe it
    async execute(interaction, client) { // add the ping code
        const message = await interaction.deferReply({ 
            fetchReply: true
        });
        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: newMessage
        });
    }
}
```
* Save all.
* Open a new terminal and type.

```java
npm test
```

* Go on discord and test your new /ping command.



Creating a Discord bot can be a fast and enjoyable weekend project that can lead to many other interesting ideas. It can serve as a foundation for future bots that can manage and automate repetitive tasks or provide useful information to users. With the ability to access databases and other online resources, the possibilities for functionality are virtually limitless. Furthermore, adding new features to the bot is made easy with the use of the commandbuilder pack. As demonstrated, with the help of tools like ChatGPT, starting a new project and getting it rolling can be both easy and fast. In the future, we may explore more ways to use ChatGPT as a personal assistant and perhaps even publish a blog post on how to get started with a new tool.


