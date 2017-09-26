//Trump = player 1 = red; Putin = player 2 = yellow

(function(){
    var slots = $('.slots');
    var curPlayer = 'red';

//welcome message
    setTimeout (function hideWelcome (){
        $('#welcome').hide();
        $('#overlay').hide();
    },5000);

//define active slots
    slots.on('mousedown', function(e){
        var curSlot=$(e.target);
        var cols= $('.col' +column);
        var rows=$('.row'+row);
        var column;
        var row;
        if (curSlot.hasClass('col0')) {
            column=0;
        }
        for (var i=0;i<7;i++) { //find column mates
            if (curSlot.hasClass ('col'+i)) {
                column=i;
                break;
            }
        }
        var elems= $('.col' +column);
        var lowestEmpty;

        for (i=elems.length-1;i>=0;i--) {//find lowest empty in column
            if (!elems.eq(i).hasClass('red') && !elems.eq(i).hasClass('yellow')) {
                lowestEmpty=elems.eq(i);
                var row=i;
                break;
            }
        }

        if (lowestEmpty[0] == curSlot[0]) {
            curSlot.addClass('activeslot');
            curSlot.addClass(curPlayer);

            checkCols($('.col' +column));
            checkRows($('.row' +row));
            checkDiag(slots);

            if (checkCols($('.col' +column))) {
                victory();
            } else if (checkRows($('.row' +row))) {
                victory();
            } else if (checkDiag(slots)) {
                victory();
            } else {
                switchPlayer();
            }

//player switch
            function switchPlayer() {
                if (curPlayer=='red') {
                    curPlayer='yellow';
                } else {
                    curPlayer='red';
                }
            }
        }
//trying to play in an invalid slot
        else {
            console.log('no play here sucka');
            curSlot.addClass('invalidslot');
        }
    });

//declare victory check functions
    //check columns for victory
    function checkCols(cols) {
        column=0;
        var count=0;
        for (var i=0; i<cols.length; i++) {
            if (cols.eq(i).hasClass(curPlayer)) {
                count++;
                if (count===4) {
                    return true;
                }
            } else {
                count=0;
            }
        }
    }
    //check rows for victory
    function checkRows(rows) {
        var count=0;
        row=0;
        for (var i=0;i<rows.length;i++) {
            if (rows.eq(i).hasClass(curPlayer)) {
                count++;
                if (count===4) {
                    return true;
                }
            } else {
                count=0;
            }
        }
    }
    //check diagonals for victory
    var victories = [
        [35, 29, 23, 17],
        [36, 30, 24, 18],
        [37, 31, 25, 19],
        [38, 32, 26, 20],
        [38, 30, 22, 14],
        [39, 31, 23, 15],
        [40, 32, 24, 16],
        [41, 33, 25, 17],
        [28, 22, 16, 10],
        [29, 23, 17, 11],
        [30, 24, 18, 12],
        [31, 25, 19, 13],
        [31, 23, 15, 7],
        [32, 24, 16, 8],
        [33, 25, 17, 9],
        [34, 26, 18, 10],
        [21, 15, 9, 3],
        [22, 16, 10, 4],
        [23, 17, 11 ,5],
        [24, 18, 12, 6],
        [24, 16, 8, 0],
        [25, 17, 9, 1],
        [26, 18, 10, 2],
        [27, 19, 11, 3]
    ];

    var diagsToCheck = victories.map(function(arr) {
        return arr.map(function(index) {
            return slots.eq(index);
        });
    });

    function checkDiag(slots) {
        var elems;
        for (var i = 0; i < slots.length; i++) {
            console.log('checkdiags');
            elems = [slots.eq(i), slots.eq(i-6), slots.eq(i-12),  slots.eq(i-18)];
            if (checkForVictory(elems)) {
                return true;
            } else {
                elems = [slots.eq(i), slots.eq(i-8), slots.eq(i-16),  slots.eq(i-24)];
                if (checkForVictory(elems)) {
                    return true;
                }
            }
        }
    }

    function checkForVictory(elems) {
        var count = 0;
        for (var i = 0; i < elems.length; i++) {
            if ($(elems[i]).hasClass(curPlayer)) {
                count++;
                if (count === 4) {
                    return true;
                }
            }
        }
    }

    //victory messages
    function victory() {
        if (curPlayer=='red') {
            setTimeout(function() {
                $('#victory').show();
                $('#overlay').show();
                $('#happyVP').hide();
                $('#happyDT').show();
                $('<h2>Don T Wins! Making Connect4 Great Again</h2>').addClass('dtwin').css({color:'#2C3539'}).appendTo('#victory');
            },500);
        }

        else if (curPlayer=='yellow') {
            setTimeout(function(){
                $('#victory').show();
                $('#overlay').show();
                $('#happyDT').hide();
                $('#happyVP').show();
                $('<h2>Vlad P Wins. В Москву, товарищи!</h2>').css({color:'#2C3539'}).appendTo('#victory');
            },500);
        }
    }

    //board reset
    $('#reset').on('mousedown', function (){
        slots.removeClass('red');
        slots.removeClass('yellow');
        slots.removeClass('invalidslot');
        $('#victory').hide();
        $('#overlay').hide();
        $('h2').remove();
        curPlayer='red';
    });

})();
