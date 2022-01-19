var quiz = [];
const div1= document.getElementById("container")
var currentScore = 0;
var btn = document.getElementById('Btn_Submit');
var radio = [];

var url = "https://xora123.github.io/Kélian.json"; // url du fichier JSON

async function getData() {
    // Fonction pour prendre les data de mon fichier JSON
    var responce = await fetch(url);
    var data = await responce.json();

    // console.log(data)
    shuffleArray(data.quizz.fr.débutant);
    return data.quizz.fr.débutant;
    }

    const copyMyData = async (data) => {
    // Fonction Pour remplir mon Tab vide pour pouvoir l'utiliser partout
    const tab = await getData(data);
    quiz.push(...tab);
    
    var proposition = quiz.propositions;
    // console.log (proposition);
    
    return quiz;
};

  //Fonction tri aléatoire
function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

const createAnswers = (value) => {

    // console.log(quiz[0].question)
    // console.log(quiz)
    for(let i=0;i<25;i++){
    
        const div= document.createElement("div")
        div.setAttribute("class","anecdote"+i)
        //document.getElementById('question'+(i+1)).innerHTML= quiz[i].question
        const QuestElement = document.createElement("h2"); // Ici on crée toute les question en fonction la taille de value, ici 30 - 10 (-10 pour pas que ce soit les mêmes questions)
        const QuestNode = document.createTextNode(value[i].question); // Ici on crée un textnode pour mettre les questions dans h2
        QuestElement.appendChild(QuestNode); // Ici on le fait spawn
        div1.appendChild(QuestElement);
        div1.appendChild(div);
        
       

        /* Boucle for pour afficher les propositions des questions */
        for(let j=0;j<4;j++){

            const div2=document.createElement("div2")
            const AnswerElement = document.createElement("input")
            AnswerElement.type="radio"
            AnswerElement.id="myRadio"
            AnswerElement.class="btn_radio"
            AnswerElement.setAttribute("value",value[i].propositions[j])
            
            const nameRadios = () => 
                {  // On met tout les input radio , dans un array
                const allRadios = [...document.querySelectorAll(`[type='radio']`)];// Chaque groupe de 4 inputs radio auront un nom unique
                    for (let i = 0; i < allRadios.length; i++)
                    {
                    let q = Math.floor(i / 4);
                    allRadios[i].name = `rad${q}`;
                    }
                }
            nameRadios(); 

            const AnswerNode = document.createElement("label")
            AnswerNode.classList = "label";
            AnswerNode.name = "btn_radio";    
            AnswerNode.setAttribute("for", "myRadio" + j); // Ici on le setUnAttribut
            const Answer = document.createTextNode(value[i].propositions[j])
            AnswerNode.appendChild(Answer)
            div2.appendChild(AnswerElement)
            div2.appendChild(AnswerNode)
            div1.appendChild(div2)

            /* Evenement pour les couleurs */
            btn.addEventListener("click", () => {
                if(radio.length == 25){

                    if(value[i].réponse == AnswerElement.value){
                        AnswerNode.style.backgroundColor = "#5FA543";
                    }
                    else if(value[i].réponse != AnswerElement.value){
                        AnswerNode.style.backgroundColor = "#F9554C";
                    }
                    else{
                        AnswerNode.style.backgroundColor = "none";
                    }
                }
                else{
                    return
                }
            });
            /* FIN Evenement pour les couleurs */
        } 
    }
}

btn.addEventListener('click',checkAnswer)/* Evenement pour déclencher la fonction */
/* Incrémenter le score */
function checkAnswer()
{  
    radio=document.querySelectorAll('input:checked')
        
        if(radio.length == 25){
            for(let i = 0; i < 25 ; i++)
            {
                
                if(radio[i].value == quiz[i].réponse){
                    currentScore++
                    console.log(currentScore)
                }

                    /* AFFICHAGE DE L'ANECDOTE AU CLIC */
                const anecdote = document.createElement('p');
                const textAnecdote = document.createTextNode(quiz[i].anecdote);
                anecdote.appendChild(textAnecdote);   
                
               
                document.querySelector(".anecdote"+i).appendChild(anecdote);
                
                /* FIN DE L'AFFICHAGE DE L'ANECDOTE AU CLIC */

            }

            const score = document.createElement("h3");
            score.innerHTML = "Votre score est de : " + currentScore;
            div1.appendChild(score);
            btn.style.display="none"

        }
        else{
            return alert("Vous n'avez pas répondu à toutes les questions")
        }

}   

window.addEventListener("load", async function () {
    await copyMyData();
    createAnswers(quiz);
    }); 
