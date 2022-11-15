import React from "react";

interface Props {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
}

function InfoCard({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
}: Props) {
  return <div>InfoCard</div>;
}

export default InfoCard;
