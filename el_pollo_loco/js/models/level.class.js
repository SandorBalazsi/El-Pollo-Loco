class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusbar;
    endBossStatusBar;
    coin_bar;
    coin;
    bottle;
    level_end_x = 3690;

    constructor(enemies, clouds, backgroundObjects, statusbar, endBossStatusBar, coin_bar,  coin, bottle){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
        this.endBossStatusBar = endBossStatusBar;
        this.coin_bar = coin_bar;
        this.coin = coin;
        this.bottle = bottle;
    }
}