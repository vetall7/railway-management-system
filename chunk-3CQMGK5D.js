import{a as Ze,c as Qe}from"./chunk-P6UGUP7Q.js";import{c as ee,d as te,e as C,g as Be,i as ze,j as Ue}from"./chunk-FRE5BCE3.js";import"./chunk-3LEWPSQC.js";import{b as r}from"./chunk-PMHPWLZH.js";import{a as He}from"./chunk-WMO7HUQ5.js";import{A as X,D as _e,S as ge,W as Re,aa as ie,ba as I,c as we,e as ke,f as je,g as Me,i as De,ka as Ne,l as Le,m as S,ma as Fe,na as j,o as Pe,oa as Ve,p as Ae,y as ue}from"./chunk-I5PCDVRR.js";import{A as R,Bb as xe,C as le,Cb as Te,Db as s,Eb as c,Fb as v,Gb as z,Hb as U,Ia as N,Ja as F,Jb as Z,Jc as Y,L as be,Mb as Q,Nb as g,Ob as pe,Pb as me,Pc as Ie,Rb as $,Rc as Oe,Ta as ye,Tb as W,Tc as Ee,Ub as q,Wb as p,Xb as h,Yb as de,bc as G,cc as K,db as a,dc as P,eb as V,g as A,lb as D,na as M,nb as B,oa as b,pc as J,qb as u,rc as fe,sb as f,sc as Se,ta as d,wb as H,x as ve,ya as T,yb as k,za as y,zb as Ce}from"./chunk-7JXHIXKM.js";var qt=_e([X({transform:"{{transform}}",opacity:0}),ue("{{transition}}",X({transform:"none",opacity:1}))]),Gt=_e([ue("{{transition}}",X({transform:"{{transform}}",opacity:0}))]);var $e=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=y({type:i});static \u0275inj=b({imports:[S,j,Ne,Ve,Ze,j,I]})}return i})();var We=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=y({type:i});static \u0275inj=b({imports:[S,j,I,I]})}return i})();var pt=["*"];function mt(i,e){if(i&1&&v(0,"span",5),i&2){let t=g(2);f("ngClass",t.icon)}}function dt(i,e){if(i&1&&(z(0),u(1,mt,1,1,"span",4),U()),i&2){let t=g();a(),f("ngIf",t.icon)}}function ft(i,e){}function ut(i,e){i&1&&u(0,ft,0,0,"ng-template")}function _t(i,e){if(i&1&&(s(0,"span",6),u(1,ut,1,0,null,7),c()),i&2){let t=g();a(),f("ngTemplateOutlet",t.iconTemplate)}}var qe=(()=>{class i{cd;get style(){return this._style}set style(t){this._style=t,this.cd.markForCheck()}styleClass;severity;value;icon;rounded;templates;iconTemplate;_style;ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"icon":this.iconTemplate=t.template;break}})}constructor(t){this.cd=t}containerClass(){return{"p-tag p-component":!0,[`p-tag-${this.severity}`]:this.severity,"p-tag-rounded":this.rounded}}static \u0275fac=function(n){return new(n||i)(V(Y))};static \u0275cmp=T({type:i,selectors:[["p-tag"]],contentQueries:function(n,o,l){if(n&1&&$(l,ie,4),n&2){let m;W(m=q())&&(o.templates=m)}},hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",Ie]},features:[B],ngContentSelectors:pt,decls:6,vars:7,consts:[[3,"ngClass","ngStyle"],[4,"ngIf"],["class","p-tag-icon",4,"ngIf"],[1,"p-tag-value"],["class","p-tag-icon",3,"ngClass",4,"ngIf"],[1,"p-tag-icon",3,"ngClass"],[1,"p-tag-icon"],[4,"ngTemplateOutlet"]],template:function(n,o){n&1&&(pe(),s(0,"span",0),me(1),u(2,dt,2,1,"ng-container",1)(3,_t,2,1,"span",2),s(4,"span",3),p(5),c()()),n&2&&(H(o.styleClass),f("ngClass",o.containerClass())("ngStyle",o.style),a(2),f("ngIf",!o.iconTemplate),a(),f("ngIf",o.iconTemplate),a(2),h(o.value))},dependencies:[we,ke,Me,je],styles:[`@layer primeng{.p-tag{display:inline-flex;align-items:center;justify-content:center}.p-tag-icon,.p-tag-value,.p-tag-icon.pi{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}}
`],encapsulation:2,changeDetection:0})}return i})(),Ge=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=y({type:i});static \u0275inj=b({imports:[S,I,I]})}return i})();var ht=r.enum(["active","completed","rejected","canceled"]),di=r.object({id:r.number(),userName:r.string().nullable(),startTripStation:r.string(),startTripTime:r.string().datetime(),endTripStation:r.string(),endTripTime:r.string().datetime(),tripDuration:r.string(),carriageType:r.string(),carNumber:r.string(),seatNumber:r.string(),price:r.number(),status:ht}),ne=class{id;userName;startTripStation;startTripTime;endTripStation;endTripTime;tripDuration;carriageType;carNumber;seatNumber;price;status;constructor(e){this.id=e.id,this.userName=e.userName,this.startTripStation=e.startTripStation,this.startTripTime=e.startTripTime,this.endTripStation=e.endTripStation,this.endTripTime=e.endTripTime,this.tripDuration=e.tripDuration,this.carriageType=e.carriageType,this.carNumber=e.carNumber,this.seatNumber=e.seatNumber,this.price=e.price,this.status=e.status}};var vt=r.object({segments:r.array(r.object({time:r.tuple([r.string().datetime(),r.string().datetime()]),price:r.record(r.string(),r.number())}))}),bt=r.object({id:r.number(),rideId:r.number(),stationStart:r.number(),stationEnd:r.number(),routeId:r.number(),seatId:r.number(),userId:r.number(),status:r.enum(["active","completed","rejected","canceled"]),path:r.array(r.number()),carriages:r.array(r.string()),schedule:vt}),he=class{segments;constructor(e){this.segments=e.segments}},re=class{id;stationStart;stationEnd;rideId;routeId;seatId;userId;status;path;carriages;schedule;constructor(e){this.id=e.id,this.rideId=e.rideId,this.stationStart=e.stationStart,this.stationEnd=e.stationEnd,this.routeId=e.routeId,this.seatId=e.seatId,this.userId=e.userId,this.status=e.status,this.path=e.path,this.carriages=e.carriages,this.schedule=new he(e.schedule)}},Ke=r.array(bt);var yt=r.object({id:r.number(),name:r.string().nullable(),email:r.string().email(),role:r.enum(["user","manager"])}),oe=class{id;name;email;role;constructor(e){this.id=e.id,this.name=e.name,this.email=e.email,this.role=e.role}},Je=r.array(yt);var O=class i{httpClient=d(Ae);authService=d(C);urls={orders:"/api/order",users:"/api/users"};fetchAllOrders(){let e=this.authService.isManager(),t=new Pe().set("all",e?"true":"false");return this.httpClient.get(this.urls.orders,{params:t}).pipe(le(n=>Ke.parse(n).map(l=>new re(l))))}deleteOrder(e){return this.httpClient.delete(`${this.urls.orders}/${e}`).pipe(be(this.handleError))}handleError(e){let t="Unknown error occurred";return e.error instanceof ErrorEvent?t=`Error: ${e.error.message}`:e.status===400?e.error.reason==="orderNotFound"?t="Order not found":e.error.reason==="orderNotActive"&&(t="Order is not active"):t=`Server returned code: ${e.status}, error message is: ${e.message}`,ve(()=>new Error(t))}fetchAllUsers(){return this.httpClient.get(this.urls.users).pipe(le(e=>Je.parse(e).map(n=>new oe(n))))}static \u0275fac=function(t){return new(t||i)};static \u0275prov=M({token:i,factory:i.\u0275fac,providedIn:"root"})};var L=class i{users=D([]);FetchDataService=d(O);authService=d(C);fetchUsers(){return A(this,null,function*(){if(!this.authService.isManager())return Promise.resolve();try{let e=yield R(this.FetchDataService.fetchAllUsers());this.users.set(e)}catch(e){console.error("Error fetching users:",e)}})}getUserById(e){return this.users().find(t=>t.id===e)}static \u0275fac=function(t){return new(t||i)};static \u0275prov=M({token:i,factory:i.\u0275fac})};var E=class i{fetchStationsService=d(te);orderResponse=D([]);fetchDataService=d(O);fetchCarriagesService=d(ee);fetchUsersService=d(L);authService=d(C);error=D("");isLoading=D(!1);fetchOrders(){return A(this,null,function*(){try{this.isLoading.set(!0),yield this.fetchStationsService.fetchStations(),yield this.fetchCarriagesService.fetchCarriages(),yield this.fetchUsersService.fetchUsers();let e=yield R(this.fetchDataService.fetchAllOrders());this.isLoading.set(!1),this.orderResponse.set(e)}catch(e){console.error("Error fetching orders:",e)}})}get isLoadingSig(){return this.isLoading}getOrders=Oe(()=>{let e=this.orderResponse();if(e.length>0){let t=e.map(n=>new ne({userName:this.getUserEmail(n),id:n.id,startTripStation:this.getStartAndEndStations(n)[0],startTripTime:this.getStartTimeAndEndTime(n)[0],endTripStation:this.getStartAndEndStations(n)[1],endTripTime:this.getStartTimeAndEndTime(n)[1],tripDuration:this.getTripDuration(n),carriageType:this.getCarriageType(n),seatNumber:this.getSeatNumber(n),carNumber:this.getCarNumber(n),price:this.getPrice(n),status:n.status}));return t.sort((n,o)=>{let l=new Date(n.startTripTime).getTime(),m=new Date(o.startTripTime).getTime();return l-m}),t}return[]});getUserEmail(e){if(!this.authService.isManager())return null;let t=this.fetchUsersService.getUserById(e.userId);return t?t.email:"no info"}getStartAndEndStations(e){let t=this.fetchStationsService.getCityById(e.stationStart),n=this.fetchStationsService.getCityById(e.stationEnd);if(!t||!n)throw new Error("City not found");return[t.city,n.city]}getCityIndexInPathArray(e,t){return t.path.findIndex(n=>n===e)}getStartTimeAndEndTime(e){let t=this.getCityIndexInPathArray(e.stationStart,e),n=this.getCityIndexInPathArray(e.stationEnd,e),o=e.schedule.segments[t].time[0],l=e.schedule.segments[n-1].time[1];return[o,l]}getTripDuration(e){let[t,n]=this.getStartTimeAndEndTime(e),o=new Date(t),m=new Date(n).getTime()-o.getTime(),w=Math.floor(m/1e3/60/60),_=Math.floor(m/1e3/60%60);return`${w}h ${_}m`}getCarriageType(e){let t=this.fetchCarriagesService.carriagesWithNumberOfSeats(),n=e.seatId,o=e.carriages,l=0;return o.find(w=>{let _=t.get(w);if(_){if(n<l+_)return!0;l+=_}return!1})||""}getSeatNumber(e){let t=this.fetchCarriagesService.carriagesWithNumberOfSeats(),n=e.seatId,o=e.carriages,l=0,m=0;return o.find(w=>{let _=t.get(w);if(_){if(n<l+_)return m=n-l,!0;l+=_}return!1}),m.toString()}getCarNumber(e){let t=this.fetchCarriagesService.carriagesWithNumberOfSeats(),n=e.seatId,o=e.carriages,l=0,m=1;return o.find(w=>{let _=t.get(w);if(_){if(n<l+_)return!0;l+=_,m+=1}return!1}),m.toString()}getPrice(e){let t=this.getCityIndexInPathArray(e.stationStart,e),n=this.getCityIndexInPathArray(e.stationEnd,e),o=this.getCarriageType(e),l=0;for(let m=t;m<n;m+=1)l+=e.schedule.segments[m].price[o];return l}cancelOrder(e){this.fetchDataService.deleteOrder(e).subscribe({next:()=>{console.log("Order canceled successfully")},error:t=>{this.errorSig=t.message}})}get errorSig(){return this.error}set errorSig(e){this.error.set(e)}changeOrderStatus(e,t){let o=this.getOrders().find(l=>l.id===e);o&&(o.status=t)}static \u0275fac=function(t){return new(t||i)};static \u0275prov=M({token:i,factory:i.\u0275fac,providedIn:"root"})};function xt(i,e){if(i&1&&(s(0,"div",12)(1,"span",15),p(2,"user: "),c(),s(3,"span",16),p(4),c()()),i&2){g(2);let t=P(0);a(4),h(t.userName)}}function Tt(i,e){if(i&1){let t=Z();s(0,"p-button",24),Q("click",function(){N(t);let o=g(2);return F(o.onCancelOrder())}),c()}}function St(i,e){if(i&1&&(s(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),p(5),J(6,"date"),c()(),s(7,"div",5),p(8),c(),s(9,"div",6)(10,"div",4),p(11),J(12,"date"),c()()(),s(13,"div",7)(14,"div",8),v(15,"svg-icon",9),s(16,"div",10),p(17),c(),s(18,"span",11),p(19,"\u21A6"),c(),s(20,"div",10),p(21),c()()(),u(22,xt,5,1,"div",12),c(),s(23,"div",13)(24,"span",14)(25,"span",15),p(26,"carriage type: "),c(),s(27,"span",16),p(28),c()(),s(29,"span",17)(30,"span",15),p(31,"seat number: "),c(),s(32,"span",16),p(33),c()(),s(34,"span",18)(35,"span",15),p(36,"car number: "),c(),s(37,"span",16),p(38),c()(),s(39,"span",19)(40,"span",16),p(41),J(42,"currency"),c()()(),s(43,"div",20),u(44,Tt,1,0,"p-button",21),c(),s(45,"div",22),v(46,"p-tag",23),c()()),i&2){let t=g(),n=P(0);a(5),de(" ",fe(6,14,n.startTripTime,"MMM d, HH:mm")," "),a(3),h(n.tripDuration),a(3),de(" ",fe(12,17,n.endTripTime,"MMM d, HH:mm")," "),a(4),f("svgClass","icon"),a(2),h(n.startTripStation),a(4),h(n.endTripStation),a(),k(t.getIsManager()?22:-1),a(6),h(n.carriageType),a(5),h(n.seatNumber),a(5),h(n.carNumber),a(3),h(Se(42,20,n.price,"",!0)),a(3),k(t.getIsDeletable()?44:-1),a(2),f("value",n.status)("rounded",!0)}}var ae=class i{order=ye();fetchOrdersService=d(E);authService=d(C);isManager=!1;isDeletable=!1;constructor(){Ee(()=>{let e=this.fetchOrdersService.errorSig();e&&(alert(e),this.fetchOrdersService.errorSig="",this.changeStatus("active"),this.isDeletable=!0)},{allowSignalWrites:!0})}ngOnInit(){let e=this.order();e&&(this.isDeletable=e.status==="active"),this.isManager=this.authService.isManager()}getIsDeletable(){return this.isDeletable}onCancelOrder(){let e=this.order();e&&confirm("Are you sure you want to cancel this order?")&&(this.fetchOrdersService.cancelOrder(e.id),this.getIsManager()?this.changeStatus("rejected"):this.changeStatus("canceled"),this.isDeletable=!1)}changeStatus(e){let t=this.order();t&&this.fetchOrdersService.changeOrderStatus(t.id,e)}getIsManager(){return this.isManager}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=T({type:i,selectors:[["app-single-order"]],inputs:{order:[1,"order"]},decls:2,vars:2,consts:[[1,"wrapper"],[1,"trip"],[1,"path"],[1,"start-point"],[1,"date"],[1,"path-line"],[1,"end-point"],[1,"route"],[1,"stations"],["src","assets/icons/high-speed-rail.svg",3,"svgClass"],[1,"city"],[1,"arrow"],[1,"user"],[1,"carriage"],[1,"carriage-type"],[1,"field"],[1,"value"],[1,"seat"],[1,"car"],[1,"price"],[1,"button-wrapper"],["icon","pi pi-times","severity","danger"],[1,"status"],["severity","info",3,"value","rounded"],["icon","pi pi-times","severity","danger",3,"click"]],template:function(t,n){if(t&1&&(G(0),u(1,St,47,24,"div",0)),t&2){let o=K(n.order());a(),k(o?1:-1)}},dependencies:[ze,Fe,qe,Le,De],styles:['.wrapper[_ngcontent-%COMP%]{margin-top:5%;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:2rem;border:var(--secondary-border);font:var(--primary-sm-font);width:70%;max-width:80rem;margin-left:auto;margin-right:auto;position:relative;background-color:var(--primary-card-background-color)}.button-wrapper[_ngcontent-%COMP%]{position:absolute;top:50%;right:-5rem;transform:translateY(-50%)}.status[_ngcontent-%COMP%]{position:absolute;bottom:5%;left:1rem}.trip[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;width:100%;flex:2;border-right:var(--secondary-border)}.path[_ngcontent-%COMP%]{width:90%;display:flex;justify-content:space-between;align-items:center}.start-point[_ngcontent-%COMP%]{gap:.5rem;margin-right:2%}.end-point[_ngcontent-%COMP%]{gap:.5rem;margin-left:2%}.path-line[_ngcontent-%COMP%]{display:flex;align-items:center;text-align:center;width:100%}.path-line[_ngcontent-%COMP%]:before, .path-line[_ngcontent-%COMP%]:after{content:"";flex:1;border-bottom:4px solid var(--primary-time-line-border-color)}.path-line[_ngcontent-%COMP%]:not(:empty):before{margin-right:.25em}.path-line[_ngcontent-%COMP%]:not(:empty):after{margin-left:.25em}.date[_ngcontent-%COMP%]{font:var(--primary-md-font);font-weight:700}.city[_ngcontent-%COMP%]{font:var(--secondary-sm-font)}.icon[_ngcontent-%COMP%]{height:3rem;width:3rem}.route[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;gap:2rem}.arrow[_ngcontent-%COMP%]{font-size:2rem;color:var(--primary-time-line-border-color)}.carriages[_ngcontent-%COMP%]{width:80%;display:flex;justify-content:flex-end;align-items:center;gap:.5rem;flex:1}.carriage[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;flex-direction:column}.stations[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:.5rem}span[_ngcontent-%COMP%]{font-style:italic}.value[_ngcontent-%COMP%]{font-weight:700}@media (max-width: 1200px){.wrapper[_ngcontent-%COMP%]{flex-direction:column}.trip[_ngcontent-%COMP%]{border-right:none}.carriages[_ngcontent-%COMP%]{justify-content:center;gap:1rem}}@media (max-width: 700px){.icon[_ngcontent-%COMP%]{height:2rem;width:2rem}.path[_ngcontent-%COMP%]{width:100%}.route[_ngcontent-%COMP%]{flex-direction:column;gap:.5rem}.carriage[_ngcontent-%COMP%]{flex-direction:column;gap:.2rem}.button-wrapper[_ngcontent-%COMP%]{position:static;margin-top:1rem}.user[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.carriage-type[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}}']})};function Ot(i,e){i&1&&v(0,"app-loader")}function Et(i,e){if(i&1&&v(0,"app-single-order",1),i&2){let t=e.$implicit;f("order",t)}}function wt(i,e){if(i&1&&xe(0,Et,1,1,"app-single-order",1,Ce),i&2){g();let t=P(0);Te(t)}}function kt(i,e){i&1&&v(0,"app-no-trips",0),i&2&&f("message","You have no orders")}function jt(i,e){if(i&1&&(G(0),u(1,wt,2,0)(2,kt,1,1,"app-no-trips",0)),i&2){let t=K(g().orders());a(),k(t.length>0?1:2)}}var se=class i{fetchOrdersService=d(E);orders=this.fetchOrdersService.getOrders;isLoading=this.fetchOrdersService.isLoadingSig;ngOnInit(){this.fetchOrdersService.fetchOrders()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=T({type:i,selectors:[["app-my-orders"]],decls:2,vars:1,consts:[[3,"message"],[3,"order"]],template:function(t,n){t&1&&u(0,Ot,1,0,"app-loader")(1,jt,3,2),t&2&&k(n.isLoading()?0:1)},dependencies:[Be,He,ae],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;width:100%}"]})};var Mt=[{path:"",component:se}],ce=class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=y({type:i});static \u0275inj=b({imports:[ge.forChild(Mt),ge]})};var Ye=class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=y({type:i});static \u0275inj=b({providers:[O,E,te,ee,Re,L,C],imports:[S,ce,Ue.forRoot(),j,$e,Qe,We,Ge]})};export{Ye as MyOrdersModule};