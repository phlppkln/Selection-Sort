var numbers;
var anfangPosition, bestesPosition, speicherzeigerPosition, endePosition;

var firstUnsortedCardPosition;
var speicherzeigerBesserBestes;
var currentAlgoStep, previousAlgoStep;

var tick;

var cards;
var cardContainer;

$(document).ready(function () {
    firstUnsortedCardPosition = 0;
    speicherzeigerBesserBestes = false;
    currentAlgoStep = 0;
    previousAlgoStep = -1;

    cards = document.querySelectorAll(".card");
    cardContainer = document.getElementById("cardContainer");
    numbers = document.querySelectorAll(".numberList");
    anfangPosition = document.getElementById("anfang-zeiger").getAttribute("data-position");
    bestesPosition = document.getElementById("bestes-zeiger").getAttribute("data-position");
    speicherzeigerPosition = document.getElementById("anfang-zeiger").getAttribute("data-position");
    endePosition = document.getElementById("anfang-zeiger").getAttribute("data-position");

    resetAlgorithmus();

    tick = false;
    setInterval(autoRunAlgorithmn, 1000);
});

function startAlgorithmn() {
    tick = true;
    /**if(tick == false){
        tick = true;
    }
    else{
        tick = false;

    }**/
}

function pauseAlgorithmn(){
    tick = false;
}

function stopAlgorithmn(){
    tick = false;

    //reset active algorithmn step
    if(previousAlgoStep != -1){ 
        document.getElementById('drop-pos'+previousAlgoStep).classList.remove('dropareaActive');
    }
    
    previousAlgoStep = -1;
    currentAlgoStep = 0;
    setAnfangZeigerPosition(0);
    setEndeZeigerPosition(0);
    setBestesZeigerPosition(0);
    setSpeicherzeigerZeigerPosition(0);
}

function autoRunAlgorithmn(){
    if(tick){
        stepForward();
    }
}


function stepForward() {
    var parent = document.getElementById('drop-pos'+currentAlgoStep);
    if(parent.childNodes.length<=0) { 
        stopAlgorithmn();
        alert("Algorithmus ist leer!");    
        return;
    }
    var child = parent.childNodes[0];
    doStep(child.id);
}


function stepBackward() {
    alert("Not implemented yet");
}

function doStep(cardId) {
    changeActive();
    switch (cardId) {
        case 'card0':
            moveAnfangEnde();
            increaseAlgoStep();
            break;
        case 'card1':
            moveSpeicherzeigerBestesToBeginning();
            increaseAlgoStep();
            break;
        case 'card2':
            moveSpeicherzeigerToRight();
            increaseAlgoStep();
            break;
        case 'card3':
            speicherzeigerBeforeBestes();
            increaseAlgoStep();
            break;
        case 'card4':
            if (speicherzeigerBesserBestes) {
                moveBestesToSpeicherzeiger();
            }
            increaseAlgoStep();
            break;
        case 'card5':
            ifSpeicherzeigerIsEnde();
            break;
        case 'card6':
            swapAnfangBestes();
            increaseAlgoStep();
            break;
        case 'card7':
            moveAnfangToRight();
            increaseAlgoStep();
            break;
        case 'card8':
            ifAnfangIsEnde()
            break;
        default:
            alert("Something went wrong");
    }
}

function resetAlgorithmus() {
    
    //reset active algorithmn step
    if(previousAlgoStep != -1){ 
        document.getElementById('drop-pos'+previousAlgoStep).classList.remove('dropareaActive');
    }

    previousAlgoStep = -1;
    currentAlgoStep = 0;
    setAnfangZeigerPosition(0);
    setEndeZeigerPosition(0);
    setBestesZeigerPosition(0);
    setSpeicherzeigerZeigerPosition(0);
    
    cards.forEach(moveToCardContainer);
}

function moveToCardContainer(item, index){
    cardContainer.appendChild(item);
}

function changeActive(){
    if(previousAlgoStep != -1){ 
        document.getElementById('drop-pos'+previousAlgoStep).classList.remove('dropareaActive');
    }
    document.getElementById('drop-pos'+currentAlgoStep).classList.add('dropareaActive');
}

function getAnfangValue() {
    return numbers[anfangPosition].innerHTML;
}

function getBestesValue() {
    return numbers[bestesPosition].innerHTML;
}

function getSpeicherzeigerValue() {
    return numbers[speicherzeigerPosition].innerHTML;
}

function getEndeValue() {
    return numbers[endePosition].innerHTML;
}

function setAnfangZeigerPosition(newPosition) {
    document.getElementById("anfang-zeiger").setAttribute("data-position", newPosition);
    anfangPosition = newPosition;
    document.getElementById("anfang-zeiger").value = numbers[newPosition].innerHTML;
}

function setEndeZeigerPosition(newPosition) {
    document.getElementById("ende-zeiger").setAttribute("data-position", newPosition);
    endePosition = newPosition;
    document.getElementById("ende-zeiger").value = numbers[newPosition].innerHTML;
}

