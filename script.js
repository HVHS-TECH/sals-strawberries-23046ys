
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
        
        
        
        if( favoriteFruit == null || userName== null || fruitQuantity == null || favoriteFruit == "" || userName== "" || favoriteFruit == " " || userName== " " || fruitQuantity == NaN ){
        firebase.database().ref('/users/'+GLOBAL_user.uid).once('value', fb_getFavouriteFruit, fb_readError);
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

    userName= fruits["User"];
    favoriteFruit= fruits["Fruit"];
    fruitQuantity= fruits["Number of Fruit"];
    if(favoriteFruit == null || userName== null || fruitQuantity == null ){
        EMAIL.innerHTML = "<p>You need to fill in the form.</p>";
    }else {
       writeEmail() 
    }
    
    

}

function fb_readFavouriteFruits() {
    console.log("Reading Fruit");
    firebase.database().ref('/users/').orderByValue().once('value', fb_displayFavouriteFruits, fb_readError);
}

function fb_displayFavouriteFruits(snapshot){
  var dbData = snapshot.val();
  const FRUIT = document.getElementById("popularFruit");
    if (dbData == null) { 
        console.log('There was no record when trying to read the message');
        
    }else{
  FRUIT.innerHTML = "<p></p>";      
  snapshot.forEach(fb_showFruit)
    }
}

function fb_showFruit(child){
    const FRUIT = document.getElementById("popularFruit");
    var somFrui = child.val()["Fruit"];
  console.log(somFrui);


  FRUIT.innerHTML += "<p>"+somFrui+"</p>";
}