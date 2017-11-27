var btn=document.getElementById('search-btn');
var url="";
var request;
var age;
var obj,search;
var words=[];
$(document).ready(function (e) {
   getWords();
});
function getWords() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "a.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                words=allText.split(" ");
            }
        }
    };
    rawFile.send(null);
}

function isEmpt(str) {
    return !str.replace(/^\s+/g, '').length;
}
btn.addEventListener('click',function () {
   document.getElementById('error').innerHTML="";
   document.getElementById('main1').innerHTML="";
   search=document.getElementById('search-key').value.toLowerCase();
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

$('#search-key').keypress(function (e) {
   if(e.which==13){
       $('#search-btn').click();
       return false;
   }
});

function linkUp() {
    a=document.getElementsByTagName('a');
    a[0].onclick=function (e) {
        console.log(e.target.innerHTML);
        document.getElementById('search-key').value=e.target.innerHTML;
        document.getElementById('search-btn').click();
    }
}

function useData(data) {
    obj=JSON.parse(data);
    var s="";
    var word=search.split(" ");
    if(obj.resultCount==0){
        var temp="";
        for(i=0;i<word.length;i++){
            abc=didYouMean(word[i],words);
            if(abc==null)
                temp+=word[i]+" ";
            else
                temp+=abc+" ";
        }
        var link;
        if(temp===search)
            link='Sorry no suggestion and result';
        else
            link="Did you mean "+"<a href='#'>"+temp+"</a>? ";
        document.getElementById('error').innerHTML=link;
        linkUp();
    }
    if(age.min>=18 || age.max>=21) {
        for (i = 0; i < 25; i++) {
            s += "<div class='col-sm-4 col-xs-12 panel panel-default'>" +
                    "<div class='panel-body'>" +
                        "<div class='row'>" +
                            "<div class='col-sm-3 pull-left'>" +
                                "<img id="+i+ " src=" + obj.results[i].artworkUrl100 + " class='img-responsive' width='60px' height='60px' data-target='#myModal'>" +
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
            s += "<div class='col-sm-4  col-xs-12 panel panel-default'>" +
                "<div class='panel-body'>" +
                "<div class='row'>" +
                "<div class='col-sm-3 pull-left'>" +
                "<img src=" + obj.results[i].artworkUrl100 + " class='img-responsive' width='60px' height='60px' data-target='#myModal'>" +
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
    prop();
    heightSet();
}


function prop() {
    var buttons = document.getElementsByClassName('panel-body');
    var buttonsCount = buttons.length;
    for (var i = 0; i < buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            var s="<div class='text-center'>" +
                        "<div class='text-right'>" +
                        "<button>X</button>" +
                        "</div>" +
                        "<audio controls src="+obj.results[e.target.id].previewUrl+">" +
                "</audio>" +
                "</div>";
            document.getElementById('myModal').innerHTML=s;
            $('.text-right button').on('click',function (e) {
                $('#myModal').bPopup().close();
            });
            $('#myModal').bPopup({
                transition:'slideDown',
                modalClose:true,
                opacity:0.6
            });
        };
    }
}
var ag=[];
function heightSet() {
    max=-1;
    ag = document.getElementsByClassName('panel-default');
    for (i = 0; i < ag.length; i++) {
        if(ag[i].clientHeight>max)
            max=ag[i].clientHeight;
    }
    for(i=0;i<ag.length;i++)
        ag[i].setAttribute('style','height:'+max+'px !important');
}