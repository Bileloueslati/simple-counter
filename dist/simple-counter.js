(()=>{"use strict";function e(e,t,n){this.endDate=t,this.startDate=e,this.element=n,this.emitter={events:{},emit(e,...t){(this.events[e]||[]).forEach((e=>e(...t)))},on(e,t){return(this.events[e]=this.events[e]||[]).push(t),()=>this.events[e]=(this.events[e]||[]).filter((e=>e!==t))}}}e.prototype.getRemainingTime=function(){this.startDate=new Date(this.startDate.getTime()+1e3);var e=this.endDate.getTime()-this.startDate.getTime();return{distance:e,days:Math.floor(e/864e5),hours:Math.floor(e%864e5/36e5),minutes:Math.floor(e%36e5/6e4),seconds:Math.floor(e%6e4/1e3)}},e.prototype.start=function(){var e=this;return this.element.innerHTML="Chargement...",null!==this.interval&&clearInterval(this.interval),this.interval=setInterval((function(){var t=(n=e.getRemainingTime()).distance,n=[{key:"Day",value:n.days},{key:"Hour",value:n.hours},{key:"Minute",value:n.minutes},{key:"Second",value:n.seconds}].filter((function(e){return 0<e.value})).map((function(e){var t=e.key;return e=e.value,"".concat(e," ").concat(1<e?t+"s":t)})).join(", ");t<0?e.stop():e.element.innerHTML=n}),1e3),this},e.prototype.stop=function(){clearInterval(this.interval),this.element.innerHTML="Finished",this.emitter.emit("finish",this.element)},e.prototype.on=function(e,t){return this.emitter.on(e,t)};const t=e;var n=document.getElementById("counter"),i=Date.now()+1e4;(i=new t(new Date,new Date(i),n)).start(),i.on("finish",(function(e){e.innerHTML="It's done !"}))})();