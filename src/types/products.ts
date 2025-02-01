  
export interface Product {
    name: string;
    category: string;
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