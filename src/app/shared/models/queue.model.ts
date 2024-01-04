export class Queue{
 
    cityId: string;
    urls: [
      {
        url: string,
        status: "pending"
      }
    ];
    admin_notes: string;
    notes: string;
    type: "manual";
    is_deleted: false
}