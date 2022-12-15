// console.log('person1: shows ticket');
// console.log('person2: shows ticket');

// const { reject } = require("async");

//traditional method
// const wifeBringingTkts=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('ticket')
//     },3000);
// })

// const getPopcorn=wifeBringingTkts.then((t)=>{
//     console.log('wife:I got the tickets');
//     console.log("husband:let's go inside");
//     console.log("wife:I am hungry as usual");
//     return new Promise((resolve,reject)=>{resolve('popcorn with '+ t)});
// })
// const getButter=getPopcorn.then((t)=>{
//     console.log(t);
//     console.log('husband: here are the popcorns, lets go inside now');
//     console.log("wife:But I want butter too");
//     console.log("husband:Alright!");
//     return new Promise((resolve,reject)=>{
//         resolve(`Butter ${t}`);
//     }) 
// });
// getButter.then((t)=>console.log(t));

// console.log('person4: shows ticket');
// console.log('person5: shows ticket');

// console.log('person1: shows ticket');
// console.log('person2: shows ticket');

//using async await
// let preMovie = async () => {
//     const wifeBringingTkts = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('ticket')
//         }, 3000);
//     })
//     let ticket = await wifeBringingTkts;

//     console.log('wife:I got the tickets');
//     console.log("husband:let's go inside");
//     console.log("wife:I am hungry as usual");

//     const getPopcorn = new Promise((resolve, reject) => resolve('popcorn'));

//     const popcorn = await getPopcorn;
//     console.log('husband: here are the popcorns, lets go inside now');
//     console.log("wife:But I want butter too");
//     console.log("husband:Alright!");

//     let getButter = new Promise((resolve, reject) => resolve('butter popcorn'));
//     let butterpopcorn = await getButter;
//     console.log('husband: here are the butter popcorns, lets go inside');
//     console.log("wife:But I want something to drink as well");
//     console.log("husband:Alright! You cow");

//     let getCoke = new Promise((resolve, reject) => resolve('coke'));
//     let coke = await getCoke;
//     return (butterpopcorn + ticket + coke);
// }
// preMovie().then((t) => { console.log(t) });

//getPost delPost
let post = [
    { title: 'post One' },
    { title: 'post Two' }
];
//post=[];

async function f() {
    function createAllposts(post){
        let output = '';
                post.forEach((p) => {
                    output += `<li>${p.title}</li>`;
                })
                document.body.innerHTML = output;
    }
    function deletelast(post){
                post.pop();
                createAllposts(post);
                
    }
    let getPosts = new Promise((resolve, reject) => {
        setTimeout(() => {
            let len = post.length;
            if (len > 0) {
                createAllposts(post);
                resolve('resolved');
            }
            else {
                reject('rejected');
            }
        }, 2000);
    });
    await getPosts;

    let createPost3 = new Promise((resolve, reject) => {
        let create3 = { title: 'post Three' };
        post.push(create3);

        setTimeout(() => {
            let output = '';
            post.forEach((p) => {
                output += `<li>${p.title}</li>`;
            })
            document.body.innerHTML = output;
            resolve('Post 3 created');
        }, 1000)

    })
    await createPost3;

    let deletePosts=new Promise((resolve,reject)=>{
            console.log(post.length);
            setTimeout(()=>{
                deletelast(post);
            },1000);
            setTimeout(()=>{
                deletelast(post);
            },2000);
            setTimeout(()=>{
                deletelast(post);
            },3000);
        setTimeout(()=>{resolve('deleted')},3500);
    })
    await deletePosts;
    return ('Done');
}

f().then((a)=>alert(a));