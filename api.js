import {likeButton}from "./DOM.js";
import{data}from "./DOM.js";
import{renderComments}from "./rendercomments.js";

const commentsElement = document.getElementById("comments" );
//window.token = "Bearer cob8cscw6g5k5c5c686g78c8c8as";
let password2 = localStorage.setItem('password', '2008');
let login2  = localStorage.setItem('login', 'rest');
let host = "https://webdev-hw-api.vercel.app/api/v2/:gerasimovaa/comments";
export function getCommentsLoading(token) {
    
    return fetch(host, {
    method: "GET",
    headers: {
      Authorization: window.token,
    },
}).then((response) => {
  if (response.status === 401) {
    // token = prompt("Введите верный пароль");
    // getCommentsLoading();
    throw new Error("Нет авторизации");
  }
  const jsonPromise = response.json();
  jsonPromise.then((responseData) => {
  
  let appComments = responseData.comments.map((comment) => {
  return {
    name: comment.author.name,
    date: data (comment.date),
    text: comment.text,
    likesCounter: 0,
    
  }
  
    })
   window.comments = appComments;
    renderComments();
    likeButton();
    
  });
  
}).then(() => {
  
  
}).catch((error) =>{
  
alert('Кажется, у вас сломался интернет, попробуйте позже');
console.warn(error);
}); 
}

export function getComments(token) {
    return fetch(host, {
     method: "GET",
     headers: {
      Authorization: window.token,
    },
 }).then((response) => {
   const jsonPromise = response.json();
   
   jsonPromise.then((responseData) => {
   let appComments = responseData.comments.map((comment) => {
   return {
     name: comment.author.name,
     date: data (comment.date) ,
     text: comment.text,
     likesCounter: 0,
     
   }
   
     })
     window.comments = appComments;
     renderComments();
     likeButton();
     
   });
   
 })  
}

export function postComments(nameInputElement,commentInputElement) {
    return   fetch(host, {
        method: "POST",
        body: JSON.stringify({ 
        date: data () ,
        name: nameInputElement,
        text: commentInputElement,
        likesCounter: 0,
        
        }), headers: {
          Authorization: window.token,
        
        }
    }).then((response) => {
        if (response.status === 201) {
        
          return response.json();
          
        }
        if (response.status === 500) {
          throw new Error('Сервер сломался, попробуй позже');
        } if (response.status === 400) {
          alert("Имя и комментарий должны быть не короче 3 символов");
          
        }
      })
          
}
export function login(login, password) {
  console.log(login);
  console.log(password)
    return   fetch( "https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        headers:{
          Authorization: window.token,
        },
        body: JSON.stringify({ 
        login:login,
        password:password,
        
        })
    }).then((response) => {
          return response.json();
      })
    }
    export function registers({ login, password, name }) {
      return fetch("https://webdev-hw-api.vercel.app/api/user", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          name,
        }),
      }).then((response) => {
        if (response.status === 400) {
          throw new Error("Такой пользователь уже существует");
        }
        return response.json();
      });
    };