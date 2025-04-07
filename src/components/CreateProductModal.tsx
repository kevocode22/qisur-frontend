import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Product } from "@/lib/utils";

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated: (product: Product) => void;
}

const CreateProductModal = ({
  open,
  onOpenChange,
  onProductCreated,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      return toast("Por favor, completá todos los campos correctamente.");
    }

    try {
      const res = await fetch("https://qisur-api.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (!res.ok) throw new Error("Error al crear el producto");

      const { newProduct } = await res.json();
      onProductCreated(newProduct);

      setFormData({ name: "", description: "", price: 0, stock: 0, image: "" });
    } catch (err) {
      toast("Error al crear el producto");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {["name", "description", "price", "stock", "image"].map((field) => (
            <Input
              key={field}
              type={["price", "stock"].includes(field) ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field as keyof typeof formData]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field]:
                    field === "price" || field === "stock"
                      ? +e.target.value
                      : e.target.value,
                }))
              }
            />
          ))}
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit}>Guardar Producto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
