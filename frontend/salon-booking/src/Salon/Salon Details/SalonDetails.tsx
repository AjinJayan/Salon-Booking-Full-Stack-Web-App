import { useState } from "react";
import { SalonDetail } from "./SalonDetail";
import { Button, Divider } from "@mui/material";
import { SalonServiceDetails } from "./SalonServiceDetails";
import Review from "../../Customer/Review/Review";
import CreateReviewForm from "../../Customer/Review/CreateReviewForm";
import React from "react";

export interface SalonDetailsProps {}

type Tab = {
  name: string;
};
const tabs: Tab[] = [
  { name: "All Services" },
  { name: "Reviews" },
  { name: "Create Review" },
];

export function SalonDetails(props: SalonDetailsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const activeTabHandler = (tab) => setActiveTab(tab);
  return (
    <div className="px-5 lg:px-20">
      <SalonDetail />
      <div className="space-y-5">
        <div className="flex gap-2">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              onClick={() => activeTabHandler(tab)}
              variant={tab.name === activeTab.name ? "contained" : "outlined"}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        <Divider></Divider>
      </div>
      <div>
        {activeTab.name == "Create Review" ? (
          <div className=" flex justify-center">
            <CreateReviewForm />
          </div>
        ) : activeTab.name === "Reviews" ? (
          <div>
            <Review />
          </div>
        ) : (
          <div>
            <SalonServiceDetails />
          </div>
        )}
      </div>
    </div>
  );
}
