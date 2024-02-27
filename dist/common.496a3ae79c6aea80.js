"use strict";(self.webpackChunkmatngular=self.webpackChunkmatngular||[]).push([[592],{334:(g,c,a)=>{a.d(c,{M:()=>l});var p=a(2340),n=a(8929),h=a(4650),x=a(529);let l=(()=>{class b{constructor(t){this.http=t,this.root=p.N.apiUrls.master}addUser(t){const s=new n.xQ;return this.http.post(`${this.root}/user/signup`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}updateUser(t,s){const e=new n.xQ;return this.http.put(`${this.root}/user/update/${t}`,s).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}getAllUsers(t,s){const e=new n.xQ;return this.http.get(`${this.root}/user/getAll?page_size=${t}&page_number=${s}`).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}getUserById(t){const s=new n.xQ;return this.http.get(`${this.root}/user/getById/${t}`).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}getAllProviders(t,s,e,r,o){const u=new n.xQ;return this.http.get(`${this.root}/user/getProviders/${t}?sort=${s}&status=${e}&page_size=${r}&page_number=${o}`).subscribe(i=>{this.userResponse=i,u.next(this.userResponse)},i=>{u.next(i.error)}),u.asObservable()}deleteUser(t){const s=new n.xQ;return this.http.delete(`${this.root}/user/remove/${t}`).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}addBundle(t){const s=new n.xQ;return this.http.post(`${this.root}/bundle/create`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}chatgptSearch(t,s,e){const r=new n.xQ;return this.http.get(`${this.root}/chatgpt/search?bundle_id=${t}&user_id=${s}&search_value=${e}'`).subscribe(o=>{this.userResponse=o,r.next(this.userResponse)},o=>{r.next(o.error)}),r.asObservable()}geminiSearch(t,s,e){const r=new n.xQ;return this.http.get(`${this.root}/gemini/search?bundle_id=${t}&search_value=${s}&user_id=${e}`).subscribe(o=>{r.next(o)},o=>{r.next(o.error)}),r.asObservable()}addCity(t){const s=new n.xQ;return this.http.post(`${this.root}/citymanagement/create`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}getAllCity(t,s){const e=new n.xQ;return this.http.get(`${this.root}/citymanagement/getAllCity?page_size=${t}&page_number=${s}`).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}getCityById(t){const s=new n.xQ;return this.http.get(`${this.root}/citymanagement/GetById/${t}`).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}updateCity(t,s){const e=new n.xQ;return this.http.put(`${this.root}/citymanagement/update/${t}`,s).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}deleteCity(t){const s=new n.xQ;return this.http.delete(`${this.root}/citymanagement/remove/${t}`).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}addTask(t){const s=new n.xQ;return this.http.post(`${this.root}/task/create`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}getAllTask(t,s){const e=new n.xQ;return this.http.get(`${this.root}/task/getAll?page_size=${t}&page_number=${s}`).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}getTaskById(t){const s=new n.xQ;return this.http.get(`${this.root}/task/getById/${t}`).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}getTaskByUserId(t,s,e){const r=new n.xQ;return this.http.get(`${this.root}/task/getByUserId/${t}?page_size=${s}&page_number=${e}`).subscribe(o=>{this.userResponse=o,r.next(this.userResponse)},o=>{r.next(o.error)}),r.asObservable()}updateTask(t,s){const e=new n.xQ;return this.http.put(`${this.root}/task/update/${t}`,s).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}deleteTask(t){const s=new n.xQ;return this.http.delete(`${this.root}/task/remove/${t}`).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}addProgram(t){const s=new n.xQ;return this.http.post(`${this.root}/program/create`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}updateProgram(t){const s=new n.xQ;return this.http.put(`${this.root}/program/update/${t._id}`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}getProgramsByUserId(t,s,e){const r=new n.xQ;return this.http.get(`${this.root}/program/getByUserId/${t}?page_size=${s}&page_number=${e}`).subscribe(o=>{this.userResponse=o,r.next(this.userResponse)},o=>{r.next(o.error)}),r.asObservable()}getProgramById(t){const s=new n.xQ;return this.http.get(`${this.root}/program/getById/${t}`).subscribe(e=>{s.next(e)},e=>{s.next(e.error)}),s.asObservable()}programCopy(t){const s=new n.xQ;return this.http.get(`${this.root}/program/createDuplicateById/${t}`).subscribe(e=>{s.next(e)},e=>{s.next(e.error)}),s.asObservable()}deleteProgram(t){const s=new n.xQ;return this.http.delete(`${this.root}/program/remove/${t}`).subscribe(e=>{s.next(e)},e=>{s.next(e.error)}),s.asObservable()}getProgramsActivity(t){const s=new n.xQ;return this.http.get(`${this.root}/activity/getByProgramId/${t}`).subscribe(e=>{s.next(e)},e=>{s.next(e.error)}),s.asObservable()}searchProviders(t,s){const e=new n.xQ;let r=`${this.root}/user/searchProvider?fullname=${t}`;return s&&(r+=`&cityId=${s}`),this.http.get(r).subscribe(o=>{this.userResponse=o,e.next(this.userResponse)},o=>{e.next(o.error)}),e.asObservable()}searchProgram(t,s){const e=new n.xQ;let r=`${this.root}/program/search?`;return null!=t&&"undefined"!=t&&(r+=`user=${t}`),s&&(r+=`&cityId=${s}`),this.http.get(r).subscribe(o=>{this.userResponse=o,e.next(this.userResponse)},o=>{e.next(o.error)}),e.asObservable()}addActivity(t){const s=new n.xQ;return this.http.post(`${this.root}/activity/create`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}updateActivity(t){const s=new n.xQ;return this.http.put(`${this.root}/activity/update/${t._id}`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}deleteActivity(t){const s=new n.xQ;return this.http.delete(`${this.root}/activity/remove/${t}`).subscribe(e=>{s.next(e)},e=>{s.next(e.error)}),s.asObservable()}addQueue(t){const s=new n.xQ;return this.http.post(`${this.root}/queue/create`,t).subscribe(e=>{this.userResponse=e,s.next(this.userResponse)},e=>{s.next(e.error)}),s.asObservable()}updateQueue(t,s){const e=new n.xQ;return this.http.put(`${this.root}/queue/update/${t}`,s).subscribe(r=>{this.userResponse=r,e.next(this.userResponse)},r=>{e.next(r.error)}),e.asObservable()}updateQueueUrl(t,s,e){const r=new n.xQ;return this.http.put(`${this.root}/queue/updateQueueUrl/${t}/${s}`,e).subscribe(o=>{this.userResponse=o,r.next(this.userResponse)},o=>{r.next(o.error)}),r.asObservable()}deleteQueue(t){const s=new n.xQ;return this.http.delete(`${this.root}/queue/remove/${t}`).subscribe(e=>{s.next(e)},e=>{s.next(e.error)}),s.asObservable()}getAllQueue(t,s,e,r,o){const u=new n.xQ;return this.http.get(`${this.root}/queue/getAllQueue?id=${t}&status=${s}&sort=${e}&&page_size=${r}&page_number=${o}`).subscribe(i=>{this.userResponse=i,u.next(this.userResponse)},i=>{u.next(i.error)}),u.asObservable()}}return b.\u0275fac=function(t){return new(t||b)(h.LFG(x.eN))},b.\u0275prov=h.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"}),b})()}}]);