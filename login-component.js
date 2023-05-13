import { login } from "./api.js";
import{fetchAndRenderCommentsTwo} from "./DOM.js";
import {renderComments} from "./rendercomments.js";
import { registers } from "./api.js";
let isLoginMode = true;

export function renderLoginComponent({ appEl, setToken }){
  const renderForm  = () =>{
    const  appHtml = `<div class="container">
    <div class="container-login">
   
          <div id= "add-form"  class="add-form">
          ${
            isLoginMode
              ? ""
              : `
              Имя
            <input type="text" id="name-input" class="add-form-name" />
            <br>`
          }
            <input
              type="text"
              id="login-input"
              class="add-form-name"
              placeholder="Логин"
            />
            <textarea
              type="textarea"
              id="password-input"
              class="add-form-name"
              placeholder="Пароль"
              rows="4"
            ></textarea>
            <div class="add-form-row">
              
              <button class="add-form-button" id="login-button">${
                isLoginMode ? "Войти" : "Зарегистрироваться"
              }</button>
          
              <br /><br /><br />
              <button class="add-form-button" id="toggle-button">Перейти ${
                isLoginMode ? "к регистрации" : "ко входу"
              }</button>
            </div>
          </div>
          </div>
         </div>`
         appEl.innerHTML = appHtml;
        //  let loginInput = document.getElementById('login-input');
        //  let passwordInput = document.getElementById('password-input');
         
         document.getElementById('login-button').addEventListener('click',() =>{
          const login1 = document.getElementById("login-input").value;
            const password = document.getElementById("password-input").value;
          if (isLoginMode) {
            
    
            if (!login1) {
              alert("Введите логин");
              return;
            }
    
            if (!password) {
              alert("Введите пароль");
              return;
            }
            console.log(login1)
            console.log(password)
            login(login1,
              password,
            )
            
              .then((user) => {
                setToken(`Bearer ${user.user.token}`);
                renderComments();
                fetchAndRenderCommentsTwo();
              })
              .catch((error) => {
                // TODO: Выводить алерт красиво
                alert(error.message);
              });
          } else {
            const login = document.getElementById("login-input").value;
            const name = document.getElementById("name-input").value;
            const password = document.getElementById("password-input").value;
            if (!name) {
              alert("Введите имя");
              return;
            }
            if (!login) {
              alert("Введите логин");
              return;
            }
    
            if (!password) {
              alert("Введите пароль");
              return;
            }
    
            registers({
              login: login,
              password: password,
              name: name,
            })
              .then((user) => {
                setToken(`Bearer ${window.token}`);
                renderComments();
                 fetchAndRenderCommentsTwo();
              })
              .catch((error) => {
                // TODO: Выводить алерт красиво
                alert(error.message);
              });
          }
        });
    
        document.getElementById("toggle-button").addEventListener("click", () => {
          isLoginMode = !isLoginMode;
          renderForm();
        });
      
          
        //   login({login: loginInput.value, 
        //   password: passwordInput.value,
        // }).then((user) => {
        //   console.log(user);
        //   setToken(`Bearer ${user.user.token}`);
          
        //   renderComments();
        //   fetchAndRenderCommentsTwo(); 
        // })
        
          
         }
         renderForm();  
        }
        
