
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
                offset: {y: 90},
                style: { background: "linear-gradient(90deg, rgba(186,3,27,1) 0%, rgba(198,12,12,1) 100%)"}
            }).showToast();
        }else{
            Toastify({
                text: `Sin stock`,
                className: "addedToCartNotif",
                position: "left",
                offset: {y: 90},
                style: { background: "black"}
            }).showToast();
        }
    }

    restarUno(){
        this.cantidad>1 && this.cantidad--;
    }
}


///////////////////////////////////////////Variables/////////////////////////////////////////////////////////////

const stock =  [{id:'chimuelo', dispo:10, precio: 1500},
                {id:'guante', dispo:10, precio: 700},
                {id:'pikachu', dispo:10, precio: 250},
                {id:'snitch', dispo:10, precio: 300},
                {id:'groot', dispo:10, precio: 1000},
                {id:'ironman', dispo:10, precio: 500},
                {id:'kiloren', dispo:10, precio: 450}];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let carrito = new Carrito();
let carritoCant = document.getElementById('carritoCount');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

carrito.cargarCarrito();


stock.forEach((prod)=>{

    const {id, precio, dispo} = prod;
    let item = document.createElement("div");

    item.className = "producto";
    item.innerHTML = `<div class="producto__titulo"><h3>${id.toUpperCase()}</h3></div>
                    <div class="producto__img"><img src="img/${id}.jpg" alt=""></div>
                    <div class="producto__info">
                        <h4 class="producto__info__precio">$${precio}</h4>
                        <input id="${id}AddBtn" class="producto__info__boton" type="button" value="">
                     </div>;`;

    document.getElementById('productos__grid').appendChild(item);

    let addBtn = document.getElementById(id+'AddBtn');
    addBtn.onclick = () => {
        carrito.agregarProducto(new Producto(id, 1, precio, dispo), true, true);
	if(carritoCant.clasList.contains('carritoCountHide')){
			carritoCant.classList.remove('carritoCountShow');
			setTimeout(() => {carritoCant.classList.add('carritoCountShow')}, 10); 
		}
    };
        
});

////////////////////////////////////////////Abrir y cerrar Carrito///////////////////////////////////////////////////////////////////
let btnCarrito = document.getElementById('btnCarrito');
let carro = document.getElementById('carrito');
let btnCloseCarrito = document.getElementById('carrito__close__img');

btnCarrito.onclick = () => { btnCarrito.classList.add('growAnimBtnCarrito');
    btnCarrito.classList.remove('shrinkAnimBtnCarrito');
    btnCarrito.classList.remove('shrinkBtnCarrito');
    carro.classList.remove('carritoHide');
    carro.classList.add('carritoShow');
    carritoCant.classList.remove('carritoCountShow');
    carritoCant.classList.add('carritoCountHide')
};
btnCloseCarrito.onclick = () => { 
    btnCarrito.classList.remove('growAnimBtnCarrito');
    btnCarrito.classList.add('shrinkAnimBtnCarrito');
    carro.classList.add('carritoHide');
    carro.classList.remove('carritoShow');
    setTimeout(() => {
        carritoCant.classList.remove('carritoCountHide');
        carritoCant.classList.add('carritoCountShow')},700);
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////