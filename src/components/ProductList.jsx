import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";

export function ProductList() {

var category = "smartphones";
var limit = 10;
var apiUrl =
    `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data.products);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
}, []);

    

    return (
        <div className= {styles.container} >
            <h1> TJA Megastore</h1>
            {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                    <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
            {loading && (
            <div>
                <CircularProgress 
                
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}

                />
                <p>Loading products...</p>
            </div>
            )}
            {error && (<p>Error loading products: {error.message}</p>)}

        </div>

    )

}

