var btn=document.getElementById('search-btn');
var url="";
var request
var age;
var obj;
function isEmpt(str){
    return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
}
btn.addEventListener('click',function () {
   document.getElementById('main1').innerHTML="";
   var search=document.getElementById('search-key').value.toLowerCase();
   if(search==null || isEmpt(search)){
       document.getElementById('search-key').value=null;
       alert("Oops empty search bar!");
   }
   else {
       request = new XMLHttpRequest();
       url='https://itunes.apple.com/search?term=';
       var count=1;
       for(s in search){
           if(search[s]==" ")
               count++;
       }
       if(count==1){
           url+=search;
       }
       else{
           var temp='';
           var counter=0;
           for(s in search){
               if(search[s]==' '){
                   if(counter==0)
                        url+=temp;
                   else
                        url+='+'+temp;
                   temp=' ';
                   counter++;
               }
               else{
                   temp+=search[s];
               }
           }
           url+='+'+temp;
       }
       request.open('GET',url,'false');
       request.onreadystatechange=function () {
           if(request.readyState==4) {
               useData(request.responseText);
           }
       };
       request.send();
   }
});
function useData(data) {
    obj=JSON.parse(data);
    var s="";
    console.log(obj.resultCount);
    if(age.min>=18 || age.max>=21) {
        for (i = 0; i < 25; i++) {
            console.log(obj.results[i].trackName);
            s += "<div class='col-sm-4 col-xs-12 panel panel-default' style='height: 92px !important;'>" +
                    "<div class='panel-body'>" +
                        "<div class='row'>" +
                            "<div class='col-sm-3'>" +
                                "<img id="+i+ " src=" + obj.results[i].artworkUrl100 + " class='img-responsive' width='60px' height='60px' data-toggle='modal' data-target='#myModal' onclick='playit(obj.results[i])'>" +
                            "</div>" +
                            "<div class='col-sm-9'>" +
                                "<h6>"+obj.results[i].trackName+"</h6>"+
                                "<h6><small>"+obj.results[i].collectionName+"</small></h6>" +
                                "<h6>By "+obj.results[i].artistName+"</h6>"+
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";
        }
    }else{
        for (i = 0; i < 25; i++) {
            console.log(obj.results[i].trackName);
            s += "<div class='col-sm-4  col-xs-12 panel panel-default' style='height: 120px !important;'>" +
                "<div class='panel-body'>" +
                "<div class='row'>" +
                "<div class='col-sm-3'>" +
                "<img src=" + obj.results[i].artworkUrl100 + " class='img-responsive' width='60px' height='60px'>" +
                "</div>" +
                "<div class='col-sm-9'>" +
                "<h6>"+obj.results[i].trackCensoredName+"</h6>"+
                "<h6><small>"+obj.results[i].collectionCensoredName+"</small></h6>" +
                "<h6>By "+obj.results[i].artistName+"</h6>"+
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }
    document.getElementById('main1').innerHTML+=s;
}
var buttons = document.getElementsByTagName("img");
var buttonsCount = buttons.length;
for (var i = 0; i <= buttonsCount; i += 1) {
    buttons[i].onclick = function(e) {
        var s="<audio controls>" +
            "<source src="+obj.results[this.id].previewUrl+"/>"+"</audio>";
        document.getElementById('mod').innerHTML=s;
        alert(this.id);
    };
}
function playit(data) {
    console.log(this.id);
}