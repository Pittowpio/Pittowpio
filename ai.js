const { Telegraf, Markup } = require('telegraf');
const { MongoClient } = require('mongodb');
const axios = require('axios');
const cheerio = require('cheerio');
const { PDFDocument } = require('pdf-lib');
const fetch = require('node-fetch');
const fs = require('fs');
const adminUserIds = ['1088599147', '6185944514']; // Replace with actual Telegram user IDs of the admins
// MongoDB connection string
const uri = 'mongodb+srv://hubg34917:water786@cluster0.l1sscah.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { HttpsProxyAgent } = require('https-proxy-agent'); 
const getRandomDigits = (length) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
// mongo db
const dbName = 'ok';
let db;

async function connectToMongo() {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
}

async function updateUserStats(userId) {
  try {
    const users = db.collection('users');
    const now = new Date();
    await users.updateOne(
      { _id: userId },
      { $set: { lastSeen: now }, $setOnInsert: { _id: userId, firstSeen: now }},
      { upsert: true }
    );
  } catch (err) {
    console.error('Failed to update user stats:', err);
  }
}

const bot = new Telegraf('6427186859:AAGuI7sNZRUx_sBMgqPfPE9H3GXBNqTJjds');
exports.bot = bot;


bot.use(async (ctx, next) => {
  const userId = ctx.from.id.toString();
  await updateUserStats(userId);
  return next();
});

bot.command('stats', async (ctx) => {
  try {
    const users = db.collection('users');
    const totalUsers = await users.countDocuments();
    ctx.replyWithHTML(`Total users: ${totalUsers}`);
  } catch (err) {
    console.error('Failed to fetch stats:', err);
    ctx.reply('Failed to fetch statistics.');
  }
});


//end mongo db. 

const proxyurl = 'vitalBmrvGPzQ-country-cy-session-0lw3vw85:XYAROrXN@royal.vital-proxies.com:12321'

//youtube lib
async function dyt(link) {
  const response = await axios.get(`https://cdn33.savetube.me/info?url=${link}`, {
      headers: {
        'authority': 'cdn33.savetube.me',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'origin': 'https://ytshorts.savetube.me',
        'referer': 'https://ytshorts.savetube.me/',
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      }
    });

return response.data.data.video_formats[0].url

}

const cookies = {
    'uid': '5d86d7ce1038b4d8',
    'clickAds': '18',
    'pushNotification': '53',
    '_ga': 'GA1.2.176389653.1707372863',
    '_gid': 'GA1.2.877158646.1707372863',
    'random_n': 'eyJpdiI6Im1UOCs0Mk1nTnBYcFpwMnBlRGhYdmc9PSIsInZhbHVlIjoiQmpGVlZIMVAyb29kaFlXQzVrWFV2TS9jN3BhRm1LOHJNUXM0TUhseWVrNWpRZitCZzNQbjcveTV1anRuSk8ybiIsIm1hYyI6IjkwOGI1OTdmN2I5MTgwNDU3YTVlODIxZTA2ZDY4OTU3MTgwMGUwODQ2NGUwOGFjMGExM2ZmMmZiMjhkOGMwNzUiLCJ0YWciOiIifQ%3D%3D',
    'XSRF-TOKEN': 'eyJpdiI6IktzejMzUldxOUc5aGY4VStuOUE5R0E9PSIsInZhbHVlIjoiUkxQT2xwTDVqTTRRRnpCSmxjeTFNRnd6Z2RmM1Jxb05NNi81YVd1eWhhcmlHZWxUbnhrMnc1MDZZWXVscDFFN2J2Z2tlNENrejlEbjBaZ1FtVXEzMzBnV2hEV3BFQldTZlZoT1RpUE1RdnEySFhzYzc2a0dpQ2x6SW1WZzRpMDMiLCJtYWMiOiI0N2FjZWQ1NzI1Yjg4ZGE5MjQ1Mzk2Zjk3M2MyYTgyMTczZjRlNjVlNTA5ZDY0ZDU2NjQ5ZThlODgyNTJkYTBiIiwidGFnIjoiIn0%3D',
    'sssinstagram_session': 'eyJpdiI6IkkrbWlQejZHV3l0YThvWWpvcndWckE9PSIsInZhbHVlIjoib2dCUkhmUFVzZ1ZlZXd3RHZVOHA0WUN2N3J2K2JTaUlGdGZOSXNQS1JyN3J5RGNEL3hWZFp2c1dtZkk4UG42ZzlZa1VCK0F1NUorUUx3VFVTSjRHT2tjcHVuZ1lmSkNXYVZ5VURCZEU0RnRicGh0TkVydElObXB4YldObm95bDIiLCJtYWMiOiI3N2Y3ZDZiNzdmZjVlMjFhYTk4ZDBiODVjZjdlZGI2MTA0ZWQxNDg5MzRkYmFiNTVlZDNhYmRiMjdlMzUxM2NiIiwidGFnIjoiIn0%3D',
    '_gat_UA-3524196-4': '1',
    '_ga_CN2Z3TL83Y': 'GS1.2.1707372863.1.1.1707373150.60.0.0',
};

