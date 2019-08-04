const Discord = require("discord.js");
const client = new Discord.Client();
const weather = require("weather-js");
const token = "NDExNTczMzg4MDgwMDU0Mjgy.DV9u5g.rAXWERvjXVpBAhxT6tt-6cL8uYg";
const Wiki = require("wikijs");
const malScraper = require('mal-scraper')
const search = malScraper.search
const type = 'anime'
const query = 'sakura'
const year = 2017
const season = 'fall'
const username = 'Kylart'
const after = 25
const nbNews = 120
var yt = require("./youtube_plugin");
var youtube_plugin = new yt();
var AuthDetails = require("./auth.json");

var prefix = "!!";
var mention = "<@411573388080054282>";
var memberCount = client.users.size;
var servercount = client.guilds.size;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	// ...
});

client.login('411573388080054282');

client.on("ready", () => {
	var servers = client.guilds.array().map(g => g.name).join(',');
	console.log("--------------------------------------");
console.log('[!]Connexion en cours... \n[!]Veuillez Patientez! \n[!]Les évenements sont après !  \n[!]Les préfix actuels:  ' + prefix + "\n[!]Mentions = " + mention + "\n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);
});

client.on('message', message => {
	if (message.content === ("Ohayo")){
	message.reply('Ohayo!');
} else if (message.content.includes('Does it feel good?')) {
    message.reply('Ah! ');
} else if (message.content.includes('tho tt')) {
    message.reply('kk took screenshots ');
} else if (message.content.includes('gone')) {
    message.react('🦀');;
} else if (message.content.includes('who ree')) {
    message.react('606175993886933020');
} else if(message.content.startsWith('!botname')){
	client.user.setUsername(message.content.substr(9));
} else if (message.content === "!stats") {
	let m = " ";
	m += 'Il y a actuellement  ${message.guild.channels.size} channels sur ce serveur \n';
	m += 'Je suis en compagnie de ${message.guild.members.size} membres';
	m += 'Je suis présent dans ${client.guild.size} serveurs \n';
	message.author.sendMessage(m).catch(console.log); 
} 
else if (message.content.startsWith("!méteo")){
    var location = message.content.substr(6);
    var unit = "C";
    
    try {
        weather.find({search: location, degreeType: unit}, function(err, data) {
            if(err) {
                console.log(Date.now(), "DANGER", "Je ne peux pas trouver d'informations pour la méteo de " + location);
                message.reply("\n" + "Je ne peux pas trouver d'informations pour la méteo de " + location);
            } else {
                data = data[0];
               console.log("**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
               message.reply("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
            }
        });
    } catch(err) {
        console.log(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
        message.reply("Idk pourquoi c'est cassé tbh :(");
        }
    }
else if (message.content.startsWith("!wiki")){
            if(!message.content.substr(5)) {
                console.log(Date.now(), "DANGER", "Vous devez fournir un terme de recherche.");
                message.reply("Vous devez fournir un terme de recherche.");
                return;
            }
            var wiki = new Wiki.default();
            wiki.search(message.content.substr(5)).then(function(data) {
                if(data.results.length==0) {
                    console.log(Date.now(), "DANGER","Wikipedia ne trouve pas ce que vous avez demandé : " + message.content.substr(5));
                    message.reply("Je ne peux pas trouver ce que vous voulez sur Wikipedia, cherche encore connard!");
                    return;
                }
                wiki.page(data.results[0]).then(function(page) {
                    page.summary().then(function(summary) {
                        if(summary.indexOf(" may refer to:") > -1 || summary.indexOf(" may stand for:") > -1) {
                            var options = summary.split("\n").slice(1);
                            var info = "Selectionnez une option parmi celles-ci :";
                            for(var i=0; i<options.length; i++) {
                                info += "\n\t" + i + ") " + options[i];
                            }
                            message.reply(info);
                            selectMenu(message.channel, message.author.id, function(i) {
                                commands.wiki.process(Client, message, options[i].substring(0, options[i].indexOf(",")));
                            }, options.length-1);
                        } else {
                            var sumText = summary.split("\n");
                            var count = 0;
                            var continuation = function() {
                                var paragraph = sumText.shift();
                                if(paragraph && count<3) {
                                    count++;
                                    message.reply(message.channel, paragraph, continuation);
                                }
                            };
                            message.reply("**Trouvé " + page.raw.fullurl + "**", continuation);
                        }
                    });
                });
            }, function(err) {
                console.log(Date.now(), "ERREUR","Impossible de se connecter à Wikipédia");
                message.reply("Uhhh...ça a tourné mal! :(");
            });
        
} else if (message.content.startsWith('!youtube')){
youtube_plugin.respond(message.content, message.channel , client);
}
});

client.login(token)


// Helpers for types, genres and list you might need for your research
console.log(search.helpers)

search.search(type, {
  // All optionnals, but all values must be in their relative search.helpers.availableValues.
  maxResults: 100, // how many results at most (default: 50)
  has: 250, // If you already have results and just want what follows it, you can say it here. Allows pagination!

  term: 'Sakura', // search term
  type: 0, // 0-> none, else go check search.helpers.availableValues.type
  status: 0, // 0 -> none, else go check https://github.com/Kylart/MalScraper/blob/master/README.md#series-statuses-references or search.helpers.availableValues.status
  score: 0, // 0-> none, else go check search.helpers.availableValues.score
  producer: 0, // go check search.helpers.availableValue.p.<type>.value
  rating: 0, // 0-> none, else go check search.helpers.availableValues.r
  startDate: {
    day: 12,
    month: 2,
    year: 1990
  },
  endDate: {
    day: 12,
    month: 2,
    year: 2015
  },
  genreType: 0, // 0 for include genre list, 1 for exclude genre list
  genres: [1] // go check search.helpers.availableValues.genres.<type>.value
})
  .then(console.log)
  .catch(console.error)
malScraper.getResultsFromSearch(query)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
malScraper.getSeason(year, season)
  // `data` is an object containing the following keys: 'TV', 'TVNew', 'TVCon', 'OVAs', 'ONAs', 'Movies' and 'Specials'
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
malScraper.getSeason(year, season, type)
  // `data` is an array containing all the 'Seasonal anime release data objects' for the given type
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
// Get you an object containing all the entries with status, score... from this user's watch list
malScraper.getWatchListFromUser(username, after, type)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  malScraper.getNewsNoDetails(nbNews)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
malScraper.getEpisodesList({
    name: 'Sakura Trick',
    id: 20047
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
  
  //Alternatively, if you only have the name and not the id, you can let the method fetch the id on the way at the cost of being slower
  
const name = "Sakura Trick"
  
malScraper.getEpisodesList(name)
    .then((data) => console.log(data))
    .catch((err) => console.log(err))