(function () {
    "use strict";

    APP.Show_World = function () {

        var i,
            dots = 0;

        dots = APP.map.Draw();

        if (!dots) {
            APP.Game_Over("YOU WIN!");
        }

        for (i = 0; i < APP.MONSTERS_QUANTITY; i++) {
            if (APP.monsters[i].x === APP.player.x) {
                if (APP.monsters[i].y === APP.player.y) {
                    APP.Game_Over("YOU LOSE!");
                }
            }
        }

        APP.monsters.Move();
        APP.player.Move();

        APP.player.Check_For_Dots();

        APP.portals.Show();
        APP.player.Show();
        for (i = 0; i < APP.MONSTERS_QUANTITY; i++) {
            APP.monsters[i].Show();
        }

    };

    APP.map.Draw = function () {
        var i,
            j,
            image,
            x,
            y,
            dot_counter = 0;

        for (i = 0; i < APP.MAP_WIDTH; i++) {
            for (j = 0; j < APP.MAP_HEIGHT; j++) {

                image = APP.images[APP.map.cells[j][i]];
                x = i * APP.CELL_WIDTH;
                y = j * APP.CELL_HEIGHT;

                APP.context.drawImage(image, x, y);

                if (APP.map.cells[j][i] === APP.DOT_CELL_DIGIT) {
                    dot_counter++;
                }
            }
        }

        return dot_counter;
    };

    APP.monsters.Move = function () {
        var i;

        for (i = 0; i < APP.MONSTERS_QUANTITY; i++) {
            if (APP.monsters[i].frame === APP.monsters[i].speed) {
                if (APP.monsters[i].direction !== APP.Direction.STOP) {
                    APP.monsters[i].previus_direction =
                        APP.monsters[i].direction;
                }
                APP.monsters[i].Select_Direction();
                APP.monsters[i].Check_Direction();
                APP.monsters[i].Check_Wall();
            }

            if (APP.monsters[i].direction !== APP.Direction.STOP) {
                if (APP.monsters[i].up) {
                    APP.monsters[i].Move_Up();
                }
                if (APP.monsters[i].down) {
                    APP.monsters[i].Move_Down();
                }
                if (APP.monsters[i].left) {
                    APP.monsters[i].Move_Left();
                }
                if (APP.monsters[i].right) {
                    APP.monsters[i].Move_Right();
                }
            }
        }
    };

    APP.player.Move = function () {
        if (APP.player.frame === APP.player.speed) {
            APP.player.Check_Direction();
            APP.player.Check_Wall();
        }

        if (APP.player.direction !== APP.Direction.STOP) {
            if (APP.player.up) {
                APP.player.Move_Up();
            }
            if (APP.player.down) {
                APP.player.Move_Down();
            }
            if (APP.player.left) {
                APP.player.Move_Left();
            }
            if (APP.player.right) {
                APP.player.Move_Right();
            }
        }
    };

    APP.player.Check_For_Dots = function () {
        if (APP.map.marks[APP.player.y][APP.player.x] === APP.DOT_MARK) {
            APP.player.bonuses++;
            APP.map.marks[APP.player.y][APP.player.x] = APP.BLANK_MARK;
            APP.map.cells[APP.player.y][APP.player.x] = APP.BLANK_CELL_DIGIT;
        }
    };

    APP.player.Show = function () {

        var figure_offset = 5,
            frame_number = 2 - Math.floor(this.frame / 3),
            frame_offset = 1 - this.frame / this.speed,
            image,
            x,
            y;

        if (this.up) {

            image = this.up_images[frame_number];
            x = (this.x * APP.CELL_WIDTH) - figure_offset;
            y = ((this.y - frame_offset) * APP.CELL_HEIGHT) - figure_offset;

        } else if (this.down) {

            image = this.down_images[frame_number];
            x = (this.x * APP.CELL_WIDTH) - figure_offset;
            y = ((this.y + frame_offset) * APP.CELL_HEIGHT) - figure_offset;

        } else if (this.right) {

            image = this.right_images[frame_number];
            x = ((this.x + frame_offset) * APP.CELL_WIDTH) - figure_offset;
            y = (this.y * APP.CELL_HEIGHT) - figure_offset;

        } else {

            image = this.left_images[frame_number];
            x = ((this.x - frame_offset) * APP.CELL_WIDTH) - figure_offset;
            y = (this.y * APP.CELL_HEIGHT) - figure_offset;

        }

        APP.context.drawImage(image, x, y);
    };

    APP.portals.Show = function () {
        
        var offset,
            frame_offset,
            sw = +!this.raise;
        
        frame_offset = sw - this.frame_counter / (this.speed * APP.GAME_FPS);

        offset = Math.abs(this.width * frame_offset);

        APP.context.drawImage(this[0].image, this[0].x - offset, this[0].y);
        APP.context.drawImage(this[1].image, this[1].x + offset, this[1].y);

        this.frame_counter++;

        if (this.frame_counter === this.speed * APP.GAME_FPS) {
            this.frame_counter = 0;
            this.raise = !this.raise;
        }
    };

    APP.Show_Monster = function () {
        var figure_offset = 15,
            frame_offset = 1 - this.frame / this.speed,
            image,
            x,
            y;

        if (this.up) {

            image = this.up_images[0];
            x = (this.x * APP.CELL_WIDTH) - figure_offset;
            y = ((this.y - frame_offset) * APP.CELL_HEIGHT) - figure_offset;

        } else if (this.down) {

            image = this.down_images[0];
            x = (this.x * APP.CELL_WIDTH) - figure_offset;
            y = ((this.y + frame_offset) * APP.CELL_HEIGHT) - figure_offset;

        } else if (this.right) {

            image = this.right_images[0];
            x = ((this.x + frame_offset) * APP.CELL_WIDTH) - figure_offset;
            y = (this.y * APP.CELL_HEIGHT) - figure_offset;

        } else {

            image = this.left_images[0];
            x = ((this.x - frame_offset) * APP.CELL_WIDTH) - figure_offset;
            y = (this.y * APP.CELL_HEIGHT) - figure_offset;

        }

        APP.context.drawImage(image, x, y);
    };

    APP.Game_Over = function (condition) {
        clearInterval(APP.timer);
        APP.blackout = document.getElementById("blackout");
        APP.blackout.textContent = condition;
        APP.blackout.style.visibility = "visible";
        APP.blackout.style.opacity = 0.7;
    };

})();