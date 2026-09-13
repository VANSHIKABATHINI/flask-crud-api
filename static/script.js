// =========================
// USERS
// =========================

// CREATE USER

function addUser() {

    const username =
        document.getElementById("username").value;

    const email =
        document.getElementById("email").value;

    if (username === "" || email === "") {
        alert("Please enter username and email");
        return;
    }

    fetch("/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            email: email
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        document.getElementById("username").value = "";
        document.getElementById("email").value = "";

        loadUsers();
    });
}


// READ USERS

function loadUsers() {

    fetch("/users")

    .then(response => response.json())

    .then(users => {

        let output = "";

        users.forEach(user => {

            output += `
                <div class="item">

                    <div>
                        <strong>ID:</strong> ${user.id}
                        <br>
                        <strong>Username:</strong> ${user.username}
                        <br>
                        <strong>Email:</strong> ${user.email}
                    </div>

                    <div class="actions">

                        <button onclick="editUser(${user.id})">
                            Edit
                        </button>

                        <button onclick="deleteUser(${user.id})">
                            Delete
                        </button>

                    </div>

                </div>
            `;
        });

        document.getElementById("userList").innerHTML = output;
    });
}


// UPDATE USER

function editUser(id) {

    fetch(`/users/${id}`)

    .then(response => response.json())

    .then(data => {

        const user = data.user;

        const username =
            prompt("Enter new username:", user.username);

        if (username === null) {
            return;
        }

        const email =
            prompt("Enter new email:", user.email);

        if (email === null) {
            return;
        }

        fetch(`/users/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                email: email
            })

        })

        .then(response => response.json())

        .then(data => {

            alert(data.message);

            loadUsers();
        });
    });
}


// DELETE USER

function deleteUser(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    fetch(`/users/${id}`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadUsers();
    });
}


// =========================
// PRODUCTS
// =========================

// CREATE PRODUCT

function addProduct() {

    const name =
        document.getElementById("productName").value;

    const price =
        document.getElementById("productPrice").value;

    if (name === "" || price === "") {
        alert("Please enter product name and price");
        return;
    }

    fetch("/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            price: Number(price)
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";

        loadProducts();
    });
}


// READ PRODUCTS

function loadProducts() {

    fetch("/products")

    .then(response => response.json())

    .then(products => {

        let output = "";

        products.forEach(product => {

            output += `
                <div class="item">

                    <div>
                        <strong>ID:</strong> ${product.id}
                        <br>
                        <strong>Name:</strong> ${product.name}
                        <br>
                        <strong>Price:</strong> ₹${product.price}
                    </div>

                    <div class="actions">

                        <button onclick="editProduct(${product.id})">
                            Edit
                        </button>

                        <button onclick="deleteProduct(${product.id})">
                            Delete
                        </button>

                    </div>

                </div>
            `;
        });

        document.getElementById("productList").innerHTML = output;
    });
}


// UPDATE PRODUCT

function editProduct(id) {

    fetch(`/products/${id}`)

    .then(response => response.json())

    .then(data => {

        const product = data.product;

        const name =
            prompt("Enter new product name:", product.name);

        if (name === null) {
            return;
        }

        const price =
            prompt("Enter new price:", product.price);

        if (price === null) {
            return;
        }

        fetch(`/products/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                price: Number(price)
            })

        })

        .then(response => response.json())

        .then(data => {

            alert(data.message);

            loadProducts();
        });
    });
}


// DELETE PRODUCT

function deleteProduct(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    fetch(`/products/${id}`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadProducts();
    });
}


// =========================
// LOAD DATA
// =========================

loadUsers();
loadProducts();