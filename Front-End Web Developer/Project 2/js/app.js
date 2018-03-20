const Game = function(){
    let state;

    function initGame(cards){
        resetGame(cards);
        document.querySelector('.restart').addEventListener("click", (e) => {
            resetGame(cards);
        }, false);
    }

    function resetGame(cards){
        document.querySelector('.moves').textContent = "0";

        shuffle(cards);
        cards.forEach(card => {
            closeCard(card)
            unmatch(card)
        });

        state = {
            matchingCard: null,
            isMatching: false,
            totalMoves: 0,
            matchedCards: []
        }
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
                    if(getCardValue(state.matchingCard) === getCardValue(card)){
                        open(card);
                        match(card)
                        open(state.matchingCard);
                        state.matchedCards.push(card);
                        state.matchedCards.push(state.matchingCard);

                        if(state.matchingCard.length == cards.length){
                            alert('you won!')
                        }
                    }else{
                        unmatch(state.matchingCard)
                        closeCard(state.matchingCard)
                        
                        state.totalMoves++;
                        document.querySelector('.moves').textContent = state.totalMoves;
                    }

                    state.isMatching = false;
                    state.matchingCard = null;
                } else{
                    state.isMatching = true;
                    state.matchingCard = card;
                    match(card)
                }
            }, false);
        });
    }

    return {
        init: function(){
            var cards = document.querySelectorAll('li');
            initGame(cards);
            bindClickEvent(cards);
        }
    }
}

let game = new Game();
game.init();