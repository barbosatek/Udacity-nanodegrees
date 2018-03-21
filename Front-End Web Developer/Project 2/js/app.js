// Fix shuffle
// Finish animation
// Implement Congratulations Popup
//  Track time
//  display star rating
// implement Star Rating
// Add readme
// Format / clean up
// Add comments

const CardState = function(value, index){
    return {
        value: value,
        isMatched: false,
        isOpened: false,
        index: index
    }
}

const Card = function(cardNode, value, index){
    cardNode.children[0].className = value;

    return {
        state: new CardState(value, index),
        node: cardNode,
        closeCard: function(){
            cardNode.classList.remove("open");
            cardNode.classList.remove("show");
            this.state.isOpened = false;
        },
        open: function(){
            cardNode.classList.add("open");
            cardNode.classList.add("show");
            this.state.isOpened = true;
        },
        match: function(){
            cardNode.classList.add("match");
            this.state.isMatched = true;
        },
        unmatch: function(){
            cardNode.classList.remove("match");
            this.state.isMatched = false;
        },
        isMatched: function(){
            return cardNode.classList.contains("match");
        },
        isOpened: function(){
            return cardNode.classList.contains("open");
        },
        getValue: function(){
            return cardNode.children[0].className.replace('fa ', '')
        },
        restoreFromState: function(state){
            if(state.isMatched){
                this.match();
            } else{
                this.unmatch();
            }

            if(state.isOpened){
                this.open();
            }else{
                this.closeCard();
            }

            cardNode.children[0].className = state.value;
        }
    }
}

const CarDeck = function(cardNodes){
    
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

    return {
        cards: cardNodes ? [...cardNodes.map((x, i) => new Card(x, x.children[0].className, i))] : [],
        shuffle: function(){
            shuffle([...this.cards.map(x => x.node)])
        },
        restoreFromState: function(cardStates){
            for(let i = 0; i < cardStates.length; i++){
                let card = this.cards[i];
                let state = cardStates[i]
                card.restoreFromState(state);

            }
        }
    }
}

const Game = function(){
    let state;
    let cardDeck;

    function initGame(cards){
        let storedState;
        try{
            storedState = JSON.parse(localStorage.getItem('Game.State'));
        } catch(e){
            console.log('Unable to deserialize state. State will be reset')
        }

        if(!storedState){
            resetGame(cards);
        } else{
            document.querySelector('.moves').textContent = storedState.totalMoves;

            cardDeck = new CarDeck(cards);
            cardDeck.restoreFromState(storedState.cardStates)

            state = {
                matchingCard: storedState.matchingCardState !== null
                    ? cardDeck.cards.find(x => x.state.index === storedState.matchingCardState.index)
                    : null,
                isMatching: storedState.isMatching,
                totalMoves: storedState.totalMoves
            }
        }

        document.querySelector('.restart').addEventListener("click", (e) => {
            resetGame(cards);
        }, false);
    }

    function resetGame(cards){
        document.querySelector('.moves').textContent = "0";
        cardDeck = new CarDeck(cards);
        cardDeck.shuffle();

        cardDeck.cards.forEach(card => {
            card.closeCard()
            card.unmatch()
        });

        state = {
            matchingCard: null,
            isMatching: false,
            totalMoves: 0
        }
    }

    function saveState(){
        localStorage.setItem('Game.State', JSON.stringify({
            matchingCardState: state.matchingCard !== null ? state.matchingCard.state : null,
            isMatching: state.isMatching,
            totalMoves: state.totalMoves,
            cardStates: [...cardDeck.cards.map(x => x.state)]
        }));
    }

    function bindClickEvent(){
        cardDeck.cards.forEach(card => {
            card.node.addEventListener("click", (e) => {
                if(card.isOpened() || card.isMatched()){
                    return;
                }

                card.open();

                if(state.isMatching){
                    if(state.matchingCard.getValue() === card.getValue()){
                        
                        card.match()
                        state.matchingCard.match();

                        if(cardDeck.cards.filter(x => x.isMatched()).length === cardDeck.cards.length){
                            alert('you won!')
                        }

                        state.isMatching = false;
                        state.matchingCard = null;
                        saveState();
                    }else{
                        window.setTimeout(function () {
                            card.closeCard()
                            state.matchingCard.closeCard()
                            
                            state.totalMoves++;
                            document.querySelector('.moves').textContent = state.totalMoves;

                            state.isMatching = false;
                            state.matchingCard = null;
                            saveState();
                        }, 500);
                    }
                } else{
                    state.isMatching = true;
                    state.matchingCard = card;
                    saveState();
                }
            }, false);
        });
    }

    return {
        init: function(){
            var cards = [...document.querySelectorAll('li.card')];
            initGame(cards);
            bindClickEvent();
        }
    }
}

let game = new Game();
game.init();