export class Ticket {
    id : string;
    subject: string;
    content : string;
    created_at : string;
    updated_at: string ;
    completed_at: string;
    priorities :string[] = [];
    creator : string;
    constructor(){
    }
}