const headers = {
    'authority': 'sssinstagram.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json;charset=UTF-8',
    'origin': 'https://sssinstagram.com',
    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    'x-xsrf-token': 'eyJpdiI6IktzejMzUldxOUc5aGY4VStuOUE5R0E9PSIsInZhbHVlIjoiUkxQT2xwTDVqTTRRRnpCSmxjeTFNRnd6Z2RmM1Jxb05NNi81YVd1eWhhcmlHZWxUbnhrMnc1MDZZWXVscDFFN2J2Z2tlNENrejlEbjBaZ1FtVXEzMzBnV2hEV3BFQldTZlZoT1RpUE1RdnEySFhzYzc2a0dpQ2x6SW1WZzRpMDMiLCJtYWMiOiI0N2FjZWQ1NzI1Yjg4ZGE5MjQ1Mzk2Zjk3M2MyYTgyMTczZjRlNjVlNTA5ZDY0ZDU2NjQ5ZThlODgyNTJkYTBiIiwidGFnIjoiIn0=',
};



// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token




//tiktok lib

async function tk(link) {

  const response = await  axios.post(link,
      new URLSearchParams({
        'url': link,
        'token': '98d26892738b39fd8e754a0049efe13616642e7864bd04fd548325f36b363c15'
      }),
      {
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'Cookie': 'PHPSESSID=f51c4d0d33329767ca989e6e3d146786; pll_language=en; _ga_H19ZQQDLXG=GS1.1.1707403933.1.0.1707403933.0.0.0; _ga=GA1.1.1839559948.1707403934; _ga_X8CH9GMY3J=GS1.1.1707403933.1.0.1707403933.0.0.0',
          'Origin': 'https://sstik.live',
          'Referer': 'https://sstik.live/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        }
      }
    );
  
  
  return  await console.log(response.data.medias[0].url)




}

//code i made 

bot.start((ctx) => {
  ctx.replyWithHTML(
    "<b>Welcome</b> 👋\n\n" +
    "Naxce ᴀɪ ʙᴏᴛ ɪꜱ ᴀ ᴄʜᴀᴛʙᴏᴛ ᴛʜᴀᴛ ᴘʀᴏᴠɪᴅᴇꜱ ᴀ ʀᴀɴɢᴇ ᴏꜰ ꜱᴇʀᴠɪᴄᴇꜱ ᴛᴏ ʜᴇʟᴘ ᴘᴇᴏᴘʟᴇ ᴍᴀɴᴀɢᴇ ᴛʜᴇɪʀ ᴅᴀʏ-ᴛᴏ-ᴅᴀʏ ᴛᴀꜱᴋꜱ. It can help you with tasks.\n\nChannel 📢 - @ChatGptChannelUp",
    Markup.inlineKeyboard([
      [Markup.button.callback('Download Social Media Content', 'download_social')],
      [Markup.button.callback('Chat Gpt', 'chat_gpt'), Markup.button.callback('Img To Pdf', 'img_to_pdf')],
      [Markup.button.callback('Wikipedia Search 🔍', 'wikipedia_search')],
      [Markup.button.callback('Text To Image 🖼', 'text_to_image')]
    ])
  );
});

