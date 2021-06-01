APP.Keydown_Handler = function (event) {
    "use strict";

    var KEYS = {
        LEFT    : 37,
        UP      : 38,
        RIGHT   : 39,
        DOWN    : 40
    };

    switch (event.keyCode) {
    case KEYS.UP:
        APP.player.direction = APP.Direction.UP;
        break;
    case KEYS.RIGHT:
        APP.player.direction = APP.Direction.RIGHT;
        break;
    case KEYS.DOWN:
        APP.player.direction = APP.Direction.DOWN;
        break;
    case KEYS.LEFT:
        APP.player.direction = APP.Direction.LEFT;
        break;
    }
};