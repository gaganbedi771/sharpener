const post=[
    {title:'Post one', body:'This is post one',createdAt:new Date().getTime()},
    {title:'Post two', body:'This is post two',createdAt:new Date().getTime()}
];
let intervalId=0;
function getPosts(){
    clearInterval(intervalId);
    intervalId=setInterval(()=>{

        let output='';
        post.forEach((post)=>{

            output+=`<li>${post.title} edited ${(new Date().getTime()-post.createdAt)/1000} seconds ago</li>`;
        })
      
        document.body.innerHTML=output;
    },1000)
}

function createPost(p,gP){
    setTimeout(()=>{
        post.push({...p,createdAt:new Date().getTime()});
        gP();
    },2000);
}

function create4thpost(p,cP){
    setTimeout(()=>{
        cP({...p,createdAt:new Date().getTime()},getPosts);
        
    },4000)
}
createPost({title:'Post three',body:'This is post three'},getPosts);
create4thpost({title:'Post four',body:'This is post four'},createPost);