// Example of handling callback for 'Download Social Media Content' button
bot.action('download_social', (ctx) => {
  ctx.editMessageText(
    "⚡️Welcome to Multi Downloader!\n\n🚀 Fastest Downloader, Download any content and Much More....!\n\nFor better experience, there are some help notes for each services👇",
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Instagram 🔸', 'instagram'),
        Markup.button.callback('Twitter 🔸', 'twitter')
      ],
      [
        Markup.button.callback('Snapchat 🔸', 'snapchat'),
        Markup.button.callback('Facebook 🔸', 'facebook')
      ],
      [
        Markup.button.callback('Tik Tok 🔸', 'tiktok'),
        Markup.button.callback('Pinterest 🔸', 'pinterest')
      ],
      [
         Markup.button.callback('YouTube 🔸', 'youtube'),
         Markup.button.callback('Other🔸', 'other')
         ], 
        [Markup.button.callback('Back 🔄', 'back_to_start')]
    ])
  );
});

// Handler to return to the start menu
bot.action('back_to_start', (ctx) => {
  ctx.editMessageText(
    "𝙬𝙚𝙡𝙘𝙤𝙢𝙚 👋\n\n" +
    "Naxce ᴀɪ ʙᴏᴛ ɪꜱ ᴀ ᴄʜᴀᴛʙᴏᴛ ᴛʜᴀᴛ ᴘʀᴏᴠɪᴅᴇꜱ ᴀ ʀᴀɴɢᴇ ᴏꜰ ꜱᴇʀᴠɪᴄᴇꜱ ᴛᴏ ʜᴇʟᴘ ᴘᴇᴏᴘʟᴇ ᴍᴀɴᴀɢᴇ ᴛʜᴇɪʀ ᴅᴀʏ-ᴛᴏ-ᴅᴀʏ ᴛᴀꜱᴋꜱ. It can help you with tasks.\n\n Channel 📢 - @ChatGptChannelUp",
    Markup.inlineKeyboard([
      [Markup.button.callback('Download Social Media Content', 'download_social')],
      [Markup.button.callback('Chat Gpt', 'chat_gpt'), Markup.button.callback('Img To Pdf', 'img_to_pdf')],
      [Markup.button.callback('Wikipedia Search 🔍', 'wikipedia_search')],
      [Markup.button.callback('Text To Image 🖼', 'text_to_image')]
    ], {parse_mode: 'HTML'})
  );
});

// Add similar handlers for each social media platform...
bot.action('text_to_image', (ctx) => {
  ctx.editMessageText(
    "<b>Welcome 👋</b>\n\nYou can convert text to images. Send the words in English and I will send you the pic you asked for.\n\n" +
    "<b>Example:</b>\n" +
    "/img Dog running in mountain", // Use backticks to allow for easy copying
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Back 🔄', 'back_to_start')
      ])
    }
  );
});

// Handler to return to the start menu
bot.action('wikipedia_search', (ctx) => {
  ctx.editMessageText(
    "<b>Welcome 👋</b>\n\n" +
    "You can search Wikipedia articles and info about particular things. It's simplified yet advanced Wikipedia search. See the usage below.\n\n" +
    "<b>Usage:</b>\n" +
    "/wk google\n\n" +
    "IT WILL PROVIDE THE INFORMATION.",
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Back 🔄', 'back_to_start')
      ])
    }
  );
});

// Handler to return to the start menu

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
  // Handle the error here
});


bot.action('chat_gpt', (ctx) => {
  ctx.editMessageText(
    "<b>Welcome 👋</b>\n\n" +
    "I'm Chat GPT, which means I'm a large language model trained using artificial intelligence technology to provide answers and engage in conversations with users on various topics and domains.\n\n" +
    "<b>How to use ❓</b>\n" +
    "/gpt what's time now in India?",
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Back 🔄', 'back_to_start')
      ])
    }
  );
});


const socialMediaActions = ['instagram', 'twitter', 'snapchat', 'facebook', 'tiktok', 'pinterest', 'youtube'];

socialMediaActions.forEach((media) => {
  bot.action(media, (ctx) => {
    const buttonName = media.charAt(0).toUpperCase() + media.slice(1); // Capitalize the first letter
    ctx.editMessageText(
      `• Welcome to the ${buttonName} Downloader section\n\n` +
      `You can download any contents from ${buttonName}\n\n` +
      `- Now send me the link 🔗.`,
      Markup.inlineKeyboard([
        Markup.button.callback('Back 🔄', 'download_social')
      ])
    );
  });
});


