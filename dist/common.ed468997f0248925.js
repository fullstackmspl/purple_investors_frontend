"use strict";(self.webpackChunkmatngular=self.webpackChunkmatngular||[]).push([[592],{334:(l,c,n)=>{n.d(c,{M:()=>_});var h=n(2340),o=n(8929),a=n(4650),p=n(529);let _=(()=>{class r{constructor(t){this.http=t,this.root=h.N.apiUrls.master}addUser(t){const e=new o.xQ;return this.http.post(`${this.root}/user/signup`,t).subscribe(s=>{this.userResponse=s,e.next(this.userResponse)},s=>{e.next(s.error)}),e.asObservable()}loginUser(t){const e=new o.xQ;return this.http.post(`${this.root}/user/login`,t).subscribe(s=>{this.userResponse=s,e.next(this.userResponse)},s=>{e.next(s.error)}),e.asObservable()}addBundle(t){const e=new o.xQ;return this.http.post(`${this.root}/bundle/create`,t).subscribe(s=>{this.userResponse=s,e.next(this.userResponse)},s=>{e.next(s.error)}),e.asObservable()}chatgptSearch(t,e,s){const u=new o.xQ;return this.http.get(`${this.root}/chatgpt/search?bundle_id=${t}&user_id=${e}&search_value=${s}'`).subscribe(i=>{this.userResponse=i,u.next(this.userResponse)},i=>{u.next(i.error)}),u.asObservable()}}return r.\u0275fac=function(t){return new(t||r)(a.LFG(p.eN))},r.\u0275prov=a.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);