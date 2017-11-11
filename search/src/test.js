// var t='{"resultCount":2,"results":[{"name":"akshay"},{"name":"avinash"}]}';
// //var obj=loadJSON("https://itunes.apple.com/search?term=jack+johnson");
// //console.log(a);
// var obj=JSON.parse(t);
// for(i=0;i<obj.resultCount;i++){
//     console.log(obj.results[i].name);
// }
var ourData=[];

var btn=document.getElementById('btn');
var i=1;
btn.addEventListener('click',function () {
    var ourRequest=new XMLHttpRequest();
    ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-'+i+'.json');
    ourRequest.onload=function () {
        ourData=JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
});
var animalContainer=document.getElementById('animal-info');
function renderHTML(data){
    var s="";
    for(temp=0;temp<data.length;temp+=1){
        s+= data[temp].name+" is a "+ data[temp].species + "<br>";
    }
    i+=1;
    document.getElementById('animal-info').innerHTML+=s;
}