bot.action('img_to_pdf', (ctx) => {
  ctx.editMessageText(
    "<b>Welcome 👋</b>\n\n" +
    "You can convert images to PDF in this section. Single or multiple images.\n\n" +
    "<b>How to use ❓</b>\n\n" +
    "/startpdf - after using this command send your images.\n" +
    "/endpdf - if you sent all your images use this command. It will ask the PDF name. Then the bot will send the PDF to you.",
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Back 🔄', 'back_to_start')
      ])
    }
  );
});

// Make sure to implement /startpdf and /endpdf commands in your bot logic.

bot.command('broadcast', async (ctx) => {
  const userId = ctx.from.id.toString();
  if (adminUserIds.includes(userId)) {
    const message = ctx.message.text.substring('/broadcast'.length).trim();
    if (!message) {
      return ctx.reply('Please provide a message to broadcast.');
    }

    try {
      // Directly use the db reference to access the 'users' collection
      const usersCollection = db.collection('users');
      const usersCursor = usersCollection.find({});
      let broadcastCount = 0;

      await usersCursor.forEach(async (user) => {
        try {
          await ctx.telegram.sendMessage(user._id, message);
          broadcastCount++;
        } catch (error) {
          console.error(`Failed to send message to ${user._id}`, error);
          // Optionally handle specific errors (e.g., user has blocked the bot)
        }
      });

      ctx.reply(`Message broadcasted Code - ${broadcastCount} Success.`);
    } catch (error) {
      console.error('Failed to broadcast:', error);
      ctx.reply('Failed to broadcast the message.');
    }
  } else {
    ctx.reply('You are not authorized to use this command.');
  }
});

// code i finesh
bot.command('instadownload', async (ctx) => {
  let messageParts = ctx.message.text.split(' ');

  if (messageParts.length > 1) {
    const link = messageParts[1];
    try {
      const response = await axios.post(
        'https://sssinstagram.com/r',
        {
          'link': link,
          'token': ''
        },
        {
          headers: {
            'authority': 'sssinstagram.com',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json;charset=UTF-8',
            'cookie': 'uid=5d86d7ce1038b4d8; clickAds=18; pushNotification=53; _ga=GA1.2.176389653.1707372863; _gid=GA1.2.877158646.1707372863; random_n=eyJpdiI6Im1UOCs0Mk1nTnBYcFpwMnBlRGhYdmc9PSIsInZhbHVlIjoiQmpGVlZIMVAyb29kaFlXQzVrWFV2TS9jN3BhRm1LOHJNUXM0TUhseWVrNWpRZitCZzNQbjcveTV1anRuSk8ybiIsIm1hYyI6IjkwOGI1OTdmN2I5MTgwNDU3YTVlODIxZTA2ZDY4OTU3MTgwMGUwODQ2NGUwOGFjMGExM2ZmMmZiMjhkOGMwNzUiLCJ0YWciOiIifQ%3D%3D; XSRF-TOKEN=eyJpdiI6IktzejMzUldxOUc5aGY4VStuOUE5R0E9PSIsInZhbHVlIjoiUkxQT2xwTDVqTTRRRnpCSmxjeTFNRnd6Z2RmM1Jxb05NNi81YVd1eWhhcmlHZWxUbnhrMnc1MDZZWXVscDFFN2J2Z2tlNENrejlEbjBaZ1FtVXEzMzBnV2hEV3BFQldTZlZoT1RpUE1RdnEySFhzYzc2a0dpQ2x6SW1WZzRpMDMiLCJtYWMiOiI0N2FjZWQ1NzI1Yjg4ZGE5MjQ1Mzk2Zjk3M2MyYTgyMTczZjRlNjVlNTA5ZDY0ZDU2NjQ5ZThlODgyNTJkYTBiIiwidGFnIjoiIn0%3D; sssinstagram_session=eyJpdiI6IkkrbWlQejZHV3l0YThvWWpvcndWckE9PSIsInZhbHVlIjoib2dCUkhmUFVzZ1ZlZXd3RHZVOHA0WUN2N3J2K2JTaUlGdGZOSXNQS1JyN3J5RGNEL3hWZFp2c1dtZkk4UG42ZzlZa1VCK0F1NUorUUx3VFVTSjRHT2tjcHVuZ1lmSkNXYVZ5VURCZEU0RnRicGh0TkVydElObXB4YldObm95bDIiLCJtYWMiOiI3N2Y3ZDZiNzdmZjVlMjFhYTk4ZDBiODVjZjdlZGI2MTA0ZWQxNDg5MzRkYmFiNTVlZDNhYmRiMjdlMzUxM2NiIiwidGFnIjoiIn0%3D; _gat_UA-3524196-4=1; _ga_CN2Z3TL83Y=GS1.2.1707372863.1.1.1707373150.60.0.0',
            'origin': 'https://sssinstagram.com',
            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'x-xsrf-token': 'eyJpdiI6IktzejMzUldxOUc5aGY4VStuOUE5R0E9PSIsInZhbHVlIjoiUkxQT2xwTDVqTTRRRnpCSmxjeTFNRnd6Z2RmM1Jxb05NNi81YVd1eWhhcmlHZWxUbnhrMnc1MDZZWXVscDFFN2J2Z2tlNENrejlEbjBaZ1FtVXEzMzBnV2hEV3BFQldTZlZoT1RpUE1RdnEySFhzYzc2a0dpQ2x6SW1WZzRpMDMiLCJtYWMiOiI0N2FjZWQ1NzI1Yjg4ZGE5MjQ1Mzk2Zjk3M2MyYTgyMTczZjRlNjVlNTA5ZDY0ZDU2NjQ5ZThlODgyNTJkYTBiIiwidGFnIjoiIn0='
          }
        }
      );

      if (response.data.data.items['0'].urls[0].url) {
        ctx.telegram.sendVideo(ctx.chat.id, response.data.data.items['0'].urls[0].url, { caption: 'caption' }) .then(() => { console.log('sucusss'); })
        
      } else {
        ctx.reply('Could not find a download link for the provided URL.');
      }
    } catch (error) {
      console.error(error);
      ctx.reply('Failed to retrieve download link. Please try again later.');
    }
  } else {
    ctx.reply('Please provide a link after the /instadownload command.');
  }
});

