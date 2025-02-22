import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { IProperty } from "@/types/Property";
import { useApi } from "@/service/apiService";
import useSpinner from "@/hooks/useLoadingStore";
import { ArrowLeftIcon } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, setLoading, Spinner } = useSpinner();
  const [property, setProperty] = useState<IProperty | null>(null);

  const navigate = useNavigate();
  const api = useApi();

  const getProperty = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/property/${id}`);

      const formattedProperty = {
        ...data,
        type: data.type === "SALE" ? "Venda" : "Locação",
        priceFormatted: (typeof data.price === "string"
          ? parseFloat(data.price)
          : data.price
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      };

      setProperty(formattedProperty);
    } catch (error) {
      console.error("Erro ao buscar propriedade:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProperty()
  }, []);

  if (!property) return <p>Propriedade não encontrada.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Button
            variant="outline"
            className="mb-4 border-slate-200"
            size="default"
            onClick={() => navigate("/properties")}
          >
            <ArrowLeftIcon className="w-4 h-4" /> Voltar
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Swiper
                navigation
                autoplay={{ delay: 3000 }}
                loop
                modules={[Navigation, Autoplay]}
                className="rounded-xl h-full"
              >
                {property.photos.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={API_URL + image.url}
                      alt={`Imagem ${index + 1} da propriedade`}
                      className="w-full h-[400px] md:h-[600px] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-col justify-between">
              <CardHeader className="gap-2 md:gap-4">
                <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold">
                  {property.title}
                </CardTitle>
                <p className="text-lg md:text-xl font-semibold text-gray-700">
                  {property.priceFormatted}
                </p>
                <p className="text-lg text-gray-600">{property.type}</p>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Solicitar informações</Button>
              </CardContent>
            </div>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{property.description}</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
