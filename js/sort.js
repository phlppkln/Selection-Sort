var time;
var swaps;
var operations;

var numbers;
var anfangPosition, bestesPosition, speicherzeigerPosition, endePosition;

var firstUnsortedCardPosition;

var speicherzeigerBesserBestes;

var currentAlgoStep;

var card1,card2,card3,card4,card5,card6,card7;

$(init);

function init() {
    firstUnsortedCardPosition = 0;
    speicherzeigerBesserBestes=false;
    currentAlgoStep = -1;

    numbers = document.querySelectorAll('.number-card');
    anfangPosition = document.getElementById("anfang-zeiger").getAttribute("data-position");
    bestesPosition = document.getElementById("bestes-zeiger").getAttribute("data-position");
    speicherzeigerPosition = document.getElementById("anfang-zeiger").getAttribute("data-position");
    endePosition = document.getElementById("anfang-zeiger").getAttribute("data-position");
    printpositionen();
}

function resetAlgorithmus(){
    setAnfangZeigerPosition(0);
    setEndeZeigerPosition(0);
    setBestesZeigerPosition(0);
    setSpeicherzeigerZeigerPosition(0);
}

function getAnfangValue(){
    return numbers[anfangPosition].innerHTML;
}

function getBestesValue(){
    return numbers[bestesPosition].innerHTML;
}

function getSpeicherzeigerValue(){
    return numbers[speicherzeigerPosition].innerHTML;
}

function getEndeValue(){
    return numbers[endePosition].innerHTML;
}

function setAnfangZeigerPosition(newPosition){
    document.getElementById("anfang-zeiger").setAttribute("data-position", newPosition);
    anfangPosition=newPosition;
    document.getElementById("anfang-zeiger").value = numbers[newPosition].innerHTML;
}

function setEndeZeigerPosition(newPosition){
    document.getElementById("ende-zeiger").setAttribute("data-position", newPosition);
    endePosition = newPosition;
    document.getElementById("ende-zeiger").value = numbers[newPosition].innerHTML;
}

function setSpeicherzeigerZeigerPosition(newPosition){
    document.getElementById("speicherzeiger-zeiger").setAttribute("data-position", newPosition);
    speicherzeigerPosition=newPosition;
    document.getElementById("speicherzeiger-zeiger").value = numbers[newPosition].innerHTML;
}

function setBestesZeigerPosition(newPosition){
    document.getElementById("bestes-zeiger").setAttribute("data-position", newPosition);
    bestesPosition=newPosition;;
    document.getElementById("bestes-zeiger").value = numbers[newPosition].innerHTML;
}

function printpositionen(){
    console.log(anfangPosition + " _ " + bestesPosition + " _ " + speicherzeigerPosition + " _ " + endePosition);
}

function increaseAlgoStep(){
    if(currentAlgoStep<10)
        currentAlgoStep++;
    else
        currentAlgoStep=0;
}


//algorithmn steps

//ANFANG und ENDE zeigen auf die erste bzw die letzte zu sortierende Karte
function moveAnfangEnde(){
    setAnfangZeigerPosition(firstUnsortedCardPosition);
    setEndeZeigerPosition(numbers.length-1);
    console.log("move Anfang und Ende");
    printpositionen();
}

//Setzte SPEICHERZEIGER und BESTES auf die erste zu sortierende Karte
function moveSpeicherzeigerBestesToBeginning(){
    setSpeicherzeigerZeigerPosition(firstUnsortedCardPosition);
    setBestesZeigerPosition(firstUnsortedCardPosition);    
    console.log("move Speicherzeiger und bestes auf erste zu sortierende Karte");
    printpositionen();
}

//Verschiebe SPEICHERZEIGER um eine Position nach rechts
function moveSpeicherzeigerToRight(){
    if(speicherzeigerPosition >= numbers.length-1) return;

    speicherzeigerPosition++;
    setSpeicherzeigerZeigerPosition(speicherzeigerPosition);
    console.log("move speicherzeiger position");
    printpositionen();
}

//Ist die Zahl unter SPEICHERZEIGER kleiner als die Zahl unter BESTES?
function speicherzeigerBeforeBestes(){ 
    if(getSpeicherzeigerValue() < getBestesValue())
        speicherzeigerBesserBestes = true;
    else
        speicherzeigerBesserBestes = false;

    console.log("is speicherzeiger < bestes: " + speicherzeigerBesserBestes);
    printpositionen();
}

//Verschiebe Bestes auf die Position von Speicherzeiger
function moveBestesToSpeicherzeiger(){    
    setBestesZeigerPosition(speicherzeigerPosition);
    console.log("move bestes to speicherzeigerPosition");
    printpositionen();
}

//Wenn SPEICHERZEIGER auf ENDE steht, weiter bei (4.), sonst wiederhole ab (1.)
function ifSpeicherzeigerIsEnde(){
    if(speicherzeigerPosition >= numbers.length-1)
        console.log("speicherzeigerPosition auf ende?: " + 4 + ": vertausche bestes mit anfang");
    else
        console.log("speicherzeigerPosition auf ende?: " + 1 + ": verschiebe speicherzeiger nach rechts");
}

//Vertausche die Karte unter BESTES mit der Karte unter ANFANG
function swapAnfangBestes(){
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
function moveAnfangToRight(){
    if(anfangPosition >= numbers.length-1) return;
    
    anfangPosition++;
    setAnfangZeigerPosition(anfangPosition);
    console.log("move anfang position");
    printpositionen();
}

//Wenn ANFANG = ENDE, fertig, sonst wiederhole ab (0.)
function ifAnfangIsEnde(){
    if(getAnfangValue()==getEndeValue()){
        console.log("Algorithmus beendet!");
    }
    else{
        currentAlgoStep=0;
        firstUnsortedCardPosition++;
        console.log("is Anfang gleich Ende: wiederhole 0: setze speicherzeiger und bestes auf erste zu sortiernde karte");
    }
    printpositionen();
}