async function downloadLink(link) {
  

  const json_data = {
    link: link,
    token: '',
  };

  
}                         


//wiki search
async function fetchWikipediaPage(searchTerm) {                                                                                                          const formattedSearchTerm = searchTerm.replace(/\s/g, '_');
  const url = `https://en.wikipedia.org/wiki/${formattedSearchTerm}`;

  try {
    const response = await axios.get(url);
    return { found: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { found: false };
    }
    throw error;
  }
}

async function searchWikipediaAPI(searchTerm) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&utf8=&format=json`;
  try {
    const response = await axios.get(apiUrl);                                                                                                              const results = response.data.query.search;
    return results.length > 0 ? results : null;
  } catch (error) {
    console.error(`An error occurred while searching Wikipedia API: ${error.message}`);
    return null;
  }
}

async function getFirstParagraph(pageData) {
  const $ = cheerio.load(pageData);
  const firstParagraph = $('#mw-content-text > div.mw-parser-output > p').not((i, el) => {
    return $(el).text().trim().length < 20 || !$(el).text().trim();
  }).first().text().trim();

  return firstParagraph;
}



bot.command('wk', async (ctx) => {
  const searchTerm = ctx.message.text.split(' ').slice(1).join(' ');
  if (!searchTerm) {
    ctx.reply('Please provide a search term. Usage: /wk <keyword>');
    return;
  }

  try {
    const page = await fetchWikipediaPage(searchTerm);
    if (page.found) {
      const firstParagraph = await getFirstParagraph(page.data);
      if (firstParagraph) {
        ctx.replyWithHTML(`<b>${firstParagraph}</b>`);
      } else {
        ctx.reply('The page was found, but no suitable text was available to display.');
      }
    } else {
      const searchResults = await searchWikipediaAPI(searchTerm);
      if (searchResults && searchResults.length > 0) {
        const inlineKeyboardMarkup = {
          inline_keyboard: searchResults.slice(0, 5).map((result, index) => [{ // Limit to 5 results for simplicity
            text: result.title,
            callback_data: `suggest_${result.title}`
          }])
        };

        ctx.reply('Page not found. Did you mean:', { reply_markup: inlineKeyboardMarkup });
      } else {
        ctx.reply('Sorry, no results found for your search term.');
      }
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    ctx.reply('An error occurred while processing your request. Please try again later.');
  }
});

// Assuming you have a function similar to searchWikipedia that returns the first paragraph
async function searchWikipedia(searchTerm) {
  try {
    const formattedSearchTerm = searchTerm.replace(/\s/g, '_');
    const url = `https://en.wikipedia.org/wiki/${formattedSearchTerm}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const firstParagraph = $('#mw-content-text > div.mw-parser-output > p').not((i, el) => {
      return $(el).text().trim().length < 20 || !$(el).text().trim();
    }).first().text().trim();

    return firstParagraph ? firstParagraph : "Content not found or not available.";
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    return 'Sorry, an error occurred while fetching the information.';
  }
}

