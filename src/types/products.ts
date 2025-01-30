  
export interface Product {
    _id :string;
    productName: string;
    _type :"product";
    imagePath? :{
        asset :{
            _ref :string;
            _type : "image";
        }
    };
    price :number;
    description? : string;
    slug :{
        _type: "slug"
        current : string;
        
    };
    
    stockLevel :number;
}