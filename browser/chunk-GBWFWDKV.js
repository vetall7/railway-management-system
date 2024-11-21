import{c as ee}from"./chunk-A747F3P5.js";import{a as de,b as pe,c as ce}from"./chunk-BZKVJPSP.js";import{a as ae}from"./chunk-DXVTN2QW.js";import{a as ne,b as re}from"./chunk-25DFGJNI.js";import{a as me}from"./chunk-WMO7HUQ5.js";import{c as W,d as f,e as z,f as J,g as Z,h as x,j as H,l as K,n as Q,u as X,v as se,w as le}from"./chunk-DL7W725W.js";import{Q as k,V as Y,_ as $,c as G,ja as te,ka as ie,la as oe,m as q}from"./chunk-I22IGBHY.js";import{$b as O,Db as r,Eb as a,Fb as h,Ia as p,Ja as c,Jb as C,Mb as u,Nb as m,Tc as R,Wb as d,_b as I,ac as B,bc as M,cc as U,db as s,dc as j,hc as A,jc as v,lb as g,oa as E,qb as _,sb as l,ta as N,vb as L,ya as D,yb as b,za as y}from"./chunk-7JXHIXKM.js";var _e=()=>({width:"25rem"}),P=(i,o)=>({valid:i,invalid:o});function ge(i,o){i&1&&h(0,"app-loader")}function be(i,o){if(i&1){let e=C();r(0,"button",23),u("click",function(){p(e);let t=m(2);return c(t.onNameEditable())}),a()}i&2&&l("text",!0)}function Ce(i,o){if(i&1){let e=C();r(0,"button",24),u("click",function(){p(e);let t=m(2);return c(t.onNameChange())}),a()}if(i&2){let e,n=m(2);l("text",!0)("disabled",(e=n.profileForm.get("name"))==null?null:e.invalid)}}function we(i,o){if(i&1){let e=C();r(0,"button",23),u("click",function(){p(e);let t=m(2);return c(t.onEmailEditable())}),a()}i&2&&l("text",!0)}function he(i,o){if(i&1){let e=C();r(0,"button",24),u("click",function(){p(e);let t=m(2);return c(t.onEmailChange())}),a()}if(i&2){let e,n=m(2);l("text",!0)("disabled",(e=n.profileForm.get("email"))==null?null:e.invalid)}}function ve(i,o){if(i&1&&(M(0)(1)(2)(3),r(4,"li",26),d(5," At least one lowercase "),a(),r(6,"li",26),d(7," At least one uppercase "),a(),r(8,"li",26),d(9," At least one numeric "),a(),r(10,"li",26),d(11," Number of characters 8-30 "),a()),i&2){m();let e=j(1),n=m(2),t=n.isPasswordMatch("[a-z]"),w=n.isPasswordMatch("[A-Z]"),V=n.isPasswordMatch("[0-9]"),T=e.value.length>=8&&e.value.length<=30;s(4),l("ngClass",v(4,P,t,!t)),s(2),l("ngClass",v(7,P,w,!w)),s(2),l("ngClass",v(10,P,V,!V)),s(2),l("ngClass",v(13,P,T,!T))}}function xe(i,o){if(i&1&&(r(0,"ul",25),M(1),_(2,ve,12,16),a()),i&2){s();let e=U(m(2).profileForm.get("password"));s(),b(e?2:-1)}}function Ee(i,o){i&1&&(r(0,"small",19),d(1,"Passwords do not match"),a())}function ye(i,o){if(i&1){let e=C();r(0,"app-auth-form")(1,"div",0)(2,"h1"),d(3,"Profile Settings"),a(),r(4,"form",1)(5,"div",2)(6,"label",3),d(7,"Name:"),a(),r(8,"div",4),h(9,"input",5),_(10,be,1,1,"button",6)(11,Ce,1,2,"button",7),a()(),r(12,"div",2)(13,"label",8),d(14,"Email:"),a(),r(15,"div",4),h(16,"input",9),_(17,we,1,1,"button",6)(18,he,1,2,"button",7),a()(),r(19,"div",10)(20,"button",11),u("click",function(){p(e);let t=m();return c(t.onPasswordEditable())}),a()(),r(21,"p-dialog",12),B("visibleChange",function(t){p(e);let w=m();return O(w.isPasswordEditable,t)||(w.isPasswordEditable=t),c(t)}),r(22,"div",13)(23,"label",14),d(24,"Password"),a(),r(25,"p-password",15),_(26,xe,3,2,"ng-template",16),a()(),r(27,"div",13)(28,"label",17),d(29,"Repeat Password"),a(),h(30,"p-password",18),_(31,Ee,2,0,"small",19),a(),r(32,"div",20)(33,"p-button",21),u("onClick",function(){p(e);let t=m();return c(t.onPasswordEditable())}),a(),r(34,"p-button",22),u("onClick",function(){p(e);let t=m();return c(t.onPasswordChange())}),a()()()()()()}if(i&2){let e,n,t=m();s(4),l("formGroup",t.profileForm),s(6),b(t.isNameEditableSig?t.isNameEditableSig?11:-1:10),s(7),b(t.isEmailEditableSig?t.isEmailEditableSig?18:-1:17),s(3),l("rounded",!0),s(),L(A(13,_e)),l("modal",!0),I("visible",t.isPasswordEditable),s(4),l("toggleMask",!0),s(5),l("feedback",!1)("toggleMask",!0),s(),b((e=t.profileForm.get("repeatPassword"))!=null&&e.invalid&&((e=t.profileForm.get("repeatPassword"))!=null&&e.touched)?31:-1),s(3),l("disabled",((n=t.profileForm.get("password"))==null?null:n.invalid)||((n=t.profileForm.get("repeatPassword"))==null?null:n.invalid))}}var S=class i{profileService=N(ee);messageService=N(Y);userData=g(null);isEmailEditable=g(!1);isNameEditable=g(!1);isPasswordEditable=g(!1);isLoading=g(!1);profileForm=new Z({email:new x("",[f.email]),name:new x(""),password:new x("",[f.required,f.minLength(8),f.maxLength(30)]),repeatPassword:new x("",[f.required,f.minLength(8),f.maxLength(30)])},{validators:ce("password","repeatPassword")});ngOnInit(){this.isLoading.set(!0),this.profileService.getProfileData().subscribe(o=>{this.userData.set(o),this.isLoading.set(!1),this.profileForm.patchValue({email:this.userData()?.email,name:this.userData()?.name})})}constructor(){R(()=>{this.isNameEditableSig?this.profileForm.get("name")?.enable():this.profileForm.get("name")?.disable(),this.isEmailEditableSig?this.profileForm.get("email")?.enable():this.profileForm.get("email")?.disable()})}onEmailChange(){let o=this.profileForm.get("email")?.value,e=this.userData();if(!e)return;if(o===e.email){this.messageService.add({severity:"error",summary:"Error",detail:"Email cannot be the same"});return}let n={email:o,name:e.name?e.name:null};this.profileService.updateUser(n).subscribe(t=>{t&&(this.messageService.add({severity:"success",summary:"Success",detail:`Email changed successfully to: ${n.email}`}),this.userData.set(t),this.onEmailEditable())})}onNameChange(){let o=this.profileForm.get("name")?.value,e=this.userData();if(!e)return;if(o===e.name){this.messageService.add({severity:"error",summary:"Error",detail:"Name cannot be the same"});return}if(o===""){this.messageService.add({severity:"error",summary:"Error",detail:"Name cannot be empty"});return}let n={email:e.email,name:o};this.profileService.updateUser(n).subscribe(t=>{t&&(this.messageService.add({severity:"success",summary:"Success",detail:`Name changed successfully to: ${o}`}),this.userData.set(t))}),this.onNameEditable()}onPasswordChange(){let e={password:this.profileForm.get("password")?.value};this.onPasswordEditable(),this.profileService.updatePassword(e).subscribe(()=>{this.messageService.add({severity:"success",summary:"Success",detail:"Password changed successfully"})})}get isEmailEditableSig(){return this.isEmailEditable()}get isNameEditableSig(){return this.isNameEditable()}get isPasswordEditableSig(){return this.isPasswordEditable()}onPasswordEditable(){this.isPasswordEditable.update(o=>!o),this.isPasswordEditable||(this.profileForm.get("password")?.reset(""),this.profileForm.get("repeatPassword")?.reset(""))}onEmailEditable(){this.isEmailEditable.update(o=>!o)}onNameEditable(){this.isNameEditable.update(o=>!o)}isPasswordMatch(o){return new RegExp(o).test(this.profileForm.get("password")?.value||"")}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=D({type:i,selectors:[["app-profile"]],decls:2,vars:1,consts:[[1,"profile-settings"],[3,"formGroup"],[1,"field"],["for","name"],[1,"input-and-button"],["pInputText","","id","name","type","text","formControlName","name"],["pButton","","type","button","icon","pi pi-pen-to-square",1,"save-button",3,"text"],["pButton","","type","button","icon","pi pi-save",1,"save-button",3,"text","disabled"],["for","email"],["id","email","type","email","pInputText","","formControlName","email"],[1,"field","padding-bottom--24","password"],["pButton","","severity","danger","label","Change password","type","button",3,"click","rounded"],["header","New password",3,"visibleChange","modal","visible"],[1,"field","padding-bottom--24"],["for","password"],["id","password","formControlName","password",3,"toggleMask"],["pTemplate","footer"],["for","repeatPassword"],["id","password","formControlName","repeatPassword",3,"feedback","toggleMask"],[1,"p-error"],[1,"dialog-buttons"],["label","Cancel","severity","secondary",3,"onClick"],["label","Save",3,"onClick","disabled"],["pButton","","type","button","icon","pi pi-pen-to-square",1,"save-button",3,"click","text"],["pButton","","type","button","icon","pi pi-save",1,"save-button",3,"click","text","disabled"],[1,"pl-2","ml-2","mt-0",2,"line-height","1.5"],[3,"ngClass"]],template:function(e,n){e&1&&_(0,ge,1,0,"app-loader")(1,ye,35,14,"app-auth-form"),e&2&&b(n.isLoading()?0:1)},dependencies:[G,te,ie,$,se,de,H,W,z,J,K,Q,ae,ne,me],styles:[".input-and-button[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:2rem}.input-and-button[_ngcontent-%COMP%]     .p-button{width:10%;margin-left:2%;background-color:#fff;border:none;padding:0}.input-and-button[_ngcontent-%COMP%]     .pi{color:var(--primary-button-color)}.field[_ngcontent-%COMP%]     .p-button-danger{margin-top:2rem}[_nghost-%COMP%]     .p-button:focus, [_nghost-%COMP%]     .p-button:enabled:focus{box-shadow:none;-webkit-box-shadow:none;-moz-box-shadow:none}.dialog-buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between}"],changeDetection:0})};var Pe=[{path:"",component:S}],F=class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=y({type:i});static \u0275inj=E({imports:[k.forChild(Pe),k]})};var fe=class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=y({type:i});static \u0275inj=E({imports:[F,q,oe,le,pe,X,re]})};export{fe as ProfileModule};