bot.on('callback_query', async (ctx) => {
  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery || !callbackQuery.data) {
    console.log('callbackQuery or callbackQuery.data is undefined');
    await ctx.answerCbQuery("An error occurred.");
    return;
  }

  const callbackData = callbackQuery.data;

  if (typeof callbackData === 'string' && callbackData.startsWith('suggest_')) {
    const searchTerm = callbackData.replace('suggest_', '');

    // Acknowledge the callback query
    await ctx.answerCbQuery(`Searching for: ${searchTerm}...`, {show_alert: false});

    // Perform the search
    const searchResult = await searchWikipedia(searchTerm);

    // Send the search result in bold
    await ctx.replyWithHTML(`<b>${searchResult}</b>`);
  } else {
    await ctx.answerCbQuery("Received unexpected data.");
  }
});








// image to pdf

let currentSession = {};
 
bot.command('startpdf', (ctx) => {
    ctx.reply('Please send the images you want to include in your PDF. Send /endpdf when you are done.');
    currentSession[ctx.chat.id] = { images: [] };
});
 
bot.command('endpdf', (ctx) => {
    if (currentSession[ctx.chat.id] && currentSession[ctx.chat.id].images.length > 0) {
        ctx.reply("Please enter the name for your PDF file.");
    } else {
        ctx.reply("You didn't send any images. Please start again with /startpdf.");
    }
});
 

