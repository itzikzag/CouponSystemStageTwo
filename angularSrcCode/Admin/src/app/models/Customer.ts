export class Customer {
    private id: number;
    private custName: String;
    private password: String;


    constructor(private customer?: Customer) {
        if (this.customer != null) {
            this.id = customer.id;
            this.custName = customer.custName;
            this.password = customer.password;
        }
    }

    public get getId(): number {
        return this.id;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public get getCustName(): String {
        return this.custName;
    }
    public set setCustName(custName: String) {
        this.custName = custName;
    }

    public get getPassword(): String {
        return this.password;
    }

    public set setPassword(password: String) {
        this.password = password;
    }

}