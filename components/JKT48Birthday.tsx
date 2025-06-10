
"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton, Badge, Chip } from "@heroui/react";
import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";

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

  // Check if today is birthday
  const isBirthdayToday = (dateString: string) => {
    return getDaysUntilBirthday(dateString) === 0;
  };

  // Separate today's birthdays from upcoming ones
  const todayBirthdays = birthdayData.filter(member => isBirthdayToday(member.birthdate));
  const upcomingBirthdays = birthdayData
    .filter(member => !isBirthdayToday(member.birthdate))
    .sort((a, b) => getDaysUntilBirthday(a.birthdate) - getDaysUntilBirthday(b.birthdate));

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} shadow="sm" className="w-full">
        <CardBody className="overflow-visible p-0">
          <Skeleton className="rounded-lg">
            <div className="w-full h-[200px] rounded-lg bg-default-300" />
          </Skeleton>
        </CardBody>
        <CardFooter className="text-small justify-between flex-col gap-2">
          <Skeleton className="w-24 rounded-md">
            <div className="h-4 rounded-md bg-default-200" />
          </Skeleton>
          <Skeleton className="w-20 rounded-md">
            <div className="h-3 rounded-md bg-default-200" />
          </Skeleton>
        </CardFooter>
      </Card>
    ));
  };

  const renderMemberCard = (member: BirthdayMember, isTodayBirthday: boolean = false) => (
    <div key={member.url_key} className="relative">
      <Card 
        isPressable 
        shadow={isTodayBirthday ? "lg" : "sm"}
        className={`w-full transition-all duration-300 hover:scale-105 ${
          isTodayBirthday ? 'ring-2 ring-warning-400 shadow-warning-200/50' : ''
        }`}
        onPress={() => window.open(`https://jkt48.com/member/detail/id/${member.url_key}?lang=id`, '_blank')}
      >
        {isTodayBirthday && (
          <Badge 
            content={<FaBirthdayCake className="text-white" />}
            color="warning"
            placement="top-right"
            className="z-10"
            size="lg"
          />
        )}
        
        <CardBody className="overflow-visible p-0 relative">
          <Image
            alt={`${member.name}'s photo`}
            className="w-full object-cover h-[220px]"
            radius="lg"
            shadow="sm"
            src={member.img}
            width="100%"
          />
          {isTodayBirthday && (
            <div className="absolute inset-0 bg-gradient-to-t from-warning-500/20 to-transparent rounded-lg" />
          )}
        </CardBody>
        
        <CardFooter className="text-small flex-col items-start gap-2 p-4">
          <div className="w-full flex items-center justify-between">
            <b className="text-base truncate">{member.name}</b>
            {isTodayBirthday && (
              <Chip 
                color="warning" 
                variant="flat" 
                size="sm"
                startContent={<FaBirthdayCake className="text-xs" />}
              >
                Birthday!
              </Chip>
            )}
          </div>
          
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs text-default-400" />
              <p className="text-default-500 text-xs">{formatBirthdate(member.birthdate)}</p>
            </div>
            
            <div className={`text-xs font-medium ${
              isTodayBirthday ? 'text-warning-600' : 'text-primary-500'
            }`}>
              {isTodayBirthday 
                ? "Hari ini!" 
                : `${getDaysUntilBirthday(member.birthdate)} hari lagi`}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="mt-8 space-y-8">
      {/* Today's Birthdays Section */}
      {!loading && todayBirthdays.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-full">
              <FaBirthdayCake className="text-warning-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-warning-700">
                Selamat Ulang Tahun! 🎉
              </h2>
              <p className="text-sm text-default-600">
                {todayBirthdays.length} member berulang tahun hari ini
              </p>
            </div>
          </div>
          
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {todayBirthdays.map(member => renderMemberCard(member, true))}
          </div>
        </div>
      )}

      {/* Upcoming Birthdays Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-full">
            <FaCalendarAlt className="text-primary-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {todayBirthdays.length > 0 ? 'Ulang Tahun Mendatang' : 'Ulang Tahun Mendatang'}
            </h2>
            <p className="text-sm text-default-600">
              Member yang akan berulang tahun
            </p>
          </div>
        </div>
        
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loading ? (
            renderSkeletons()
          ) : (
            upcomingBirthdays.map(member => renderMemberCard(member, false))
          )}
        </div>
      </div>
      
      {/* Empty State */}
      {!loading && birthdayData.length === 0 && (
        <div className="text-center py-12">
          <FaBirthdayCake className="text-6xl text-default-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-default-600 mb-2">
            Tidak ada data ulang tahun
          </h3>
          <p className="text-default-500">
            Coba refresh halaman atau periksa koneksi internet Anda
          </p>
        </div>
      )}
    </div>
  );
}
