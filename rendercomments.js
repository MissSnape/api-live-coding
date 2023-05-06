
import {likeButton}from "./DOM.js";
const commentsElement = document.getElementById("comments" );
import{data}from "./DOM.js";
import{fetchAndRenderCommentsTwo} from "./DOM.js";
import{postComments} from "./api.js";
import{renderLoginComponent} from "./login-component.js";
window.token;
let host = "https://webdev-hw-api.vercel.app/api/v2/:gerasimovaa/comments";
// рендер
export const renderComments = () =>{
  const appEl = document.getElementById("app");
  if (!window.token) {
  ///g
         renderLoginComponent({ appEl, setToken: (newToken) =>{
         window.token = newToken
         },
         fetchAndRenderCommentsTwo,
         });
         return;   
  }
  //записать window.token
  //форма регистрации
  //
  const commentsHtml = window.comments.map((comment) => {
    return ` <li class="comment" data-text="${comment.text}" data-name="${comment.name}"
    data-date= "${comment.date}" data-counter="${comment.likesCounter}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div  class="comment-text" >
             ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span  class="likes-counter" data-counter="${comment.likesCounter}">${comment.likesCounter}</span>
              <button class="like-button" ></button>
           
            </div>
          </div>
        </li>`;
    }).join(''); 
    
 const appHtml = `<div class="container">

       <ul id="comments" class="comments">${commentsHtml} </ul>
      
    
    <div id= "addFormLoading" class="addFormLoading">
      <div id= "add-form" class="add-form">
        <input
          type="text"
          id="name-input"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          id="comment-input"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
      </div>`
    
          
      likeButton();
   
    appEl.innerHTML = appHtml;
    
    const buttonElement = document.getElementById("add-button");
    const commentsElement = document.getElementById("comments" ); 
    const nameInputElement = document.getElementById("name-input" );
 const commentInputElement = document.getElementById("comment-input" );
 
 
    buttonElement.addEventListener("click", () => {
  
   
      nameInputElement.classList.remove('error');
    
      if (nameInputElement.value === '' ) {
        nameInputElement.classList.add('error');
        return;
      }
    
      commentInputElement.classList.remove('error');
    
      if (commentInputElement.value === '' ) {
        commentInputElement.classList.add('error');
        return;
      }
      
      comments.push({
        name: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        date: data (),
        text: commentInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        likesCounter: 0,
          }); 
         
      
    const postAndRenderComments = () => {
      
      
    
    return postComments(comments[comments.length - 1].name, comments[comments.length - 1].text)
    .then(() => {
      
    }).then(() => {
      return fetchAndRenderCommentsTwo();
     
     })
    .catch((error) =>{
      
    alert('Кажется, у вас сломался интернет, попробуйте позже');
    console.warn(error);
    
    });
    
     } 
    
     
     postAndRenderComments();
     
     nameInputElement.value = '';
     commentInputElement.value = '';
     
      renderComments();
      likeButton();
      
    });
    
    } 
  
    