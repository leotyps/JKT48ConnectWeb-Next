
"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, Link, Input, Select, SelectItem, Button } from "@heroui/react";

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
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("all");
  const [selectedInitial, setSelectedInitial] = useState<string>("all");

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
        setFilteredMembers(activeMembersOnly);
      } catch (error) {
        console.error("Error fetching members:", error);
        // Set empty array on error to prevent crashes
        setMembersData([]);
        setFilteredMembers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  // Filter and search effect
  useEffect(() => {
    let filtered = [...membersData];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((member: Member) => {
        const name = member.name?.toLowerCase() || '';
        const nicknames = member.nicknames?.join(' ').toLowerCase() || '';
        const generation = member.generation?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return name.includes(query) || 
               nicknames.includes(query) || 
               generation.includes(query);
      });
    }

    // Filter by generation
    if (selectedGeneration !== "all") {
      filtered = filtered.filter((member: Member) => 
        member.generation?.toLowerCase().includes(selectedGeneration.toLowerCase())
      );
    }

    // Filter by initial letter
    if (selectedInitial !== "all") {
      filtered = filtered.filter((member: Member) => 
        member.name?.charAt(0).toLowerCase() === selectedInitial.toLowerCase()
      );
    }

    setFilteredMembers(filtered);
  }, [membersData, searchQuery, selectedGeneration, selectedInitial]);

  // Get unique generations for filter
  const getGenerations = () => {
    const generationSet = new Set(membersData.map(member => member.generation));
    const generations = Array.from(generationSet)
      .filter(gen => gen)
      .sort();
    return [{ key: "all", label: "All Generations" }, ...generations.map(gen => ({ key: gen, label: gen.toUpperCase() }))];
  };

  // Get unique initials for filter
  const getInitials = () => {
    const initialSet = new Set(membersData.map(member => member.name?.charAt(0).toUpperCase()));
    const initials = Array.from(initialSet)
      .filter(initial => initial)
      .sort();
    return [{ key: "all", label: "All Initials" }, ...initials.map(initial => ({ key: initial, label: initial }))];
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGeneration("all");
    setSelectedInitial("all");
  };

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
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">JKT48 Members</h2>
              <div className="text-sm text-default-500">
                {loading ? 'Loading...' : `${filteredMembers.length} of ${membersData.length} members`}
              </div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                isClearable
                placeholder="Search by name, nickname, or generation..."
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="flex-1"
              />
              
              <div className="flex gap-2">
                <Select
                  placeholder="All Generations"
                  className="min-w-[150px]"
                  selectedKeys={selectedGeneration !== "all" ? [selectedGeneration] : []}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    setSelectedGeneration(value || "all");
                  }}
                  items={getGenerations()}
                >
                  {(item) => (
                    <SelectItem key={item.key}>
                      {item.label}
                    </SelectItem>
                  )}
                </Select>
                
                <Select
                  placeholder="All Initials"
                  className="min-w-[120px]"
                  selectedKeys={selectedInitial !== "all" ? [selectedInitial] : []}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    setSelectedInitial(value || "all");
                  }}
                  items={getInitials()}
                >
                  {(item) => (
                    <SelectItem key={item.key}>
                      {item.label}
                    </SelectItem>
                  )}
                </Select>
                
                {(searchQuery || selectedGeneration !== "all" || selectedInitial !== "all") && (
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={clearFilters}
                    aria-label="Clear filters"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {loading ? (
              renderSkeletons()
            ) : filteredMembers.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-default-500">
                  {membersData.length === 0 ? "No members data available" : "No members found matching your search criteria"}
                </p>
                {(searchQuery || selectedGeneration !== "all" || selectedInitial !== "all") && (
                  <Button
                    variant="flat"
                    onPress={clearFilters}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              filteredMembers.map((member: Member) => {
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
