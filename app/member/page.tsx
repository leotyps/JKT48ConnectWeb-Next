"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, Link } from "@heroui/react";

interface Social {
  title: string;
  url: string;
}

interface Member {
  _id: string;
  name: string;
  nicknames: string[];
  img: string;
  img_alt?: string;
  url: string;
  group: string;
  socials: Social[];
  room_id?: number;
  sr_exists: boolean;
  is_graduate: boolean;
  generation: string;
  idn_username?: string;
}

export default function JKT48Members() {
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const members = await jkt48Api.members(apiKey);
        
        // Handle both array and object responses
        const membersList: Member[] = Array.isArray(members) ? members : (members.members || []);
        
        // Filter and limit the data to prevent overwhelming the UI
        const activeMembersOnly = membersList
          .filter((member: Member) => member && !member.is_graduate)
          .slice(0, 50); // Limit to first 50 active members
        
        setMembersData(activeMembersOnly);
      } catch (error) {
        console.error("Error fetching members:", error);
        // Set empty array on error to prevent crashes
        setMembersData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  const getMemberCategory = (member: Member) => {
    if (!member || !member.generation) return 'Member Inti';
    
    const generation = member.generation.toLowerCase();
    const name = member.name ? member.name.toLowerCase() : '';
    
    // Fritzy and Lana are core members despite being gen12/gen13
    if (name.includes('fritzy') || name.includes('lana')) {
      return 'Member Inti';
    }
    
    // Gen12 and Gen13 are trainees
    if (generation.includes('gen12') || generation.includes('gen13')) {
      return 'Trainee';
    }
    
    return 'Member Inti';
  };

  const getCategoryColor = (category: string) => {
    return category === 'Trainee' ? 'warning' : 'primary';
  };

  const renderSkeletons = () => {
    return Array(12).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} shadow="sm">
        <div className="overflow-visible p-0">
          <Skeleton className="rounded-lg">
            <div className="w-full h-[140px] rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <div className="p-3 space-y-2">
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
      </Card>
    ));
  };

  const handleMemberPress = (member: Member) => {
    // Navigate to member detail or perform action
    console.log("Member pressed:", member.name);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Members</BreadcrumbItem>
        </Breadcrumbs>

        {/* Members Content */}
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">JKT48 Members</h2>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {loading ? (
              renderSkeletons()
            ) : membersData.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-default-500">No members data available</p>
              </div>
            ) : (
              membersData.map((member: Member) => {
                if (!member || !member._id) return null;
                
                const category = getMemberCategory(member);
                const memberName = member.name || 'Unknown';
                const memberImage = member.img_alt || member.img || '';
                const memberNickname = member.nicknames && member.nicknames.length > 0 ? member.nicknames[0] : '';
                
                return (
                  <Card 
                    key={member._id} 
                    isPressable 
                    shadow="sm" 
                    onPress={() => handleMemberPress(member)}
                    className="relative"
                  >
                    <CardBody className="overflow-visible p-0">
                      <Image
                        alt={memberName}
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        shadow="sm"
                        src={memberImage}
                        width="100%"
                        fallbackSrc="https://via.placeholder.com/200x140?text=JKT48"
                      />
                      <Chip
                        size="sm"
                        color={getCategoryColor(category)}
                        className="absolute top-2 right-2 z-10"
                      >
                        {category}
                      </Chip>
                    </CardBody>
                    <CardFooter className="text-small flex-col items-start gap-1 p-3">
                      <b className="text-left line-clamp-1">{memberName}</b>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-default-500 text-xs">
                          {memberNickname}
                        </p>
                        {member.sr_exists && member.room_id && (
                          <Link
                            isExternal
                            href={`https://www.showroom-live.com/room/profile?room_id=${member.room_id}`}
                            className="text-xs"
                          >
                            SR
                          </Link>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
