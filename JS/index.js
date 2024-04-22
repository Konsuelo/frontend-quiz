const timer = document.querySelector("#timer")
const url = window.location.href;
const div = document.querySelector(".container");
const id = getId(url);
const timeToNext = 30000
let leftToNext = timeToNext
let interval = createInterval()
let newGame = null

function createInterval(){
    return setInterval(()=>{
        leftToNext-=10
        if(leftToNext<=0){
            clearInterval(interval)
            window.location.href = 'defeat.html'
        }
    timer.textContent = Math.floor(leftToNext/1000)
    },10)
}

function getId(url) {
    const arr = url.split("/");
    const arr1 = arr.slice(-1).join("").split(".");
    return arr1[0];
}

async function init(){
    const res = await fetch(`https://quiz-backend-game.adaptable.app/${id}`)
    const data = await res.json()
    newGame = new Game(data);
    newGame.shufleCards();
    startGame()

}
init()



function startGame() {
    div.insertAdjacentHTML(`beforeend`,
    `
<div class = "page__wrapper">
<button class = "btn__wrapper">50/50</button>
</div>`)
    addListenerFiftyFifty()
    renderQuestion()
}


function addListenerFiftyFifty() {
    const btn = document.querySelector(".btn__wrapper")
    btn.addEventListener("click", function (event) {
        const fifty = newGame.fiftyFifty()
        btn.disabled = true
        const listAswer = document.querySelectorAll(".list__answer")
        listAswer.forEach((item) => {
            if (!fifty.includes(item.textContent)) {
                item.textContent = ""
                
            }
        })
    })
}

function addListenerAnswer() {
    const list = document.querySelector(".list")
    list.addEventListener("click", function (event) {
        const target = event.target
        const right = newGame.check(target.textContent)
        clearInterval(interval)

        if (right) {
            target.classList.add("right")
            const isWin = newGame.isWin()
            if (isWin) {

                setTimeout(() => {
                    window.location.href = 'win.html'
                }, 4000)
            }
            else {
                setTimeout(() => {
                    const parent = list.closest("div").remove()
                    renderQuestion()
                    leftToNext = timeToNext
                    interval = createInterval()
                }, 4000)
                
            }

        }

        else {

            target.classList.add("lose")
            const li = target.closest("ul").querySelectorAll("li")
            li.forEach(item => {
                if (item.textContent === newGame.rightAnswer) {
                    setTimeout(() => {
                        item.classList.add("right")
                    }, 2000)
                }
            })
            setTimeout(() => {
                window.location.href = 'defeat.html'
            }, 4000);

        }
    })
}

function renderQuestion() {
    const parent = document.querySelector(".page__wrapper")
    const question = newGame.chooseQuestion()
    console.log(question)

    parent.insertAdjacentHTML(`beforeend`, `<div><h4>${question.question}</h4>
<ul class="list">${question.answers.map(answer => `<li class="list__answer">${answer}</li>`).join("")}</ul>
</div>`)
    addListenerAnswer()
}



