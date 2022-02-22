class Carrito{

    constructor(){
		this.productos = [];
        this.iva = 0.21;
        this.total = 0;
        this.ivaTotal = 0;
        this.totalConIva = 0;
        this.cantPrdouctos = 0;
    }
	
	guardarCarrito(){
		localStorage.setItem("oldCarrito", JSON.stringify(this.productos));
	}

	cargarCarrito(){
        let localStorageCarrito = JSON.parse(localStorage.getItem("oldCarrito")) || [];

        localStorageCarrito.forEach((prod) => {
            const {id, cantidad, precio, stock} = prod;
            
            carrito.agregarProducto(new Producto(id, cantidad, precio, stock), false, false);
        })
	}

    calcularTotal(){
        this.total = 0;
        
        this.productos.forEach((prod)=> {
            this.total += (prod.precio * prod.cantidad);
        })
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
        this.cantPrdouctos = 0;

        this.productos.forEach((prod)=>{
            
            const {id, cantidad, precio} = prod;
            let item = document.createElement("div");

            item.innerHTML = `<div class="carrito__productos__grid">
                <div class="carrito__productos__imgContainer"><img class="carrito__productos__img" src="img/${id}.jpg" alt=""></div>
                <h6  class="carrito__productos__prod">${id}</h6>
                <div class="carrito__productos__prodCant">
                    <h6 class="carrito__productos__prodCant__restar" id="restar--${id}"><</h6>  
                    <h6>${cantidad}</h6>
                    <h6 class="carrito__productos__prodCant__sumar" id="sumar--${id}">></h6>
                </div>                
                <div class="carrito__productos__line"></div>
                <div class="carrito__productos__delete"><img class="carrito__productos__delete__crossImg" id="delete--${id}" src="img/crosswhite.png" alt=""></div>
                <h4 class="carrito__productos__price">$${precio*cantidad}</h4>
            </div>`; 

            document.getElementById('carrito__productos').appendChild(item);

            let deleteBtn = document.getElementById("delete--"+id);
            deleteBtn.onclick = () => {this.quitarProducto(id)};

            let sumarBtn = document.getElementById("sumar--"+id);
            sumarBtn.onclick = () => {prod.sumarUno();this.actualizarCarrito(true)};

            let restarBtn = document.getElementById("restar--"+id);
            restarBtn.onclick = () => {prod.restarUno();this.actualizarCarrito(true)};
            
            this.cantPrdouctos += prod.cantidad;
        })
    }
	actualizarCuenta(){
        let cuentaTotal = document.getElementById('carrito__cuenta__total');
        let cuentaIva = document.getElementById('carrito__cuenta__iva');
        let cuentaTotalIva = document.getElementById('carrito__cuenta__totalIva');

        cuentaTotal.innerText = '$' + this.devolverTotal();
        cuentaIva.innerText = '$' + this.devolverIva();
        cuentaTotalIva.innerText = '$' + this.devolverTotalConIva();
    }
    actualizarCantidad(){
        let carritoCant = document.getElementById('carritoCount');

        carritoCant.innerText = this.cantPrdouctos;
    }
    actualizarCarrito(guardar){
        this.actualizarProductos();
        this.calcularTotal();
        this.calcularIva();
        this.calcularTotalConIva();
        
		this.actualizarCuenta();

        this.actualizarCantidad();

        guardar && this.guardarCarrito();
    }

    agregarProducto(producto, guardar, notif){

        if(this.productos.some((prod) => prod.id == producto.id)){

            this.productos.forEach( (prod) => {
                if(prod.id == producto.id){
                    prod.sumarUno();
                }
            })

        }else {
            this.productos.push(producto);
            if(notif==true){
                Toastify({
                    text: `${producto.id} se agrego al carrito`,
                    className: "addedToCartNotif",
                    position: "left",
                    offset: {y: 90},
                    style: { background: "linear-gradient(90deg, rgba(186,3,27,1) 0%, rgba(198,12,12,1) 100%)"}
                }).showToast();
            }
        }

        this.actualizarCarrito(guardar);
    }

    quitarProducto(producto){
        let index = this.productos.findIndex( item => item.id == producto)
        this.productos.splice(index,1);

        this.actualizarCarrito(true);
    }

}