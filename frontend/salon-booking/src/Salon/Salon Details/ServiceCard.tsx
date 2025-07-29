import { FiberManualRecord } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ServiceOffering } from "../../Redux/reducers/serviceOfferingReducer";
import React from "react";
export interface IAppProps {
  serviceOffering: ServiceOffering;
  handleServiceClick: (serviceOffering: ServiceOffering) => void;
}

export function ServiceCard({
  serviceOffering,
  handleServiceClick,
}: IAppProps) {
  return (
    <div className="w-full">
      <div className="items-center justify-between flex gap-5">
        <div className="space-y-1 w-[60%]">
          <h1 className="text-2xl font-semibold">{serviceOffering.name}</h1>
          <p className="text-gray-500 text-sm">{serviceOffering.description}</p>
          <div className="flex items-center gap-3">
            <p>&#8377;{serviceOffering.price}</p>
            <FiberManualRecord sx={{ fontSize: "10px", color: "grey" }} />
            <p>{serviceOffering.duration} min</p>
          </div>
        </div>
        <div className="space-y-3">
          <img
            className="w-32 h-32 object-cover rounded-md"
            src={serviceOffering.image}
            alt=""
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleServiceClick(serviceOffering)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
