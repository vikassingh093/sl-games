var WebSocket = require('ws').Server;
const http = require('http');
const url = require('url');
var fs = require('fs');

var Player = require('./Player.js').Player;
var RedisBridge = require('./RedisBridge').RedisBridge;
var GameRoomMF = require('./GameRoomMF.js').GameRoomMF;
var GameRoomALD = require('./GameRoomALD.js').GameRoomALD;
var GameRoomZB = require('./GameRoomZB.js').GameRoomZB;
var GameRoomKK = require('./GameRoomKK.js').GameRoomKK;
var GameRoomLS = require('./GameRoomLS.js').GameRoomLS;
var GameRoomMTY = require('./GameRoomMTY.js').GameRoomMTY;
var GameRoomTD = require('./GameRoomTD.js').GameRoomTD;
var GameRoomWC = require('./GameRoomWC.js').GameRoomWC;
var GameRoomCS = require('./GameRoomCS.js').GameRoomCS;
var GameRoomKC = require('./GameRoomKC.js').GameRoomKC;

var sendWSMessage = require('./Network').sendWSMessage;

var serverConfig = JSON.parse(fs.readFileSync(__dirname + '/../../public/arcade_config.json', 'utf8'));

var MFNAME = "MonsterFrenzy";
var ALADNAME = "AladdinAdventure";
var ZBNAME = "FishHunterGhost";
var KKNAME = "FishHunterKingKong";
var LSNAME = "FishHunterLuckyShamrock";
var MTYNAME = "FishFortuneKings";
var TDNAME = "FishHunterThunderDragon";
var WCNAME = "FishWonderCat";
var CSNAME = "FishCircus";
var KCNAME = "FishKingOfCrab";

const mysql_tools = require('./mysql_tools');
const { OddGenerator } = require('./OddGenerator.js');
const { BulletCounterManager } = require('./BulletCounterManager.js');
const { Common } = require('./Common.js');


var dbconn = require('./DBConn').dbconn;
var getRandomInt = require('./utils.js').getRandomInt;

var wss_auth = new WebSocket({noServer: true});
var wss_game = new WebSocket({noServer: true});
playerOnline = 0;
var server;
if(serverConfig.ssl)
{	
    var privateKey = fs.readFileSync('../ssl/key.key', 'utf8');
    var certificate = fs.readFileSync('../ssl/crt.crt', 'utf8');

    var credentials = { key: privateKey, cert: certificate };
    var https = require('https');

    server  = https.createServer(credentials);
}
else
{
    server = http.createServer();
}

catchedFishes = {};
bulletCounterManager = new BulletCounterManager();
Common.gameList.forEach(gameType => {
    bulletCounterManager.addBulletCounter(gameType);    
});

class GameRoomManager{
    constructor(){
        this.monstersFrenzyRooms = [];
        this.aladdinAdventureRooms = [];
        this.fishHunterGhostRooms = [];
        this.fishHunterKingKongRooms = [];
        this.fishHunterLuckyShamrockRooms = [];
        this.fishFortuneKingsRooms = [];
        this.fishHunterThunderDragonRooms = [];
        this.fishWonderCatRooms = [];
        this.fishCircusRooms = [];
        this.fishKingOfCrabRooms = [];
    }

    addClient(player)
    {
        var targetRooms;
        var gameName = player.gameName;
        if(gameName == MFNAME)
        {
            targetRooms = this.monstersFrenzyRooms;
        }
        else if(gameName == ALADNAME)
        {
            targetRooms = this.aladdinAdventureRooms;
        }
        else if(gameName == ZBNAME)
        {
            targetRooms = this.fishHunterGhostRooms;
        }
        else if(gameName == KKNAME )
        {
            targetRooms = this.fishHunterKingKongRooms;
        }
        else if(gameName == LSNAME )
        {
            targetRooms = this.fishHunterLuckyShamrockRooms;
        }
        else if(gameName == MTYNAME)
        {
            targetRooms = this.fishFortuneKingsRooms;
        }
        else if(gameName == TDNAME)
        {
            targetRooms = this.fishHunterThunderDragonRooms;
        }
        else if(gameName == WCNAME)
        {
            targetRooms = this.fishWonderCatRooms;
        }
        else if(gameName == CSNAME)
        {
            targetRooms = this.fishCircusRooms;
        }
        else if(gameName == KCNAME)
        {
            targetRooms = this.fishKingOfCrabRooms;
        }
        var foundAvailableSeatRoom = false;
        for(var i = 0; i < targetRooms.length; i++)
        {
            var gameRoom = targetRooms[i];
            if(gameRoom.clients.length < 4/* && gameRoom.shop_id == player.shop_id*/)
            {
                foundAvailableSeatRoom = true;
                gameRoom.addClient(player);
                player.room = gameRoom;
                break;
            }
        }

        if(!foundAvailableSeatRoom)
        {
            //all rooms are full, need to create a new room
            var room;
            if(gameName == MFNAME)
            {
                room = new GameRoomMF();
                this.monstersFrenzyRooms.push(room);                
            }
            else if(gameName == ALADNAME)
            {
                room = new GameRoomALD();
                this.aladdinAdventureRooms.push(room);
            }
            else if(gameName == ZBNAME)
            {
                room = new GameRoomZB();
                this.fishHunterGhostRooms.push(room);
            }
            else if(gameName == KKNAME)
            {
                room = new GameRoomKK();
                this.fishHunterKingKongRooms.push(room);
            }
            else if(gameName == LSNAME)
            {
                room = new GameRoomLS();
                this.fishHunterLuckyShamrockRooms.push(room);
            }
            else if(gameName == MTYNAME)
            {
                room = new GameRoomMTY();
                this.fishFortuneKingsRooms.push(room);
            }
            else if(gameName == TDNAME)
            {
                room = new GameRoomTD();
                this.fishHunterThunderDragonRooms.push(room);
            }
            else if(gameName == WCNAME)
            {
                room = new GameRoomWC();
                this.fishWonderCatRooms.push(room);
            }
            else if(gameName == CSNAME)
            {
                room = new GameRoomCS();
                this.fishCircusRooms.push(room);
            }
            else if(gameName == KCNAME)
            {
                room = new GameRoomKC();
                this.fishKingOfCrabRooms.push(room);
            }
            room.shop_id = player.shop_id;
            room.addClient(player);    
            player.room = room;        
        }
    }

    removeClient(player)
    {
        var room = player.room;
        if(room == undefined)
            return;
        var targetRooms;
        if(player.gameName == MFNAME)
            targetRooms = this.monstersFrenzyRooms;
        else if(player.gameName == ALADNAME)
            targetRooms = this.aladdinAdventureRooms;
        else if(player.gameName == ZBNAME)
            targetRooms = this.fishHunterGhostRooms;
        else if(player.gameName == KKNAME)
            targetRooms = this.fishHunterKingKongRooms;
        else if(player.gameName == LSNAME)
            targetRooms = this.fishHunterLuckyShamrockRooms;
        else if(player.gameName == MTYNAME)
            targetRooms = this.fishFortuneKingsRooms;
        else if(player.gameName == TDNAME)
            targetRooms = this.fishHunterThunderDragonRooms;
        else if(player.gameName == WCNAME)
            targetRooms = this.fishWonderCatRooms;
        else if(player.gameName == CSNAME)
            targetRooms =  this.fishCircusRooms;
        else if(player.gameName == KCNAME)
            targetRooms =  this.fishKingOfCrabRooms;

        room.removeClient(player);

        if(room.clients.length == 0)
        {            
            setTimeout(() => {
                if(room.clients.length == 0)
                {
                    for(var i = 0; i < targetRooms.length; i++)
                    {
                        if(targetRooms[i] == room)
                        {                            
                            clearInterval(room.intervalID);
                            targetRooms.splice(i, 1);
                            room = null;
                            break;
                        }
                    }
                }
            }, 60000 * 5);            
        }
    }
}

