import{b as bt}from"./chunk-3LEWPSQC.js";import{a as E,b as o}from"./chunk-PMHPWLZH.js";import{U as vt,b as gt,ha as St,o as yt,p as P}from"./chunk-I5PCDVRR.js";import{A,C as y,Db as S,Eb as C,Fb as U,Ka as st,L as b,La as rt,Lc as pt,Ob as ht,Pb as ft,Rc as mt,Ta as h,Tc as f,Ua as ot,V as Y,Wb as F,Xb as ut,ca as K,db as O,fc as w,g as D,ha as J,ib as at,lb as m,mb as ct,na as d,oa as Q,p as q,qa as X,rb as z,sa as tt,sb as lt,ta as l,va as et,w as R,wa as it,wb as dt,x as N,ya as v,za as nt}from"./chunk-7JXHIXKM.js";var kt=o.object({code:o.string(),name:o.string(),rows:o.number(),leftSeats:o.number(),rightSeats:o.number()}),j=class{code;name;rows;leftSeats;rightSeats;constructor(t){let n=kt.parse(t);this.code=n.code,this.name=n.name,this.rows=n.rows,this.leftSeats=n.leftSeats,this.rightSeats=n.rightSeats}};var Bt=o.object({id:o.number(),distance:o.number()}),Lt=o.object({id:o.number(),city:o.string(),latitude:o.number(),longitude:o.number(),connectedTo:o.array(Bt)});var Ct=o.array(Lt);var xt=o.object({latitude:o.number(),longitude:o.number()}),_=class{latitude;longitude;constructor(t){let n=xt.parse(t);this.latitude=n.latitude,this.longitude=n.longitude}},x=o.object({stationId:o.number(),city:o.string(),geolocation:xt}),p=class{stationId;city;geolocation;constructor(t){let n=x.parse(t);this.stationId=n.stationId,this.city=n.city,this.geolocation=new _(n.geolocation)}},It=o.object({time:o.array(o.string()).length(2),price:o.record(o.number()),occupiedSeats:o.array(o.number())}),V=class{time;price;occupiedSeats;constructor(t){let n=It.parse(t);this.time=n.time,this.price=n.price,this.occupiedSeats=n.occupiedSeats}},$=o.object({rideId:o.number(),segments:o.array(It)}),k=class{rideId;segments;constructor(t){let n=$.parse(t);this.rideId=n.rideId,this.segments=n.segments.map(e=>new V(e))}},Ot=o.object({id:o.number(),path:o.array(o.number()),carriages:o.array(o.string()),schedule:o.array($)}),W=class{id;path;carriages;schedule;constructor(t){let n=Ot.parse(t);this.id=n.id,this.path=n.path,this.carriages=n.carriages,this.schedule=n.schedule.map(e=>new k(e))}},Tt=o.object({path:o.array(x),carriages:o.array(o.string()),from:x,to:x,schedule:$}),wt=class{path;carriages;from;to;schedule;constructor(t){let n=Tt.parse(t);this.path=n.path,this.carriages=n.carriages,this.from=new p(n.from),this.to=new p(n.to),this.schedule=new k(n.schedule)}},Rt=o.object({from:x,to:x,routes:o.array(Ot)}),B=class{from;to;routes;constructor(t){let n=Rt.parse(t);this.from=new p(n.from),this.to=new p(n.to),this.routes=n.routes.map(e=>new W(e))}};var I=class r{urls={search:"/api/search",station:"/api/station",carriage:"/api/carriage"};httpClient=l(P);fetchCarriages(){return this.httpClient.get(this.urls.carriage).pipe(y(t=>t.map(n=>new j(n))),b(t=>{throw t instanceof E?console.error("Validation failed:",t.errors):console.error("Invalid data type received:",t),t}))}fetchStations(){return this.httpClient.get(this.urls.station).pipe(y(t=>Ct.parse(t).map(e=>new p({stationId:e.id,city:e.city,geolocation:{latitude:e.latitude,longitude:e.longitude}}))),b(t=>{throw t instanceof E?console.error("Validation failed:",t.errors):console.error("Invalid data type received:",t),t}))}fetchTrips(t,n,e){let i=new yt().set("fromLatitude",t.geolocation.latitude).set("fromLongitude",t.geolocation.longitude).set("toLatitude",n.geolocation.latitude).set("toLongitude",n.geolocation.longitude).set("time",e);return this.httpClient.get(this.urls.search,{params:i}).pipe(y(s=>new B(s)),b(s=>{throw s instanceof E?console.error("Validation failed:",s.errors):console.error("Invalid data type received:",s),s}))}static \u0275fac=function(n){return new(n||r)};static \u0275prov=d({token:r,factory:r.\u0275fac})};var Mt=class r{fetchData=l(I);carriages=m(null);get carriagesSignal(){return this.carriages()}fetchCarriages(){return D(this,null,function*(){try{let t=yield A(this.fetchData.fetchCarriages());this.carriages.set(t)}catch(t){console.error("Error fetching carriages:",t)}})}carriagesWithNumberOfSeats=mt(()=>{let t=this.carriages(),n=new Map;return t&&t.forEach(e=>{n.set(e.name,e.rows*(e.leftSeats+e.rightSeats))}),n});getAllOccupiedSeats(t){let n=[];if(t){let e=t.path.findIndex(s=>s.stationId===t.from.stationId),i=t.path.findIndex(s=>s.stationId===t.to.stationId);for(let s=e;s<i;s+=1){let a=t.schedule.segments[s].occupiedSeats;a&&n.push(...a)}}return n}getCarriagesWithNumberOfAvailableSeats(t){let n=new Map,e=this.getAllOccupiedSeats(t),i=this.carriagesWithNumberOfSeats();if(t){let s=t.carriages,a=0;s.forEach(c=>{let u=i.get(c);if(u){let jt=e.filter(Z=>Z>a&&Z<a+u).length,G=u-jt,H=n.get(c);H?n.set(c,H+G):n.set(c,G),a+=u}})}return n}static \u0275fac=function(n){return new(n||r)};static \u0275prov=d({token:r,factory:r.\u0275fac})};var Dt=class r{stations=m([]);fetchDataService=l(I);isLoading=m(!1);fetchStations(){return D(this,null,function*(){try{this.isLoading.set(!0);let t=yield A(this.fetchDataService.fetchStations());this.isLoading.set(!1),this.stations.set(t)}catch(t){console.error("Error fetching stations:",t)}})}get isLoadingSig(){return this.isLoading}getCitiesNames(){return this.stations().map(t=>t.city)}getCityByName(t){return this.stations().find(n=>n.city===t)}getCityById(t){return this.stations().find(n=>n.stationId===t)}getCities(){return this.stations()}getCitiesByIds(t){let n=t.map(e=>this.getCityById(e));if(n.includes(void 0))throw new Error("City not found");return n}static \u0275fac=function(n){return new(n||r)};static \u0275prov=d({token:r,factory:r.\u0275fac})};var At=class r{storage=l(bt);isManager(){return this.storage.getItem("login")==="admin@admin.com"}static \u0275fac=function(n){return new(n||r)};static \u0275prov=d({token:r,factory:r.\u0275fac})};var Pt=class r{isSelected$=new q(null);get selected$(){return this.isSelected$.asObservable()}set selected(t){this.isSelected$.next(t)}clearSelected(){this.selected=null}static \u0275fac=function(n){return new(n||r)};static \u0275prov=d({token:r,factory:r.\u0275fac,providedIn:"root"})};var Nt=["*"],M=class{},zt=(()=>{let t=class t extends M{constructor(e){super(),this.http=e}getSvg(e){return this.http.get(e,{responseType:"text"})}};t.\u0275fac=function(i){return new(i||t)(tt(P))},t.\u0275prov=d({token:t,factory:t.\u0275fac});let r=t;return r})(),Ut=new X("SERVER_URL"),L=(()=>{let t=class t{constructor(){this.loader=l(M),this.serverUrl=l(Ut,{optional:!0}),this.document=l(gt),this.iconsByUrl=new Map,this.iconsLoadingByUrl=new Map}addSvg(e,i){if(!this.iconsByUrl.has(e)){let s=this.document.createElement("DIV");s.innerHTML=i;let a=s.querySelector("svg");this.iconsByUrl.set(e,a)}}loadSvg(e,i=e){if(this.serverUrl&&e.match(/^(http(s)?):/)===null&&(e=this.serverUrl+e,i=e),this.iconsByUrl.has(i))return R(this.iconsByUrl.get(i));if(this.iconsLoadingByUrl.has(i))return this.iconsLoadingByUrl.get(i);let s=this.loader.getSvg(e).pipe(y(a=>{let c=this.document.createElement("DIV");return c.innerHTML=a,c.querySelector("svg")}),J(a=>this.iconsByUrl.set(i,a)),b(a=>(console.error(a),N(a))),Y(()=>this.iconsLoadingByUrl.delete(i)),K());return this.iconsLoadingByUrl.set(i,s),s}getSvgByName(e){return this.iconsByUrl.has(e)?R(this.iconsByUrl.get(e)):this.iconsLoadingByUrl.has(e)?this.iconsLoadingByUrl.get(e):N(`No svg with name '${e}' has been loaded`)}unloadSvg(e){this.iconsByUrl.has(e)&&this.iconsByUrl.delete(e)}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=d({token:t,factory:t.\u0275fac});let r=t;return r})();function Ft(r){return r||new L}var _t={provide:L,deps:[[new et,new it,L]],useFactory:Ft},T=class{constructor(){this.loaded=!1}},Ge=(()=>{let t=class t{constructor(){this.element=l(ot),this.differs=l(pt),this.renderer=l(at),this.iconReg=l(L),this.src=h(),this.name=h(),this.stretch=h(!1),this.applyClass=h(!1),this.svgClass=h(),this.klass=h(void 0,{alias:"class"}),this.viewBox=h(),this.svgAriaLabel=h(),this.svg=m(0),this.svgStyle=h(),this.helper=new T,f(()=>{(this.src()||this.name())&&(this.destroy(),this.init(this.src(),this.name()))},{allowSignalWrites:!0}),f(()=>{let s=this.viewBox();this.svg()&&this.updateViewBox(s)}),f(()=>{let s=this.svgStyle()||{};this.svg()&&this.applyChanges(this.helper.differ.diff(s))}),f(()=>{let s=this.svg();this.applyClass()?this.setClass(this.elemSvg,null,this.klass()):this.setClass(this.elemSvg,this.klass(),null)});let e;f(()=>{let s=this.svg();this.setClass(this.elemSvg,e,this.svgClass()),e=this.svgClass()});let i;f(()=>{let s=this.svg(),a=this.element.nativeElement;this.setClass(a,i,this.klass()),this.setClass(this.elemSvg,i,this.applyClass()?this.klass():null),i=this.klass()}),f(()=>{let s=this.svg();this.doAria(this.svgAriaLabel())}),f(()=>{let s=this.svg();this.stylize(this.stretch())})}ngOnDestroy(){this.destroy()}get elemSvg(){return this.element.nativeElement.firstChild}init(e,i){if(e&&i){let s=this.iconReg.loadSvg(e,i);s&&(this.helper.icnSub=s.subscribe(a=>this.initSvg(a)))}else if(i){let s=this.iconReg.getSvgByName(i);s&&(this.helper.icnSub=s.subscribe(a=>this.initSvg(a)))}else if(e){let s=this.iconReg.loadSvg(e);s&&(this.helper.icnSub=s.subscribe(a=>this.initSvg(a)))}else this.element.nativeElement.innerHTML="",this.svg.set(0)}initSvg(e){!this.helper.loaded&&e&&this.setSvg(e)}destroy(){this.helper.icnSub?.unsubscribe(),this.helper=new T,this.helper.differ=this.differs.find({}).create()}setSvg(e){if(!this.helper.loaded&&e){this.helper.svg=e;let i=e.cloneNode(!0),s=this.element.nativeElement;s.innerHTML="",this.renderer.appendChild(s,i),this.helper.loaded=!0,this.copyNgContentAttribute(s,i),this.svg.update(a=>a+1)}}updateViewBox(e){if(e){let i=this.elemSvg;if(e==="auto"){let s=i.getAttribute("width"),a=i.getAttribute("height");if(a&&s){let c=`0 0 ${s} ${a}`;this.renderer.setAttribute(i,"viewBox",c),this.renderer.removeAttribute(i,"width"),this.renderer.removeAttribute(i,"height")}}else e!==""&&(this.renderer.setAttribute(i,"viewBox",e),this.renderer.removeAttribute(i,"width"),this.renderer.removeAttribute(i,"height"))}}copyNgContentAttribute(e,i){let s=e.attributes,a=s.length;for(let c=0;c<a;c+=1){let u=s.item(c);if(u&&u.name.startsWith("_ngcontent")){this.setNgContentAttribute(i,u.name);break}}}setNgContentAttribute(e,i){this.renderer.setAttribute(e,i,"");let s=e.childNodes.length;for(let a=0;a<s;a+=1){let c=e.childNodes[a];c instanceof Element&&this.setNgContentAttribute(c,i)}}stylize(e){if(this.helper.svg){let i=this.element.nativeElement.firstChild;e===!0?this.renderer.setAttribute(i,"preserveAspectRatio","none"):e===!1&&this.renderer.removeAttribute(i,"preserveAspectRatio")}}applyChanges(e){e&&(e.forEachRemovedItem(i=>this.setStyle(i.key,null)),e.forEachAddedItem(i=>this.setStyle(i.key,i.currentValue)),e.forEachChangedItem(i=>this.setStyle(i.key,i.currentValue)))}setStyle(e,i){let[s,a]=e.split(".");i=i!==null&&a?`${i}${a}`:i;let c=this.elemSvg;i!==null?this.renderer.setStyle(c,s,i):this.renderer.removeStyle(c,s)}setClass(e,i,s){if(e){if(i){let a=(Array.isArray(i)?i:i.split(" ")).filter(c=>c);for(let c of a)this.renderer.removeClass(e,c)}if(s){let a=(Array.isArray(s)?s:s.split(" ")).filter(c=>c);for(let c of a)this.renderer.addClass(e,c)}}}doAria(e){let i=this.element.nativeElement.firstChild;i&&!(e===void 0&&i.hasAttribute("aria-label"))&&(e===""?(this.renderer.setAttribute(i,"aria-hidden","true"),this.renderer.removeAttribute(i,"aria-label")):(this.renderer.removeAttribute(i,"aria-hidden"),this.renderer.setAttribute(i,"aria-label",e)))}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=v({type:t,selectors:[["svg-icon"]],inputs:{src:[1,"src"],name:[1,"name"],stretch:[1,"stretch"],applyClass:[1,"applyClass"],svgClass:[1,"svgClass"],klass:[1,"class","klass"],viewBox:[1,"viewBox"],svgAriaLabel:[1,"svgAriaLabel"],svgStyle:[1,"svgStyle"]},standalone:!0,features:[w],ngContentSelectors:Nt,decls:1,vars:0,template:function(i,s){i&1&&(ht(),ft(0))},encapsulation:2,changeDetection:0});let r=t;return r})();var He=(()=>{let t=class t{static forRoot(e={}){return{ngModule:t,providers:[_t,e.loader||{provide:M,useClass:zt}]}}};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=nt({type:t}),t.\u0275inj=Q({});let r=t;return r})();var Et=class r{message="There is no such trip";static \u0275fac=function(n){return new(n||r)};static \u0275cmp=v({type:r,selectors:[["app-no-trips"]],inputs:{message:"message"},standalone:!0,features:[w],decls:7,vars:1,consts:[["id","notfound"],[1,"notfound"],[1,"notfound-404"]],template:function(n,e){n&1&&(S(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),F(4,"Oops!"),C(),S(5,"h2"),F(6),C()()()()),n&2&&(O(6),ut(e.message))},styles:["*[_ngcontent-%COMP%]{-webkit-box-sizing:border-box;box-sizing:border-box}#notfound[_ngcontent-%COMP%]{padding:0;margin:0;position:relative;height:70vh}#notfound[_ngcontent-%COMP%]   .notfound[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.notfound[_ngcontent-%COMP%]{max-width:520px;width:100%;line-height:1.4;text-align:center}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]{position:relative;height:200px;margin:0 auto 20px;z-index:-1}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;font-size:236px;font-weight:200;margin:0;color:#211b19;text-transform:uppercase;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;font-size:28px;font-weight:400;text-transform:uppercase;color:#211b19;background:#fff;padding:10px 5px;margin:auto;display:inline-block;position:absolute;bottom:0;left:0;right:0}.notfound[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;display:inline-block;font-weight:700;text-decoration:none;color:#fff;text-transform:uppercase;padding:13px 23px;background:#ff6300;font-size:18px;-webkit-transition:.2s all;transition:.2s all}.notfound[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#ff6300;background:#211b19}@media only screen and (max-width: 767px){.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:148px}}@media only screen and (max-width: 480px){#notfound[_ngcontent-%COMP%]{height:15vh}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]{height:148px;margin:0 auto 10px}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:86px}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:16px}.notfound[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:7px 15px;font-size:14px}}"],changeDetection:0})};var Qe=(()=>{class r extends St{pathId;ngOnInit(){this.pathId="url(#"+vt()+")"}static \u0275fac=(()=>{let n;return function(i){return(n||(n=rt(r)))(i||r)}})();static \u0275cmp=v({type:r,selectors:[["TimesCircleIcon"]],standalone:!0,features:[ct,w],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(e,i){e&1&&(st(),S(0,"svg",0)(1,"g"),U(2,"path",1),C(),S(3,"defs")(4,"clipPath",2),U(5,"rect",3),C()()()),e&2&&(dt(i.getClassNames()),z("aria-label",i.ariaLabel)("aria-hidden",i.ariaHidden)("role",i.role),O(),z("clip-path",i.pathId),O(3),lt("id",i.pathId))},encapsulation:2})}return r})();export{wt as a,I as b,Mt as c,Dt as d,At as e,Pt as f,Et as g,Qe as h,Ge as i,He as j};