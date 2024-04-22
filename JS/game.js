class Game {
    constructor(questions){
        this.questions = questions
        this.rightAnswer = null

    }
    shufleCards(){
        let currentIndex = this.questions.length
        let randomQuestion = null
        let temp = null
        while(currentIndex){
            currentIndex--;
            randomQuestion = Math.floor(Math.random() * currentIndex);
            temp = this.questions[currentIndex];
            this.questions[currentIndex] = this.questions[randomQuestion];
            this.questions[randomQuestion] = temp;
        } 
        return this.questions
    }
    
    fiftyFifty (){
       console.log(this.question.answers)
       console.log(this.rightAnswer)
       const answ = this.question.answers.filter(item => item===this.rightAnswer)
       const index = this.question.answers.findIndex(item => item===this.rightAnswer)
    //    console.log(answ)
    //    console.log(index)
    //    console.log(this.question)
       this.question.answers.splice(index, 1)
       let randomIndex= Math.floor(Math.random()*this.question.answers.length)
        answ.push(this.question.answers[randomIndex])
        return answ
    }


    check(answer){
        
        return answer === this.rightAnswer
        
        let currentQuestion = this.questions
        if(answer === right){
            this.currentQuestion++
        } 
        if (this.currentQuestion >= this.questions.length){
            window.location.href = 'win.html'
        } 
        else {
            window.location.href = 'defeat.html'
        }
    }
chooseQuestion(){
    const question = this.questions[0]
    this.questions = this.questions.slice(1) 
    this.question = question
    
    this.rightAnswer= question.right
    return question
}
isWin(){
    return this.questions.length <=0
}
}