function loadFishInfo()
{
    gAllFishInfo = JSON.parse(fs.readFileSync(__dirname + '/arcade_data/fish.json', 'utf8'))[0];
    gAllFishInfo = Object.keys(gAllFishInfo).map((key) => {gAllFishInfo[key].id = parseInt(key); return gAllFishInfo[key];});

    for(var i = 0; i < 11; i++)
    {
        var index = (i+1) + "";
        index = index.padStart(2, '0');
        var fishDataList = JSON.parse(fs.readFileSync(__dirname + '/arcade_data/tide' + index +'.json', 'utf8'));
        gTides.push({
            tideId: "TIDE_" + index + ".json",
            cnt: fishDataList.length,
            fishType: 400 + i,
            fishDataLst: fishDataList
        });
    }
    var position = JSON.parse('{"sys":"fish","cmd":"f1","data":{"11":[{"1":2015,"3":10,"2":2,"5":252,"4":67,"7":0,"6":0,"9":236,"8":6,"16":null},{"1":2014,"3":63,"2":3,"5":8,"4":18,"7":0,"6":0,"9":234,"8":1,"16":null},{"1":2013,"3":15,"2":3,"5":112,"4":36,"7":0,"6":0,"9":234,"8":1,"16":null},{"1":2024,"3":74,"2":2,"5":257,"4":37,"7":0,"6":0,"9":237,"8":6,"16":null},{"1":2021,"3":60,"2":3,"5":109,"4":60,"7":0,"6":0,"9":236,"8":1,"16":null},{"1":2022,"3":38,"2":3,"5":9,"4":96,"7":0,"6":0,"9":236,"8":1,"16":null},{"1":2023,"3":71,"2":15,"5":158,"4":33,"7":0,"6":0,"9":236,"8":1,"16":null},{"1":2002,"3":49,"2":12,"5":41,"4":60,"7":0,"6":0,"9":230,"8":1,"16":null},{"1":2003,"3":64,"2":77,"5":294,"4":10,"7":0,"6":8,"9":231,"8":1,"16":null},{"1":2031,"3":15,"2":18,"5":20,"4":45,"7":0,"6":0,"9":240,"8":1,"16":null},{"1":2030,"3":3,"2":25,"5":150,"4":64,"7":0,"6":0,"9":237,"8":1,"16":null},{"1":2001,"3":43,"2":12,"5":36,"4":67,"7":0,"6":0,"9":229,"8":1,"16":null},{"1":2006,"3":16,"2":11,"5":88,"4":39,"7":0,"6":0,"9":231,"8":1,"16":null},{"1":2007,"3":29,"2":2,"5":345,"4":62,"7":0,"6":0,"9":234,"8":6,"16":null},{"1":2004,"3":92,"2":12,"5":198,"4":60,"7":0,"6":0,"9":231,"8":1,"16":null},{"1":2005,"3":21,"2":10,"5":162,"4":82,"7":0,"6":0,"9":231,"8":1,"16":null}],"timestamp":1632799714,"15":[],"14":2002}}');
    samplePoints = position.data[11].map((element) => ({
            x: element[3],
            y: element[4],
            o: element[5]
        })       
    );
    position = JSON.parse('{"sys":"fish","cmd":"f1","data":{"11":[{"1":2032,"3":68,"2":0,"5":140,"4":21,"7":0,"6":0,"9":242,"8":14,"16":null},{"1":2046,"3":51,"2":1,"5":354,"4":5,"7":0,"6":0,"9":242,"8":6,"16":null},{"1":2052,"3":47,"2":10,"5":21,"4":4,"7":0,"6":0,"9":242,"8":1,"16":null},{"1":2053,"3":36,"2":11,"5":333,"4":55,"7":0,"6":0,"9":242,"8":1,"16":null},{"1":2054,"3":69,"2":14,"5":130,"4":6,"7":0,"6":0,"9":242,"8":1,"16":null},{"1":2055,"3":50,"2":15,"5":158,"4":2,"7":0,"6":0,"9":242,"8":1,"16":null}],"10":"11","15":[],"14":2002,"timestamp":1632799714}}');    
    samplePoints = samplePoints.concat(position.data[11].map((element) => ({
            x: element[3],
            y: element[4],
            o: element[5]
        })       
    ));
    position = JSON.parse('{"sys":"fish","cmd":"f1","data":{"11":[{"1":3445,"3":5,"2":9,"5":346,"4":81,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":3444,"3":58,"2":11,"5":45,"4":24,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":3447,"3":3,"2":13,"5":63,"4":93,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":99999,"3":45,"2":116,"5":130,"4":42,"7":0,"6":16,"9":672,"8":1,"16":null},{"1":3446,"3":83,"2":9,"5":191,"4":2,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":3441,"3":32,"2":7,"5":218,"4":62,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":3440,"3":62,"2":7,"5":260,"4":60,"7":0,"6":0,"9":676,"8":1,"16":null},{"1":3438,"3":32,"2":7,"5":359,"4":72,"7":0,"6":0,"9":674,"8":1,"16":null},{"1":3439,"3":96,"2":7,"5":235,"4":40,"7":0,"6":0,"9":675,"8":1,"16":null},{"1":3431,"3":42,"2":2,"5":18,"4":26,"7":0,"6":0,"9":673,"8":6,"16":null},{"1":3437,"3":36,"2":2,"5":18,"4":24,"7":0,"6":1,"9":673,"8":1,"16":null},{"1":3443,"3":48,"2":11,"5":235,"4":20,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":3442,"3":51,"2":7,"5":59,"4":96,"7":0,"6":0,"9":678,"8":1,"16":null},{"1":3429,"3":43,"2":15,"5":249,"4":31,"7":0,"6":0,"9":666,"8":1,"16":null},{"1":3423,"3":58,"2":1,"5":49,"4":22,"7":0,"6":0,"9":666,"8":6,"16":null}],"timestamp":1630640973,"15":[],"14":2004}}');    
    samplePoints = samplePoints.concat(position.data[11].map((element) => ({
            x: element[3],
            y: element[4],
            o: element[5]
        })       
    ));
    position = JSON.parse('{"sys":"fish","cmd":"f1","data":{"11":[{"1":3448,"3":49,"2":35,"5":192,"4":31,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3449,"3":42,"2":47,"5":157,"4":19,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3450,"3":53,"2":47,"5":103,"4":11,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3451,"3":84,"2":47,"5":148,"4":100,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3452,"3":21,"2":47,"5":66,"4":45,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3453,"3":75,"2":47,"5":173,"4":64,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3454,"3":75,"2":47,"5":117,"4":13,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3455,"3":68,"2":48,"5":172,"4":4,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3456,"3":57,"2":48,"5":123,"4":36,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3457,"3":44,"2":48,"5":331,"4":82,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3458,"3":22,"2":48,"5":304,"4":95,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3459,"3":12,"2":48,"5":337,"4":2,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3460,"3":41,"2":48,"5":290,"4":85,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3461,"3":57,"2":1,"5":7,"4":66,"7":0,"6":0,"9":679,"8":6,"16":null},{"1":3467,"3":76,"2":11,"5":301,"4":72,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3468,"3":85,"2":11,"5":27,"4":16,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3469,"3":37,"2":11,"5":189,"4":70,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3470,"3":46,"2":9,"5":289,"4":16,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3471,"3":46,"2":9,"5":65,"4":64,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3472,"3":17,"2":9,"5":77,"4":34,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3473,"3":52,"2":14,"5":342,"4":81,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3474,"3":69,"2":15,"5":235,"4":43,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3475,"3":97,"2":18,"5":322,"4":60,"7":0,"6":0,"9":679,"8":1,"16":null}],"10":"11","15":[],"14":2004,"timestamp":1630640973}}');    
    samplePoints = samplePoints.concat(position.data[11].map((element) => ({
            x: element[3],
            y: element[4],
            o: element[5]
        })       
    ));
    position = JSON.parse('{"sys":"fish","cmd":"f1","data":{"11":[{"1":3448,"3":49,"2":35,"5":192,"4":31,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3449,"3":42,"2":47,"5":157,"4":19,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3450,"3":53,"2":47,"5":103,"4":11,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3451,"3":84,"2":47,"5":148,"4":100,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3452,"3":21,"2":47,"5":66,"4":45,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3453,"3":75,"2":47,"5":173,"4":64,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3454,"3":75,"2":47,"5":117,"4":13,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3455,"3":68,"2":48,"5":172,"4":4,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3456,"3":57,"2":48,"5":123,"4":36,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3457,"3":44,"2":48,"5":331,"4":82,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3458,"3":22,"2":48,"5":304,"4":95,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3459,"3":12,"2":48,"5":337,"4":2,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3460,"3":41,"2":48,"5":290,"4":85,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3461,"3":57,"2":1,"5":7,"4":66,"7":0,"6":0,"9":679,"8":6,"16":null},{"1":3467,"3":76,"2":11,"5":301,"4":72,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3468,"3":85,"2":11,"5":27,"4":16,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3469,"3":37,"2":11,"5":189,"4":70,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3470,"3":46,"2":9,"5":289,"4":16,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3471,"3":46,"2":9,"5":65,"4":64,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3472,"3":17,"2":9,"5":77,"4":34,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3473,"3":52,"2":14,"5":342,"4":81,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3474,"3":69,"2":15,"5":235,"4":43,"7":0,"6":0,"9":679,"8":1,"16":null},{"1":3475,"3":97,"2":18,"5":322,"4":60,"7":0,"6":0,"9":679,"8":1,"16":null}],"10":"11","15":[],"14":2004,"timestamp":1630640973}}');    
    samplePoints = samplePoints.concat(position.data[11].map((element) => ({
            x: element[3],
            y: element[4],
            o: element[5]
        })       
    ));
    
    gFishMaxSize = [
        {
            fishTypeId: 0,
            maxSize: 14
        },
        {
            fishTypeId: 1,
            maxSize: 7
        },
        {
            fishTypeId: 2,
            maxSize: 15
        },
        {
            fishTypeId: 3,
            maxSize: 2
        },
        {
            fishTypeId: 4,
            maxSize: 1
        },
        {
            fishTypeId: 5,
            maxSize: 1
        },
        {
            fishTypeId: 6,
            maxSize: 1
        },
        {
            fishTypeId: 7,
            maxSize: 1
        },
        {
            fishTypeId: 8,
            maxSize: 1
        },
        {
            fishTypeId: 9,
            maxSize: 1
        },
        {
            fishTypeId: 10,
            maxSize: 1
        },
        {
            fishTypeId: 11,
            maxSize: 1
        },
        {
            fishTypeId: 12,
            maxSize: 1
        },
        {
            fishTypeId: 13,
            maxSize: 1
        },
        {
            fishTypeId: 14,
            maxSize: 1
        },
        {
            fishTypeId: 15,
            maxSize: 1
        },
        {
            fishTypeId: 16,
            maxSize: 1
        },
        {
            fishTypeId: 17,
            maxSize: 1
        },
        {
            fishTypeId: 18,
            maxSize: 1
        },
    ];

    gAllFishInfo.forEach(element => {
        element.maxOdds = element.odds;
        element.fishType = element.id;
        if(element.id >= 0 && element.id <= 18 || element.id == 47 || element.id == 48)
        {
            switch(element.id)
            {
                case 0:
                    element.prizeRatio = 20;
                    break;
                case 1:
                    element.prizeRatio = 15;
                    break;
                case 2:
                    element.prizeRatio = 12;
                    break;
                case 3:
                    element.prizeRatio = 10;
                    break;
                case 4:
                    element.prizeRatio = 8;
                    break;
                case 5:
                    element.prizeRatio = 7;
                    break;
                case 6:
                    element.prizeRatio = 6;
                    break;
                case 7:
                case 8:
                    element.prizeRatio = 5;
                    break;
                case 9:
                case 10:
                case 11:
                    element.prizeRatio = 5;
                    break;
                case 12:                    
                    element.prizeRatio = 4;
                    break;
                case 13:
                case 14:
                case 15:
                    element.maxOdds = 30;
                    element.prizeRatio = 5;
                    break;
                case 16:
                    element.maxOdds = 60;
                    element.prizeRatio = 4;
                    break;
                case 17:
                    element.maxOdds = 100;
                    element.prizeRatio = 3;
                    break;
                case 18:
                    element.odds = 100;
                    element.maxOdds = 100;
                    element.prizeRatio = 3;
                    break;
                case 47:
                    element.prizeRatio = 20;
                case 48:
                    element.prizeRatio = 15;
                    break;
            }
            element.fishTypeGroup = 'normal';
            normalFishFormat.push(element);
        }
        else if(element.id >= 200 && element.id <= 210)
        {
            element.prizeRatio = 3;
            element.fishTypeGroup = 'normal';
            vortexFishFormat.push(element);
        }
        else if(element.id >= 300 && element.id <= 309)
        {
            element.prizeRatio = 3;
            element.fishTypeGroup = 'normal';
            lightingChainFormat.push(element);
        }
        else if(element.id == 22 || element.id == 23 || element.id == 34 || element.id == 77 || element.id == 79 ) //skill fish
        {
            /**
             * skill fishes
             * 22: laser crab feature1
             * 23: drill crab feature1
             * 34: bomb crab feature1
             * 77: wheel crab feature1
             * 79: hammer crab feature1             
             */
            
            if(element.id == 22)
                element.prizeRatio = 7;
            else if(element.id == 23)
                element.prizeRatio = 10;
            else if(element.id == 34)
                element.prizeRatio = 7;
            else if(element.id == 77)
                element.prizeRatio = 7;
            else if(element.id == 79)
                element.prizeRatio = 7;
            element.fishTypeGroup = 'skill';
            skillFishFormat.push(element);
        }
    });
}

function initRedis()
{
    redisBridge = new RedisBridge();
}

