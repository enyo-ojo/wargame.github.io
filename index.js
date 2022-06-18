let deckId
const newDeckBtn =  document.getElementById('new')
const drawBtn = document.getElementById('draw_two')
const cardContainer = document.getElementById("cards")
const displayWinnerText =  document.getElementById('results')
const remainingCards = document.getElementById('remainingCards')
let computersScore = 0
let playersScore = 0
const compScore = document.getElementById('coscore')
const playerScore = document.getElementById('yoscore')

function newDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })

    function runF(params) {
        console.log('i finally ran : ' + deckId)

    }
    setTimeout(runF, 2000)

}

function drawTwo() {
    //getting a deck from an api that draws two cars
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            //getting the cards
            console.log(data.cards)
            //displaying the cards
            cardContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const displayWinner = winner(data.cards[0], data.cards[1]) 
            console.log(displayWinner)
            displayWinnerText.textContent = displayWinner
            displayWinnerText.classList.add('win')

            remainingCards.textContent = `Remaining Cards : ${data.remaining} `
            remainingCards.classList.add('text')
            
            if (data.remaining=== 0) {
                drawBtn.disabled = true
                if (computersScore > playersScore) {
                    displayWinnerText.textContent = 'Computer Won the game!'
                } else if(playersScore > computersScore){
                    displayWinnerText.textContent = 'You Won the game!'
                }else{
                    displayWinnerText.textContent = 'A Tie!...This is War!'
                }
                
            }
          
        })
//test run
    function runF(params) {
        console.log('i finally ran : ' + deckId)

    }
    setTimeout(runF, 2000)

}
//getting a new deck by clicking
newDeckBtn.addEventListener('click', newDeck)
drawBtn.addEventListener('click', drawTwo)

//determine winner
function winner(card1, card2) {
    //values to determine winner
    const cardvalues = ["2", "3", "4", "5", "6", "7", "8", "9", 
            "10", "JACK", "QUEEN", "KING", "ACE"]
    
            const card1ValueIndex = cardvalues.indexOf(card1.value)
            const card2ValueIndex = cardvalues.indexOf(card2.value)
    if (card1ValueIndex > card2ValueIndex) {
        computersScore ++
        compScore.innerHTML = computersScore
        return 'Computer Wins!'
        
    } else if (card1ValueIndex < card2ValueIndex){
        playersScore ++
        playerScore.innerHTML = playersScore
        return 'You Win'
    }
    else{
        return 'War!'
    }
    
    }
