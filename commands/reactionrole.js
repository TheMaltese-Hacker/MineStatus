module.exports = {
    name: 'reactionrole',
    description: "Sets Up a reaction role message",
    async execute(message, args, Discord, client) {
        const channel = '830455599594340373'
        const MemberRole = message.guild.roles.cache.find(role => role.name === "Members");

        const MemberKey = ':unlock:';

        let embed = new Discord.MessageEmbed()
        .setcolor('#e42643')
        .setTitle('React To Access Server :watermelon:')
        .setDescription('React To `${memberKey} to Unlock`');
        let MessageEmbed = await message.channel.send(embed);
        MessageEmbed.react(MemberKey);
    }

}
