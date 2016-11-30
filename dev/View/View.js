/**
 * Created by clicktronix on 23.11.16.
 */

import $ from 'jquery';

class View {
    constructor(length) {
        this.width = this.height = length;
        this.stage = new createjs.Stage('action-screen');

        const $body = $('body');
        const $startButton = $('.js-start-button');
        const $stepButton = $('.js-step-button');
        const $pauseButton = $('.js-pause-button');
        const $clearButton = $('.js-clear-button');

        function updateAndDraw(event) {
            if (!event.paused) {
                const $event = $.Event('step');
                $body.trigger($event);
            }
        }

        $startButton.on('click', function () {
            createjs.Ticker.addEventListener('tick', updateAndDraw);
            createjs.Ticker.setPaused(false);
            createjs.Ticker.setInterval(200);
        });

        $pauseButton.on('click', function () {
            createjs.Ticker.setPaused(true);
        });

        $stepButton.on('click', function () {
            const $event = $.Event('step');
            $body.trigger($event);
        });

        $clearButton.on('click', function () {
            createjs.Ticker.removeEventListener('tick', updateAndDraw);
            const $event = $.Event('clear');
            $body.trigger($event);
        });
    }
}

View.prototype.draw = function (cellsArray) {
    this.stage.removeAllChildren();
    this.stage.update();
    for (let i = 0; i < this.width; i += 1) {
        for (let j = 0; j < this.height; j += 1) {
            const currentCell = cellsArray[i][j];
            if (currentCell.status === currentCell.alive) {
                currentCell.makeAlive();
            } else {
                currentCell.makeDead();
            }
            currentCell.shape.x = i * 15;
            currentCell.shape.y = j * 15;
            this.stage.addChild(currentCell.shape);
            currentCell.shape.addEventListener('click',
                this.toggleCellAt(cellsArray, i, j, currentCell));
        }
    }
    this.stage.update();
};

View.prototype.toggleCellAt = function (cellsArray, i, j) {
    const self = this;
    return function () {
        const currentCell = cellsArray[i][j];
        if (currentCell.status === currentCell.alive) {
            currentCell.makeDead();
        } else {
            currentCell.makeAlive();
        }
        currentCell.shape.x = i * 15;
        currentCell.shape.y = j * 15;
        self.stage.update();
    };
};

export default View;