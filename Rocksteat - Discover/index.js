//console.log("Rodando via script")

const questions = [
    "O que eu aprendi hoje?",
    "O que me deixou aborrecido? E o que eu poderia fazer para melhorar?",
    "O que me deixou feliz hoje?",
    "Quantas pessoas ajudei hoje?"
]

const ask =(index = 0) => {
    return process.stdout.write(questions[index]+"\n")
}

ask()

const answers = []
process.stdin.on("data", data =>{
    answers.push(data.toString().trim())
    if(answers.length < questions.length){
        ask(answers.length)
    }else{
        console.log(answers)
        process.exit()
    }
    
})

process.on("exit", () =>{
    console.log(
        `Legal David Rodrigues!

        O que você aprendeu hoje foi: ${answers[0]}

        O que te aborreceu e poderia melhorar: ${answers[1]}

        O que te deixou feliz hoje: ${answers[2]}

        Você ajudou ${answers[3]} pessoas hoje.

        Volte amanhã para novas reflexões!

        `
    

    )
})