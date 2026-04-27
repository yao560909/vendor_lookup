export namespace oui {
	
	export class OUI {
	    registry: string;
	    assignment: string;
	    organization: string;
	    address: string;
	
	    static createFrom(source: any = {}) {
	        return new OUI(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.registry = source["registry"];
	        this.assignment = source["assignment"];
	        this.organization = source["organization"];
	        this.address = source["address"];
	    }
	}

}

