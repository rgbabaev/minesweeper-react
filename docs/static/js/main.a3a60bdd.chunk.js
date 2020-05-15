(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,n,t){e.exports=t(38)},31:function(e,n,t){},32:function(e,n,t){},35:function(e,n,t){},36:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(1),l=t.n(a),r=t(7),i=t.n(r),o=t(10),s=t(11),c=t(12),u=t(25),m=t(22),f=t(6),g=t.n(f),h=(t(31),g.a.lock("ArenaCell")),d=function(e){var n=e.cell,t=e.i,a=e.cellSize,r=e.onCellFlag,i=e.onCellOpen,o=e.gameState,s=n.opened||"lost"===o&&(n.mined&&!n.flagged||!n.mined&&n.flagged);return l.a.createElement("div",{className:h({opened:s,closed:!s}),style:{width:a,height:a},key:t,"data-neighbor-mines":n.neighborMines,onClick:function(){return i(t)},onContextMenu:function(e){e.preventDefault(),r(t)}},s?n.mined?"\ud83d\udca3":n.flagged&&"lost"===o?"\u274c":n.neighborMines:n.flagged||"won"===o?"\ud83d\udea9":null)},p=(t(32),g.a.lock("Arena")),C=function(e){var n=e.cells,t=void 0===n?[]:n,a=e.size,r=e.onCellFlag,i=e.onCellOpen,o=e.gameState,s=e.onResetClick;return l.a.createElement("div",{className:p(),tabIndex:0,onKeyPress:function(e){return 32===e.charCode&&s()}},l.a.createElement("div",{className:p("inner"),style:{width:28*a[0],height:28*a[1]}},t.map(function(e,n){return l.a.createElement(d,{cell:e,cellSize:28,i:n,key:n,onCellOpen:i,onCellFlag:r,gameState:o})})))},v=(Object(a.memo)(C),t(3)),b=(t(35),g.a.lock("Hat")),w=function(e){var n=e.gameState,t=e.minesLeftCount,a=e.timerValue,r=e.onFlagClick,i=e.onOptionsClick,o=e.onResetClick;return l.a.createElement(v.b,{className:b(),controls:[l.a.createElement(v.h,{className:b("output"),title:"Mines counter"},"\ud83d\udca3",t),l.a.createElement(v.h,{className:b("output"),title:"Timer"},"\u23f1",null===a?0:Math.round(a/1e3)),l.a.createElement(v.a,{onClick:o,title:"New game",intent:"playing"===n?"secondary":"primary"},"playing"===n?"\ud83d\ude42":"won"===n?"\ud83d\ude0e":"\ud83d\ude35","New game"),l.a.createElement(v.g,{onClick:r,title:"Flag"},"Flag"),l.a.createElement(v.a,{onClick:i,title:"Options"},"Options")]})},O=t(4),E=t(23),k=t(41);function y(e,n){var t=Object(O.a)(e,2),a=t[0],l=t[1],r=n.slice(0).sort(function(e,n){return e>n?1:-1}),i=a*l-r.length,o=Math.floor(Math.random()*i);return r.reduce(function(e,n,t){return n-t<=o?t+1:e},0)+o}var S=function(e,n,t){var a=[t];return Object(k.a)(function(){return a.push(y(e,a))},n),a.slice(1)},T=function(e,n){return e[n]=(e[n]||0)+1},j=function(e,n){var t=Object(O.a)(e,2),a=t[0],l=t[1],r=[],i=n%a,o=Math.floor(n/a);return o>0&&(i>0&&r.push(n-a-1),r.push(n-a),i<a-1&&r.push(n-a+1)),i>0&&r.push(n-1),i<a-1&&r.push(n+1),o<l-1&&(i>0&&r.push(n+a-1),r.push(n+a),i<a-1&&r.push(n+a+1)),r},N=function(e){var n=Object(O.a)(e,2),t=n[0],a=n[1],l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=[];return l.forEach(function(e){var n=e%t,l=Math.floor(e/t);l>0&&(n>0&&T(r,e-t-1),T(r,e-t),n<t-1&&T(r,e-t+1)),n>0&&T(r,e-1),n<t-1&&T(r,e+1),l<a-1&&(n>0&&T(r,e+t-1),T(r,e+t),n<t-1&&T(r,e+t+1))}),r};function M(e,n,t){var a=S(e,n,t),l=N(e,a);return Object(k.a)(function(e){return{mined:a.includes(e),neighborMines:l[e],flagged:!1,opened:!1}},e[0]*e[1])}var _=function(){function e(n,t,a){var l=this;Object(o.a)(this,e),this.startTimer=function(){l.startTime=Date.now(),l.timerId=setInterval(l._render.bind(l),1e3)},this.stopTimer=function(){l.endTime=Date.now(),clearInterval(l.timerId)},this.handleCellClick=function(e){if("playing"===l.gameState){var n=l.cells[e];n.flagged||(n.opened?l._openNeighborCells(e):l._openCell(e),l._render())}},this._explode=function(e){l.gameState="lost",l.endTime=Date.now()},this._openCell=function(e){var n=l.cells[e];0===l.openedCells&&(l.cells=M(l.arena,l.minesCountTotal,e),l.minedCells=l.cells.filter(function(e){return e.mined}),l.startTimer()),n.mined?l._explode(e):n.opened||function(){for(var n=[e],t=0;t<n.length;t++)if(!l.cells[n[t]].neighborMines){var a=j(l.arena,n[t]).filter(function(e){return!n.includes(e)});n.push.apply(n,Object(E.a)(a))}n.forEach(function(e){l.cells[e].opened=!0,l.openedCells++});var r,i,o=l.cells.filter(function(e){return!e.opened});r=l.minedCells,i=o,r.length!==i.length||r.some(function(e,n){return i[n]!==e})||(l.gameState="won",l.stopTimer())}()},this._openNeighborCells=function(e){var n=l.cells[e];if(!n.mined){var t=j(l.arena,e);t.map(function(e){return l.cells[e]}).filter(function(e){return!!e.flagged}).length===n.neighborMines&&t.map(function(e){return[e,l.cells[e]]}).filter(function(e){var n=Object(O.a)(e,2);n[0];return!n[1].flagged}).forEach(function(e){var n=Object(O.a)(e,1)[0];return l._openCell(n)})}},this.flagCell=function(e){if("playing"===l.gameState){var n=l.cells[e];n.opened||(n.flagged=!n.flagged,n.flagged?l.flaggedCells++:l.flaggedCells--),l._render()}},this.reset=function(){l.stopTimer(),l.openedCells=0,l.flaggedCells=0,l.gameState="playing",l.cells=M(l.arena,0,0),l.minedCells=[],l.startTime=null,l.endTime=null,l._render()},this.redrawFn=a,this.arena=n||[9,9],this.minesCountTotal=t||10,this.reset()}return Object(s.a)(e,[{key:"configure",value:function(e,n){this.arena=e,this.minesCountTotal=n,this.reset()}},{key:"getCells",value:function(){return this.cells}},{key:"_countFlaggedCells",value:function(){return this.cells.filter(function(e){return!0===e.flagged}).length}},{key:"_countOpenedCells",value:function(){return this.cells.filter(function(e){return!0===e.opened}).length}},{key:"getStats",value:function(){return{gameState:this.gameState,arena:this.arena,minesCountTotal:this.minesCountTotal,opened:this.openedCells,flagged:this.flaggedCells,timerValue:this.startTime?(this.endTime||Date.now())-this.startTime:null,endTime:this.endTime}}},{key:"_render",value:function(){this.redrawFn()}}]),e}(),I=(t(36),g.a.lock("Options")),F=function(e,n,t){return t>=e*n?e*n-1:t},x=function(e){var n=e.arena,t=e.mines,r=e.onApply,i=e.onClose,o=Object(a.useState)({w:n[0],h:n[1],m:t}),s=Object(O.a)(o,2),c=s[0],u=c.w,m=c.h,f=c.m,g=s[1],h=function(e){return function(n){var t=parseInt(n.target.value,10)||0;t=t>100?100:t,g(function(n){return{w:n.w,h:n.h,m:n.m,[e]:t}})}},d=function(){return g(function(e){var n=e.w,t=e.h,a=e.m;return{w:n=n<2?2:n,h:t=t<2?2:t,m:a=F(n,t,a)}})};return l.a.createElement(v.e,{title:"Options",onSubmit:function(e){e.preventDefault(),r([u,m],F(u,m,f)),i()},onClose:i,footerControls:[l.a.createElement(v.a,{type:"button",onClick:i},"Cancel"),l.a.createElement(v.a,{type:"submit",intent:"primary"},"Apply")]},l.a.createElement("div",{className:I("inner")},l.a.createElement(v.c,{label:"Level"},l.a.createElement(v.f,{name:"level",onChange:function(){return g({w:9,h:9,m:10})},checked:9===u&&9===m&&10===f},"Beginner (9x9, 10 mines)"),l.a.createElement(v.f,{name:"level",onChange:function(){return g({w:16,h:16,m:40})},checked:16===u&&16===m&&40===f},"Intermidiate (16x16, 40 mines)"),l.a.createElement(v.f,{name:"level",onChange:function(){return g({w:30,h:16,m:99})},checked:30===u&&16===m&&99===f},"Expert (30x16, 99 mines)")),l.a.createElement("div",{className:I("inputs")},l.a.createElement(v.d,{className:I("labeledInput"),onBlur:d,label:"Width",value:u,onChange:h("w")}),l.a.createElement(v.d,{className:I("labeledInput"),onBlur:d,label:"Height",value:m,onChange:h("h")}),l.a.createElement(v.d,{className:I("labeledInput"),onBlur:d,label:"Mines",value:f,onChange:function(e){var n=parseInt(e.target.value,10)||0;g(function(e){var t=e.w,a=e.h;return{w:t,h:a,m:F(t,a,n)}})}}))))},A=(t(37),function(e){Object(u.a)(t,e);var n=Object(m.a)(t);function t(e){var a;return Object(o.a)(this,t),(a=n.call(this,e)).toggleOptions=function(){return a.setState(function(e){return{showOptions:!e.showOptions}})},a.newGame=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[10,10],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return a.game.configure(e,n)},a.state={showOptions:!1},a.game=new _(null,null,a.forceUpdate.bind(Object(c.a)(a))),a}return Object(s.a)(t,[{key:"render",value:function(){var e=this.game.getStats(),n=e.gameState,t=e.minesCountTotal,a=e.arena,r=e.flagged,i=e.timerValue,o=this.state.showOptions;return l.a.createElement("div",{className:"App"},l.a.createElement(w,{gameState:n,timerValue:i,minesLeftCount:t-r,onResetClick:this.game.reset,onOptionsClick:this.toggleOptions}),l.a.createElement(C,{gameState:n,size:a,cells:this.game.getCells(),onCellOpen:this.game.handleCellClick,onCellFlag:this.game.flagCell,onResetClick:this.game.reset}),o&&l.a.createElement(x,{onApply:this.newGame,onClose:this.toggleOptions,arena:a,mines:t}))}}]),t}(l.a.Component)),D=document.getElementById("root");i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(A,null)),D)}},[[26,1,2]]]);
//# sourceMappingURL=main.a3a60bdd.chunk.js.map