(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{JtyS:function(l,n,t){"use strict";t.r(n);var u=t("8Y7J");class e{}var s=t("pMnS"),c=t("SVse"),a=t("AytR");class i{constructor(l){this.http=l,this.title="app"}getUsersData(){return this.http.get(`${a.a.apiURL}/admin/getUsersData`)}changeUserAccess(l,n){return this.http.post(`${a.a.apiURL}/admin/changeUserAccess`,{id:l,isActive:n})}}var o=t("IheW"),r=t("PSD3"),b=t.n(r);class p{constructor(l,n){this.umpService=l,this.changeDetector=n,this.usersData=[]}ngOnInit(){this.getUsers()}getUsers(){b.a.fire({title:"Loading data!",text:"Users are loading, Please wait...",onOpen:()=>{b.a.showLoading()}}),this.umpService.getUsersData().subscribe(l=>{this.response=l,this.changeDetector.detectChanges(),b.a.close(),this.response.Status?this.usersData=this.response.Data:b.a.fire({title:"Failed!!",text:this.response.Msg+"",icon:"error"})},l=>{console.log(l),b.a.fire("Failed!!","Registeration Failed :(","error")})}changeAccess(l,n){b.a.fire({title:"Saving data!",text:"Saving data, Please wait...",onOpen:()=>{b.a.showLoading()}}),this.umpService.changeUserAccess(l,n).subscribe(l=>{b.a.close(),this.response=l,b.a.fire(this.response.Status?{title:"Success",text:"Access change Successfull :)",icon:"success",showConfirmButton:!1,timer:2e3,onClose:()=>{this.getUsers()}}:{title:"Failed!!",text:this.response.Msg+"",icon:"error"})},l=>{b.a.close(),b.a.fire("Failed!!","Access change Failed :(","error")})}}var h=u.ob({encapsulation:0,styles:[['.match-parent[_ngcontent-%COMP%]{width:100%;height:480px}.marker[_ngcontent-%COMP%]{background-size:cover;width:50px;height:50px;border-radius:50%;cursor:pointer}.mapboxgl-popup[_ngcontent-%COMP%]{max-width:525px}.mapboxgl-popup-content[_ngcontent-%COMP%]{width:525px;height:400px;text-align:center;font-family:"Open Sans",sans-serif}.mapboxgl-popup-anchor-top[_ngcontent-%COMP%], .mapboxgl-popup-content-wrapper[_ngcontent-%COMP%]{max-width:525px;max-width:400px}table[_ngcontent-%COMP%]{width:100%;overflow:auto}tbody[_ngcontent-%COMP%]{max-height:400px;overflow-y:auto}li[_ngcontent-%COMP%]{cursor:pointer}.active[_ngcontent-%COMP%]{background:#f7f7f7!important}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{width:30%}']],data:{}});function g(l){return u.Jb(0,[(l()(),u.qb(0,0,null,null,2,"button",[["class","btn btn-danger"],["id","btBlock"],["name","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.changeAccess(l.parent.context.$implicit.Id,0)&&u),u},null,null)),(l()(),u.qb(1,0,null,null,0,"i",[["class","fa fa-times"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,[" Block"]))],null,null)}function d(l){return u.Jb(0,[(l()(),u.qb(0,0,null,null,2,"button",[["class","btn btn-success"],["id","btAllow"],["name","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.changeAccess(l.parent.context.$implicit.Id,1)&&u),u},null,null)),(l()(),u.qb(1,0,null,null,0,"i",[["class","fa fa-check"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,[" Allow"]))],null,null)}function f(l){return u.Jb(0,[(l()(),u.qb(0,0,null,null,16,"tr",[],null,null,null,null,null)),(l()(),u.qb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u.Hb(2,null,["",""])),(l()(),u.qb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u.Hb(4,null,["",""])),(l()(),u.qb(5,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),u.Hb(6,null,["",""])),u.Db(7,1),(l()(),u.qb(8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u.Hb(9,null,["",""])),(l()(),u.qb(10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u.Hb(11,null,["",""])),(l()(),u.qb(12,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),u.fb(16777216,null,null,1,null,g)),u.pb(14,16384,null,0,c.l,[u.N,u.K],{ngIf:[0,"ngIf"]},null),(l()(),u.fb(16777216,null,null,1,null,d)),u.pb(16,16384,null,0,c.l,[u.N,u.K],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,14,0,1==n.context.$implicit.IsActive),l(n,16,0,0==n.context.$implicit.IsActive)},function(l,n){l(n,2,0,n.context.$implicit.Name),l(n,4,0,n.context.$implicit.Email);var t=u.Ib(n,6,0,l(n,7,0,u.zb(n.parent,0),n.context.$implicit.CreateDate));l(n,6,0,t),l(n,9,0,n.context.$implicit.Reason),l(n,11,0,n.context.$implicit.Access)})}function m(l){return u.Jb(0,[u.Bb(0,c.d,[u.t]),(l()(),u.qb(1,0,null,null,18,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),u.qb(2,0,null,null,17,"table",[["class","table table table-striped table-bordered"]],null,null,null,null,null)),(l()(),u.qb(3,0,null,null,13,"thead",[],null,null,null,null,null)),(l()(),u.qb(4,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),u.qb(5,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,["Name"])),(l()(),u.qb(7,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,["Email"])),(l()(),u.qb(9,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,["Created Date"])),(l()(),u.qb(11,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,["Reason"])),(l()(),u.qb(13,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,["Access"])),(l()(),u.qb(15,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),u.Hb(-1,null,["Action"])),(l()(),u.qb(17,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),u.fb(16777216,null,null,1,null,f)),u.pb(19,278528,null,0,c.k,[u.N,u.K,u.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,19,0,n.component.usersData)},null)}function x(l){return u.Jb(0,[(l()(),u.qb(0,0,null,null,2,"app-ump-page",[],null,null,null,m,h)),u.Eb(512,null,i,i,[o.c]),u.pb(2,114688,null,0,p,[i,u.h],null,null)],function(l,n){l(n,2,0)},null)}var w=u.mb("app-ump-page",p,x,{},{},[]),q=t("iInd");class v{}t.d(n,"UMPModuleNgFactory",function(){return A});var A=u.nb(e,[],function(l){return u.xb([u.yb(512,u.j,u.ab,[[8,[s.a,w]],[3,u.j],u.w]),u.yb(4608,c.n,c.m,[u.t,[2,c.A]]),u.yb(1073742336,c.b,c.b,[]),u.yb(1073742336,q.p,q.p,[[2,q.u],[2,q.l]]),u.yb(1073742336,v,v,[]),u.yb(1073742336,e,e,[]),u.yb(1024,q.j,function(){return[[{path:"",component:p}]]},[])])})}}]);