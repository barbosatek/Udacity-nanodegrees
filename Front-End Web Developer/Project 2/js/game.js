// Encapsulates the Game object, its interactions with the DOM, its state and events.
const Game = function() {
    let state;
    let cardDeck;
    let isClosingCard = false;
   
    // Initializes the game given an array of nodes
    function initGame() {
     let storedState;
     try {
      storedState = JSON.parse(localStorage.getItem('Game.State'));
     } catch (e) {
      console.log('Unable to deserialize state. State will be reset')
     }
   
     if (!storedState) {
      resetGame();
     } else {
      restoreGame(storedState);
     }
   
     document.querySelector('.restart').addEventListener("click", (e) => {
      resetGame();
     }, false);
   
     document.querySelector('.play-again').addEventListener("click", (e) => {
      resetGame();
     }, false);
   
     let intervalID = window.setInterval((state, cardDeck) => {
      handleTimeIntervar()
     }, 1000, state, cardDeck);
   
     handleTimeIntervar()
     updateScreenMode(true);
    }
   
    // Updates game deck or congratulations modal depending on the game state.
    function updateScreenMode(scrollTop) {
     let modalNode = document.querySelector('.congrats-modal');
     let gameNode = document.querySelector('.game');
     let modalTextNode = document.querySelector('.congrats-body').children[0];
   
     if (!state.isGameOver) {
      modalNode.style.visibility = 'hidden';
      modalNode.style.display = 'none';
   
      gameNode.style.visibility = 'visible';
      gameNode.style.display = 'flex';
     } else {
      modalNode.style.visibility = 'visible';
      modalNode.style.display = 'flex';
   
      gameNode.style.visibility = 'hidden';
      gameNode.style.display = 'none';
   
      modalTextNode.textContent = 'With ' + state.totalMoves + ' Moves and ' + calculateRemainingStars() + ' stars.';
     }
   
     if (scrollTop) {
      window.setTimeout(() => {
       window.scrollTo(0, 0)
      }, 300);
     }
    }
   
    // Handles timier and displaying stars
    function handleTimeIntervar() {
     if (!state.isGameOver) {
      state.elapsedSeconds = state.elapsedSeconds + 1;
      document.querySelector('.timer').textContent = 'Elapsed Time:' + state.elapsedSeconds + 's.';

      saveState();
     }
    }
   
    // Returns the current stars given the elapsed time
    function calculateRemainingStars() {
     if (state.totalMoves >= 0 && state.totalMoves < 15) {
      return 3;
     }
   
     if (state.totalMoves >= 15 && state.totalMoves < 25) {
      return 2;
     }
   
     if (state.totalMoves >= 25) {
      return 1;
     }
     
     throw 'Unable to calculate remaining stars';
    }
   
    // Displays star score in the DOM 
    function displayStars(count) {
     let starNodes = [...document.querySelectorAll('.fa-star')];
     if (starNodes.length === 3) {
      if (count === 3) {
       starNodes[0].style.visibility = "";
       starNodes[1].style.visibility = "";
       starNodes[2].style.visibility = "";
      } else if (count === 2) {
       starNodes[0].style.visibility = "";
       starNodes[1].style.visibility = "";
       starNodes[2].style.visibility = "hidden";
      } else if (count === 1) {
       starNodes[0].style.visibility = "";
       starNodes[1].style.visibility = "hidden";
       starNodes[2].style.visibility = "hidden";
      } else if (count === 0) {
       starNodes[0].style.visibility = "hidden";
       starNodes[1].style.visibility = "hidden";
       starNodes[2].style.visibility = "hidden";
      }
     }
    }
   
    // Restores the game given the game state
    function restoreGame(storedState) {
     document.querySelector('.moves').textContent = storedState.totalMoves;
   
     cardDeck = new CarDeck();
     cardDeck.restoreFromState(storedState.cardStates)
     bindClickEvent();
   
     state = {
      matchingCard: storedState.matchingCardState !== null ? cardDeck.cards.find(x => x.state.id === storedState.matchingCardState.id) : null,
      isMatching: storedState.isMatching,
      elapsedSeconds: storedState.elapsedSeconds,
      isGameOver: storedState.isGameOver,
      totalMoves: storedState.totalMoves
     }
    }
   
    // Resets the game to its initial value, shuffles the cards and clears the local storage
    function resetGame() {
     localStorage.setItem('Game.State', null);
     document.querySelector('.moves').textContent = "0";
   
     if (cardDeck) {
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
   
     updateScreenMode(true)
    }
   
    // Saves the current game state
    function saveState() {
     localStorage.setItem('Game.State', JSON.stringify({
      matchingCardState: state.matchingCard !== null ? state.matchingCard.state : null,
      isMatching: state.isMatching,
      totalMoves: state.totalMoves,
      cardStates: [...cardDeck.cards.map(x => x.state)],
      elapsedSeconds: state.elapsedSeconds,
      isGameOver: state.isGameOver
     }));

     let remainingStars = calculateRemainingStars();
     displayStars(remainingStars);
    }
   
    // Increases the move counter and displays it
    function increaseMoveCounter() {
     state.totalMoves++;
     document.querySelector('.moves').textContent = state.totalMoves;
    }
   
    // Binds the click event on the cards and manages the main click logic and state that determines when 
    // the game was won
    function bindClickEvent() {
     cardDeck.cards.forEach(card => {
      card.node.addEventListener("click", (e) => {
       if (isClosingCard || card.isOpened() || card.isMatched()) {
        return;
       }
   
       card.open();
   
       if (state.isMatching) {
        if (state.matchingCard.getValue() === card.getValue()) {
   
         card.match()
         state.matchingCard.match();
   
         if (cardDeck.cards.filter(x => x.isMatched()).length === cardDeck.cards.length) {
          state.isGameOver = true;
          saveState();
          updateScreenMode(true);
          return;
         }
   
         state.isMatching = false;
         state.matchingCard = null;
         increaseMoveCounter();
         saveState();
        } else {
         isClosingCard = true;
         window.setTimeout(function() {
          card.closeCard()
          if (state.matchingCard !== null) {
           state.matchingCard.closeCard()
          }
   
          increaseMoveCounter();
   
          state.isMatching = false;
          state.matchingCard = null;
          saveState();
          isClosingCard = false;
         }, 500);
        }
       } else {
        state.isMatching = true;
        state.matchingCard = card;
        saveState();
       }
      }, false);
     });
    }
   
    return {
     init: function() {
      initGame();
     }
    }
   }