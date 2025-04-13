// TODO: wrap this in a self executing function to avoid overriding
// some other global function Config
function Config() {
    this.reelWidth = 172;
    this.reelHeight = 516;
    this.reelSpacing = 17;

    this.numImages = 10;
    this.numReels = 5;
    this.numReelCards = 4;
    this.wildIndex = 8;
    this.linesCount = [1, 10, 20, 30, 40];
    this.fixedLinesCount = true;

    this.coinAnimationCoef = 20;

    this.linesSelectActiveColor = 0xffe900;
    this.linesSelectInactiveColor = 0x682f0e;
    this.linesSelectActiveGlowColor = 0xcc0202;
    this.linesSelectInactiveGlowColor = 0xffffff;
    this.gameNumberTimeHelpColor = 0xcf7717;
    this.labelsColor = 0xcf7717;
    this.paytableExitColor = 0x4c0402;

    this.toolTipMainTextColor = 0xFFFFFF;
    this.toolTipUsernameTextColor = 0xcf7717;
    this.toolTipWinAmountTextColor = 0xFFFFFF;
    this.toolTipCurrencyTextColor = 0xcf7717;
    this.toolTipDateTextColor = 0xbfbfbf;
    this.toolTipNumberOfWinnersTextColor = 0xcf7717;
    this.toolTipDateSeparator = "/";

    this.paytablePageCount = 4;
    this.paytableGamblePage = 1;

    this.scatterConfig = [
        {
            index: 9, minCount: 3, validReels: [true, true, true, true, true],
            stopSounds: ["stopScatterSound_1", "stopScatterSound_2", "stopScatterSound_3", "stopScatterSound_4", "stopScatterSound_5"]
        }];

    this.reelVideos = [
        {src: ["images/videos/00-0.json", "images/videos/00-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/01-0.json", "images/videos/01-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/02-0.json", "images/videos/02-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/03-0.json", "images/videos/03-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/04-0.json", "images/videos/04-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/05-0.json", "images/videos/05-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/06-0.json", "images/videos/06-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/07-0.json", "images/videos/07-1.json"], fps: 15, loopIndex: 15},
        {src: ["images/videos/08-0.json", "images/videos/08-1.json"], fps: 30},
        {src: ["images/videos/09-0.json", "images/videos/09-1.json"], fps: 22}];

    this.stopVideos = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {src: ["images/videos/stopVideo_09.json"], fps: 30}
    ];

    this.expandVideo = {src: ["images/videos/09expand-0.json"], fps: 15, scale: 1};

    this.reelImages = ["reelImages.json"];

    this.linesCoords = [
        {coords: [184, 256, 1095, 256], color: 0xc170c2},
        {coords: [184, 386, 1095, 386], color: 0xe0a23d},
        {coords: [184, 132, 1095, 132], color: 0xac53a1},
        {coords: [184, 509, 1095, 509], color: 0x4cc3b9},
        {coords: [184, 262, 277, 262, 636, 500, 1002, 262, 1095, 262], color: 0xb8d1da},
        {coords: [184, 379, 277, 379, 636, 141, 1002, 379, 1095, 379], color: 0x5ec5df},
        {coords: [184, 126, 438, 126, 1009, 503, 1095, 503], color: 0xd2cfbf},
        {coords: [184, 516, 438, 516, 1009, 138, 1095, 138], color: 0xa16a5f},
        {coords: [184, 392, 268, 392, 461, 516, 812, 516, 1002, 392, 1095, 392], color: 0xd579e1},
        {coords: [184, 249, 265, 249, 453, 126, 817, 126, 1014, 249, 1095, 249], color: 0x7ac496},
        {coords: [184, 139, 265, 139, 829, 516, 1095, 516], color: 0xc7c8e3},
        {coords: [184, 503, 265, 503, 832, 126, 1095, 126], color: 0x8f63c6},
        {coords: [184, 374, 257, 374, 461, 507, 823, 267, 1021, 397, 1095, 397], color: 0xa780d8},
        {coords: [184, 266, 254, 266, 460, 131, 822, 371, 1016, 244, 1095, 244], color: 0xfa668d},
        {coords: [184, 120, 250, 120, 451, 256, 636, 131, 821, 252, 1021, 120, 1095, 120], color: 0x957812},
        {coords: [184, 522, 250, 522, 451, 387, 636, 508, 821, 388, 1025, 522, 1095, 522], color: 0xd84950},
        {coords: [184, 244, 260, 244, 452, 370, 825, 122, 1054, 269, 1095, 269], color: 0x9bdef8},
        {coords: [184, 397, 255, 397, 452, 271, 822, 518, 1047, 372, 1095, 372], color: 0xa454b8},
        {coords: [184, 114, 253, 114, 448, 248, 815, 248, 1019, 114, 1095, 114], color: 0xb8dc50},
        {coords: [184, 526, 253, 526, 455, 390, 815, 390, 1023, 526, 1095, 526], color: 0xdebe36},
        {coords: [184, 238, 428, 238, 862, 531, 1095, 531], color: 0x4463e5},
        {coords: [184, 401, 431, 401, 871, 109, 1095, 109], color: 0xb6c7f3},
        {coords: [184, 144, 259, 144, 605, 377, 829, 377, 1012, 497, 1095, 497], color: 0xcb712},
        {coords: [184, 497, 263, 497, 618, 261, 833, 261, 1013, 143, 1095, 143], color: 0xd6e3d7},
        {coords: [184, 271, 277, 271, 439, 378, 839, 378, 1014, 492, 1095, 492], color: 0xe0a47e},
        {coords: [184, 368, 278, 368, 443, 261, 841, 261, 1015, 147, 1095, 147], color: 0x77847e},
        {coords: [184, 109, 435, 109, 634, 240, 842, 103, 1095, 103], color: 0x9b9f0d},
        {coords: [184, 531, 433, 531, 634, 398, 842, 535, 1095, 535], color: 0xd2b267},
        {coords: [184, 407, 473, 407, 636, 514, 807, 402, 1095, 402], color: 0x8c79b8},
        {coords: [184, 233, 476, 233, 636, 126, 808, 238, 1095, 238], color: 0x71b4e8},
        {coords: [184, 102, 611, 102, 1010, 365, 1095, 365], color: 0xe2aec3},
        {coords: [184, 535, 611, 535, 1010, 273, 1095, 273], color: 0x3eaec8},
        {coords: [184, 411, 290, 411, 455, 521, 642, 521, 1012, 278, 1095, 278], color: 0x784eb2},
        {coords: [184, 228, 287, 228, 452, 120, 649, 120, 1013, 360, 1095, 360], color: 0x1f7c94},
        {coords: [184, 148, 256, 148, 433, 267, 674, 267, 1011, 488, 1095, 488], color: 0x99c6d4},
        {coords: [184, 492, 260, 492, 438, 373, 676, 373, 1018, 152, 1095, 152], color: 0xc781d3},
        {coords: [184, 363, 255, 363, 476, 509, 1018, 156, 1095, 156], color: 0x98a9db},
        {coords: [184, 275, 247, 275, 475, 127, 1013, 482, 1095, 482], color: 0x708cb5},
        {coords: [184, 147, 253, 147, 831, 516, 993, 406, 1095, 406], color: 0x128bcd},
        {coords: [184, 488, 266, 488, 826, 113, 1011, 234, 1095, 234], color: 0x5fcefe}
    ];

    this.fullLineSounds = [
        {card: 0, name: "fullLine1"}, {card: 1, name: "fullLine1"},
        {card: 2, name: "fullLine1"}, {card: 3, name: "fullLine1"},
        {card: 4, name: "fullLine2"}, {card: 5, name: "fullLine2"},
        {card: 6, name: "fullLine3"}, {card: 7, name: "fullLine4"}];

    this.gameSounds = [
        {
            src: "shortSounds.mp3", sounds: [
                {name: "stopWildSound", start: 0, duration: 0.56},
                {name: "stopScatterSound_1", start: 1, duration: 0.6},
                {name: "stopScatterSound_2", start: 2, duration: 0.49},
                {name: "stopScatterSound_3", start: 3, duration: 0.64},
                {name: "stopScatterSound_4", start: 4, duration: 0.76},
                {name: "stopScatterSound_5", start: 5, duration: 0.8}]
        },
        {
            src: "winSounds.mp3", sounds: [
                {name: "win0", start: 0 , duration: 0.85},
                {name: "win1", start: 2 , duration: 2.19},
                {name: "win2", start: 5 , duration: 2.23},
                {name: "win3", start: 8 , duration: 1.79},
                {name: "win4", start: 11, duration: 2.38},
                {name: "win5", start: 14, duration: 1.64},
                {name: "win6", start: 17, duration: 2.0 },
                {name: "win7", start: 20, duration: 2.65},
                {name: "win8", start: 23, duration: 4.37},
 				{name: "win9", start: 23, duration: 4.27},
                {name: "creditAnimationSound", start: 28, duration: 10.0}]
        }];

    this.helpLanguages = ["en", "bg", "ro", "es"];
    this.paytableLanguages = ['en', 'bg', 'fr', 'nl'];
}

com.egt.baseslot.Config = Config;
com.egt.baseslot.buildTime = 1562835494834;