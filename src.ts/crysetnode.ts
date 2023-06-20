
            export class crysetNode {
              private dummyPrivMember: string; 
    public dummyPubMember: string;
 
    constructor(options?) {
     try {
         this.dummyPrivMember = options?.privateMember || "";
         this.dummyPubMember = options.publicMember || "";
 
     } catch (e) {
         console.log("An error occured: ", e);
     }
    }
 
    
    async sampleMethod(parameters) {
     return ""
    }  
 }
 
            