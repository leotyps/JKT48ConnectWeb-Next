"use client"

import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function JKT48TheaterCard() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card className="py-4 w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <CardBody className="overflow-visible py-2">
              <Image
                alt="JKT48 Theater"
                className="object-cover rounded-xl h-full"
                src="https://files.catbox.moe/4dg2g5.jpg"
                width="100%"
              />
            </CardBody>
          </div>
          <div className="md:w-1/2">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">JKT48 Theater</p>
              <small className="text-default-500">fX Sudirman, Jakarta Pusat</small>
              <h4 className="font-bold text-large">Home of JKT48</h4>
            </CardHeader>
            <CardBody className="py-2 px-4">
              <div className="mt-2">
                <p className="text-sm md:text-base">
                  <span className="font-semibold">Apa itu JKT48 Theater?</span><br />
                  Teater JKT48 adalah sebuah teater eksklusif untuk pertunjukan grup idola Indonesia JKT48 dan grup-grup saudarinya dari AKB48 Group. Teater ini berada di lantai 4 fX Sudirman, Jakarta Pusat.
                </p>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
    </div>
  );
}
