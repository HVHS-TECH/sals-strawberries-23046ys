
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
    const EMAIL = document.getElementById("statusMessage");
    if(GLOBAL_user == null){
        EMAIL.innerHTML = "<p>You need to login.</p>";
    }else if( favoriteFruit == null || userName== null || fruitQuantity == null || favoriteFruit == "" || userName== "" || favoriteFruit == " " || userName== " " || fruitQuantity == NaN ){
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