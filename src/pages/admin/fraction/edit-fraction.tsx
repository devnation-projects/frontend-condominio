import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useApi } from "@/service/apiService";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSpinner from "@/hooks/useLoadingStore";
import { toast } from "react-toastify";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFraction } from "@/types/Fraction";

const fractionSchema = z.object({
  location: z.string().min(1, "A localização é obrigatória"),
  type: z.string().min(1, "O tipo é obrigatório"),
  fraction: z.string().min(1, "A fração é obrigatória"),
});

type FractionFormValues = z.infer<typeof fractionSchema>;

export default function EditFraction() {
  const { loading, setLoading } = useSpinner();
  const api = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  const [fraction, setFraction] = useState<IFraction | null>(null);

  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FractionFormValues>({
    resolver: zodResolver(fractionSchema),
    defaultValues: {
      location: "",
      fraction: "",
      type: "",
    },
  });

  const getFraction = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/fraction/${id}`);

      setFraction(data);
      reset(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (items: FractionFormValues) => {
    try {
      setLoading(true);

      const { data } = await api.put(`/fraction/update/${id}`, {
        location: items.location,
        type: items.type,
        fraction: Number(items.fraction),
      });

      navigate("/admin/fractions");

      toast.success("Fração editada com sucesso.");
    } catch (error) {
      console.error("Erro ao editar fração:", error);
      toast.error("Ocorreu um erro ao editar as informações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setBreadcrumbItems([
        { label: "Admin", href: "/admin" },
      { label: "Frações", href: "/admin/fractions" },
      { label: "Editar", href: `/admin/fraction/edit/${id}` },
      ]);
      await getFraction();
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Editar Fração</h2>
      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
        className="space-y-4"
      >
        <div>
          <Label>Localização</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Localização do imóvel"
                required
                className="mt-2"
              />
            )}
          />
          {errors.location && (
            <span className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </span>
          )}
        </div>
        <div>
          <Label>Tipo</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
                required
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="APTO">Apartamento</SelectItem>
                    <SelectItem value="LOJA">Loja</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className="text-red-500 text-xs mt-1">
              {errors.type.message}
            </span>
          )}
        </div>
        <div>
          <Label>Fração</Label>
          <Controller
            name="fraction"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Fração"
                required
                className="mt-2"
              />
            )}
          />
          {errors.fraction && (
            <span className="text-red-500 text-xs mt-1">
              {errors.fraction.message}
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="default"
            onClick={() => navigate("/admin/fractions")}
          >
            Voltar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
