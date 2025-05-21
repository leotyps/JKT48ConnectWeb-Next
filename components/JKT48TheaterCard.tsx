"use client"

import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function JKT48TheaterCard() {
  return (
    <Card className="py-4 max-w-md mx-auto">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">JKT48 Theater</p>
        <small className="text-default-500">fX Sudirman, Jakarta Pusat</small>
        <h4 className="font-bold text-large">Home of JKT48</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="JKT48 Theater"
          className="object-cover rounded-xl"
          src="https://files.catbox.moe/4dg2g5.jpg"
          width="100%"
        />
        <div className="mt-4 px-2">
          <p className="text-sm">
            Apa itu JKT48 Theater?
            Teater JKT48 adalah sebuah teater eksklusif untuk pertunjukan grup idola Indonesia JKT48 dan grup-grup saudarinya dari AKB48 Group. Teater ini berada di lantai 4 fX Sudirman, Jakarta Pusat.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
