import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { getProductById, updateProduct } from "../utils/actions";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/utils";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          image: data.image,
        });
        setProgress(50);
        setTimeout(() => {
          setProgress(100);
          setLoading(false);
        }, 500);
      } catch {
        toast.error("Error al obtener el producto");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (
    field: keyof typeof form,
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(id, form);
      toast.success("Producto actualizado correctamente");
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast.error(`Error al actualizar el producto: ${message}`);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("image", imageUrl);
    }
  };

  if (!product) return <p className="p-6">Producto no encontrado</p>;

  return (
    <div className="flex items-center justify-center w-full">
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <Progress className="w-28" value={progress} />
          <p className="text-sm text-gray-500">Cargando producto...</p>
        </div>
      ) : (
        <div className="p-6 mx-auto w-full">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
          <div className="space-y-4">
            <div
              className="relative w-32 h-32 cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={form.image}
                alt={form.name}
                className="w-full h-full object-cover rounded border"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                Cambiar
              </span>
            </div>

            {(["name", "description", "price", "stock", "image"] as const).map(
              (field) => (
                <div key={field}>
                  <Label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    type={
                      field === "price" || field === "stock" ? "number" : "text"
                    }
                    value={form[field]}
                    onChange={(e) =>
                      handleInputChange(
                        field,
                        field === "price" || field === "stock"
                          ? +e.target.value
                          : e.target.value
                      )
                    }
                  />
                </div>
              )
            )}

            <Button onClick={handleUpdateProduct}>Guardar Cambios</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
