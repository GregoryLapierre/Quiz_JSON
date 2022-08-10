var quiz = [];
const container = document.getElementById("container")
var currentScore = 0;
var btn = document.getElementById('Btn_Submit');
var radio = [];

//je crée mon tableau de score
if(JSON.parse(localStorage.getItem("Score")) != null){
const table = document.createElement('table')
const tr = document.createElement('tr')
const th = document.createElement('th')
th.setAttribute("colspan", "2")
tr.setAttribute("class", "titleTab")
const titleText = document.createTextNode('Les 5 meilleurs scores')
th.appendChild(titleText)
tr.appendChild(th)
table.appendChild(tr)
arrayResult.appendChild(table)

var getResult = JSON.parse(localStorage.getItem("Score")) || []
    for (let i = 0; i < Math.min(5, getResult.length); i++){
        const td1 = document.createElement('td')
        const tr1 = document.createElement('tr')
        var nameText = document.createTextNode(getResult[i].Nom)
        var scoreText = document.createTextNode(getResult[i].Score)
        const td2 = document.createElement('td')
        
        td1.appendChild(nameText)
        td2.appendChild(scoreText)
        tr1.appendChild(td1)
        tr1.appendChild(td2)
        table.appendChild(tr1)
        arrayResult.appendChild(table)
    }
}
// Stockage du fichier JSON dans une variable
var Json = "/JASON.json";

// Fonction asynchrone pour recevoir les datas du fichier JSON et les retourner dans un array trié
async function dataShuffleJson() {
    var data = await fetch(Json);
    var newJson = await data.json();
    quiz.push(...newJson.quizz.fr.débutant, ...newJson.quizz.fr.confirmé, ...newJson.quizz.fr.expert);
    quiz.sort(() => 0.5 - Math.random());
    return quiz;
}

//fonction pour afficher toutes les questions, les propositions, les couleurs des réponses
function answer(value){
    //1ere boucle pour afficher les 25 questions, boutons radio, propositions et couleurs des réponses
    for (let i = 0; i < 25; i++) {
        const div = document.createElement("div")
        div.setAttribute("class", "anecdote" + i)
        const QuestElement = document.createElement("h2"); 
        const QuestNode = document.createTextNode(value[i].question); 
        QuestElement.appendChild(QuestNode); 
        container.appendChild(QuestElement);
        container.appendChild(div);

        /* Boucle for pour afficher les inputs radio et les propositions des questions et les labels*/
        for (let j = 0; j < 4; j++) {
            const div2 = document.createElement("div")
            const answerRadio = document.createElement("input")
            answerRadio.type = "radio"
            answerRadio.id = "myRadio" + i + j
            answerRadio.name = "radio" + i
            answerRadio.classList = "btn_radio"
            answerRadio.setAttribute("value", value[i].propositions[j])

            // Création label
            const answerLabel = document.createElement("label")
            answerLabel.classList = "label";
            answerLabel.setAttribute("for", "myRadio" + i + j);
            const Answer = document.createTextNode(value[i].propositions[j])
            answerLabel.appendChild(Answer)
            div2.appendChild(answerRadio)
            div2.appendChild(answerLabel)
            container.appendChild(div2)

            /* Evenement pour les couleurs */
            btn.addEventListener("click", () => {
                if (radio.length == 25) {
                    answerLabel.style.backgroundColor = value[i].réponse == answerRadio.value ? "#5FA543" : "#F9554C";
                }
            });
        }
    }
}

/* Evenement pour déclencher les réponses et le résultat*/
btn.addEventListener('click', checkAnswer)

/* Incrémenter le score */
function checkAnswer() {
    radio = document.querySelectorAll('input:checked')
    if (radio.length == 25) {
        for (let i = 0; i < 25; i++) {
            if (radio[i].value == quiz[i].réponse) {
                currentScore++
            }
            // Affichage de l'anecdote
            const anecdote = document.createElement('p');
            const textAnecdote = document.createTextNode(quiz[i].anecdote);
            anecdote.appendChild(textAnecdote);

            document.querySelector(".anecdote" + i).appendChild(anecdote);
        }
        const score = document.createElement("h3");
        score.innerHTML = "Votre score est de : " + currentScore;
        container.appendChild(score);
        //bouton réponse disparait
        btn.style.display = "none"
        //input avec bouton pour ajouter un nom apparait
        insertName()
        window.scroll(0, 5000)
    }
    else {
        return alert("Vous n'avez pas répondu à toutes les questions")
    }
}

function insertName() {
    //création d'un formulaire
    const divInsertName = document.createElement('form')
    divInsertName.setAttribute("class", "ajout")

    //création div pour input text et bouton ajouter 
    const div_btn_ajouter = document.createElement('div')
    div_btn_ajouter.setAttribute("class", "ajouter")

    //création label
    const textElement = document.createElement('label')
    const textAjouter = document.createTextNode("Veuillez entrer votre nom et cliquez sur Ajouter")
    textElement.appendChild(textAjouter)
    divInsertName.appendChild(textElement)

    //création input text
    var inputName = document.createElement('input')
    inputName.type = "text"
    inputName.id = "inputNames"
    inputName.minLength = "3"
    inputName.maxLength = "16"
    inputName.placeholder = "Votre nom"
    div_btn_ajouter.appendChild(inputName)

    //création bouton Ajouter et div bouton
    const btn_add_name = document.createElement('button')
    btn_add_name.type = "submit"
    btn_add_name.id = "btn_add"
    const name_ajouter = document.createTextNode('Ajouter')
    btn_add_name.appendChild(name_ajouter)
    div_btn_ajouter.appendChild(btn_add_name)

    //insertion de tout le contenu dans la page sous le score
    divInsertName.appendChild(div_btn_ajouter)
    container.appendChild(divInsertName)

    btn_add.addEventListener('click', lclStorage)/* Evenement pour déclencher la fonction */
}

function lclStorage(event) {
    if (document.getElementById("inputNames").value != ""){      
    // je récupère le contenu du localstorage dans une variable
    // attention, la variable peut être vide
        var getArray = JSON.parse(localStorage.getItem("Score"))
        if(getArray === null){
            getArray = []  
        }

        // je récupère mes données de score et je créer un objet qui les contient
        var name = document.getElementById("inputNames").value
        let objectScore = {
            'Nom' : name,
            'Score': currentScore
        };

        // je rajoute mon score dans le tableau (la variable précédente)
        getArray.push(objectScore)

        // je trie le tableau par ordre de score decroissant
        getArray.sort(function (a, b) {
            return b.Score - a.Score;
        });

        // je récupère les 5 premiers scores du tableau
        var arrayScore = getArray.slice(0, 5)
        
        // je met mon tablau dans le localstorage
        localStorage.setItem("Score", JSON.stringify(arrayScore))
    }
    else{
        event.preventDefault()
        return alert("Le champ est vide")
    }
}

window.addEventListener("load", async function () {
    await dataShuffleJson();
    answer(quiz);
}); 