function startGameServer()
{
    initRedis();
    const roomManager = new GameRoomManager();    
    var oddGenerator = new OddGenerator();
    wss_game.on('connection', (ws, req) => {
        ws.on('close', async (error)=>{
            if(ws.player != null)
            {
                console.log("disconnecting player: " + ws.player.userId + " error: " + error);

                //save player data in redis cache to db
                redisBridge.synchronizePlayerToDB(ws.player);
                roomManager.removeClient(ws.player);
            }
        });
        ws.on('message', async (message) =>
        {
            try
            {
                message = message.toString().replace(':::', '');
                var param = JSON.parse(message);
                var gameData = param.gameData;
                // console.log("game message: " + message);
                var response = null;
                var player;                
                if(gameData.cmd != 'pin' && gameData.cmd != 'jp' && gameData.cmd != 'alive' && gameData.cmd != 'auth')
                {
                    player = ws.player;                    
                }
                var isResponseSent = false;
                switch(gameData.cmd) {
                    case 'pin':
                        response = {
                            data: {
                                result: 0
                            },
                            ret: gameData.cmd,
                            sn: gameData.sn,
                            sys: gameData.sys
                        }                    
                        break;
                    case 'alive':
                    case 'jp':
                        response = {
                            data: {
                                data: {
                                    jp_rate: "0.000001",
                                    exchange_rate: 0.01,
                                    jp1: 126473915000,
                                    jp0: 529236370000,
                                    jp2: 2267000000,
                                    jp3: 32283975000
                                },
                                result: "0"
                            },
                            sys: "jp",
                            sn: gameData.sn,
                            ret: gameData.cmd
                        }
                        break;
                    case 'auth':
                        var ark_id = gameData.data.ark_id;
                        var ark_token = gameData.data.ark_token;
                        var userInfo = await mysql_tools.sendQuery(dbconn, "SELECT A.id, A.balance, A.shop_id, A.summon, A.freeze, B.percent, B.is_demo, B.base_url FROM w_users A LEFT JOIN w_shops B ON A.shop_id = B.id WHERE A.`username` = ?", [ ark_id ]);
                        if(userInfo.length > 0)
                        {
                            var balance = userInfo[0]['balance'] * 100;
                            var rtp = userInfo[0]['percent'];
                            rtp = redisBridge.percent; //universal rtp
                            var player = new Player(ark_id, balance, false);
                            player.baseUrl = userInfo[0]['base_url'];
                            player.shop_id = 0;//to use universal rtp, make shop id as 0,  /*userInfo[0]['shop_id'];*/
                            player.real_shop_id = userInfo[0]['shop_id'];
                            if(userInfo[0]['is_demo'] == 1)
                            {
                                player.shop_id = userInfo[0]['shop_id']; //make demo accounts use their bank
                                player.is_demo = 1;
                            }
                            else
                            {
                                player.is_demo = 0;
                            }
                            player.socket = ws;
                            player.rtp = rtp;
                            player.id = userInfo[0]['id']
                            player.summon = userInfo[0]['summon'];
                            player.freeze = userInfo[0]['freeze'];
                            ws.player = player;                            
                        }
                        response = {
                            data : {
                                'status': 0
                            },
                            ret: gameData.cmd,
                            sn: gameData.sn
                        };
                        console.log("userId <" + ark_id + "> is connected to game server");
                        break;
                    case 'PlayerJoin':
                        if(req.url.includes(MFNAME))
                        {   
                            player.gameName = MFNAME;
                        }
                        else if(req.url.includes(ALADNAME))
                        {
                            player.gameName = ALADNAME;   
                        }
                        else if(req.url.includes(ZBNAME))
                        {
                            player.gameName = ZBNAME;
                        }
                        else if(req.url.includes(KKNAME))
                        {
                            player.gameName = KKNAME;
                        }
                        else if(req.url.includes(LSNAME))
                        {
                            player.gameName = LSNAME;
                        }
                        else if(req.url.includes(MTYNAME))
                        {
                            player.gameName = MTYNAME;
                        }
                        else if(req.url.includes(TDNAME))
                        {
                            player.gameName = TDNAME;
                        }
                        else if(req.url.includes(WCNAME))
                        {
                            player.gameName = WCNAME;
                        }
                        else if(req.url.includes(CSNAME))
                        {
                            player.gameName = CSNAME;
                        }
                        else if(req.url.includes(KCNAME))
                        {
                            player.gameName = KCNAME;
                        }
                        roomManager.addClient(player);

                        response = {
                            data: {
                                data: {
                                    itemEnable: false,
                                    CannonBetRange: [11,11,11,12,12,12,21,21,21,22,22,22,31,31,31,32,32,32,32,32,32,32,32],
                                    eventInfo: {
                                        "900005": {},
                                        "900004": {}
                                    },
                                    highRollerBetRange: [20,30,40,50,60,70,80,90,100,150,200,250,300,350,400,450,500],
                                    highRollerRoomNum: 0,
                                    HighRollerTable: [],
                                    keepSeat: {},
                                    maxGate: 3000000000,
                                    minGate: 0,
                                    normalBetRange: [5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,150,200,250,300,350,400,450,500],
                                    normalRoomNum: 6,
                                    NormalTable:[
                                        {
                                            iTableID: 1,
                                            ArraySeat: player.room.seats
                                        },
                                        {
                                            iTableID: 2,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 3,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 4,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 5,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 6,
                                            ArraySeat: [0,0,0,0]
                                        },
                                    ],
                                    ratio: 1,                                    
                                }
                            },
                            ret: "PlayerJoin",
                            sn: gameData.sn,
                            sys: "kiosk"
                        }                           
                        if(player.gameName == TDNAME || player.gameName == MTYNAME || player.gameName == WCNAME || player.gameName == CSNAME || player.gameName == KCNAME)    
                            response.data.data.cannonEnable = {Scale: true,MultipleScale: true};
                        break;
                    case 'JoinTable':
                        response = {
                            cmd: 'join',
                            data: {
                                ark_id: player.userId
                            }
                        }
                        sendWSMessage(ws, response);
                        

                        response = {
                            cmd: 'join_table',
                            data: {
                                game_id: 80062834,
                                player_id: player.userId,
                                seat: player.seatId,
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            sys: 'game'
                        };
                        sendWSMessage(ws, response);
                        response = {
                            data: {
                                data: {
                                    HighRollerTable: null,
                                    result: 0,
                                    seat_id: player.seatId,
                                    table_id: 1,
                                    NormalTable: [
                                        {
                                            ArraySeat: player.room.seats,
                                            iTableID: 1
                                        },
                                        {
                                            iTableID: 2,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 3,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 4,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 5,
                                            ArraySeat: [0,0,0,0]
                                        },
                                        {
                                            iTableID: 6,
                                            ArraySeat: [0,0,0,0]
                                        }
                                    ]
                                }
                            },
                            ret: 'JoinTable',
                            sn: gameData.sn,
                            sys: 'kiosk'
                        }
                        break;
                    case 'init_game':
                        var bgId = player.room.getBigSceneId();                        
                        response = {
                            data: {
                                bg: bgId,
                                event: player.room.getSceneId(), 
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'init_game',
                            sys: 'game'
                        }
                        break;                
                    case 'init_player':
                        response = {
                            cmd: 'init_player',
                            data: {
                                bet_list: [5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,150,200,250,300,350,400,450,500],
                                bet_type: 0,
                                bet_value: player.bet_value,
                                character: null,
                                coin: 0,
                                entries: player.balance,
                                id: player.userId,
                                lv: null,
                                name: null,
                                nick_name: "",
                                // equip_avatar: "",
                                // equip_avatar_frame: "",
                                seat: player.seatId,
                                timestamp: parseInt(new Date().getTime()/1000),
                                vip_lv: null,
                                weapon: 0,
                                winning: 0
                            }
                        }
                        player.room.startRoom();
                        player.initialized = true;
                        break;
                    case 'get_item_info':
                        response = {
                            data: {
                                MF100001: {
                                    amount: player.freeze,
                                    cd: 2
                                },
                                MF100002: {
                                    amount: player.summon,
                                    cd: 2
                                },
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'get_item_info',
                            sys: 'item'                            
                        }
                        // player.room.startRoom();
                        break;
                    case 'update_bet':
                        player.bet_value = gameData.data.bet_value;
                        player.auto = gameData.data.auto;
                        player.weapon = gameData.data.weapon;
                        response = {
                            data: {
                                auto: player.auto,
                                bet_value: player.bet_value,
                                device: gameData.data.device,
                                mode: gameData.data.mode,
                                seat: player.seatId,
                                weapon: player.weapon,
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'update_bet',
                            sys: 'fish_player'
                        }
                        player.sendToOtherUsers(response);
                        if(!player.initialized)
                            response = null;
                        break;
                    case 'purchase_player':
                        response = {
                            data: {
                                entries: player.balance,
                                winnings: player.balance,
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'current_credit',
                            sys: 'fish_player'
                        }
                        break;
                    case 'refresh_credit':
                        response = {
                            data: {
                                entries: player.balance,
                                winnings: player.balance,
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'refresh_credit',
                            sys: 'fish_player'
                        }
                        break;
                    case 'update_player':
                        var players = {};
                        player.room.clients.forEach(element => {
                            players[element.userId] = {
                                vip_lv: null,
                                auto: element.auto,
                                seat: element.seatId,
                                entries: element.balance,
                                bet_value: element.bet_value,
                                coin: element.balance,
                                id: element.userId,
                                name: null,
                                nick_name: "",
                                // equip_avatar: "",
                                // equip_avatar_frame: "",
                                weapon: element.weapon,
                                character: null,
                                winning: 0,
                                lv: null
                            }
                        });
                        response = {
                            data: {
                                players: players,
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'update_player',
                            sys: 'fish_player'
                        }
                        player.sendToOtherUsers(response);
                        break;
                    case 'current_credit':
                        response = {
                            data: {
                                entries: player.balance,
                                winnings: 0,
                                timestamp: parseInt(new Date().getTime()/1000)
                            },
                            cmd: 'current_credit',
                            sys: 'fish_player'
                        }
                        break;
                    // case 'f4':                        
                    //     responseF4 = {
                    //         data: {
                    //             11: [{"1":1634,"3":74,"2":5,"5":255,"4":5,"7":0,"6":0,"9":164,"8":1,"16":null},{"1":1635,"3":93,"2":6,"5":200,"4":50,"7":0,"6":0,"9":164,"8":1,"16":null},{"1":1636,"3":30,"2":5,"5":43,"4":49,"7":0,"6":0,"9":165,"8":1,"16":null},{"1":1637,"3":87,"2":47,"5":172,"4":46,"7":0,"6":0,"9":165,"8":1,"16":null},{"1":1638,"3":97,"2":47,"5":110,"4":27,"7":0,"6":0,"9":165,"8":1,"16":null},{"1":1664,"3":39,"2":3,"5":181,"4":21,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1678,"3":84,"2":13,"5":226,"4":92,"7":0,"6":0,"9":174,"8":1,"16":null},{"1":1679,"3":8,"2":6,"5":34,"4":79,"7":0,"6":0,"9":174,"8":1,"16":null},{"1":1674,"3":6,"2":3,"5":190,"4":31,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1675,"3":84,"2":3,"5":139,"4":2,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1676,"3":71,"2":3,"5":87,"4":37,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1677,"3":0,"2":79,"5":199,"4":46,"7":0,"6":19,"9":172,"8":1,"16":null},{"1":1670,"3":22,"2":47,"5":27,"4":93,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1671,"3":85,"2":47,"5":144,"4":36,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1672,"3":71,"2":47,"5":5,"4":25,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1673,"3":90,"2":3,"5":354,"4":61,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1645,"3":27,"2":47,"5":81,"4":22,"7":0,"6":0,"9":166,"8":1,"16":null},{"1":1644,"3":26,"2":47,"5":159,"4":43,"7":0,"6":0,"9":166,"8":1,"16":null},{"1":1652,"3":10,"2":80,"5":212,"4":77,"7":0,"6":0,"9":168,"8":1,"16":null},{"1":1650,"3":49,"2":47,"5":208,"4":31,"7":0,"6":0,"9":167,"8":1,"16":null},{"1":1656,"3":54,"2":47,"5":314,"4":0,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1657,"3":30,"2":2,"5":96,"4":91,"7":0,"6":0,"9":170,"8":6,"16":null},{"1":1654,"3":62,"2":47,"5":46,"4":67,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1669,"3":61,"2":47,"5":51,"4":46,"7":0,"6":0,"9":172,"8":1,"16":null},{"1":1668,"3":20,"2":13,"5":75,"4":54,"7":0,"6":0,"9":171,"8":1,"16":null},{"1":1667,"3":12,"2":2,"5":288,"4":53,"7":0,"6":1,"9":170,"8":1,"16":null},{"1":1666,"3":15,"2":3,"5":119,"4":18,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1665,"3":76,"2":3,"5":315,"4":11,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1655,"3":37,"2":47,"5":334,"4":17,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1663,"3":24,"2":3,"5":184,"4":92,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1649,"3":8,"2":47,"5":122,"4":59,"7":0,"6":0,"9":167,"8":1,"16":null},{"1":1648,"3":89,"2":47,"5":315,"4":91,"7":0,"6":0,"9":167,"8":1,"16":null},{"1":1653,"3":75,"2":47,"5":350,"4":23,"7":0,"6":0,"9":170,"8":1,"16":null},{"1":1651,"3":85,"2":13,"5":123,"4":74,"7":0,"6":0,"9":168,"8":1,"16":null},{"1":1647,"3":4,"2":47,"5":322,"4":83,"7":0,"6":0,"9":167,"8":1,"16":null},{"1":1646,"3":64,"2":5,"5":262,"4":81,"7":0,"6":0,"9":167,"8":1,"16":null},{"1":1641,"3":40,"2":5,"5":264,"4":68,"7":0,"6":0,"9":166,"8":1,"16":null},{"1":1640,"3":58,"2":47,"5":207,"4":29,"7":0,"6":0,"9":165,"8":1,"16":null},{"1":1643,"3":26,"2":47,"5":107,"4":90,"7":0,"6":0,"9":166,"8":1,"16":null},{"1":1642,"3":86,"2":47,"5":268,"4":7,"7":0,"6":0,"9":166,"8":1,"16":null},{"1":1681,"3":25,"2":6,"5":78,"4":55,"7":0,"6":0,"9":175,"8":1,"16":null},{"1":1680,"3":28,"2":7,"5":80,"4":21,"7":0,"6":2,"9":174,"8":1,"16":null},{"1":1682,"3":29,"2":6,"5":86,"4":22,"7":0,"6":0,"9":176,"8":1,"16":null},{"1":1639,"3":48,"2":47,"5":148,"4":45,"7":0,"6":0,"9":165,"8":1,"16":null}],
                    //             14: player.room.getSceneId(),
                    //             15: [{"turning":[0.0,1.0,0.0,1.0,0.0]},{},{"turning":[1.0,0.0,1.0,0.0,1.0]},{},{},{"inflated":[3.5,8.9,3.6,5.0,9.2]},{},{},{"inflated":[8.3,4.0,5.3,3.7,4.5]},{"inflated":[12.8,3.2,7.1,8.1,6.4]},{"inflated":[12.0,7.1,9.5,6.0,6.6]},{},{},{},{},{"inflated":[10.5,5.3,3.6,7.3,4.7]},{},{},{},{},{},{},{},{},{},{},{"inflated":[7.7,7.3,6.2,5.9,4.8]},{"inflated":[13.3,5.2,7.7,6.3,5.4]},{},{"inflated":[8.4,5.9,4.2,3.7,9.7]},{},{},{},{},{},{"turning":[0.0,1.0,1.0,0.0,0.0]},{"turning":[0.0,0.0,1.0,0.0,0.0]},{},{},{},{},{},{},{}],
                    //             13: player.room.getCurrentFrame(),
                    //             timestamp: parseInt(new Date().getTime() / 1000)
                    //         },
                    //         cmd: 'f4',
                    //         sys: 'fish'
                    //     }
                    //     responseSyn = {
                    //         data: {
                    //             1: 'PantheonRandomIn_30s',
                    //             13: player.room.getCurrentFrame(),
                    //             timestamp: parseInt(new Date().getTime())
                    //         },
                    //         cmd: 'f5',
                    //         sys: 'fish'
                    //     }
                    //     player.room.sendToAllUsers(responseF4);
                    //     player.room.sendToAllUsers(responseSyn);
                    //     break;
                    case 'f5':
                        responseSyn = {
                            data: {
                                1: 'PantheonRandomIn_30s',
                                13: player.room.getCurrentFrame(),
                                timestamp: parseInt(new Date().getTime())
                            },
                            cmd: 'f5',
                            sys: 'fish'
                        }
                        player.room.sendToAllUsers(responseSyn);
                        break;
                    case 'sk_multi_lock_blast':
                    case 'sk_scale_lock_blast':
                        player.sendToOtherUsers(gameData);                
                        var sn = gameData.sn;
                        player.bet_value = parseInt(gameData.data[9]);                        
                        if (gameData.cmd == "sk_multi_lock_blast")
                        {
                            player.multi_fire = 5;
                        }
                        else
                        {
                            player.multi_fire = 2;
                        }

                        var bet = player.bet_value * player.multi_fire;
                        if(player.balance < bet)
                        {
                            player.noWin(gameData, -1);
                            return;
                        }
                        player.bet_amount = bet;                        
                        
                        var skillCatched = -1;
                        var fishIds = [];
                        if (gameData.cmd == "sk_multi_lock_blast")
                        {   
                            fishIds = gameData.data[7];

                            //increase hits
                            player.hitFishCnt = fishIds.length;
                            for (var k = 0; k < fishIds.length; k++) {
                                var fishId = fishIds[k];
                                var fish = player.room.fishInfos.find(x => x.id == fishId);
                                if(fish != undefined)
                                {
                                    player.room.hit(fish, player, 1);
                                }                                    
                            }
                            skillCatched = await player.normalFishMultiProcess(gameData.data[7], sn, gameData.cmd, gameData.id, player.bet_value);
                        }
                        else
                        {
                            player.hitFishCnt = 1;
                            fishIds = [gameData.data[6]];
                            var fish = player.room.fishInfos.find(x => x.id == gameData.data[6]);
                            if(fish != undefined)
                            {
                                player.room.hit(fish, player, 2);
                            }
                                
                            //increase hits
                            skillCatched =  await player.normalFishMultiProcess([gameData.data[6]], sn, gameData.cmd, gameData.id, player.bet_value);
                        }

                        //check skill fish                        
                        if(skillCatched < 0)
                        {
                            // if(skillCatched == -1)                            
                            player.balance -= bet;
                            player.noWins(gameData,fishIds);
                            await player.updateBalance();
                            await player.updateBank(bet, false);                            
                            isResponseSent = true;
                            break;
                        }
                        else
                        {
                            //change all for skill process.
                            // player.noWins(gameData,fishIds);
                            // gameData.cmd = 'sk24';
                            gameData.data[9] = player.bet_value;
                            gameData.data[6] = skillCatched;                            
                        }
                        
                    case 'w2':                        
                    case 'sk24':                    
                        // console.log("incoming w2: " + JSON.stringify(gameData));                      
                        if(gameData.cmd == "w2" || gameData.cmd == "sk24" ) 
                            player.multi_fire = 1;
                        else if(gameData.cmd == "sk_scale_lock_blast")  
                            player.multi_fire = 2;
                        else if (gameData.cmd == "sk_multi_lock_blast")
                            player.multi_fire = 5;

                        if(gameData.cmd == "w2")
                        {
                            var gameDataW1 = JSON.parse(JSON.stringify(gameData));
                            gameDataW1.cmd = "w1";
                            player.sendToOtherUsers(gameDataW1);
                        }
                        else
                        {
                            player.sendToOtherUsers(gameData);
                        }

                        var targetFishId = -1;
                        var sn = gameData.sn;
                        player.bet_value = parseInt(gameData.data[9]);
                         
                        var bet = player.bet_value * player.multi_fire
                        player.bet_amount = bet;
                        if(player.balance < bet)
                        {
                            player.noWin(gameData, targetFishId);
                            return;
                        }

                        player.balance -= bet;                        
                        if(gameData.cmd == 'w2')
                        {                   
                            if(gameData.data[7].length > 0)
                                targetFishId = gameData.data[7][0];
                        }
                        else
                        {
                            targetFishId = gameData.data[6];                        
                        }

                        await player.updateBalance();
                        await player.updateBank(bet);
                        
                        var targetFishInfo = player.room.fishInfos.find(x => x.id == targetFishId);
                        if(targetFishId == -1 || targetFishInfo == undefined)
                        {
                            player.noWin(gameData, targetFishId);
                            return;
                        }                            

                        //increase bullet hit
                        if(gameData.cmd == "w2" || gameData.cmd == "sk24" ) 
                        {
                            player.hitFishCnt = 1;
                            player.room.hit(targetFishInfo, player, 1)
                        }                            

                        //check firestorm
                        var fireStormRandom = getRandomInt(0, 10000);
                        
                        var winningWave = redisBridge.isWinningWave(player);
                        var bulletEnought = player.room.isEnoughBulletHit(targetFishInfo, player.getBetWinCondition(), player);
                        
                        var killCondition = bulletEnought && winningWave;
                        if(targetFishInfo.fishType <= 16)
                        {
                            killCondition = bulletEnought; //small fishes and some crabs must be dead with only bullet hit condition
                        }

                        if(normalFishFormat.find(x => x.id == targetFishInfo.fishType) != undefined)
                        {                           
                            if(gameData.cmd == 'w2' && gameData.sys == 'weapon')
                            {
                                isResponseSent = await player.normalFishProcess(targetFishInfo, false, gameData, null, killCondition);
                            }
                            else
                            {
                                isResponseSent = await player.normalFishProcess(targetFishInfo, true, null, gameData, killCondition);
                            }                            
                        }
                        else if(skillFishFormat.find(x => x.id == targetFishInfo.fishType) != undefined && player.room.scriptTime > 20)
                        {                            
                            var expectedOdds = oddGenerator.getOdd(targetFishInfo, player);                            
                            if(killCondition && (new Date().getTime() - player.lastCrabDate.getTime()) / 1000 > 20)
                            {
                                oddGenerator.setNextOddIndicator(targetFishInfo, player);
                                isResponseSent = true;
                                player.lastCrabDate = new Date();
                                player.room.fishOut(targetFishId.id);
                                player.skillFishProcess(targetFishInfo, sn, expectedOdds);                                
                            }
                        }
                        else if(vortexFishFormat.find(x => x.id == targetFishInfo.fishType) != undefined)
                        {
                            if(killCondition && (new Date().getTime() - player.lastGroupFishDate.getTime()) / 1000 > 30)
                            {
                                player.lastGroupFishDate = new Date();
                                isResponseSent = true;
                                player.room.fishOut(targetFishInfo.id);
                                player.vortexFishProcess(targetFishInfo);                                
                            }
                        }
                        else if(lightingChainFormat.find(x => x.id == targetFishInfo.fishType) != undefined)
                        {
                            if(killCondition && (new Date().getTime() - player.lastGroupFishDate.getTime())/ 1000 > 30)
                            {
                                player.lastGroupFishDate = new Date();
                                isResponseSent = true;
                                player.room.fishOut(targetFishInfo.id);
                                player.lightingChainFishProcess(targetFishInfo);                                
                            }
                        }
                        else if(player.room.bossFormat.find(x => x.fishType == targetFishInfo.fishType) != undefined)
                        {
                            //adjust catch ratio dynamically according to bank amount for boss fishes
                            var expectedOdds = 0;
                            var bombCnt = 1;
                            if(targetFishInfo.fishType == 116)
                            {
                                //odd accumulating fishes
                                expectedOdds = oddGenerator.getOdd(targetFishInfo, player);
                                if(expectedOdds > targetFishInfo.odds)
                                {
                                    expectedOdds = -1;                                    
                                }
                                else
                                    expectedOdds = targetFishInfo.odds;
                            }                            
                            else
                            {
                                expectedOdds = oddGenerator.getOdd(targetFishInfo, player);
                            }

                            if(expectedOdds <= 300)
                                bombCnt = 1;
                            else
                            {
                                if (getRandomInt(0, 100) < 30 && targetFishInfo.fishType != 78) //thunder dragon doesn't have non-powerup
                                {
                                    bombCnt = 1;
                                }
                                else
                                {
                                    if(expectedOdds <= 400)
                                        bombCnt = 2;
                                    else if(expectedOdds <= 500)
                                        bombCnt = 3;
                                    else if(expectedOdds <= 600)
                                        bombCnt = 4;
                                    else if(expectedOdds <= 800)
                                        bombCnt = 5;
                                    else if(expectedOdds <= 900)
                                        bombCnt = 6;
                                    else
                                        bombCnt = 7;
                                }
                            }

                            if(targetFishInfo.fishType == 29) //treasure crab
                            {
                                expectedOdds = -1;
                                var treasureScore = player.room.treasureScore;
                                
                                if(killCondition && false)
                                {
                                    player.balance += treasureScore;
                                    await player.updateBalance();
                                    await player.updateBankDirect(0, treasureScore);
                                    response = {
                                        sys: 'skill',
                                        cmd: 'sk_TreasureCrab',
                                        data:{
                                            id: targetFishInfo.id,
                                            win: treasureScore,
                                            seat: player.seatId,
                                            bet: player.bet_value,
                                            win_type:'capture'
                                        }
                                    }
                                    player.room.treasureScore = player.room.treasureInitScore;                                        
                                    player.room.treasureLevel = 0;
                                    player.room.fishOut(targetFishInfo.id);
                                    player.room.isCrab = false;
                                    setTimeout(function(){player.room.isCrab = true;},10*1000);
                                    player.room.resetHit(targetFishInfo, player, treasureScore);
                                    player.room.sendToAllUsers(response);
                                    isResponseSent = true;                                        
                                    response = null;
                                }
                            }
                            
                            var timeCondition = true;
                            timeCondition = player.room.scriptExtendedCount < 2 || player.room.scriptTime >= 40;
                            if(killCondition                                
                                && (new Date().getTime() - player.lastSkillDate.getTime()) / 1000 > 60 
                                && expectedOdds > 0 && timeCondition)
                            {
                                if(player.room.scriptTime < 40)
                                {
                                    player.room.scriptTime += 40;
                                    player.room.scriptExtendedCount++;
                                }
                                    
                                player.lastSkillDate = new Date();
                                player.mul = getRandomInt(4, 6);
                                player.multiBombSkillSet = {
                                    expectedOdds: expectedOdds,
                                    bet_value: player.bet_value,
                                    bombCnt: bombCnt,
                                    total_win: 0,
                                    skillName: ''
                                };
                                if(player.room.bossFormat.find(x => x.fishType == targetFishInfo.fishType) != undefined)
                                {
                                    isResponseSent = true;
                                    player.bossFishProcess(targetFishInfo, gameData);                      
                                    if(!targetFishInfo.isLevelFish)              
                                        player.room.fishOut(targetFishInfo.id);                                    
                                    oddGenerator.setNextOddIndicator(targetFishInfo, player)
                                }
                            }

                            if(!isResponseSent)
                            {
                                //odd accumulation boss fishes increase odd when not win
                                switch(player.room.fishGameType)
                                {
                                    case "MF":
                                        if(targetFishInfo.fishType == 116)
                                        {
                                            isResponseSent = true;
                                            //god wealth of MF                                            
                                            player.room.accumulatedOdd++;
                                            if(targetFishInfo.odds >= 1000)
                                                player.room.betPerOddIncrease = 2;
                                            else if(targetFishInfo.odds >= 500)
                                                player.room.betPerOddIncrease = 2;
                                            else
                                                player.room.betPerOddIncrease = 2;
                                            if(player.room.accumulatedOdd >= player.room.betPerOddIncrease)
                                            {
                                                player.room.accumulatedOdd = 0;
                                                targetFishInfo.odds++;
                                                player.room.godWealthOdd = targetFishInfo.odds;
                                            }
                                            
                                            targetFishInfo.maxOdds = targetFishInfo.odds;
                                            if(targetFishInfo.odds >= 2000)
                                            {
                                                targetFishInfo.odds = 2000;
                                                targetFishInfo.maxOdds = 2000;
                                                player.room.godWealthOdd = 2000;
                                            }
                                            var fish7Reply = {
                                                cmd: 'f7',
                                                sys: 'fish',
                                                data: {
                                                    fish_id: targetFishInfo.id,
                                                    odds: targetFishInfo.odds
                                                }
                                            }
                                            var currentOdds = fish7Reply.data.odds;
                                            if(currentOdds >= 300 && currentOdds <= 400)
                                                fish7Reply.data.level = 1;
                                            else if(currentOdds > 400 && currentOdds <= 600)
                                                fish7Reply.data.level = 2;
                                            else if(currentOdds > 600 && currentOdds <= 700)
                                                fish7Reply.data.level = 3;
                                            else if(currentOdds > 700 && currentOdds <= 900)
                                                fish7Reply.data.level = 4;
                                            else if(currentOdds > 900 && currentOdds <= 1400)
                                                fish7Reply.data.level = 5;
                                            else if(currentOdds > 1400 && currentOdds <= 2000)
                                                fish7Reply.data.level = 6;
                                            else if(currentOdds > 2000)
                                            {
                                                currentOdds = 2000;                                    
                                                fish7Reply.data.level = 6;
                                            }
                                            fish7Reply.data.timestamp = new Date().getTime();
                                            player.room.sendToAllUsers(fish7Reply);                                
                                        }  
                                        break;
                                    case "ZB":
                                    case "ALD":
                                        if(targetFishInfo.fishType == 83)
                                        {
                                            isResponseSent = true;
                                            //aladdin of ALD
                                                player.room.hitOnAccmulatedBoss++;
                                                player.room.betPerOddIncrease = 3 + Math.ceil((targetFishInfo.odds - 120) / 30);
                                                if(player.room.hitOnAccmulatedBoss >= player.room.betPerOddIncrease)
                                                {
                                                    targetFishInfo.odds++;
                                                    player.room.hitOnAccmulatedBoss = 0;
                                                }
                                            if(targetFishInfo.odds >= 2000)
                                                targetFishInfo.odds = 2000;
                                                player.room.accumulatedOdd = targetFishInfo.odds;
                                            var vampireReply = {
                                                cmd: "VampireOdds",
                                                sys: "skill",
                                                data:{
                                                    Vampire_odds: targetFishInfo.odds,                                        
                                                }
                                            }
                                            player.room.sendToAllUsers(vampireReply);                                            
                                        }
                                    case "MTY":
                                        if (targetFishInfo.fishType == 84) {          
                                            isResponseSent = true;                                  
                                                player.room.hitOnAccmulatedBoss++;
                                                player.room.betPerOddIncrease = 3 + Math.ceil((targetFishInfo.odds - 120) / 30);
                                                if(player.room.hitOnAccmulatedBoss >= player.room.betPerOddIncrease)
                                                {
                                                    targetFishInfo.odds++;
                                                    player.room.hitOnAccmulatedBoss = 0;
                                                }
                                            if(targetFishInfo.odds >= 2000)
                                                targetFishInfo.odds = 2000;
                                                player.room.accumulatedOdd = targetFishInfo.odds;
                                            var vampireReply = {
                                                cmd: "LuckyBuddhaOdds",
                                                sys: "skill",
                                                data: {
                                                    LuckyBuddha_odds: targetFishInfo.odds,
                                                    timestamp: parseInt(new Date().getTime()/1000)
                                                }
                                            }
                                            player.room.sendToAllUsers(vampireReply);
                                        }
                                        break;
                                    case "TD":
                                        if(targetFishInfo.fishType == 29)
                                        {
                                            isResponseSent = true;
                                            var treasureInfo = {
                                                cmd: 'sk_TreasureCrabInfo',
                                                sys: 'skill',
                                                data:{
                                                    timestamp: parseInt(new Date().getTime()/1000),
                                                    treasure_level: player.room.treasureLevel,
                                                    treasure_score: player.room.treasureScore
                                                }
                                            };
                                            var preLevel = player.room.treasureLevel;
                                            var curLevel = parseInt((player.room.treasureScore - player.room.treasureInitScore) / player.room.treasureLevelScore);
                                            if (preLevel != curLevel)
                                            {
                                                treasureInfo['data']['win_type'] = 'upgrade';
                                                treasureInfo['data']['bet'] = player.bet_value;
                                                treasureInfo['data']['seat'] = player.seatId;
                                                treasureInfo['data']['win'] = player.room.treasureLevelScore;
                                                player.balance += player.room.treasureLevelScore;
                                                await player.updateBalance();
                                                await player.updateBankDirect(0, player.room.treasureLevelScore);                                                
                                            }
                                            player.room.treasureLevel = curLevel;
                                            player.room.treasureScore += parseInt(player.bet_value * player.multi_fire * 0.2);
                                            if(player.room.treasureScore > player.room.treasureMaxScore)
                                                player.room.treasureScore = player.room.treasureMaxScore;
                                            player.room.sendToAllUsers(treasureInfo);
                                        }
                                        break;
                                    case 'CS':
                                        if (targetFishInfo.fishType == 93) {          
                                            isResponseSent = true;                                  
                                            player.room.hitOnAccmulatedBoss++;
                                            player.room.betPerOddIncrease = 3 + Math.ceil((targetFishInfo.odds - 90) / 30);
                                            if(player.room.hitOnAccmulatedBoss >= player.room.betPerOddIncrease)
                                            {
                                                targetFishInfo.odds++;
                                                player.room.hitOnAccmulatedBoss = 0;
                                            }
                                            if(targetFishInfo.odds >= 2000)
                                                targetFishInfo.odds = 2000;
                                            player.room.accumulatedOdd = targetFishInfo.odds;
                                            var vampireReply = {
                                                cmd: "CircusClownOdds",
                                                sys: "skill",
                                                data: {
                                                    CircusClown_odds: targetFishInfo.odds,
                                                    timestamp: parseInt(new Date().getTime()/1000)
                                                }
                                            }
                                            player.room.sendToAllUsers(vampireReply);
                                        }
                                        break;
                                }
                            }
                        }

                        if(killCondition && fireStormRandom >= 9998 && !player.isFireStorm && !player.room.isFireStorm && !isResponseSent && (new Date().getTime() - player.lastSkillDate.getTime()) / 1000 > 60 )
                        {
                            isResponseSent = true;
                            player.lastSkillDate.setTime(new Date().getTime() + 60 * 1000);                            
                            player.isFireStorm = true;
                            player.room.isFireStorm = true;
                            player.fireStormTotalWin = 0;
                            player.mul = 1;
                            player.fireStormMoreTime = 0;
                            var fireStormSkill = {
                                cmd: 'sk15',
                                sys: 'skill',
                                data: {
                                    id: targetFishInfo.id                                    
                                }                                
                            }
                            fireStormSkill.data[9] = player.bet_value;
                            fireStormSkill.data[2] = player.seatId;
                            fireStormSkill.data[15] = 30;

                            sendWSMessage(ws, fireStormSkill);
                            player.sendToOtherUsers(fireStormSkill);
                            player.fireStormMoreTime = 30;
                            player.delayMsg(0, {output: 'sk18', id: 0});                            
                        }

                        /*
                        if(!isResponseSent && killCondition || true)
                        {
                            isResponseSent = true;
                            var fishCnt = getRandomInt(2, 3);
                            var rocket_win = 0;
                            var fish_dead_dict = {};
                            try{
                                player.room.fishInfos.forEach(tempFish => {
                                    if(tempFish.fishTypeGroup == 'normal' && tempFish.odds <= 20)
                                    {
                                        fish_dead_dict[tempFish.id] = {coin: tempFish.odds * player.bet_value, odds: tempFish.odds};
                                        rocket_win += tempFish.odds * player.bet_value;
                                        fishCnt--;
                                        if(fishCnt <= 0)
                                        {
                                            throw 'Break';
                                        }
                                    }
                                });
                            }
                            catch(e){

                            }
                            player.balance += rocket_win;
                            await player.updateBalance();
                            await player.updateBankDirect(0, rocket_win);            
                            var rocketCanon = {
                                cmd : 'sk_88',
                                sys: 'skill',
                                data: {
                                    seat: player.seatId,
                                    bet: player.bet_value,
                                    total_win: rocket_win,
                                    fish_dead_dict: fish_dead_dict
                                }
                            }
                            sendWSMessage(ws, rocketCanon);
                        }
                        */
                        
                        // if(!isResponseSent)
                        {
                            await player.noWin(gameData, targetFishId);
                        }
                        // await player.sendUpdateCredit();
                        break;
                    case 'sk16': //fire storm reference
                        var firestorm_shoot_reply = {
                            cmd: 'sk16',
                            sys: 'skill',
                            data:{
                                seat: player.seatId,
                                1: player.seatId,
                                4: gameData.data[4],
                                5: gameData.data[5],
                            }
                        }
                        player.sendToOtherUsers(firestorm_shoot_reply);
                        break;
                    case 'sk17':                        
                        // var gameData16 = JSON.parse(JSON.stringify(gameData));
                        // gameData16.cmd = "sk16";
                        // player.sendToOtherUsers(gameData16);                        
                        // player.sendToOtherUsers(gameData);
                        var targetFish = player.room.fishInfos.find(x => x.id == gameData.data[6]);
                        var prizeRatio = getRandomInt(0, 100);
                        var prizeRatioPer = 50;
                        if(player.fireStormTotalWin * player.mul >= player.bet_value * 300)                        
                            prizeRatioPer = 70;
                        if(getRandomInt(0, 100) < prizeRatioPer)
                            prizeRatio += 20;

                        if(targetFish != undefined && player.isFireStorm && prizeRatio < targetFish.prizeRatio && targetFish.fishTypeGroup == 'normal' && targetFish.fishType < 100 && player.fireStormTotalWin * player.mul < player.bet_value * 500)    
                        {
                            var fireStormHitReply = {
                                cmd: 'sk17',
                                sys: 'skill',
                                data: {
                                    13: {}
                                }
                            };
                            var moreTime = 2;
                            var moreMul = 0;
                            if(targetFish.odds > 10)
                                moreMul = 1;

                            fireStormHitReply.data[13][13001] = moreTime;
                            if(player.mul < 30)
                                player.mul += moreMul;
                            else
                                moreMul = 0;
                            fireStormHitReply.data[13][13002] = moreMul;                            
                            player.fireStormMoreTime += moreTime;
                            fireStormHitReply.data[2] = player.seatId;
                            fireStormHitReply.data[3] = targetFish.odds * player.bet_value;

                            var fishDeadDict = {};
                            fishDeadDict[targetFish.id] = {coin: targetFish.odds * player.bet_value}; 
                            fireStormHitReply.data[8] = fishDeadDict;
                            player.fireStormTotalWin += targetFish.odds * player.bet_value;
                            sendWSMessage(ws, fireStormHitReply);
                            fireStormHitReply.cmd = "sk17";
                            player.sendToOtherUsers(fireStormHitReply);
                        }
                        break;
                    case 'sk_electric_hit':
                        var laserHitReply = {
                            cmd: 'sk_electric_hit',
                            sys: 'skill',
                            data: {
                                seat: player.seatId,
                                bet: player.skillFishContext.bet_value,
                                total_odds: 20,
                                odds: [],
                                fish: []
                            }
                        };
                        var total_win = 0;
                        gameData.data.fish.forEach(fish_id => {
                            var targetFish = player.room.fishInfos.find(x => x.id == fish_id);
                            if(targetFish != undefined && player.skillFishContext != null 
                                && (targetFish.fishTypeGroup == 'normal' || targetFish.fishType == 80 || targetFish.fishType == 25) && player.skillFishContext.expectedOdds > targetFish.odds
                                && (targetFish.odds <= 20 || (targetFish.fishType == 80 && targetFish.odds <= 200) || (targetFish.fishType == 25 && targetFish.odds <= 200) ))
                            {
                                var coin = targetFish.odds * player.skillFishContext.bet_value;
                                player.skillFishContext.expectedOdds -= targetFish.odds;
                                total_win += coin;
                                laserHitReply.data.odds.push(targetFish.odds);
                                laserHitReply.data.fish.push(targetFish.id);
                                player.room.fishOut(targetFish.id);
                            }
                        });
                        player.balance += total_win;
                        await player.updateBankDirect(0, total_win);
                        await player.updateBalance();
                        laserHitReply.data.credits = player.balance;
                        laserHitReply.data.total_win = total_win;
                        player.skillFishContext = null;
                        player.room.sendToAllUsers(laserHitReply);
                        break;
                    case 'freeze':
                        response = {
                            cmd: 'freeze',
                            sys: 'item',
                            data: {
                                fish: []
                            }
                        };
                        if (player.freeze > 0) {
                            player.freeze -= 1;
                            response.data.freeze_amount = player.freeze;
                            response.data.freeze_time = 8;
                            response.data.seat = player.seatId;
                            response.data.status = 0;
                            response.data.summon_amount = player.summon;
                            response.data.timestamp = new Date().getTime();
                            var orderedFishInfo = player.room.fishInfos.sort((a, b) => a.odds > b.odds ?
                                    1 :
                                    -1);
                            orderedFishInfo.forEach(tempFish => {
                                if (tempFish.odds >= 18 && response.data.fish.length <= 3) {
                                    response.data.fish.push(tempFish.id);
                                }
                            });
                            await mysql_tools.sendQuery(dbconn, "UPDATE w_users SET freeze = ? , summon = ? WHERE username = ?", [player.freeze, player.summon, player.userId]);
                        }
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'summon':
                        var response = {
                            cmd: 'summon',
                            sys: 'item',
                            data: {
                                seat: player.seatId,
                                status: 0,
                                fish_data: []
                            }
                        };
                        var fishTypes = [80, 25];
                        if (player.room.fishGameType == 'TD')
                        {
                            fishTypes = [32,87,88,17,18,16];
                        }
                        var fishType = getRandomInt(11, 19); //fishTypes[getRandomInt(0, fishTypes.length)];
                        var bossFish = {
                            id: player.room.generateFishId(),
                            frame: player.room.getCurrentFrame(),
                            type: fishType,
                            x: 34,
                            y: 100,
                            o: 100,
                            size: 1,
                            position: 0,
                            extra_data: {}
                        };
                        player.summon -= 1;
                        await mysql_tools.sendQuery(dbconn, "UPDATE w_users SET freeze = ? , summon = ? WHERE username = ?", [player.freeze, player.summon, player.userId]);
                        response.data.fish_data.push(bossFish);
                        player.room.fishInfos.push({
                                id: bossFish.id,
                                fishType: bossFish.type,
                                birthDate: new Date(),
                                odds: 100,
                                maxOdds: 500,
                                prizeRatio: 5
                            });
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'sk_electric_use':
                        player.room.sendToAllUsers(gameData);
                        break;
                    case 'sk_drill_shoot':
                        player.room.sendToAllUsers(gameData);
                        break;
                    case 'sk_drill_hit':
                        var drillHitReply = {
                            cmd: 'sk_drill_hit',
                            sys: 'skill',
                            data: {
                                bet: player.skillFishContext.bet_value,
                                seat: player.seatId
                            }
                        };
                        var tempFish = player.room.fishInfos.find(x => x.id == gameData.data.fish);
                        var fish_dead_dict = {};
                        if(tempFish != undefined && player.skillFishContext != null 
                            && (tempFish.fishTypeGroup == 'normal' || tempFish.fishType == 80 || tempFish.fishType == 25) && player.skillFishContext.expectedOdds > player.skillFishContext.totalOdds / 3
                            && (tempFish.odds <= 20 || (tempFish.fishType == 80 && tempFish.odds <= 200) || (tempFish.fishType == 25 && tempFish.odds <= 200) ))
                        {
                            player.balance += tempFish.odds * player.skillFishContext.bet_value;
                            drillHitReply.data.credits = player.balance;
                            fish_dead_dict[tempFish.id] = {coin: tempFish.odds * player.skillFishContext.bet_value, odds: tempFish.odds};
                            
                            player.room.fishOut(tempFish.id);
                            player.skillFishContext.total_win += tempFish.odds * player.skillFishContext.bet_value;
                            player.skillFishContext.expectedOdds -= tempFish.odds;
                            await player.updateBankDirect(0, tempFish.odds * player.skillFishContext.bet_value);
                            await player.updateBalance();
                        }
                        drillHitReply.data.fish_dead_dict = fish_dead_dict;
                        player.room.sendToAllUsers(drillHitReply);
                        break;
                    case 'sk_drill_bomb':
                        var drillBombReply = {
                            cmd: 'sk_drill_bomb',
                            sys: 'skill',
                            data: {
                                seat: player.seatId,
                                bet: player.bet_value,
                                odds: [],
                                fish: []
                            }
                        };
                        var total_odds = 0;
                        var total_win = 0;
                        gameData.data.fish.forEach(fish_id => {
                            var targetFish = player.room.fishInfos.find(x => x.id == fish_id);
                            if(targetFish != undefined && targetFish.fishTypeGroup == 'normal' && player.skillFishContext != null && player.skillFishContext.skillName == 'sk_drill' && player.skillFishContext.expectedOdds > targetFish.odds)
                            {
                                var coin = targetFish.odds * player.skillFishContext.bet_value;
                                player.skillFishContext.total_win += coin;
                                player.balance += coin;
                                total_win += coin;
                                player.skillFishContext.expectedOdds -= targetFish.odds;
                                total_odds += targetFish.odds;
                                drillBombReply.data.odds.push(targetFish.odds);
                                drillBombReply.data.fish.push(targetFish.id);
                                player.room.fishOut(targetFish.id);
                            }
                        });
                        drillBombReply.data.credits = balance;
                        drillBombReply.data.total_win = total_win;
                        drillBombReply.data.total_odds = 1;
                        await player.updateBalance();
                        await player.updateBankDirect(0, total_win);
                        player.room.sendToAllUsers(drillBombReply);
                        break;
                    case 'sk_bomb_range':
                        var bombRangeReply = {
                            cmd: 'sk_bomb_range',
                            sys: 'skill',
                            data: {
                                seat: player.seatId,
                                army_info: {},
                                fish: [],
                                odds: []
                            }
                        };
                        var step_win = 0;
                        if(player.skillFishContext != null && player.skillFishContext.skillName == 'sk_bomb')
                        {
                            if(player.skillFishContext.bombCnt > 1)
                            {
                                bombRangeReply.data.continue = true;
                                player.skillFishContext.bombCnt -= 1;
                            }
                            else
                            {
                                bombRangeReply.data.continue = false;
                                player.skillFishContext.bombCnt = 0;
                            }
                            bombRangeReply.data.army_info.army_name = "";
                            bombRangeReply.data.army_info.army_id = 0;
                            var stepOdd = 0;

                            try
                            {
                                gameData.data.fish.forEach(fishId => {
                                    var tempFish = player.room.fishInfos.find(x => x.id == fishId);
                                    if(tempFish != undefined && tempFish.fishTypeGroup == 'normal' && player.skillFishContext.expectedOdds > tempFish.odds && tempFish.odds < 20)
                                    {
                                        player.skillFishContext.expectedOdds -= tempFish.odds;
                                        bombRangeReply.data.fish.push(tempFish.id);
                                        bombRangeReply.data.odds.push(tempFish.odds);
                                        step_win += tempFish.odds * player.skillFishContext.bet_value;
                                        player.room.fishOut(tempFish.id);
                                        stepOdd += tempFish.odds;
                                    }
                                    if(stepOdd >= player.skillFishContext.stepOdd)
                                        throw 'Break';
                                });
                            }catch(e)
                            {
                                if(e != 'Break') throw e;
                            }

                            player.skillFishContext.total_win += step_win;
                            bombRangeReply.data.total_win = player.skillFishContext.total_win;
                            player.balance += step_win;
                            await player.updateBankDirect(0, step_win);
                            await player.updateBalance();
                            bombRangeReply.data.credits = player.balance;
                            bombRangeReply.data.win = step_win;
                            if(player.skillFishContext.bombCnt == 0)
                                player.skillFishContext = null;
                        }
                        player.room.sendToAllUsers(bombRangeReply);
                        break;
                    case 'sk_km_bomb_range':
                        response = {
                            cmd: 'sk_km_bomb_range',
                            sys: 'skill',
                            data: {
                                seat: player.seatId,
                                bet: player.bet_value,
                                odds: [],
                                fish: []
                            }
                        };
                        var step_win = 0;                        
                        if(player.multiBombSkillSet != null && player.multiBombSkillSet.skillName == 'sk_km_bomb')
                        {
                            player.multiBombSkillSet.explodeCount++;
                            if(player.multiBombSkillSet.bombCnt > 1)
                            {
                                response.data.continue = true;
                                player.multiBombSkillSet.bombCnt -= 1;
                            }
                            else
                            {
                                response.data.continue = false;       
                                player.multiBombSkillSet.bombCnt = 0;                         
                            }

                            try
                            {
                                var stepOdd = 0;
                                gameData.data.fish.forEach(fishId => {
                                    var fishTemp = player.room.fishInfos.find(x => x.id == fishId);
                                    if(fishTemp != undefined && fishTemp.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds >= fishTemp.odds)
                                    {
                                        player.multiBombSkillSet.expectedOdds -= fishTemp.odds;
                                        response.data.fish.push(fishTemp.id);
                                        response.data.odds.push(fishTemp.odds);
                                        step_win += fishTemp.odds * player.multiBombSkillSet.bet_value;
                                        player.room.fishOut(fishTemp.id);
                                        stepOdd += fishTemp.odds;
                                        if(stepOdd >= player.multiBombSkillSet.stepOdd)
                                            throw 'Break';
                                    }
                                });
                            }
                            catch(e)
                            {
                                if( e!= 'Break') throw e;
                            }
                            
                            player.balance += step_win;
                            await player.updateBankDirect(0, step_win);
                            await player.updateBalance();
                            player.multiBombSkillSet.total_win += step_win;
                            response.data.total_win = player.multiBombSkillSet.total_win;
                            response.data.win = step_win;                            
                            response.data.credits = player.balance;
                            response.data.bomb_times_cnt = player.multiBombSkillSet.explodeCount;
                            if(player.multiBombSkillSet.bombCnt == 0)
                                player.multiBombSkillSet = null;
                        }
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'sk_af_bomb_range':
                        response = {
                            cmd: 'sk_af_bomb_range',
                            sys: 'skill',
                            data: {
                                seat: player.seatId,
                                bet: player.bet_value,
                                fish: [],
                                odds: []
                            }
                        };
                        var win = 0;
                        var oddsOnBomb = 0;
                        gameData.data.fish.forEach(fishId => {
                            var fishTemp = player.room.fishInfos.find(x => x.id == fishId);
                            if(fishTemp != undefined && fishTemp.fishTypeGroup == 'normal' && oddsOnBomb < player.multiBombSkillSet.oddsPerBomb)
                            {
                                oddsOnBomb += fishTemp.odds;
                                response.data.fish.push(fishTemp.id);
                                response.data.odds.push(fishTemp.odds);
                                win += fishTemp.odds * player.multiBombSkillSet.bet_value;
                                player.room.fishOut(fishTemp.id);
                            }
                        });

                        if(player.multiBombSkillSet.bombCnt > 0)
                        {
                            response.data.continue = true;
                            player.multiBombSkillSet.bombCnt -= 1;
                        }
                        else
                        {
                            response.data.continue = false;
                            setTimeout(function(){player.room.activeSkill = '';},13*1000);
                            player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                        }
                        player.balance += win;
                        await player.updateBankDirect(0, win);
                        await player.updateBalance();
                        player.multiBombSkillSet.total_win += win;
                        response.data.total_win = player.multiBombSkillSet.total_win;
                        response.data.win = win;
                        
                        response.data.credits = player.balance;
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'sk_13':
                        response = gameData;
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'sk_buffalo_bomb_range':
                        response = {
                            cmd: 'sk_buffalo_bomb_range',
                            sys: 'skill',
                            data: {
                                odds: [],
                                fish: []
                            }
                        }

                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }

                        response.data.coordinateX = gameData.data.coordinateX;
                        response.data.coordinateY = gameData.data.coordinateY;
                        response.data.bet = player.bet_value;
                        response.data.seat = player.seatId;
                        var total_win = 0;
                        var oddLimit = 15;
                        var odd_per_bomb = 0;
                        try{
                            gameData.data.fish.forEach(fishId => {
                                var fish_id = parseInt(fishId);
                                var targetFish = player.room.fishInfos.find(x => x.id == fish_id)
                                if(targetFish != undefined && targetFish.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > targetFish.odds && targetFish.odds <= oddLimit)
                                {
                                    response.data.odds.push(targetFish.odds);
                                    response.data.fish.push(targetFish.id);
                                    total_win += player.bet_value * targetFish.odds;
                                    player.room.fishOut(targetFish.id);
                                    player.multiBombSkillSet.expectedOdds -= targetFish.odds;
                                    odd_per_bomb += targetFish.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    } 
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e;
                        }
                        player.multiBombSkillSet.bomb_exploded++;
                        player.multiBombSkillSet.total_win += total_win;
                        response.data.total_win = player.multiBombSkillSet.total_win;
                        response.data.win = total_win;
                        response.data.big_bomb_times_target = player.multiBombSkillSet.big_bomb_times_target;
                        response.data.big_bomb_times_cnt = player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt;
                        response.data.small_bomb_times_cnt = player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt;
                        response.data.small_bomb_times_target = player.multiBombSkillSet.small_bomb_times_target;
                        response.data.continue = true;
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            response.data.continue = false;
                            setTimeout(function(){player.room.activeSkill = '';},13*1000);
                            player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);                            
                        }
                        player.balance += total_win;
                        response.data.credits = player.balance;
                        await player.updateBankDirect(0, total_win);
                        await player.updateBalance();
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'sk_kl_bomb_range':
                        response = {
                            cmd: 'sk_kl_bomb_range',
                            sys: 'skill',
                            data: {
                                fish: [],
                                odds: [],
                                seat: player.seatId
                            }
                        }
                        var total_win = 0;
                        try
                        {
                            var odds = 0;
                            gameData.data.fish.forEach(fishId => {
                                var fish_id = parseInt(fishId);
                                var targetFish = player.room.fishInfos.find(x => x.id == fish_id);
                                if (targetFish != undefined && targetFish.fishTypeGroup == 'normal' && targetFish.odds <= 15) {                                    
                                    total_win += targetFish.odds * player.multiBombSkillSet.bet_value;
                                    response.data.fish.push(fish_id);
                                    response.data.odds.push(targetFish.odds);
                                    player.room.fishOut(targetFish.id);
                                    odds += targetFish.odds;
                                    if(odds >= player.multiBombSkillSet.stepOdd)
                                        throw 'Break';
                                }
                            });
                        }
                        catch(e)
                        {
                            if(e != 'Break') throw e;
                        }
                        if (player.multiBombSkillSet.bombCnt > 0)
                        {
                            response.data.continue = true;
                            player.multiBombSkillSet.bombCnt -= 1;
                        }else
                        {
                            player.multiBombSkillSet.bombCnt = 0;
                            response.data.continue = false;
                            player.room.activeSkill = '';
                        }
                        player.multiBombSkillSet.total_win += total_win;
                        response.data.total_win = player.multiBombSkillSet.total_win;
                        player.balance += total_win;
                        await player.updateBankDirect(0, total_win);
                        await player.updateBalance();
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;
                    case 'sk_lucky_shamrock_bomb_range':
                        var rockSkeletonReply = {
                            sys: 'skill',
                            cmd: 'sk_lucky_shamrock_bomb_range',
                            data:{

                            }
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }

                        var win = 0;
                        var fish_array = [];
                        var odds_array = [];
                        var odd_per_bomb = 0;
                        try
                        {
                            gameData.data.fish.forEach(fishId => {                            
                                var temp = player.room.fishInfos.find(x => x.id == fishId);
                                if(temp != undefined && temp.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > temp.odds && temp.odds < 20)
                                {
                                    win += temp.odds * player.multiBombSkillSet.bet_value;
                                    fish_array.push(temp.id);
                                    odds_array.push(temp.odds);
                                    player.room.fishOut(temp.id);
                                    player.multiBombSkillSet.expectedOdds -= temp.odds;
                                    odd_per_bomb += temp.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    }
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e
                        }
                        player.multiBombSkillSet.bomb_exploded++;
                        player.balance += win;
                        player.multiBombSkillSet.total_win += win;
                        rockSkeletonReply.data = {
                            win: win,
                            fish: fish_array,
                            seat: player.seatId,
                            credits:player.balance,
                            id: player.multiBombSkillSet.id,
                            big_bomb_times_target: player.multiBombSkillSet.big_bomb_times_target,
                            total_win: player.multiBombSkillSet.total_win,
                            big_bomb_times_cnt: player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt,
                            odds: odds_array,
                            small_bomb_times_cnt: player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt,
                            small_bomb_times_target: player.multiBombSkillSet.small_bomb_times_target,
                            continue: true,
                            timestamp: parseInt(new Date().getTime()/1000),
                            bet: player.multiBombSkillSet.bet_value
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            rockSkeletonReply.data.continue = false;
                            setTimeout(function(){player.room.activeSkill = '';},15*1000);
                            player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                            
                        }
                        player.room.sendToAllUsers(rockSkeletonReply);
                        await player.updateBankDirect(0,win);
                        await player.updateBalance();
                    break;
                    case 'sk_RockSkeleton_bomb_range':
                        var rockSkeletonReply = {
                            sys: 'skill',
                            cmd: 'sk_RockSkeleton_bomb_range',
                            data:{

                            }
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }

                        var fishCount = 0;
                        var win = 0;
                        var fish_array = [];
                        var odds_array = [];
                        var odd_per_bomb = 0;
                        try
                        {
                            var oddLimit = 15;                            
                            gameData.data.fish.forEach(fishId => {                                                       
                                var temp = player.room.fishInfos.find(x => x.id == fishId);
                                if(temp != undefined && temp.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > temp.odds && temp.odds <= oddLimit)
                                {
                                    win += temp.odds * player.multiBombSkillSet.bet_value;
                                    fish_array.push(temp.id);                                    
                                    odds_array.push(temp.odds);
                                    player.room.fishOut(temp.id);
                                    player.multiBombSkillSet.expectedOdds -= temp.odds;
                                    odd_per_bomb += temp.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    }                                    
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e
                        }
                        player.multiBombSkillSet.bomb_exploded++;
                        player.balance += win;
                        player.multiBombSkillSet.total_win += win;
                        rockSkeletonReply.data = {
                            win: win,
                            fish: fish_array,
                            seat: player.seatId,
                            credits:player.balance,
                            id: player.multiBombSkillSet.id,
                            big_bomb_times_target: player.multiBombSkillSet.big_bomb_times_target,
                            total_win: player.multiBombSkillSet.total_win,
                            big_bomb_times_cnt: player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt,
                            odds: odds_array,
                            small_bomb_times_cnt: player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt,
                            small_bomb_times_target: player.multiBombSkillSet.small_bomb_times_target,
                            continue: true,
                            timestamp: parseInt(new Date().getTime()/1000),
                            bet: player.bet_value
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            rockSkeletonReply.data.continue = false;                            
                        }
                        player.room.sendToAllUsers(rockSkeletonReply);
                        await player.updateBankDirect(0, win);
                        await player.updateBalance();
                        break;
                    case 'sk_KingKong_bomb_range':
                        var rockSkeletonReply = {
                            sys: 'skill',
                            cmd: 'sk_KingKong_bomb_range',
                            data:{

                            }
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }

                        var win = 0;
                        var fish_array = [];
                        var odds_array = [];
                        var odd_per_bomb = 0;
                        try
                        {
                            gameData.data.fish.forEach(fishId => {                                                       
                                var temp = player.room.fishInfos.find(x => x.id == fishId);
                                if(temp != undefined && temp.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > temp.odds && temp.odds < 20)
                                {
                                    win += temp.odds * player.multiBombSkillSet.bet_value;
                                    fish_array.push(temp.id);
                                    odds_array.push(temp.odds);
                                    player.room.fishOut(temp.id);
                                    player.multiBombSkillSet.expectedOdds -= temp.odds;
                                    odd_per_bomb += temp.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    }   
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e
                        }
                        player.multiBombSkillSet.bomb_exploded++;
                        player.balance += win;
                        player.multiBombSkillSet.total_win += win;
                        rockSkeletonReply.data = {
                            win: win,
                            fish: fish_array,
                            seat: player.seatId,
                            credits:player.balance,
                            id: player.multiBombSkillSet.id,
                            big_bomb_times_target: player.multiBombSkillSet.big_bomb_times_target,
                            total_win: player.multiBombSkillSet.total_win,
                            big_bomb_times_cnt: player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt,
                            odds: odds_array,
                            small_bomb_times_cnt: player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt,
                            small_bomb_times_target: player.multiBombSkillSet.small_bomb_times_target,
                            continue: true,
                            timestamp: parseInt(new Date().getTime()/1000),
                            bet: player.bet_value
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            rockSkeletonReply.data.continue = false;                            
                        }
                        player.room.sendToAllUsers(rockSkeletonReply);
                        await player.updateBankDirect(0, win);
                        await player.updateBalance();
                        break;
                    case 'sk_CircusPig_bomb_range':
                        response = {
                            cmd: 'sk_CircusPig_bomb_range',
                            sys: 'skill',
                            data: {
                                odds: [],
                                fish: []
                            }
                        }

                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }

                        response.data.coordinateX = gameData.data.coordinateX;
                        response.data.coordinateY = gameData.data.coordinateY;
                        response.data.bet = player.bet_value;
                        response.data.seat = player.seatId;
                        var total_win = 0;
                        var oddLimit = 15;
                        var odd_per_bomb = 0;
                        try{
                            gameData.data.fish.forEach(fishId => {
                                var fish_id = parseInt(fishId);
                                var targetFish = player.room.fishInfos.find(x => x.id == fish_id)
                                if(targetFish != undefined && targetFish.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > targetFish.odds && targetFish.odds <= oddLimit)
                                {
                                    response.data.odds.push(targetFish.odds);
                                    response.data.fish.push(targetFish.id);
                                    total_win += player.multiBombSkillSet.bet_value * targetFish.odds;
                                    player.room.fishOut(targetFish.id);
                                    player.multiBombSkillSet.expectedOdds -= targetFish.odds;
                                    odd_per_bomb += targetFish.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    } 
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e;
                        }
                        player.multiBombSkillSet.bomb_exploded++;
                        player.multiBombSkillSet.total_win += total_win;
                        response.data.total_win = player.multiBombSkillSet.total_win;
                        response.data.win = total_win;
                        response.data.big_bomb_times_target = player.multiBombSkillSet.big_bomb_times_target;
                        response.data.big_bomb_times_cnt = player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt;
                        response.data.small_bomb_times_cnt = player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt;
                        response.data.small_bomb_times_target = player.multiBombSkillSet.small_bomb_times_target;
                        response.data.continue = true;
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            response.data.continue = false;
                            setTimeout(function(){player.room.activeSkill = '';},10*1000);
                            player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);                            
                        }
                        player.balance += total_win;
                        response.data.credits = player.balance;
                        await player.updateBankDirect(0, total_win);
                        await player.updateBalance();
                        player.room.sendToAllUsers(response);
                        response = null;
                        break;                        
                    case 'sk_TurtleBoss_bomb_range':
                        var turtleReply = {
                            sys: 'skill',
                            cmd: 'sk_TurtleBoss_bomb_range',
                            data:{

                            }
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }

                        var win = 0;
                        var fish_array = [];
                        var odds_array = [];
                        var odd_per_bomb = 0;
                        try
                        {
                            gameData.data.fish.forEach(fishId => {                            
                                var temp = player.room.fishInfos.find(x => x.id == fishId);
                                if(temp != undefined && temp.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > temp.odds && temp.odds < 20)
                                {
                                    win += temp.odds * player.multiBombSkillSet.bet_value;
                                    fish_array.push(temp.id);
                                    odds_array.push(temp.odds);
                                    player.room.fishOut(temp.id);
                                    player.multiBombSkillSet.expectedOdds -= temp.odds;
                                    odd_per_bomb += temp.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    }
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e
                        }
                        player.multiBombSkillSet.bomb_exploded++;
                        player.balance += win;
                        player.multiBombSkillSet.total_win += win;
                        turtleReply.data = {
                            win: win,
                            fish: fish_array,
                            seat: player.seatId,
                            credits:player.balance,
                            id: player.multiBombSkillSet.id,
                            big_bomb_times_target: player.multiBombSkillSet.big_bomb_times_target,
                            total_win: player.multiBombSkillSet.total_win,
                            big_bomb_times_cnt: player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt,
                            odds: odds_array,
                            small_bomb_times_cnt: player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt,
                            small_bomb_times_target: player.multiBombSkillSet.small_bomb_times_target,
                            continue: true,
                            timestamp: parseInt(new Date().getTime()/1000),
                            bet: player.multiBombSkillSet.bet_value
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            turtleReply.data.continue = false;
                            setTimeout(function(){player.room.activeSkill = '';},13*1000);
                            player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                            
                        }
                        player.room.sendToAllUsers(turtleReply);
                        await player.updateBankDirect(0,win);
                        await player.updateBalance();
                    break;
                    case 'sk_LuckyBuddha_finish':
                        player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                        player.room.activeSkill = '';
                        break;
                    case 'sk_LionDance_finish':
                        var lionDanceReply = {
                            sys: 'skill',
                            cmd: 'sk_LionDance_finish',
                            sn: gameData.sn,
                            data:{
                            }
                        }
                        player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                        player.room.sendToAllUsers(lionDanceReply);
                        player.room.activeSkill = '';
                        break;
                    case 'sk_LuckyCat_finish':
                        var luckyCatReply = {
                            sys: 'skill',
                            cmd: 'sk_LuckyCat_finish',
                            sn: gameData.sn,                            
                        }
                        player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                        player.room.sendToAllUsers(luckyCatReply);
                        player.room.activeSkill = '';
                        break;
                    case 'sk_CircusClown_finish':
                        player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                        player.room.activeSkill = '';
                        break;
                    case 'sk_CircusTiger_finish':
                        break;
                    case 'sk_RedDragon_bomb_range':
                        var rockSkeletonReply = {
                            sys: 'skill',
                            cmd: 'sk_RedDragon_bomb_range',
                            data:{
    
                            }
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.small_bomb_times_cnt--;
                        }
                        else if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt > 0)
                        {
                            player.multiBombSkillSet.big_bomb_times_cnt--;
                        }
                     
                        var win = 0;
                        var fish_array = [];
                        var odds_array = [];
                        var odd_per_bomb = 0;
                        try
                        {
                            gameData.data.fish.forEach(fishId => {                            
                                var temp = player.room.fishInfos.find(x => x.id == fishId);
                                if(temp != undefined && temp.fishTypeGroup == 'normal' && player.multiBombSkillSet.expectedOdds > temp.odds && (temp.odds < 30 || player.multiBombSkillSet.bomb_exploded >= player.multiBombSkillSet.small_bomb_times_target))
                                {
                                    win += temp.odds * player.multiBombSkillSet.bet_value;
                                    fish_array.push(temp.id);
                                    odds_array.push(temp.odds);
                                    player.room.fishOut(temp.id);
                                    player.multiBombSkillSet.expectedOdds -= temp.odds;
                                    odd_per_bomb += temp.odds;
                                    if(player.multiBombSkillSet.bomb_exploded < player.multiBombSkillSet.small_bomb_times_target)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.small_bomb_limit)
                                            throw 'Break'
                                    }
                                    else if(player.multiBombSkillSet.big_bomb_times_cnt > 0)
                                    {
                                        if(odd_per_bomb >= player.multiBombSkillSet.big_bomb_limit)
                                            throw 'Break';
                                    }
                                }
                            });
                        }catch(e)
                        {
                            if (e !== 'Break') throw e
                        }
                        player.balance += win;
                        player.multiBombSkillSet.total_win += win;
                        player.multiBombSkillSet.bomb_exploded++;
                        rockSkeletonReply.data = {
                            win: win,
                            fish: fish_array,
                            seat: player.seatId,
                            credits:player.cashable_balance,
                            id: player.multiBombSkillSet.id,
                            total_win: player.multiBombSkillSet.total_win,
                            odds: odds_array,
                            big_bomb_times_target: player.multiBombSkillSet.big_bomb_times_target,                            
                            big_bomb_times_cnt: player.multiBombSkillSet.big_bomb_times_target - player.multiBombSkillSet.big_bomb_times_cnt,                            
                            small_bomb_times_cnt: player.multiBombSkillSet.small_bomb_times_target - player.multiBombSkillSet.small_bomb_times_cnt,
                            small_bomb_times_target: player.multiBombSkillSet.small_bomb_times_target,
                            continue: true,
                            timestamp: parseInt(new Date().getTime()/1000),
                            bet: player.multiBombSkillSet.bet_value
                        }
                        if(player.multiBombSkillSet.small_bomb_times_cnt == 0 && player.multiBombSkillSet.big_bomb_times_cnt == 0)
                        {
                            rockSkeletonReply.data.continue = false;                            
                            player.lastSkillDate.setTime(new Date().getTime() - 61 * 1000);
                        }
                        player.room.sendToAllUsers(rockSkeletonReply);
                        await player.updateBankDirect(0,win);
                        await player.updateBalance();
                        break;
                    case 'sk16':
                        break;
                    case 'f0':
                        response = gameData;
                        player.room.fishOut(gameData.data[1]);                        
                        break;
                    case 'fish_army_add':
                        player.room.addArmyFish(gameData.data[1]);                        
                        break;                        
                }
                sendWSMessage(ws, response);
            }
            catch(exception)
            {
                // console.log("exception: " + exception);
                console.error(exception.stack);
                ws.close();
            }
        });


    });

    console.log("Starting game server at " + serverConfig.port);
}


function startAuthServer()
{
    wss_auth.on('connection', (ws) => {
        ws.on('close', async (error)=>{
            console.log("disconnecting user: " + ws.player + " error: " + error);
        });
        ws.on('message', async (message) =>
        {
            message = message.toString().replace(':::', '');     
            // console.log("auth message: " + message);
            var param = JSON.parse(message);
            var gameData = param.gameData;
            var response = null;
            switch(gameData.cmd) {
                case 'auth':
                    response = {
                        data : {
                            'status': 0
                        },
                        ret: gameData.cmd,
                        sn: gameData.sn,
                        sys: "null"
                    };
                    ws.player = gameData.data.ark_id;
                    console.log("A user is connected to auth server");
                    break;
                case 'pin':
                    response = {
                        data: {
                            result: 0
                        },
                        ret: gameData.cmd,
                        sn: gameData.sn,
                        sys: gameData.sys
                    }                    
                    break;
                case 'alive':
                case 'jp':
                    response = {
                        data: {
                            data: {
                                jp_rate: "0.000001",
                                exchange_rate: 0.01,
                                jp1: 126473915000,
                                jp0: 529236370000,
                                jp2: 2267000000,
                                jp3: 32283975000,
                                group: 'Fish'
                            },
                            result: "0"
                        },
                        sys: "jp",
                        sn: gameData.sn,
                        ret: gameData.cmd
                    }
                    break;
                    
                case 'ingame_jp':
                    response = {
                        data: {
                            data: {
                                chicken_dinner: {
                                    ratio_rate: 0.01,
                                    jp_rate: "0.000001",
                                    jp1: 167692875000,
                                    jp3: 1000000000,
                                    jp2: 10000000000,
                                    jp4: 0
                                },
                                power_link: {
                                    ratio_rate: 0.01,
                                    jp_rate: "0.000001",
                                    jp1: 115468550000,
                                    jp3: 6462400000,
                                    jp2: 55812700000,
                                    jp4: 1057500000
                                }
                            },
                            result: "0"
                        },
                        sys: "jp",
                        sn: gameData.sn,
                        ret: gameData.cmd
                    }
                    break;
            }
            sendWSMessage(ws, response);
        });
    });

    console.log("Starting auth server at " + serverConfig.port);
}


server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    console.log('incoming socket request: ' + pathname);
    if (pathname === '/') {
        wss_auth.handleUpgrade(request, socket, head, function done(ws) {
            wss_auth.emit('connection', ws, request);
        });
    } else if (pathname.length > 2) {
        wss_game.handleUpgrade(request, socket, head, function done(ws) {
            wss_game.emit('connection', ws, request);
        });
    } else {
    socket.destroy();
    }
});

server.listen(serverConfig.port);

loadFishInfo();
startAuthServer();
startGameServer();

