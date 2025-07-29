import { Button } from "@mui/material";
import React, { useState } from "react";
import CategoryTables from "./CategoryTable";
import CategoryForm from "./CategoryForm";

type Props = {};

function Category({}: Props) {
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => handleTabClick(1)}
          variant={activeTab === 1 ? "contained" : "outlined"}
        >
          All Categories
        </Button>

        <Button
          onClick={() => handleTabClick(2)}
          variant={activeTab === 2 ? "contained" : "outlined"}
        >
          Create Categories
        </Button>
      </div>
      <div>{activeTab === 1 ? <CategoryTables /> : <CategoryForm />}</div>
    </div>
  );
}

export default Category;
