import{d as _,r as s,i as d,j as n,t as r,u as i,I as p,J as f,v,_ as b}from"./index.ec1c96eb.js";const m={class:"load"},k=p(" \u4E0B\u4E00\u9875 "),h=_({__name:"autoLoad",emits:["load"],setup(x,{emit:c}){const a=new IntersectionObserver(t,{threshold:[.3]}),o=s();let l=f(),e=s(!1);function t(){l(()=>{c("load")},1e3)}function u(){e.value=!e.value,e.value?a.observe(o.value):a.unobserve(o.value)}return(L,g)=>(v(),d("label",m,[n("span",{onClick:t},[k,n("span",{class:"auto",ref_key:"auto",ref:o,onClick:u},r(i(e)?"Auto":"noAuto"),513)])]))}});const B=b(h,[["__scopeId","data-v-d0d140b7"]]);export{B as L};