function setSpeicherzeigerZeigerPosition(newPosition) {
    document.getElementById("speicherzeiger-zeiger").setAttribute("data-position", newPosition);
    speicherzeigerPosition = newPosition;
    document.getElementById("speicherzeiger-zeiger").value = numbers[newPosition].innerHTML;
}

function setBestesZeigerPosition(newPosition) {
    document.getElementById("bestes-zeiger").setAttribute("data-position", newPosition);
    bestesPosition = newPosition;;
    document.getElementById("bestes-zeiger").value = numbers[newPosition].innerHTML;
}

function printpositionen() {
    console.log(anfangPosition + " _ " + bestesPosition + " _ " + speicherzeigerPosition + " _ " + endePosition);
}

function increaseAlgoStep() {
    previousAlgoStep = currentAlgoStep;
    if (currentAlgoStep < 9){
        currentAlgoStep++;
    }
    else{
        currentAlgoStep = 1;
    }
}

//algorithmn steps

//ANFANG und ENDE zeigen auf die erste bzw die letzte zu sortierende Karte
function moveAnfangEnde() {
    setAnfangZeigerPosition(firstUnsortedCardPosition);
    setEndeZeigerPosition(numbers.length - 1);
    console.log("move Anfang und Ende");
    printpositionen();
}

//Setzte SPEICHERZEIGER und BESTES auf die erste zu sortierende Karte
function moveSpeicherzeigerBestesToBeginning() {
    setSpeicherzeigerZeigerPosition(firstUnsortedCardPosition);
    setBestesZeigerPosition(firstUnsortedCardPosition);
    console.log("move Speicherzeiger und bestes auf erste zu sortierende Karte");
    printpositionen();
}

//Verschiebe SPEICHERZEIGER um eine Position nach rechts
function moveSpeicherzeigerToRight() {
    if (speicherzeigerPosition >= numbers.length - 1) return;

    speicherzeigerPosition++;
    setSpeicherzeigerZeigerPosition(speicherzeigerPosition);
    console.log("move speicherzeiger position");
    printpositionen();
}

//Ist die Zahl unter SPEICHERZEIGER kleiner als die Zahl unter BESTES?
function speicherzeigerBeforeBestes() {
    if (getSpeicherzeigerValue() < getBestesValue())
        speicherzeigerBesserBestes = true;
    else
        speicherzeigerBesserBestes = false;

    console.log("is speicherzeiger < bestes: " + speicherzeigerBesserBestes);
    printpositionen();
}

//Verschiebe BESTES auf die Position von SPEICHERZEIGER
function moveBestesToSpeicherzeiger() {
    setBestesZeigerPosition(speicherzeigerPosition);
    console.log("move bestes to speicherzeigerPosition");
    printpositionen();
}

//Wenn SPEICHERZEIGER auf ENDE steht, weiter bei (4.), sonst wiederhole ab (1.)
function ifSpeicherzeigerIsEnde() {
    if (speicherzeigerPosition >= numbers.length - 1){ 
        previousAlgoStep = currentAlgoStep;
        currentAlgoStep=6;
        console.log("speicherzeigerPosition auf ende?: !(5)! vertausche bestes mit anfang");
    }
    else{
        previousAlgoStep = currentAlgoStep;
        currentAlgoStep = 2;
        console.log("speicherzeigerPosition auf ende?: !(2)! verschiebe speicherzeiger nach rechts");
    }
}

//Vertausche die Karte unter BESTES mit der Karte unter ANFANG
function swapAnfangBestes() {
    var tmpNum = numbers[bestesPosition].innerHTML;
    numbers[bestesPosition].innerHTML = numbers[anfangPosition].innerHTML;
    numbers[anfangPosition].innerHTML = tmpNum;

    console.log("anfang: " + numbers[anfangPosition].innerHTML);
    document.getElementById("anfang-zeiger").value = numbers[anfangPosition].innerHTML;
    document.getElementById("bestes-zeiger").value = numbers[bestesPosition].innerHTML;
    printpositionen();
    console.log("anfang: " + numbers[anfangPosition].innerHTML);
}

//Verschiebe ANFANG um eine Position nach rechts
function moveAnfangToRight() {
    if (anfangPosition >= numbers.length - 1) return;

    anfangPosition++;
    setAnfangZeigerPosition(anfangPosition);
    console.log("move anfang position");
    printpositionen();
}

//Wenn ANFANG = ENDE, fertig, sonst wiederhole ab (0.)
function ifAnfangIsEnde() {
    if (getAnfangValue() == getEndeValue()) {
        console.log("Algorithmus beendet!");
    } else {
        previousAlgoStep = currentAlgoStep;
        currentAlgoStep = 1;
        firstUnsortedCardPosition++;
        console.log("is Anfang gleich Ende: wiederhole 0: setze speicherzeiger und bestes auf erste zu sortiernde karte");
    }
    printpositionen();
}