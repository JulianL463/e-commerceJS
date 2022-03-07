class Producto{

    constructor(id, cantidad, precio, stock){
        this.id= id;
        this.cantidad= cantidad;
        this.precio= precio;
        this.stock= stock;
    }

    sumarUno(){

        if(this.cantidad<this.stock){
            this.cantidad++;
            Toastify({
                text: `${this.id} se agrego al carrito`,
                className: "addedToCartNotif",
                position: "left",
                offset: {y: 100},
                style: { background: "linear-gradient(90deg, rgba(186,3,27,1) 0%, rgba(198,12,12,1) 100%)"}
            }).showToast();
        }else{
            Toastify({
                text: `Sin stock`,
                className: "addedToCartNotif",
                position: "left",
                offset: {y: 100},
                style: { background: "black"}
            }).showToast();
        }
    }

    restarUno(){
        this.cantidad>1 && this.cantidad--;
    }
}