
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
        "Number of Fruit": fruitQuantity,
        "Name": GLOBAL_user.displayName
    }
    )
}

function writeEmail(){
    const EMAIL = document.getElementById("statusMessage");
    if(GLOBAL_user == null){
        EMAIL.innerHTML = "<p>You need to login.</p>";
    }else{ 
        
        firebase.database().ref('/users/GLOBAL_user.uid').orderByValue().once('value', fb_getFavouriteFruit, fb_readError);
        
        if( favoriteFruit == null || userName== null || fruitQuantity == null || favoriteFruit == "" || userName== "" || favoriteFruit == " " || userName== " " || fruitQuantity == NaN ){
        EMAIL.innerHTML = "<p>You need to fill in the form.</p>";
    }else{
        EMAIL.innerHTML = "<p>Welcome to Sals Strawberries, "+userName+".</p>";
        if(fruitQuantity <=0){
            EMAIL.innerHTML += "<p>You do not want any "+favoriteFruit+"s per week.</p>";
            EMAIL.innerHTML += "<p>We cannot be of any service to you.</p>";
        }else if(fruitQuantity == 1){
            EMAIL.innerHTML += "<p>You desire "+fruitQuantity+" "+favoriteFruit+" per week.</p>";
            EMAIL.innerHTML += "<p>We have all the "+favoriteFruit+"s you could possibly need.</p>";
        }else{
            EMAIL.innerHTML += "<p>You desire "+fruitQuantity+" "+favoriteFruit+"s per week.</p>";
            EMAIL.innerHTML += "<p>We have all the "+favoriteFruit+"s you could possibly need.</p>";
        }
    }
}
}

function fb_getFavouriteFruit(snapshot) {
    var fruits = snapshot.val()

    userName= GLOBAL_user.uid["User"];
    favoriteFruit= GLOBAL_user.uid["Fruit"]
    fruitQuantity= GLOBAL_user.uid["Number of Fruit"]

}

function fb_readFavouriteFruits() {
    console.log("Reading Fruit");
    firebase.database().ref('/users').orderByValue().once('value', fb_displayFavouriteFruits, fb_readError);
}

function fb_displayFavouriteFruits(snapshot){
  var dbData = snapshot.val();
    if (dbData == null) { 
        console.log('There was no record when trying to read the message');
        HTML_OUTPUT.innerHTML = 'There was no record when trying to read the message';
    }else{
  snapshot.forEach(fb_showFruit)
    }
}

function fb_showFruit(child){
    const FRUIT = document.getElementById("popularFruit");
  console.log(child["Fruit"]);
}