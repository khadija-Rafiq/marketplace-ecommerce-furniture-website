
const orderSchema = {
    name :"order",
    type: "document",
    title:"Order",
    fields: [
        {
            name:"firstName",
            title:"first Name",
            type:"string"
        },
        {
            name:"lastName",
            title:"last Name",
            type:"string"
        },
        {
            name:"address",
            title:"Address",
            type:"string"
        },
        {
            name:"city",
            title:"City",
            type:"string"
        },
        {
            name:"zipCode",
            title:"zip Code",
            type:"string"
        },
        {
            name:"phone",
            title:"phone",
            type:"string"
        },
        {
            name:"email",
            title:"Email",
            type:"string"
        },
        {
           name : "discount",
           type :"number",
           title :"Discount"
        },
        {
            name:"cartItem",
            title:"Cart Item",
            type:"array",
            of : [{type : 'reference', to : {type :"product"}}]
        },
        {
            name:"total",
            title:"Total",
            type:"number"
        },
        {
            name:"status",
            title:"Order Status",
            type:"string",
            options :{
                list: [
                   { title : 'Pending', value:'pending'},
                   { title : 'Success', value:'success'},
                   { title : 'Dispatch', value:'dispatch'},
                ],
                Layout : 'radio'
            },
            initialValue : 'pending'
        },
    ]
}
export default orderSchema
