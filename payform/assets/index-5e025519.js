(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const d=document.querySelector(".home-page__form--next-step"),p=e=>{e.addEventListener("submit",t=>{t.preventDefault(),l(e)?alert("Success"):alert("Error")}),e.addEventListener("keydown",t=>{if(t.key=="Enter")return t.preventDefault(),!1}),[...e.elements].forEach(t=>{t.nodeName==="INPUT"&&t.type==="text"&&(t.addEventListener("keyup",a=>{l(e)?d.classList.remove("controls__button--inactive"):d.classList.add("controls__button--inactive")}),t.name=="name-on-card"&&t.addEventListener("input",a=>{t.value=t.value.replace(/[\d]/g,"").replace(/[^\w\s]/gi,"")}),t.name=="cvv"&&t.addEventListener("input",a=>{t.value=t.value.replace(/[^\dA-Z]/g,"")}),t.name=="cc-number"&&t.addEventListener("input",a=>{t.value=t.value.replace(/[^\dA-Z]/g,"").replace(/(.{4})/g,"$1 ").trim()}),t.name=="expiry-date"&&t.addEventListener("input",a=>{t.value=t.value.replace(/[^\dA-Z]/g,"").replace(/(.{2})/g,"$1/").replace(/\/$/,"")}))})},v=e=>e.nodeName==="INPUT"&&e.type==="text"?e.name=="name-on-card"?u(e,/^[a-zA-Z\s]*$/)&&!f(e.value):e.name=="cvv"?u(e,/^\d+$/,3):e.name=="cc-number"?c(e.value.replace(/\s/g,"")):e.name=="expiry-date"?u(e,/^\d+(\/\d+)*$/,5)&&m(e.value):!f(e.value):!0,l=e=>[...e.elements].every(t=>v(t)),f=e=>!e.trim().length,u=(e,t,a)=>t.test(e.value)&&a==null?!0:e.value.length==a,m=e=>parseInt(e.split("/")[0])>0&&parseInt(e.split("/")[0])<=12&&(parseInt(e.split("/")[1])>parseInt(new Date().getFullYear().toString().substring(2))||parseInt(e.split("/")[1])==parseInt(new Date().getFullYear().toString().substring(2))&&parseInt(e.split("/")[0])>=new Date().getMonth()+1),c=e=>e&&g(e)&&e.length==16&&(e[0]==4||e[0]==5&&e[1]>=1&&e[1]<=5||e.indexOf("6011")==0||e.indexOf("65")==0)||e.length==15&&(e.indexOf("34")==0||e.indexOf("37")==0)||e.length==13&&e[0]==4,g=e=>{for(var t=0,a=!1,s=e.length-1;s>=0;s--){var r=parseInt(e[s]);a&&(r*=2,r>9&&(r-=9)),t+=r,a=!a}return t%10==0};p(document.forms.homePageForm);
