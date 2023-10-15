let myNodeList=document.getElementsByTagName("LI")
let i;
for(i=0;i<myNodeList.length;i++){
    let span=document.createElement("span");
    let txt=document.createTextNode("\u00D7");
    span.className="close";
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
}

let close=document.getElementsByClassName("close");
for(i=0;i<close.length;i++){
    close[i].onclick=function(){
        let div=this.parentElement;
        div.style.display="none"
    }
}

let list=document.querySelector("ul");
list.addEventListener('click',function(ev){
    if(ev.target.tagName==="LI"){
        ev.target.classList.toggle("checked")
    }
},false)

//Add button

function newElement(){
    let li=document.createElement("LI");
    let inputValue=document.getElementById("myInput").value;
    let text=document.createTextNode(inputValue);
    li.appendChild(text);
    if(inputValue==""){
        alert("You must write something");
    }else{
        document.getElementById("myUl").appendChild(li);
    }
    document.getElementById("myInput").value="";

    let span=document.createElement("SPAN");
    let txt=document.createTextNode("\u00D7");
    span.className="close";
    span.appendChild(txt);
    li.appendChild(span);

    for(i=0;i<close.length;i++){
        close[i].onclick=function(){
            let div=this.parentElement;
            div.style.display="none"
        }
    }

}