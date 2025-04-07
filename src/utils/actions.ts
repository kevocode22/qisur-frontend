import type { Product } from "@/pages/ProductsTable";
import axios from "axios";

// Obtener todos los productos

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (id: string) => {
  try {
    console.log("HOLAAAA ESTOY EN EKL IF");
    const response = await axios.get(
      `https://qisur-api.onrender.com/products/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto", error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (product) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/products`,
      product
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto", error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (
  id: string,
  updatedProduct: Omit<Product, "id">
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/products/${id}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    throw error;
  }
};
