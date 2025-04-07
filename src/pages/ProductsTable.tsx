// components/ProductsTable.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getProducts, deleteProduct } from "../utils/actions";
import SkeletonTable from "@/components/skeleton/skeletonTable";
import ProductRow from "@/components/ProductRow";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateProductModal from "@/components/CreateProductModal";

import type { Product } from "@/lib/utils";

const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 8;
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        toast("Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      const response = await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast(response.message);
    } catch {
      toast("Error al eliminar el producto");
    }
  };

  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowCreateModal(false);
  };

  return (
    <section className="flex items-center justify-center w-full">
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-lg font-semibold">Productos</h2>
            <Button onClick={() => setShowCreateModal(true)}>
              + Nuevo Producto
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label className="text-sm font-medium">Buscar producto:</label>
            <Input
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-xs"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonTable />
              ) : paginatedProducts.length === 0 ? (
                <TableRow>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron productos.
                  </td>
                </TableRow>
              ) : (
                paginatedProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onDelete={() => handleDelete(product.id)}
                  />
                ))
              )}
            </TableBody>
          </Table>

          {!loading && totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      <CreateProductModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onProductCreated={handleProductCreated}
      />
    </section>
  );
};

export default ProductsTable;