//askgpt
async function askgpt(text){
  const agent = new HttpsProxyAgent(proxyurl);
  const response =  await axios.post(
      'https://wewordle.org/gptapi/v1/web/turbo',
      {
        'messages': [
          {
            'content': text,
            'role': 'user'
          }
        ]
      },
      {
        headers: {
          'authority': 'wewordle.org',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          'origin': 'https://chat-gpt.com',
          'referer': 'https://chat-gpt.com/',
          'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        },httpsAgent: agent
      }, 
    );
  
    return response.data.message.content
  
  }



//Image Gen lib

function  img(ctx,word,imname) {

    ctx.replyWithMarkdown('*Processing your request, this may take a 30 seconds*')
  const randomDigits = getRandomDigits(8);
  var cookies = {
      'veed_ai_service_anon_id': `${randomDigits}-88f8-4166-b095-e52ade3eaff8`,
      'experiment': '28',
      'AMP_MKTG_47f1934446': 'JTdCJTlE',
      '_gcl_au': '1.1.2119791000.1707385487',
      '_gid': 'GA1.2.685068117.1707385488',
      '_fbp': 'fb.1.1707385437659.1708256082',
      'OptanonConsent': 'isGpcEnabled=0&datestamp=Thu+Feb+08+2024+15%3A14%3A13+GMT%2B0530+(India+Standard+Time)&version=202301.1.0&isIABGlobal=false&hosts=&consentId=6f9ad969-2988-4b4e-a5a1-e54a63117599&interactionCount=1&landingPath=https%3A%2F%2Fwww.veed.io%2Ftools%2Fai-image-generator&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CC0005%3A1',
      '_ga': 'GA1.2.1781829486.1707385488',
      '_ga_MDGG251D9T': 'GS1.1.1707385437.1.1.1707388457.40.0.0',
      'GCLB': 'CKzijM_1-8iUKg',
      '_gat_UA-120116680-1': '1',
      'AMP_47f1934446': 'JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjIwNzBjODhkOC1iOWY4LTQ2MzQtYTMzMi04YjE2NDRlMWIxNTglMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjJ1bmRlZmluZWQlMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzA3Mzg1NDM2MzYyJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTcwNzM4NTUzMDc1OCUyQyUyMmxhc3RFdmVudElkJTIyJTNBNSU3RA==',
  }
  ;
  
  var headers = {
      'authority': 'www.veed.io',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      // 'cookie': 'veed_ai_service_anon_id=05842546-88f8-4166-b095-e52ade6eaff9; experiment=28; AMP_MKTG_47f1934446=JTdCJTdE; _gcl_au=1.1.2119791000.1707385437; _gid=GA1.2.685068117.1707385438; _fbp=fb.1.1707385437659.1708256032; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Feb+08+2024+15%3A14%3A13+GMT%2B0530+(India+Standard+Time)&version=202301.1.0&isIABGlobal=false&hosts=&consentId=6f9ad969-2988-4b4e-a5a1-e54a63117599&interactionCount=1&landingPath=https%3A%2F%2Fwww.veed.io%2Ftools%2Fai-image-generator&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CC0005%3A1; _ga=GA1.2.1781829486.1707385438; _ga_MDGG251D9T=GS1.1.1707385437.1.1.1707385457.40.0.0; GCLB=CKzijM_1-4iUKg; _gat_UA-120116680-1=1; AMP_47f1934446=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjIwNzBjODhkOC1iOWY4LTQ2MzQtYTMzMi04YjE2NDRlMWIxNTglMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjJ1bmRlZmluZWQlMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzA3Mzg1NDM2MzYyJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTcwNzM4NTUzMDc1OCUyQyUyMmxhc3RFdmVudElkJTIyJTNBNSU3RA==',
      'origin': 'https://www.veed.io',
      'referer': 'https://www.veed.io/tools/ai-image-generator',
      'sec-ch-ua': '"Not A(Brand";v="98", "Google Chrome";v="124", "Chromium";v="124"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  };
  
  const json_data = {
    'prompt': word,
    'resolution': 'Res256',
  };
  
  
  //const proxyConfig = { host: 'gw.proxy.rainproxy.io', port: 5959, auth: { username: 'vP1aQce9O0-res-us', password: '819lkay4G5OBXPsV' } }; 
  
  
  const agent = new HttpsProxyAgent(proxyurl);
  
  
  
  
  axios.post('https://www.veed.io/api/v1/ai-images', json_data, {headers, cookies, httpsAgent: agent})
    .then(response => {
      const assetId = response.data.data[0].assetId;
      console.log(assetId);
  
   
      return axios.get(`https://www.veed.io/api/v1/asset/${assetId}`, {headers, cookies});
    })
    .then( async response => {
  
  
      console.log(response.data.data['cdnUrl'])
  
      let params = {
          'width': '640',
          'quality': '75',
      }
      
      let resv = await axios.get(response.data.data['cdnUrl'], {headers, cookies , responseType: 'arraybuffer'});
  
     
  
     
      fs.writeFile(imname, resv.data, (err) => {
        if (err) {
          console.error('Error saving the image:', err);
        } else {
          console.log('Image saved successfully.');

          bot.telegram.sendPhoto(ctx.from.id, { source: imname }, { caption: 'image generated by ai' })
        .then(() => {
            // Image sent successfully, delete it locally
            fs.unlink(imname, (err) => {
                if (err) {
                    console.error("Error deleting the image:", err);
                    return;
                }
                console.log("Image deleted successfully");
            });
        })
        .catch((error) => {
           
            console.error("Failed to send the image:", error);
        });
          
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      ctx.reply(' Ai error please try again now')
    });
  
  }




//img gen commend
bot.command('img', async (ctx) => {
  const r = getRandomDigits(6)
  let word = ctx.message.text.split(' ').slice(1).join(' ');
  console.log(word)
 
   img(ctx,word,`${r}.png`)



    
    
  }

)
    




;

    
 






bot.command('tk', async (ctx) => {

 

  


    let link = ctx.message.text.split(' ').slice(1).join(' ');
    console.log(link);
    ctx.replyWithMarkdown('*Processing your request, this may take a 30 seconds*')
    
    const response = axios.post(`https://sstik.live/wp-json/aio-dl/video-data/`,
      new URLSearchParams({
        'url': link,
        'token': '98d26892738b39fd8e754a0049efe13616642e7864bd04fd548325f36b363c15'
      }),
      {
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'Cookie': 'PHPSESSID=f51c4d0d33329767ca989e6e3d146786; pll_language=en; _ga_H19ZQQDLXG=GS1.1.1707403933.1.0.1707403933.0.0.0; _ga=GA1.1.1839559948.1707403934; _ga_X8CH9GMY3J=GS1.1.1707403933.1.0.1707403933.0.0.0',
          'Origin': 'https://sstik.live',
          'Referer': 'https://sstik.live/',

          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        }
      }
    ).then(response => {
 
ctx.replyWithVideo(response.data.medias[0].url)
      .then(() => {
        console.log('Video sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending video:', error);
        ctx.reply('Sorry, there was an error sending the video.');
      });

}) 



   


    })



//gptcommend

bot.command('gpt', async (ctx) => {



     ctx.replyWithMarkdown('*Processing your request, this may take a 10 seconds*')

    let text = ctx.message.text.split(' ').slice(1).join(' ');
    console.log(text);

    

    m = await askgpt(text)
    ctx.replyWithMarkdown(m)
    
  
})


bot.on('message', async (ctx) => {
  

  if ('photo' in ctx.message && currentSession[ctx.chat.id]) {
      const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
      const fileUrl = await ctx.telegram.getFileLink(fileId);

      // Fetch the image
      const response = await fetch(fileUrl.href);
      const imageBuffer = await response.buffer();
      currentSession[ctx.chat.id].images.push(imageBuffer);

      ctx.reply("Image received. Send more or type /endpdf to finish.");
  } else if ('text' in ctx.message && currentSession[ctx.chat.id] && currentSession[ctx.chat.id].images.length > 0) {
      const fileName = ctx.message.text;
      const pdfDoc = await PDFDocument.create();

      for (const imageBuffer of currentSession[ctx.chat.id].images) {
          const image = await pdfDoc.embedJpg(imageBuffer);
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }

      const pdfBytes = await pdfDoc.save();

      // Write the PDF to a file and send it
      const filePath = `${fileName}.pdf`;
      fs.writeFileSync(filePath, pdfBytes);
      await ctx.replyWithDocument({ source: filePath, filename: `${fileName}.pdf` });
      fs.unlinkSync(filePath); // Optionally delete the file after sending

      delete currentSession[ctx.chat.id];
  }else{

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    if (youtubeRegex.test(ctx.message.text)) {
      ctx.replyWithMarkdown('*Multi Downloader is Processing your request, this may take a 20 seconds 🖐*')
      let l = await dyt(ctx.message.text)
  
       ctx.replyWithVideo(l).then(() => {
        console.log('Video sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending video:', error);
        ctx.reply(
          "The file is too large to send!\n\nYou can download the video by clicking the button below 📲",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: 'Download 📲', url: l }]
              ]
            }
          }
        )
      });
  
     
  
  
    }else{
   


    const urlRegex = /https?:\/\/[^\s]+/;
     
  
  if (urlRegex.test(ctx.message.text)) {
      // If the message contains a URL, respond with "link"
    ctx.replyWithMarkdown('*Multi Downloader is Processing your request, this may take a 20 seconds 🖐.*')

    
    const response =  axios.post(
      'https://getindevice.com/wp-json/aio-dl/video-data/',
      new URLSearchParams({
        'url': ctx.message.text,
        'token': '24ba32221fb5c33d201cdf7eef42d4bcb7fe1fc27ef3440fffdb560f14b78bec'
      }),
      {
        headers: {
          'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'sec-ch-ua-platform': '"Windows"',
          'Referer': 'https://getindevice.com/',
          'sec-ch-ua-mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
      }
    ).then(response => {



     
    



   

       

        ctx.replyWithVideo(response.data.medias[0].url).catch(error => {
      
       
          ctx.reply(
            "The file is too large to send!\n\nYou can download the video by clicking the button below 📲",
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Download 📲', url: response.data.medias[0].url }]
                ]
              }
            }
          );
    
        }).catch(error => {
      
          console.error('Error sending video:', error);
          ctx.reply('error');
    
        })




      }
      
      
    
    


    ).catch(error => {
      
      console.error( error.code);

      if (error.code === 'ERR_BAD_REQUEST'){
       ctx.reply('Not a valid link / this socical media is not supported yet!!!');
      }
    })
    

    
  }
    
     

    


    }




}
  
  




  

 
});


connectToMongo().then(() => {
    bot.launch();
    console.log('Bot started');
}).catch(console.error);


process.on('unhandledRejection',console.error)
