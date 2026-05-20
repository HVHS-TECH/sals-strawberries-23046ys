
console.log("Running Sal's Strawberries")

var userName
var favoriteFruit
var fruitQuantity

function writeForm(){
    userName = document.getElementById("name").value;
    favoriteFruit = document.getElementById("favoriteFruit").value;
    fruitQuantity = document.getElementById("fruitQuantity").value;
    firebase.database().ref('/users/'+GLOBAL_user.uid).set(
    {
        "User": userName,
        "Fruit": favoriteFruit,
        "Number of Fruit": fruitQuantity
    }
    )
}

function writeEmail(){
    
}