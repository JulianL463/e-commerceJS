
class Producto{

    constructor(id, cantidad, precio){
        this.id=id;
        this.cantidad=cantidad;
        this.precio= precio;
    }

    sumarUno(){
        this.cantidad++;
    }
}

class Carrito{

    constructor(){
        this.productos = [];
        this.iva = 0.21;
        this.total = 0;
        this.ivaTotal = 0;
        this.totalConIva = 0;
        this.carritoText = '';
    }

    calcularTotal(){
        this.total = 0;
        for (const prod of this.productos) {
            this.total += (prod.precio * prod.cantidad);
        }
    }
    devolverTotal(){
        return this.total; 
    }

    calcularIva(){
        this.ivaTotal = this.total*this.iva;
    }
    devolverIva(){
        return (this.ivaTotal);
    }

    calcularTotalConIva(){
        this.totalConIva = this.total+this.ivaTotal;
    }
    devolverTotalConIva(){
        return this.totalConIva;
    }

    agregarProducto(producto){

        if(this.productos.some((prod) => prod.id == producto.id)){

            this.productos.forEach( (prod) => {
                if(prod.id == producto.id){
                    prod.sumarUno();
                }
            })

        }else {
            this.productos.push(producto);
        }

        let listaProductos = document.getElementById('carrito__productos');
        listaProductos.innerHTML = '';
        this.productos.forEach((prod)=>{
            
            let item = document.createElement("div");

            item.innerHTML = `<h6  class="carrito__productos__prod">${prod.cantidad} x   ${prod.id}</h6>
            <h4 class="carrito__productos__price">$${prod.precio*prod.cantidad}</h4><br>`; 
            //`<h6  class="carrito__productos__prod">${prod.cantidad} x   ${prod.id}   $ ${prod.precio*prod.cantidad}</h6>`;

            document.getElementById('carrito__productos').appendChild(item);

            // listaProductos.innerHTML = `<h6>${prod.id}</h6>`;

        })


        this.calcularTotal();
        this.calcularIva();
        this.calcularTotalConIva();
        
    }

    // armarString(){

    //     for (const prod of this.productos) {
    //         this.carritoText += (prod.cantidad + 'x   ' + prod.id + '   $' + (prod.precio*prod.cantidad) + '\n');
    //     }

    //     this.carritoText += ('\n' + 'Total: ....................  $' + this.devolverTotal() + '\n' + 'IVA: .......................  $' + this.devolverIva() + '\n' + 'Total + IVA: ........  $' + this.devolverTotalConIva());

    //     return this.carritoText;
    // }
    actualizarCuenta(){
        let cuentaTotal = document.getElementById('carrito__cuenta__total');
        let cuentaIva = document.getElementById('carrito__cuenta__iva');
        let cuentaTotalIva = document.getElementById('carrito__cuenta__totalIva');

        cuentaTotal.innerText = '$' + this.devolverTotal();
        cuentaIva.innerText = '$' + this.devolverIva();
        cuentaTotalIva.innerText = '$' + this.devolverTotalConIva();
    }

}
///////////////////////////////////////////Variables/////////////////////////////////////////////////////////////
let producto = '';

const stock =  [{id:'chimuelo', precio: 1500},
                {id:'guante', precio: 700},
                {id:'pikachu', precio: 250},
                {id:'snitch', precio: 300}]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let carrito = new Carrito();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
do{  
    producto = prompt('Ingrese el producto que quiera agregar al carrito: \n\nchimuelo\nguante\nsnitch\npikachu \n\npara terminar ingrese "esc": ').toLowerCase();
    
    if(stock.some( (prod) => prod.id == producto)){

        stock.forEach( (prod) => {
            if(prod.id == producto){
                carrito.agregarProducto(new Producto(prod.id, 1, prod.precio));
            }
        })

    }else if(producto == 'esc'){

        // alert(carrito.armarString());
        carrito.actualizarCuenta();

        
    }else{
        alert('No se encontro el producto "' + producto + '"');
        console.log('No se encontro el producto "' + producto + '"');
    }
    
}while(producto != 'esc');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////