(this["webpackJsonp2048-game"]=this["webpackJsonp2048-game"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(7),c=n.n(o),u=(n(14),n(8)),i=n(2),l=n(1),s=n(5),f=function(e){var t=e.gameover,n=e.score;return a.a.createElement("div",{className:t?"gameover show":"gameover"},a.a.createElement("p",null,n>=2048?"You've won":"No more moves"))},m=function(e){var t=e.score,n=e.bestScore,r=e.init;return a.a.createElement(a.a.Fragment,null,a.a.createElement("header",null,a.a.createElement("div",{className:"logo"},a.a.createElement("p",null,"2048")),a.a.createElement("div",{className:"header-info-section"},a.a.createElement("div",{className:"score"},a.a.createElement("p",null,"score"),a.a.createElement("p",null,t)),a.a.createElement("div",{className:"best"},a.a.createElement("p",null,"Best"),a.a.createElement("p",null,n)),a.a.createElement("button",{className:"btn btn-reset",onClick:r},"Reset"))))};function v(){return a.a.createElement("div",{className:"instructions"},a.a.createElement(s.BrowserView,null,a.a.createElement("strong",null,"How to play: ")," Press the \u2191, \u2193, \u2192, \u2190 arrow keys to move the tiles. When 2 same tiles touch they merge into one. Reach 2048 to win."),a.a.createElement(s.MobileView,null,a.a.createElement("strong",null,"How to play: ")," Swipe up, right, down and left to move the tiles. When 2 same tiles touch they merge into one. Reach 2048 to win."))}var b=function(e){var t=e.grid,n=e.id;return a.a.createElement("main",{className:"grid"},t.join(",").split(",").map((function(e,t){return a.a.createElement("div",{className:"colour-".concat(e," ").concat(t===n?"newBlock":""),key:t},"0"===e?"":e)})))};var h=function(){var e=Object(r.useState)(0),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(0),h=Object(l.a)(c,2),d=h[0],E=h[1],O=Object(r.useState)(0),j=Object(l.a)(O,2),w=j[0],p=j[1],g=Object(r.useState)(!1),S=Object(l.a)(g,2),y=S[0],N=S[1],M=Object(r.useState)(!1),k=Object(l.a)(M,2),A=k[0],B=k[1],R=Object(r.useState)(),I=Object(l.a)(R,2),J=I[0],L=I[1],T=Object(r.useState)([0,0]),Y=Object(l.a)(T,2),D=Y[0],H=Y[1],U=Object(r.useState)([0,0]),V=Object(l.a)(U,2),W=V[0],X=V[1],x=Object(r.useState)(!1),C=Object(l.a)(x,2),F=C[0],P=C[1],q=Object(r.useState)([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]),z=Object(l.a)(q,2),G=z[0],K=z[1];Object(r.useEffect)((function(){var e=localStorage.getItem("2048-best-score")?localStorage.getItem("2048-best-score"):0;o(e),Q()}),[]);var Q=function(){var e=Math.round(Math.random());p([2,4][e]),B((function(e){return!0!==e}))};Object(r.useEffect)((function(){for(var e=Object(i.a)(G),t=!1;!t;){var n=Math.floor(4*Math.random()),r=Math.floor(4*Math.random());0===e[n][r]&&(e[n][r]=w,Z(n,r),t=!0,$())}K(e)}),[A]);var Z=function(e,t){L(4*e+t)},$=function(){var e=0;G.map((function(t){return e+=t.reduce((function(e,t){return e+Number(t)}),0)})),E(e)},_=function(e){s.isBrowser&&(e=e.key);var t=JSON.parse(JSON.stringify(Object(i.a)(G)));if("ArrowUp"===e)!function(){for(var e=Object(i.a)(G),t=function(t){var n=[0,1,2,3].map((function(n){return e[n][t]})).filter((function(e){return e>0}));n=te(n);for(var r=0;r<4;r++)e[r][t]=void 0!==n[r]?n[r]:0},n=0;n<4;n++)t(n);K(e)}();else if("ArrowDown"===e)!function(){for(var e=Object(i.a)(G),t=function(t){var n=[3,2,1,0].map((function(n){return e[n][t]})).filter((function(e){return e>0}));n=te(n);for(var r=0;r<4;r++)e[r][t]=void 0!==n[3-r]?n[3-r]:0},n=0;n<4;n++)t(n);K(e)}();else if("ArrowLeft"===e)!function(){for(var e=Object(i.a)(G),t=0;t<4;t++){var n=e[t].filter((function(e){return e>0}));n=te(n);for(var r=0;r<4;r++)e[t][r]=void 0!==n[r]?n[r]:0}K(e)}();else{if("ArrowRight"!==e)return;!function(){for(var e=Object(i.a)(G),t=0;t<4;t++){var n=e[t].filter((function(e){return e>0}));n=te(n).reverse();for(var r=0;r<4;r++)e[t][r]=void 0!==n[3-r]?n[3-r]:0}K(e)}()}for(var n=!1,r=0;r<4;r++)for(var a=0;a<4;a++)t[r][a]!==G[r][a]&&(n=!0);n&&(Q(),$(),ee())},ee=function(){var e,t=0,r=Object(u.a)(G);try{for(r.s();!(e=r.n()).done;){t+=e.value.filter((function(e){return 0!==e})).length}}catch(l){r.e(l)}finally{r.f()}if(16===t){for(var a=!0,c=0;c<=3;c++)for(var i=0;i<=3;i++)3===c?G[c][i]===G[c][i+1]&&(a=!1):3===i?G[c][i]===G[c+1][i]&&(a=!1):G[c][i]!==G[c+1][i]&&G[c][i]!==G[c][i+1]||(a=!1);a&&(N(!0),d>n&&(localStorage.setItem("2048-best-score",d),o(d)))}},te=function(e){for(var t=Object(i.a)(e),n=0;n<e.length-1;n++)t[n]===t[n+1]&&(t[n]=2*e[n],t.splice(n+1,1));return t};Object(r.useEffect)((function(){if(!y)return window.addEventListener("keydown",_),function(){window.removeEventListener("keydown",_)}})),Object(r.useEffect)((function(){if(F){var e=D[0]-W[0],t=D[1]-W[1],n=Math.abs(e),r=Math.abs(t);n>r?_(e>0?"ArrowLeft":"ArrowRight"):n<r&&_(t>0?"ArrowUp":"ArrowDown"),P(!1)}}),[F]);var ne=function(e){"touchstart"===e.type?H([e.touches[0].clientX,e.touches[0].clientY]):"touchmove"===e.type?X([e.touches[0].clientX,e.touches[0].clientY]):"touchend"===e.type&&P(!0)};return a.a.createElement("div",{className:"app",onTouchStart:function(e){return ne(e)},onTouchMove:function(e){return ne(e)},onTouchEnd:function(e){return ne(e)}},a.a.createElement(m,{score:d,bestScore:n,init:function(){K([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]),Q(),E(w),N(!1)}}),a.a.createElement(v,null),a.a.createElement(f,{className:"gameover",gameover:y,score:d}),a.a.createElement(b,{grid:G,id:J}))};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(h,null)),document.getElementById("root"))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.c59f1b45.chunk.js.map