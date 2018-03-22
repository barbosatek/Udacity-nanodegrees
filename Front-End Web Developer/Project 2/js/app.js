// Finish animation
// Implement Congratulations Popup
// Format / clean up
// Restoring state after winning doesn't load correctly
// Move classes into files
// Fix race condition with timeout when closing image

// Represents a card state
const CardState = function(value){
    // guid function from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

    return {
        value: value,
        isMatched: false,
        isOpened: false,
        id: guid()
    }
}

// Encapsulates the Card object, its interaction with the DOM and state
const Card = function(cardNode, value){
    cardNode.children[0].className = value;

    return {
        state: new CardState(value),
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
            return cardNode.children[0].className
        },
        setValue: function(value){
            cardNode.children[0].className = value;
            this.state.value = value;
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

            this.state.id = state.id;
            this.state.value = state.value;
            cardNode.children[0].className = state.value;
        }
    }
}

// Encapsulates the CardDeck object and its functionality
const CarDeck = function(){
    const values = 
        ["fa fa-diamond"
        ,"fa fa-paper-plane-o"
        ,"fa fa-anchor"
        ,"fa fa-bolt"
        ,"fa fa-cube"
        ,"fa fa-anchor"
        ,"fa fa-leaf"
        ,"fa fa-bicycle"
        ,"fa fa-diamond"
        ,"fa fa-bomb"
        ,"fa fa-leaf"
        ,"fa fa-bomb"
        ,"fa fa-bolt"
        ,"fa fa-bicycle"
        ,"fa fa-paper-plane-o"
        ,"fa fa-cube"];

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

    let deckNode = document.querySelector('.deck')

    // TODO: Use documentFragment to improve perf
    let cards = values.map((x, i) => {
        let liNode = document.createElement('li'); 
        liNode.classList = 'card'

        let iNode = document.createElement('i'); 
        iNode.classList = x
        liNode.appendChild(iNode);

        deckNode.appendChild(liNode);

        return new Card(liNode, x, i)
    });

    return {
        cards: cards,
        shuffle: function(){
            let newValues = shuffle(values);
            for(let i = 0; i < values.length; i++){
                let card = this.cards[i];
                let value = newValues[i]
                card.setValue(value);
            }
        },
        restoreFromState: function(cardStates){
            for(let i = 0; i < cardStates.length; i++){
                let card = this.cards[i];
                let state = cardStates[i];
                card.restoreFromState(state);
            }
        },
        clear: function(){
            while (deckNode.firstChild) {
                deckNode.removeChild(deckNode.firstChild);
            }
        }
    }
}

// Encapsulates the Game object, its interactions with the DOM, its state and events.
const Game = function(){
    let state;
    let cardDeck;

    // Initializes the game given an array of nodes
    function initGame(){
        let storedState;
        try{
            storedState = JSON.parse(localStorage.getItem('Game.State'));
        } catch(e){
            console.log('Unable to deserialize state. State will be reset')
        }

        if(!storedState){
            resetGame();
        } else{
            restoreGame(storedState);
        }

        document.querySelector('.restart').addEventListener("click", (e) => {
            resetGame();
        }, false);

        let intervalID = window.setInterval((state, cardDeck) => {
            handleTimeIntervar()
        }, 1000, state, cardDeck);

        handleTimeIntervar()
    }

    // Handles timier and displaying stars
    function handleTimeIntervar(){
        if(!state.isGameOver){
            state.elapsedSeconds = state.elapsedSeconds + 1;
            document.querySelector('.timer').textContent = 'Elapsed Time:' + state.elapsedSeconds + 's.';

            if(state.elapsedSeconds > 0 && state.elapsedSeconds < 20){
                displayStars(3);
            }

            if(state.elapsedSeconds >= 20 && state.elapsedSeconds < 40){
                displayStars(2);
            }

            if(state.elapsedSeconds >= 40 && state.elapsedSeconds < 60){
                displayStars(1);
            }

            if(state.elapsedSeconds > 60){
                displayStars(0);
            }

            saveState();
        }
    }

    // Displays star score in the DOM 
    function displayStars(count){
        let starNodes = [...document.querySelectorAll('.fa-star')];
        if(starNodes.length === 3){
            if(count === 3){
                starNodes[0].style.visibility = "";
                starNodes[1].style.visibility = "";
                starNodes[2].style.visibility = "";
            } else if(count === 2){
                starNodes[0].style.visibility = "";
                starNodes[1].style.visibility = "";
                starNodes[2].style.visibility = "hidden";
            } else if(count === 1){
                starNodes[0].style.visibility = "";
                starNodes[1].style.visibility = "hidden";
                starNodes[2].style.visibility = "hidden";
            } else if(count === 0){
                starNodes[0].style.visibility = "hidden";
                starNodes[1].style.visibility = "hidden";
                starNodes[2].style.visibility = "hidden";
            }
        }
    }

    // Restores the game given the game state
    function restoreGame(storedState){
        document.querySelector('.moves').textContent = storedState.totalMoves;

        cardDeck = new CarDeck();
        cardDeck.restoreFromState(storedState.cardStates)
        bindClickEvent();

        state = {
            matchingCard: storedState.matchingCardState !== null
                ? cardDeck.cards.find(x => x.state.id === storedState.matchingCardState.id)
                : null,
            isMatching: storedState.isMatching,
            elapsedSeconds: storedState.elapsedSeconds,
            isGameOver: storedState.isGameOver,
            totalMoves: storedState.totalMoves
        }
    }

    // Resetds the game to its initial value, shuffles the cards and clears the local storage
    function resetGame(){
        localStorage.setItem('Game.State', null);
        document.querySelector('.moves').textContent = "0";

        if(cardDeck){
            cardDeck.clear();
        }
        
        cardDeck = new CarDeck();
        cardDeck.shuffle();
        bindClickEvent();

        cardDeck.cards.forEach(card => {
            card.closeCard()
            card.unmatch()
        });

        state = {
            matchingCard: null,
            isMatching: false,
            totalMoves: 0,
            elapsedSeconds: 0,
            isGameOver: false
        }
    }

    // Saves the current game state
    function saveState(){
        localStorage.setItem('Game.State', JSON.stringify({
            matchingCardState: state.matchingCard !== null ? state.matchingCard.state : null,
            isMatching: state.isMatching,
            totalMoves: state.totalMoves,
            cardStates: [...cardDeck.cards.map(x => x.state)],
            elapsedSeconds: state.elapsedSeconds,
            isGameOver: state.isGameOver
        }));
    }

    // Increases the move counter and displays it
    function increaseMoveCounter(){
        state.totalMoves++;
        document.querySelector('.moves').textContent = state.totalMoves;
    }

    // Binds the click event on the cards and manages the main click logic and state that determines when 
    // the game was won
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
                            state.isGameOver = true;
                            return;
                        }

                        state.isMatching = false;
                        state.matchingCard = null;
                        increaseMoveCounter();
                        
                        saveState(state, cardDeck);
                    }else{
                        window.setTimeout(function () {
                            card.closeCard()
                            if(state.matchingCard !== null){
                                state.matchingCard.closeCard()
                            }
                            
                            increaseMoveCounter();

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
            initGame();
        }
    }
}

let game = new Game();
game.init();