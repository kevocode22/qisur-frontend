import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

type ProductRowProps = {
  product: Product;
  onDelete: (product: Product) => void;
};

const ProductRow: React.FC<ProductRowProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };

  const handleDelete = () => {
    onDelete(product);
    setOpen(false);
  };

  return (
    <TableRow className="cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900">
      <TableCell onClick={handleNavigate}>
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 object-cover rounded"
        />
      </TableCell>
      <TableCell onClick={handleNavigate}>{product.name}</TableCell>
      <TableCell className="text-wrap" onClick={handleNavigate}>
        {product.description}
      </TableCell>
      <TableCell onClick={handleNavigate}>${product.price}</TableCell>
      <TableCell onClick={handleNavigate}>{product.stock}</TableCell>
      <TableCell className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleNavigate}>
          Editar
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              Eliminar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro?</DialogTitle>
            </DialogHeader>
            <p>Esta acción eliminará el producto permanentemente.</p>
            <DialogFooter className="mt-4">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
