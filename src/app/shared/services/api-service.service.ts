import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { Program } from '../models/program.model';
import { Activity } from '../models/activity.model';
import { Queue } from '../models/queue.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  root =  environment.apiUrls.master
  userResponse: any;
  constructor(private http: HttpClient) { }

// ----------------------- Add New User ---------------------------------------------------
  addUser(data: any): Observable<any> {
    const subject = new Subject<any>();
    this.http.post(`${this.root}/user/signup`, data).subscribe(res => {
        this.userResponse = res;
        subject.next(this.userResponse);
    }, error => {
        subject.next(error.error);
    });
    return subject.asObservable();
}
// ----------------------- Update User ---------------------------------------------------
updateUser(id:any,data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/user/update/${id}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get All Users ---------------------------------------------------
getAllUsers(page_size:any,page_number:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/user/getAll?page_size=${page_size}&page_number=${page_number}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get User By Id---------------------------------------------------
getUserById(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/user/getById/${id}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get All Providers ---------------------------------------------------
getAllProviders(id,sort,status,page_size:any,page_number:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/user/getProviders/${id}?sort=${sort}&status=${status}&page_size=${page_size}&page_number=${page_number}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Delete User By Id---------------------------------------------------
deleteUser(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.delete(`${this.root}/user/remove/${id}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

// ----------------------- Add Bundle ---------------------------------------------------
addBundle(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.post(`${this.root}/bundle/create`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get Bundles List ---------------------------------------------------
// getAllBundle(id): Observable<any> {
//   const subject = new Subject<any>();
//   this.http.get(`${this.root}/chatgpt/search?bundle_id=${bundle_id}&user_id=${user_id}&search=${search}'`,).subscribe(res => {
//       this.userResponse = res;
//       subject.next(this.userResponse);
//   }, error => {
//       subject.next(error.error);
//   });
//   return subject.asObservable();
// }
// ----------------------- Search Chatgpt ---------------------------------------------------
chatgptSearch(bundle_id: any,user_id:any,search:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/chatgpt/search?bundle_id=${bundle_id}&user_id=${user_id}&search_value=${search}'`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Search Gemini ---------------------------------------------------
geminiSearch(search:any,user_id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/gemini/searchVertexAi?search_value=${search}&user_id=${user_id}`,).subscribe(res => {
    this.userResponse = res;
    subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Add City ---------------------------------------------------
addCity(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.post(`${this.root}/citymanagement/create`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get All City ---------------------------------------------------
getAllCity(page_size:any,page_number:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/citymanagement/getAllCity?page_size=${page_size}&page_number=${page_number}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get City By Id---------------------------------------------------
getCityById(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/citymanagement/GetById/${id}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Update City ---------------------------------------------------
updateCity(id:any,data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/citymanagement/update/${id}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Delete User By Id---------------------------------------------------
deleteCity(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.delete(`${this.root}/citymanagement/remove/${id}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

// ----------------------- Add Task ---------------------------------------------------
addTask(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.post(`${this.root}/task/create`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get All Task ---------------------------------------------------
getAllTask(page_size:any,page_number:any,status:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/task/getAll?page_size=${page_size}&page_number=${page_number}&status=${status}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get Task By Id---------------------------------------------------
getTaskById(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/task/getById/${id}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get Task By User Id---------------------------------------------------
getTaskByUserId(id:any,page_size,page_number,status): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/task/getByUserId/${id}?page_size=${page_size}&page_number=${page_number}&status=${status}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Update Task ---------------------------------------------------
updateTask(id:any,data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/task/update/${id}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Delete User By Id---------------------------------------------------
deleteTask(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.delete(`${this.root}/task/remove/${id}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
addProgram(model): Observable<Program[]> {
  const subject = new Subject<Program[]>();
  this.http.post(`${this.root}/program/create`, model).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- update Program ---------------------------------------------------
updateProgram(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/program/update/${data._id}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
getProgramsByUserId(id:any,page_size,page_number): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/program/getByUserId/${id}?page_size=${page_size}&page_number=${page_number}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get Program By Id---------------------------------------------------
getProgramById(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/program/getById/${id}`,).subscribe(res => {
      subject.next(res);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Copy Program ---------------------------------------------------
programCopy(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/program/createDuplicateById/${id}`,).subscribe(res => {
      subject.next(res);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// =====
deleteProgram(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.delete(`${this.root}/program/remove/${id}`,).subscribe(res => {
      subject.next(res);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get Activity By program Id---------------------------------------------------
getProgramsActivity(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/activity/getByProgramId/${id}`,).subscribe(res => {
      subject.next(res);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

searchProviders(search:any,cityId?): Observable<any> {
  const subject = new Subject<any>();
  let url = `${this.root}/user/searchProvider?fullname=${search}`
  if(cityId) url += `&cityId=${cityId}`
  this.http.get(url).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
searchProgram(providerId:any,cityId?): Observable<any> {
  const subject = new Subject<any>();
  let url = `${this.root}/program/search?`
  if(providerId!=undefined&&providerId!='undefined') url += `user=${providerId}`
  if(cityId) url += `&cityId=${cityId}`
  this.http.get(url).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

// ----------------------- Add activity ---------------------------------------------------
addActivity(model): Observable<Activity[]> {
  const subject = new Subject<Activity[]>();
  this.http.post(`${this.root}/activity/create`, model).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

// ----------------------- update activity ---------------------------------------------------
updateActivity(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/activity/update/${data._id}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- delete activity ---------------------------------------------------

deleteActivity(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.delete(`${this.root}/activity/remove/${id}`,).subscribe(res => {
      subject.next(res);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Add Queue ---------------------------------------------------
addQueue(model): Observable<Queue[]> {
  const subject = new Subject<Queue[]>();
  this.http.post(`${this.root}/queue/create`, model).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

// ----------------------- update Queue ---------------------------------------------------
updateQueue(id:any,data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/queue/update/${id}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- update Queue Url ---------------------------------------------------
updateQueueUrl(id:any,urlId:any,data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.put(`${this.root}/queue/updateQueueUrl/${id}/${urlId}`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- delete Queue ---------------------------------------------------

deleteQueue(id:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.delete(`${this.root}/queue/remove/${id}`,).subscribe(res => {
      subject.next(res);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get All Queue ---------------------------------------------------
getAllQueue(id:any,status:any,sort:any,page_size:any,page_number:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/queue/getAllQueue?id=${id}&status=${status}&sort=${sort}&&page_size=${page_size}&page_number=${page_number}`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Add Task ---------------------------------------------------
addTaskByProvider(id,userId,reviewUserId): Observable<any> {
  const subject = new Subject<any>();
  this.http.post(`${this.root}/task/createTaskByProviderId/${id}?userId=${userId}&reviewUserId=${reviewUserId}`,'').subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Task Filter ---------------------------------------------------
taskFilter(search:any,cityId:any,page_number,page_size): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/task/searchTask?fullname=${search}&cityId=${cityId}&page_number=${page_number}&page_size=${page_size}`).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Provider Filter ---------------------------------------------------
providerFilter(search:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/user/searchProvider?fullname=${search}`).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}

}
