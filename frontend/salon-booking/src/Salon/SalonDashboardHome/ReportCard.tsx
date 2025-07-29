import React from "react";
import styles from "./ReportCard.module.css";

type Props = {
  icon: any;
  value: string;
  title: string;
};

function ReportCard({ icon, value, title }: Props) {
  return (
    <div
      className={`flex  gap-5 items-center p-5 w-full rounded-md h-[79px] ${styles.reportCard}`}
    >
      <div className="rounded-md p-2 ">{icon}</div>
      <div>
        <p className="text-lg font`-bold">{value}</p>
        <p className="font-medium">{title}</p>
      </div>
    </div>
  );
}

export default ReportCard;
