const Game = function(){
    let state = {
        cardA: null,
        cardB: null,
        isMatching: false,
        remainingMoves: 3
    }

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function closeCard(card) {
        card.classList.remove("open");
        card.classList.remove("show");
    }

    function unmatch(card) {
        card.classList.remove("match");
    }

    function isMatched(card) {
        return card.classList.contains("match");
    }

    function isOpened(card) {
        return card.classList.contains("open");
    }

    function match(card) {
        card.classList.add("match");
    }

    function open(card) {
        card.classList.add("open");
    }

    function getCardValue(card){
        return card.children[0].className.replace('fa ', '')
    }

    function bindClickEvent(cards){
        cards.forEach(card => {
            card.addEventListener("click", (e) => {
                if(isOpened(card) || isMatched(card)){
                    return;
                }

                if(state.isMatching){
                    if(getCardValue(state.cardA) === getCardValue(card)){
                        open(card);
                        match(card)
                        open(state.cardA);
                    }else{
                        unmatch(state.cardA)
                        closeCard(state.cardA)
                        state.remainingMoves--;
                        document.querySelector('.moves').textContent = state.remainingMoves;
                        if(state.remainingMoves < 0){
                            alert('Game Over')
                        }
                    }

                    state.isMatching = false;
                    state.cardA = null;
                } else{
                    state.isMatching = true;
                    state.cardA = card;
                    match(card)
                }
            }, false);
        });
    }

    return {
        init: function(){
            var cards = document.querySelectorAll('li');
            shuffle(cards);
            cards.forEach(card => {
                closeCard(card)
                unmatch(card)
            });
            bindClickEvent(cards);
        }
    }
}

let game = new Game();
game.init();