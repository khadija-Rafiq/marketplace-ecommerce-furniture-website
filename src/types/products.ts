  
export interface Product {
    name: any;
    category: any;
    _id :string;
    productName: string;
    _type :"product";
    imagePath? : string;
    price :number;
    description? : string;
    image?: string;
    slug :{
        _type: "slug"
        current : string;
        
    };
    
    stockLevel :number;
}