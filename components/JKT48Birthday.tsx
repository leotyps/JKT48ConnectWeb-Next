"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@heroui/react";

interface BirthdayMember {
  name: string;
  birthdate: string;
  img: string;
  room_id: number;
  url_key: string;
}

export default function JKT48Birthdays() {
  const [birthdayData, setBirthdayData] = useState<BirthdayMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBirthdays() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const birthdays = await jkt48Api.birthday(apiKey);
        setBirthdayData(birthdays);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBirthdays();
  }, []);

  // Format date to show day and month
  const formatBirthdate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
  };

  // Calculate days until birthday
  const getDaysUntilBirthday = (dateString: string) => {
    const today = new Date();
    const birthdate = new Date(dateString);
    
    // Set birth date to current year
    const birthdateThisYear = new Date(
      today.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
    
    // If birthday has passed this year, set to next year
    if (birthdateThisYear < today) {
      birthdateThisYear.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate days difference
    const diffTime = Math.abs(birthdateThisYear.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} shadow="sm" className="w-full">
        <CardBody className="overflow-visible p-0">
          <Skeleton className="rounded-lg">
            <div className="w-full h-[140px] rounded-lg bg-default-300" />
          </Skeleton>
        </CardBody>
        <CardFooter className="text-small justify-between">
          <Skeleton className="w-20 rounded-md">
            <div className="h-4 rounded-md bg-default-200" />
          </Skeleton>
          <Skeleton className="w-16 rounded-md">
            <div className="h-4 rounded-md bg-default-200" />
          </Skeleton>
        </CardFooter>
      </Card>
    ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Birthdays</h2>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          renderSkeletons()
        ) : (
          birthdayData
            .sort((a, b) => getDaysUntilBirthday(a.birthdate) - getDaysUntilBirthday(b.birthdate))
            .map((member, index) => (
              <Card 
                key={member.url_key} 
                isPressable 
                shadow="sm" 
                onPress={() => window.open(`https://jkt48.com/member/detail/id/${member.url_key}?lang=id`, '_blank')}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    alt={`${member.name}'s photo`}
                    className="w-full object-cover h-[180px]"
                    radius="lg"
                    shadow="sm"
                    src={member.img}
                    width="100%"
                  />
                </CardBody>
                <CardFooter className="text-small justify-between flex-col items-start">
                  <b>{member.name}</b>
                  <div className="w-full flex justify-between items-center mt-1">
                    <p className="text-default-500">{formatBirthdate(member.birthdate)}</p>
                    <p className="text-primary-500">
                      {getDaysUntilBirthday(member.birthdate) === 0 
                        ? "Today!" 
                        : `${getDaysUntilBirthday(member.birthdate)} days`}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
