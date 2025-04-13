// TODO: wrap this in a self executing function to avoid overriding
// some other global function Config
function Config()
{
    this.reelWidth = 172 ;
    this.reelHeight = 516;
    this.reelSpacing = 17;

    this.numImages = 8;
    this.numReels = 5;
    this.numReelCards = 3;
    this.wildIndex = -1;
    this.linesCount = [1, 2, 3, 4, 5];
    this.fixedLinesCount = true;

    this.coinAnimationCoef = 20;

    this.linesSelectActiveColor = 0xfeff73;
    this.linesSelectInactiveColor = 0xffffff;
    this.linesSelectActiveGlowColor = 0xc50000;
    this.linesSelectInactiveGlowColor = 0x180000;
    this.gameNumberTimeHelpColor = 0xfe9c3c;
    this.labelsColor = 0xd16d00;
    this.bonusPopUpStrokeColor = 0xd16d00;

    this.toolTipMainTextColor = 0xFFFFFF;
    this.toolTipUsernameTextColor = 0xd16d00;
    this.toolTipWinAmountTextColor = 0xFFFFFF;
    this.toolTipCurrencyTextColor = 0xd16d00;
    this.toolTipDateTextColor = 0xbfbfbf;
    this.toolTipNumberOfWinnersTextColor = 0xd16d00;
    this.toolTipDateSeparator = "/";
    this.paytableExitColor = 0x580000;
    this.paytablePageCount = 4;
    this.paytableGamblePage = 1;

    this.scatterConfig  = [
        {index: 6, minCount: 3, validReels: [ true, true, true, true, true ],
            stopSounds:["stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound"]}
       ];

    this.reelVideos = [
        {src:["images/videos/00-0.json", "images/videos/00-1.json", "images/videos/00-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/01-0.json", "images/videos/01-1.json", "images/videos/01-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/02-0.json", "images/videos/02-1.json", "images/videos/02-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/03-0.json", "images/videos/03-1.json", "images/videos/03-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/04-0.json", "images/videos/04-1.json", "images/videos/04-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/05-0.json", "images/videos/05-1.json", "images/videos/05-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/06-0.json", "images/videos/06-1.json", "images/videos/06-2.json"], fps: 10, loopIndex: 37},
        {src:["images/videos/07-0.json", "images/videos/07-1.json", "images/videos/07-2.json"], fps: 10, loopIndex: 37}];



    this.reelImages = ["reelImages.json"];

    this.linesCoords = [
        {coords:[184,320, 1095,320], color:0xfff221},
        {coords:[184,150, 1095,150], color:0xf9af0c},
        {coords:[184,497, 1095,497], color:0x17e614},
        {coords:[184,149, 259,149, 640,566, 1018,149, 1095,149], color:0xdf3d3d},
        {coords:[184,515, 259,515, 640,93, 1018,515, 1095,515], color:0xc90404}
    ];

    this.fullLineSounds = [
        {card:0, name:"fullLine1"}, {card:1, name:"fullLine2"},
        {card:2, name:"fullLine2"}, {card:3, name:"fullLine1"},
        {card:4, name:"fullLine3"}, {card:5, name:"fullLine3"},
        {card:7, name:"fullLine4"}];

    this.gameSounds = [
        {
            src: "shortSounds.mp3", sounds:[
                {name: "stopScatterSound", start:0, duration: 0.36},
                {name: "reelAccelerateSound", start:1, duration: 2.04}
            ]
        },
        {
            src: "winSounds.mp3", sounds:[
                {name: "win0", start:0, duration: 1.56},
                {name: "win1", start:6, duration: 1.36},
                {name: "win2", start:4, duration: 1.67},
                {name: "win3", start:8, duration: 1.88},
                {name: "win4", start:10, duration: 1.7},
                {name: "win5", start:2, duration: 1.335},
                {name: "win6", start:16, duration: 4.04},
                {name: "win7", start:12, duration: 3.29},
                {name: "creditAnimationSound", start:21, duration: 10.0}]
        }];

    this.helpLanguages = ["en", "bg", "ro", "es", "it", "pt", "da", "sv"];
    this.paytableLanguages = ['en', 'bg', 'ru', 'mk', 'fr', 'nl', 'es','ro','pt','it', 'da','hu', 'sv', 'de'];
}

com.egt.baseslot.Config = Config;
com.egt.baseslot.buildTime = 1562835494834;