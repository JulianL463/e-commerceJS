
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let stock = [];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let carrito = new Carrito();
let carritoCant = document.getElementById('carritoCount');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

carrito.cargarCarrito();

fetch('productos.json')
.then((resp) => resp.json())
.then((data) => {
    stock = [...data];
    stock.forEach((prod)=>{

        const {id, precio, dispo} = prod;
        let item = document.createElement("div");

        item.className = "producto";
        item.id = `${id}StoreItem`;
        item.innerHTML = `<div class="producto__titulo"><h3>${id.toUpperCase()}</h3></div>
                        <div class="producto__img"><img src="img/${id}.jpg" alt=""></div>
                        <div class="producto__info">
                            <h4 class="producto__info__precio">$${precio}</h4>
                            <input id="${id}AddBtn" class="producto__info__boton" type="button" value="">
                        </div>`;

        document.getElementById('productos__grid').appendChild(item);

        let optionProd = document.createElement("option");

        optionProd.value = id;

        document.getElementById('productosEnStock').appendChild(optionProd);
        
        let addBtn = document.getElementById(id+'AddBtn');
        addBtn.onclick = () => {
            carrito.agregarProducto(new Producto(id, 1, precio, dispo), true, true);
            if(carritoCant.classList.contains('carritoCountShow')){
                carritoCant.classList.remove('carritoCountShow');
                setTimeout(() => {carritoCant.classList.add('carritoCountShow')}, 10);
            }
        };
    });
})
//////////////////////////////////////////Buscador//////////////////////////////////////////////////////////////
let buscarProducto = () => {
    let searchValue = document.getElementById('toSearch').value.toLowerCase();
    let productsInStock = document.getElementsByClassName("producto");

    for( let i = 0; i < productsInStock.length; i++){
        searchValue == '' ? productsInStock[i].classList.remove('hide') : productsInStock[i].classList.add('hide');
    }

    if(stock.some((prod) => prod.id == searchValue)){
        let productToShow = productsInStock.namedItem(`${searchValue}StoreItem`);
        productToShow.classList.remove('hide');
    }else if(searchValue!=''){
        Toastify({
            text: `No se encontró el producto`,
            className: "addedToCartNotif",
            position: "left",
            offset: {y: 100},
            style: { background: "black"}
        }).showToast();
    }

}

let btnSearch = document.getElementById('searchBtn');

btnSearch.onclick = () => buscarProducto();
document.getElementById('toSearch').addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        buscarProducto();
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



