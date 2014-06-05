var gameStats = function (playerLifeInitial) {
    var playerLifePrivate = playerLifeInitial;

    var paper = Raphael("gameStatsDiv", '100%', 50);

    var text = paper.text(25, 10, "Life:")
        .attr({
            fill: 'yellow',
            'font-size': 18,
            'font-weight': 'bold'
        });

    var lifeBarFull = paper.rect(10, 25, 200, 15)
        .attr({ fill: 'red' });

    var lifeBar = paper.rect(10, 25, playerLifePrivate, 15)
        .attr({ fill: 'green' });

    // Return public vars/methods
    return {
        lifeBarUpdate: function () {
            lifeBar.animate({
                width: playerLifePrivate
            }, 1000);
        },
        setPlayerLife: function (val) {
            playerLifePrivate = val;
        }
    };
};