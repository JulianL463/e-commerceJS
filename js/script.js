
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
    actualizarProductos(){
        let listaProductos = document.getElementById('carrito__productos');
        listaProductos.innerHTML = '';

        this.productos.forEach((prod)=>{
            
            let item = document.createElement("div");

            item.innerHTML = `<div class="carrito__productos__grid">
                <div class="carrito__productos__imgContainer"><img class="carrito__productos__img" src="img/${prod.id}.jpg" alt=""></div>
                <h6  class="carrito__productos__prod">${prod.id}</h6>
                <h6  class="carrito__productos__prodCant">x${prod.cantidad}</h6>
                <div class="carrito__productos__line"></div>
                <h4 class="carrito__productos__price">$${prod.precio*prod.cantidad}</h4>
            </div>`; 

            document.getElementById('carrito__productos').appendChild(item);
        })
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

        this.actualizarProductos();


        this.calcularTotal();
        this.calcularIva();
        this.calcularTotalConIva();
        
    }
    
    

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
                {id:'snitch', precio: 300},
                {id:'groot', precio: 1000},
                {id:'ironman', precio: 500},
                {id:'kiloren', precio: 450}];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let carrito = new Carrito();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
stock.forEach((prod)=>{
            
    let item = document.createElement("div");

    item.className = "producto";
    item.innerHTML = `<div class="producto__titulo"><h3>${prod.id.toUpperCase()}</h3></div>
                    <div class="producto__img"><img src="img/${prod.id}.jpg" alt=""></div>
                    <div class="producto__info">
                        <h4 class="producto__info__precio">$${prod.precio}</h4>
                        <input id="${prod.id}AddBtn" class="producto__info__boton" type="button" value="">
                     </div>;`;

    document.getElementById('productos__grid').appendChild(item);
})

stock.forEach((prod)=>{
    let btn = document.getElementById(prod.id+'AddBtn');
    btn.onclick = () => {carrito.agregarProducto(new Producto(prod.id, 1, prod.precio)); carrito.actualizarCuenta()};
})


let btnCarrito = document.getElementById('btnCarrito');
let carro = document.getElementById('carrito');
let btnCloseCarrito = document.getElementById('carrito__close__img');

btnCarrito.onclick = () => { btnCarrito.classList.add('growAnimBtnCarrito'); btnCarrito.classList.remove('shrinkAnimBtnCarrito');btnCarrito.classList.remove('shrinkBtnCarrito'); carro.classList.remove('carritoHide'); carro.classList.add('carritoShow')};
btnCloseCarrito.onclick = () => { btnCarrito.classList.remove('growAnimBtnCarrito'); btnCarrito.classList.add('shrinkAnimBtnCarrito'); carro.classList.add('carritoHide'); carro.classList.remove('carritoShow')};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////