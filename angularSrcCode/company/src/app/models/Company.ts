export class Company {

    private compName: String;
    private id: number;
    private password: String;
    private email: String;


    constructor(private company?: Company) {
        if (this.company != null) {
            this.id = company.id;
            this.compName = company.compName;
            this.password = company.password;
            this.email = company.email;
        }
    }

    public get getId(): number {
        return this.id;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public get getCompName(): String {
        return this.compName;
    }
    public set setCompName(compName: String) {
        this.compName = compName;
    }

    public get getPassword(): String {
        return this.password;
    }

    public set setPassword(password: String) {
        this.password = password;
    }

    public get getEmail(): String {
        return this.email;
    }

    public set setEmail(email: String) {
        this.email = email;
    }
}