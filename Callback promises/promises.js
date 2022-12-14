const post=[
    {title:'Post one', body:'This is post one',createdAt:new Date().getTime()},
    {title:'Post two', body:'This is post two',createdAt:new Date().getTime()}
];

//promises all
const promise1=Promise.resolve('HelloWorld');
const promise2=10;
const promise3=new Promise((resolve,reject)=>{
    setTimeout(resolve,1000,'GoodBye');
});
let lastseen;
function updLstUsrActiTym(){
    
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let error=false;
    if(!error){

        resolve();
    }
    else{
        reject();
    }
    },1000);
    
})
};

function getPosts(){
    setTimeout(()=>{
        let output='';
        post.forEach((post)=>{
            output+=`<li>${post.title}</li>`;
        })
        
        document.body.innerHTML=output;
    },000)
}

function createPost(p){
    
    post.push({...p,createdAt:new Date().getTime()});
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let error=false ;
            if(!error){
                resolve();
            }
            else{
                reject();
            }
        },000);
    })
}


function deletePost(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            
            if(post.length>0){
                post.pop();
                console.log(post);
                resolve();
            }
            else{
                reject();
            }
        },1000);
    })
}




createPost({title:'Post three',body:'This is post three'}).then(()=>{
    updLstUsrActiTym().then(()=>{
        getPosts();
        console.log('Last post created at:',new Date(),post)
        deletePost().then(()=>{
            getPosts();
            deletePost().then(()=>{
                getPosts();
                deletePost().then(()=>{
                    getPosts();
                    deletePost().then()
                    .catch(()=>{
                        console.log('Array is empty now. You dont have to use for loop as there are only 3 posts . Just call delete post 3 times.');
                        createPost({title:'Post four',body:'Body of four'}).then(()=>{
                            updLstUsrActiTym().then(()=>{
                                getPosts();
                                console.log('Last post created at:',new Date(),post)
                                deletePost().then(()=>{
                                    getPosts();
                                    deletePost().then().catch(()=>{
                                        console.log('4th post deleted. Empty array');
                                    })
                                })
                            })
                            .catch('Error');
                            
                            
                        })
                    })
                })
            })
        })
    })
        .catch('Error');
    
  ;
}).catch(()=>{console.log('error')});



