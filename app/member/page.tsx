"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, Link, Input, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar, Divider, Tabs, Tab } from "@heroui/react";

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

interface TheaterSchedule {
  id: string;
  name: string;
  date: string;
  url: string;
  poster: string;
}

interface MemberDetail {
  name: string;
  nickname: string;
  fullname: string;
  img: string;
  img_alt: string;
  banner: string;
  description: string;
  group: string;
  jikosokai: string;
  generation: string;
  showroom_id: number;
  showroom_exists: boolean;
  socials: Social[];
  is_graduate: boolean;
  bloodType: string;
  height: string;
  is_group: boolean;
  url: string;
  birthdate: string;
  stats: {
    missing: {
      showroom: number;
      idn: number;
    };
    total_live: {
      showroom: number;
      idn: number;
    };
    most_gift: {
      id: string;
      gift: number;
    };
    longest_live: {
      id: string;
      duration: number;
    };
    last_live: {
      id: string;
      date: {
        start: string;
        end: string;
      };
    };
  };
  recentTheater: TheaterSchedule[];
  upcomingTheater: TheaterSchedule[];
}

export default function JKT48Members() {
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("all");
  const [selectedInitial, setSelectedInitial] = useState<string>("all");
  
  // Modal states
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedMemberDetail, setSelectedMemberDetail] = useState<MemberDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

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
          .slice(0, 57); // Limit to first 50 active members
        
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

  const handleMemberPress = async (member: Member) => {
    setLoadingDetail(true);
    onOpen();
    
    try {
      const jkt48Api = require('@jkt48/core');
      const apiKey = 'JKTCONNECT';
      // Use the first nickname or the member name if no nicknames
      const memberName = member.nicknames && member.nicknames.length > 0 ? member.nicknames[0] : member.name;
      const memberDetail = await jkt48Api.memberDetail(memberName, apiKey);
      setSelectedMemberDetail(memberDetail);
    } catch (error) {
      console.error("Error fetching member detail:", error);
      setSelectedMemberDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
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

      {/* Member Detail Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {loadingDetail ? "Loading..." : selectedMemberDetail?.fullname || "Member Detail"}
              </ModalHeader>
              <ModalBody>
                {loadingDetail ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <Skeleton className="w-20 h-20 rounded-full" />
                      <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-4 w-3/4 rounded" />
                        <Skeleton className="h-3 w-1/2 rounded" />
                        <Skeleton className="h-3 w-2/3 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-40 w-full rounded" />
                  </div>
                ) : selectedMemberDetail ? (
                  <div className="flex flex-col gap-4">
                    {/* Header Section */}
                    <div className="flex gap-4 items-start">
                      <Avatar
                        src={selectedMemberDetail.img_alt || selectedMemberDetail.img}
                        size="lg"
                        className="min-w-20"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{selectedMemberDetail.fullname}</h3>
                        <p className="text-default-500">@{selectedMemberDetail.nickname}</p>
                        <p className="text-sm text-default-400">{selectedMemberDetail.generation.toUpperCase()}</p>
                        {selectedMemberDetail.birthdate && (
                          <p className="text-sm text-default-400">
                            Born: {formatDate(selectedMemberDetail.birthdate)}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {selectedMemberDetail.height && (
                            <Chip size="sm" variant="flat">{selectedMemberDetail.height}</Chip>
                          )}
                          {selectedMemberDetail.bloodType && (
                            <Chip size="sm" variant="flat">Blood: {selectedMemberDetail.bloodType}</Chip>
                          )}
                        </div>
                      </div>
                    </div>

                    <Divider />

                    {/* Tabs Content */}
                    <Tabs aria-label="Member details">
                      <Tab key="profile" title="Profile">
                        <div className="space-y-4">
                          {selectedMemberDetail.jikosokai && (
                            <div>
                              <h4 className="font-semibold mb-2">Jikoshoukai</h4>
                              <p className="text-sm text-default-600 italic">"{selectedMemberDetail.jikosokai}"</p>
                            </div>
                          )}
                          
                          {selectedMemberDetail.description && (
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <pre className="text-sm text-default-600 whitespace-pre-wrap font-sans">
                                {selectedMemberDetail.description}
                              </pre>
                            </div>
                          )}

                          {selectedMemberDetail.socials && selectedMemberDetail.socials.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">Social Media</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedMemberDetail.socials.map((social, index) => (
                                  <Button
                                    key={index}
                                    as={Link}
                                    href={social.url}
                                    isExternal
                                    size="sm"
                                    variant="flat"
                                    startContent={
                                      social.title === 'Twitter' ? '🐦' :
                                      social.title === 'Instagram' ? '📷' :
                                      social.title === 'TikTok' ? '🎵' :
                                      social.title === 'SHOWROOM' ? '📺' :
                                      social.title === 'IDN' ? '🎮' : '🔗'
                                    }
                                  >
                                    {social.title}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Tab>

                      <Tab key="stats" title="Live Stats">
                        {selectedMemberDetail.stats && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardBody>
                                <h4 className="font-semibold mb-2">Live Statistics</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>SHOWROOM Lives:</span>
                                    <span className="font-mono">{formatNumber(selectedMemberDetail.stats.total_live?.showroom || 0)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>IDN Lives:</span>
                                    <span className="font-mono">{formatNumber(selectedMemberDetail.stats.total_live?.idn || 0)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Missing SHOWROOM:</span>
                                    <span className="font-mono">{formatNumber(selectedMemberDetail.stats.missing?.showroom || 0)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Missing IDN:</span>
                                    <span className="font-mono">{formatNumber(selectedMemberDetail.stats.missing?.idn || 0)}</span>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>

                            <Card>
                              <CardBody>
                                <h4 className="font-semibold mb-2">Records</h4>
                                <div className="space-y-2 text-sm">
                                  {selectedMemberDetail.stats.most_gift && (
                                    <div>
                                      <span className="text-default-500">Most Gifts:</span>
                                      <p className="font-mono">{formatNumber(Math.round(selectedMemberDetail.stats.most_gift.gift))}</p>
                                    </div>
                                  )}
                                  {selectedMemberDetail.stats.longest_live && (
                                    <div>
                                      <span className="text-default-500">Longest Live:</span>
                                      <p className="font-mono">{formatDuration(selectedMemberDetail.stats.longest_live.duration)}</p>
                                    </div>
                                  )}
                                  {selectedMemberDetail.stats.last_live && (
                                    <div>
                                      <span className="text-default-500">Last Live:</span>
                                      <p className="text-xs">{formatDate(selectedMemberDetail.stats.last_live.date.start)}</p>
                                    </div>
                                  )}
                                </div>
                              </CardBody>
                            </Card>
                          </div>
                        )}
                      </Tab>

                      <Tab key="theater" title="Theater">
                        <div className="space-y-4">
                          {selectedMemberDetail.upcomingTheater && selectedMemberDetail.upcomingTheater.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 text-primary">Upcoming Shows</h4>
                              <div className="space-y-2">
                                {selectedMemberDetail.upcomingTheater.map((show) => (
                                  <Card key={show.id} className="p-3">
                                    <div className="flex gap-3">
                                      <Image
                                        src={show.poster}
                                        alt={show.name}
                                        width={60}
                                        height={60}
                                        className="rounded object-cover"
                                      />
                                      <div className="flex-1">
                                        <h5 className="font-medium text-sm">{show.name}</h5>
                                        <p className="text-xs text-default-500">{formatDate(show.date)}</p>
                                        <Button
                                          as={Link}
                                          href={show.url}
                                          isExternal
                                          size="sm"
                                          variant="flat"
                                          className="mt-1"
                                        >
                                          View Details
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedMemberDetail.recentTheater && selectedMemberDetail.recentTheater.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">Recent Shows</h4>
                              <div className="space-y-2">
                                {selectedMemberDetail.recentTheater.slice(0, 3).map((show) => (
                                  <Card key={show.id} className="p-3">
                                    <div className="flex gap-3">
                                      <Image
                                        src={show.poster}
                                        alt={show.name}
                                        width={50}
                                        height={50}
                                        className="rounded object-cover"
                                      />
                                      <div className="flex-1">
                                        <h5 className="font-medium text-sm">{show.name}</h5>
                                        <p className="text-xs text-default-500">{formatDate(show.date)}</p>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-default-500">Failed to load member details. Please try again.</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
