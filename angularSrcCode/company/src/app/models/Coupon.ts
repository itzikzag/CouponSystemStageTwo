import { CouponType } from './CouponType';

export class Coupon {
    private id: number;
    private title: String;
    private startDate: Date;
    private endDate: Date;
    private amount: number;
    private type: CouponType;
    private message: String;
    private price: number;
    private image: String;

    constructor(private coupon?: Coupon){
        if(this.coupon != null) {
            this.id = coupon.id;
            this.title = coupon.title;
            this.startDate = coupon.startDate;
            this.endDate = coupon.endDate;
            this.amount = coupon.amount;
            this.type = coupon.type;
            this.message = coupon.message;
            this.price = coupon.price;
            this.image = coupon.image;
        }
    }

    public get getId() : number 
    {
        return this.id;
    }

    public set setId(id : number)
    {
        this.id = id;
    }

    public get getTitle() : String 
    {
        return this.title;
    }
    public set setTitle(title : String)
    {
        this.title = title;
    }

    public get getStartDate () : Date
    {
        return this.startDate;
    }

    public set setStartDate (startDate: Date)
    {
        this.startDate = startDate;
    }

    public get getEndDate () : Date
    {
        return this.endDate;
    }

    public set setEndDate (endDate: Date)
    {
        this.endDate = endDate;
    }

    public get getAmount () : number
    {
        return this.amount;
    }

    public set setAmount (amount: number)
    {
        this.amount = amount;
    }

    public get getType () : CouponType 
    {
        return this.type;
    }

    public set setType (type: CouponType)
    {
        this.type = type;
    }

    public get getMessage () : String
    {
        return this.message;
    }

    public set setMessage (message: String)
    {
        this.message = message;
    }

    public get getPrice () : number
    {
        return this.price;
    }

    public set setPrice (price: number)
    {
        this.price = price;
    }

    public get getImage() : String
    {
        return this.image;
    }

    public set setImage (image: String)
    {
        this.image = image;
    }


}