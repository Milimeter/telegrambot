import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'
import { PornHub } from 'pornhub.js'
import axios from 'axios'



const bot = new Telegraf(process.env.BOT_TOKEN)
const pornhub = new PornHub()





 bot.start((ctx) => ctx.reply('Welcome!'));
// bot.start((ctx) => {
//     ctx.reply(
//         'Welcome! Choose an option:',
//         Markup.keyboard([
//             ['🚀 start', 'ℹ️ description'] // First row of the keyboard
//         ]).resize()
//     );
// });

bot.hears('🚀 start', (ctx) => {
    // Handle the start command
    ctx.reply('You clicked start!');
});

bot.hears('ℹ️ description', (ctx) => {
    const descriptionText = `
    Welcome to XXXBot, your go-to tool for discovering and sharing adult content images and videos effortlessly! 🌟
    
    Features:
    🔍 Keyword Search: Instantly find your favorite explicit videos and images by entering keywords. From different genres to your favorite adult actors, the possibilities are endless.
    
    🚀 Fast and Reliable: Our powerful search engine ensures quick and reliable results, so you can access the content you want in seconds.
    
    📤 Share with Ease: Easily share your favorite videos and images with friends or in your groups directly from the bot.
    
    🔗 Direct Links: Obtain direct links to the content for convenient sharing across platforms.
    
    💼 Explore Diverse Categories: Browse through diverse categories to discover new and exciting visuals.
    
    🔒 Privacy First: Rest assured, we prioritize your privacy. Your search history is yours alone.
    
    🤖 User-Friendly Interface: Simple commands and a user-friendly interface make searching and sharing explicit content a breeze.
    
    How to Use:
    
        Type /start to initiate the bot.
        Type /video <keywords relevant to the videos you're searching for>
        Type /photo <keywords relevant to the images you're searching for>
        Choose whether you want to search for videos or images
        Enter keywords relevant to the videos or images you're searching for.
        Browse through the results and select your favorite. 
    
    Start exploring the world of adult content with XXXBot today! 🌈
    `;

    ctx.reply(descriptionText);
});

bot.help((ctx) => ctx.reply('Send me a message and I will echo it!'));

// Responding to a specific command
bot.command('echo', (ctx) => {
    let message = ctx.message.text
    ctx.reply(`message is ${message}`);
});

bot.command('sendvideos', async (ctx) => {
    const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'; // Replace with the direct URL to your video
    ctx.replyWithVideo(videoUrl);
});
bot.command('search', async (ctx) => {
    // Extracting text after the command
    const messageText = ctx.message.text;
    const args = messageText.split(' ').slice(1);
    const restOfMessage = args.join(' ');

    const result = await pornhub.searchVideo('tokyo hot')
    console.log(result.data[0])

    // Do something with restOfMessage
    ctx.reply(`You said: ${restOfMessage}`);
    await ctx.replyWithVideo(result.data[0].url);

});
bot.command('getvideos', async (ctx) => {
    const videoData = {
        title: '切ないアクメ顔が最高の美熟女ととことん',
        id: 'ph613831e20054d',
        url: 'https://www.pornhub.com/view_video.php?viewkey=ph613831e20054d',
        views: '2.9M',
        duration: '58:41',
        hd: false,
        premium: false,
        freePremium: false,
        preview: 'https://ei.phncdn.com/videos/202109/08/394332361/original/(m=eafTGgaaaa)(mh=9U6jN1BPrO_lbxgh)16.jpg'
    };

    let message = `<b>Title:</b> ${videoData.title}\n`;
    message += `<b>Duration:</b> ${videoData.duration}\n`;
    message += `<b>Views:</b> ${videoData.views}\n`;
    message += `<b>HD:</b> ${videoData.hd ? 'Yes' : 'No'}\n`;
    message += `<b>Premium:</b> ${videoData.premium ? 'Yes' : 'No'}\n`;
    message += `<b>URL:</b> <a href="${videoData.url}">Video Link</a>\n`;

    await ctx.replyWithPhoto(videoData.preview, {
        caption: message,
        parse_mode: 'HTML'
    });
    await ctx.replyWithPhoto(videoData.preview);
});

bot.command('video', async (ctx) => {
    try {
        // Extracting text after the command
        const messageText = ctx.message.text;
        const args = messageText.split(' ').slice(1);
        const restOfMessage = args.join(' ');
        console.log(restOfMessage)
        let response;
        if (restOfMessage === "") {
            response = await axios.get(`https://lust.scathach.id/xvideos/search?key=porn&page=2`);
        } else {
            response = await axios.get(`https://lust.scathach.id/xvideos/search?key=${restOfMessage}&page=2`);
        }
        const videos = response.data.data;

        // // Limit the number of videos to display
        // const maxVideos = 5;
        // for (let i = 0; i < Math.min(videos.length, maxVideos); i++) {
        //     const video = videos[i];
        //     let message = `<b>Title:</b> ${video.title}\n`;
        //     message += `<b>Duration:</b> ${video.duration}\n`;
        //     message += `<a href="${video.link}">Watch Video</a>\n`;

        //     await ctx.replyWithPhoto(video.image, {
        //         caption: message,
        //         parse_mode: 'HTML'
        //     });
        // } 

        for (let video of videos) {
            let message = `<b>Title:</b> ${video.title}\n`;
            message += `<b>Duration:</b> ${video.duration}\n`;
            message += `<a href="${video.link}">Watch Video</a>\n`;

            await ctx.replyWithPhoto(video.image, {
                caption: message,
                parse_mode: 'HTML',
            });
        }


    } catch (error) {

        console.error(error);
        ctx.reply('An error occurred while fetching videos.');


    }


});

bot.command('photo', async (ctx) => {
    try {
        // Extracting text after the command
        const messageText = ctx.message.text;
        const args = messageText.split(' ').slice(1);
        const restOfMessage = args.join(' ');
        console.log(restOfMessage)
        let response;
        if (restOfMessage === "") {
            response = await axios.get(`https://lust.scathach.id/xvideos/search?key=porn&page=2`);
        } else {
            response = await axios.get(`https://lust.scathach.id/xvideos/search?key=${restOfMessage}&page=2`);
        }

        const videos = response.data.data;
        for (let video of videos) {
            await ctx.replyWithPhoto(video.image);
        }
    } catch (error) {

        console.error(error);
        ctx.reply('An error occurred while fetching photos.');


    }


});









// bot.command('search', async (ctx) => {
// // Extracting text after the command
// const messageText = ctx.message.text;
// const args = messageText.split(' ').slice(1); // Removes the command part and keeps the rest
// const restOfMessage = args.join(' '); // Joining the rest of the message back into a string

// // Do something with restOfMessage
// // ctx.reply(`You said: ${restOfMessage}`);
// const videos = ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',]
// for (const video of videos) {
//     await ctx.replyWithVideo(video);
// }
// });

bot.catch((err, ctx) => {
    console.log(`Encountered an error for ${ctx.updateType}`, err);
});

bot.launch();



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))