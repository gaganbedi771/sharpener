
function AttachedEventListner(){
    let count=0;
    document.getElementById('clickme').addEventListener('click',function xyx(){
        console.log('clickedme '+ ++count);
    })
}

AttachedEventListner();