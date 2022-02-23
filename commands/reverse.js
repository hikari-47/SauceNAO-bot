const { MessageEmbed } = require('discord.js');
const sagiri = require('sagiri');
const isImageURL= require('is-image-url');
const { APIkey } = require('../config.json');
const reverse = sagiri(APIkey);

module.exports = {
    name: 'reverse',
    description: 'Reverse Image Search',
    aliases: ['search'],
    run: async(client, message, args) => {
        async function require(imageURL) {
            await reverse(imageURL).then(response => {
                const data = response[0];
                const results = {
                    url: data.url,
                    site: data.site,
                    similarity: data.similarity,
                    thumbnail: data.raw.header.thumbnail,
                    authorName: data.authorName || 'none',
                };
                const minSimilarity = 50;
                if (minSimilarity <= results.similarity) {
                    const reverseEmbed = new MessageEmbed()
                        .setColor('#9B59B6')
                        .setTitle("SauceNAO Reverse Image Search")
                        .setDescription("Need to know the source of this Now!")
                        .addFields(
                            {name: "Similarity", value: `${results.similarity}%`, inline: true},
                            {name: "Author", value: `${results.authorName}`, inline: true},
                            {name: "Site", value: `${results.site}`, inline: true},
                            {name: "Link", value: `${results.url}`, inline: true}
                        )
                        .setImage(results.thumbnail)
                        .setTimestamp()
                        .setFooter(
                            {text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`}
                        )
                    message.channel.send({ embeds: [reverseEmbed] })
                } else 
                    message.channel.send('No results found!')
            })
        }
        if (!message.attachments.first() && !args[0]) {
            message.channel.send("Image not found!").then(msg => {
                setTimeout(() => msg.delete(), 3000)
            })
        } else if (message.attachments.first()) {
            if (isImageURL(message.attachments.first().url))
                require(message.attachments.first().url)
        } else if (args[0]) {
            if (isImageURL(args[0]))
                require(args[0])
        }
    }
}
