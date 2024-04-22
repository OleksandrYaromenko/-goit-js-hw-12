import{a as b,i as m,S as L}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();async function y(r,e){const n="43280076-efaf032a147c4a401dc5ab87e",o="https://pixabay.com/api/";return(await b.get(o,{params:{key:n,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}function g(r){return r.hits.map(e=>`<div class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="gallery-item-info">
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Likes: <span>${e.likes}</span>
                    </span>
                </p>
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Views: <span>${e.views}</span>
                    </span>
                </p>
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Comments: <span>${e.comments}</span>
                    </span>
                </p>
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Downloads: <span>${e.downloads}</span>
                    </span>
                </p>
            </div>
        </div>`).join("")}function h(){m.info({timeout:3e3,position:"topRight",message:"We're sorry, but you've reached the end of search results."})}function v(){m.info({timeout:3e3,position:"topRight",message:"The search query can not be epty!"})}function w(){m.error({timeout:3e3,position:"topRight",message:"There are no images matching your search query. Please, enter something else!"})}const f=new L(".gallery a",{nav:!0,captions:!0,captionsData:"alt",captionDelay:150}),l=document.querySelector(".search-form"),i=document.querySelector(".gallery"),d=document.querySelector(".loader"),a=document.querySelector(".load-btn");let p="",c;l.addEventListener("submit",M);a.addEventListener("click",q);async function M(r){if(c=1,r.preventDefault(),i.innerHTML="",p=l.elements.searchWord.value.trim(),a.style.display="none",p===""){v(),i.innerHTML="",a.style.display="none",l.reset();return}d.style.display="block";try{const e=await y(p,c),n=g(e);if(e.hits.length===0){w(),a.style.display="none",d.style.display="none";return}i.insertAdjacentHTML("beforeend",n),f.refresh(),d.style.display="none",e.totalHits<=c*15?h():a.style.display="block"}catch(e){console.error("Error:",e)}l.reset()}async function q(){c+=1;try{const r=await y(p,c).then(e=>{const n=g(e);i.insertAdjacentHTML("beforeend",n),f.refresh();const o=i.getBoundingClientRect().height;window.scrollBy({top:2*o,behavior:"smooth"}),e.hits.length<=14&&(a.style.display="none",h(),f.refresh())})}catch(r){console.error("Error:",r)}}
//# sourceMappingURL=commonHelpers.js.map
