import * as React from "react";
import { Service } from "../../Data/service";

export interface HomeServiceCardProps {
  item: Service;
}

export function HomeServiceCard({ item }: HomeServiceCardProps) {
  return (
    <div className="flex justify-center items-center flex-col gap-4 rounded-lg p-5 bg-slate-100 w-32 h-55">
      <img
        className="w-full h-30 object-cover rounded-full"
        src={item.image}
        alt={item.name}
      />
      <h1 className="text-center mt-1"> {item.name}</h1>
    </div>
  );
}
