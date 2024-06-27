document.addEventListener("DOMContentLoaded", function() {
    const productInput = document.getElementById("productInput");
    const quantityInput = document.getElementById("quantityInput");
    const addProductBtn = document.getElementById("addProductBtn");
    const productList = document.getElementById("productList");

    // Carregar produtos salvos no localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Função para atualizar a lista de produtos na interface
    function updateProductList() {
        productList.innerHTML = "";
        products.forEach(function(product, index) {
            const li = document.createElement("li");
            li.textContent = `${product.name} - Quantidade: ${product.quantity}`;
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remover";
            removeBtn.className = "btn btn-danger btn-sm float-right";
            removeBtn.addEventListener("click", function() {
                products.splice(index, 1);
                updateLocalStorage();
                updateProductList();
            });
            li.appendChild(removeBtn);
            productList.appendChild(li);
        });
    }

    // Função para adicionar novo produto
    addProductBtn.addEventListener("click", function() {
        const productName = productInput.value.trim();
        const quantity = parseInt(quantityInput.value);
        if (productName !== "" && !isNaN(quantity)) {
            products.push({ name: productName, quantity: quantity });
            updateLocalStorage();
            updateProductList();
            productInput.value = "";
            quantityInput.value = "";
        }
    });

    // Função para atualizar o localStorage
    function updateLocalStorage() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    // Inicializar a lista de produtos na interface
    updateProductList();
});