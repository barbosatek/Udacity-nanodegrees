// Finish animation
// Implement Congratulations Popup
// Format / clean up


// Encapsulates the Game object, its interactions with the DOM, its state and events.
const Game = function(){
    let state;
    let cardDeck;
    let isClosingCard = false;

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
                if(isClosingCard || card.isOpened() || card.isMatched()){
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
                            saveState(state, cardDeck);
                            return;
                        }

                        state.isMatching = false;
                        state.matchingCard = null;
                        increaseMoveCounter();
                        
                        saveState(state, cardDeck);
                    }else{
                        isClosingCard = true;
                        window.setTimeout(function () {
                            card.closeCard()
                            if(state.matchingCard !== null){
                                state.matchingCard.closeCard()
                            }
                            
                            increaseMoveCounter();

                            state.isMatching = false;
                            state.matchingCard = null;
                            saveState();
                            isClosingCard = false;
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