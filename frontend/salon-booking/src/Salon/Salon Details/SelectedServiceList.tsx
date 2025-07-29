import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import * as React from "react";
import { ServiceOffering } from "../../Redux/reducers/serviceOfferingReducer";

export interface SelectedServiceListProps {
  selectedServices: ServiceOffering[];
  handleServiceRemove: (index: number) => void;
}

export function SelectedServiceList({
  selectedServices,
  handleServiceRemove,
}: SelectedServiceListProps) {
  return (
    <div className="my-5 space-y-2">
      {selectedServices.map((serviceOffering, index) => (
        <div
          key={index}
          className="py-2 px-4 rounded-md bg-slate-100 flex justify-between items-center"
        >
          <h1 className="font-thin">{serviceOffering.name}</h1>
          <p>&#8377;{serviceOffering.price}</p>
          <IconButton onClick={() => handleServiceRemove(index)}>
            <Close />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
