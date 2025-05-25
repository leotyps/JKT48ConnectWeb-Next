"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link, Skeleton, Breadcrumbs, BreadcrumbItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Chip, Avatar } from "@heroui/react";

interface TheaterShow {
  id: string;
  title: string;
  banner: string;
  poster: string;
  member_count: number;
  url: string;
  date: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  label: string;
  url: string;
}

interface TheaterMember {
  id: string;
  name: string;
  img: string;
  url_key: string;
}

interface TheaterSetlist {
  _id: string;
  id: string;
  description: string;
  poster: string;
  title: string;
  title_alt: string;
  banner: string;
}

interface TheaterTeam {
  id: string;
  img: string;
}

interface TheaterDetailShow {
  id: string;
  title: string;
  url: string;
  setlist: TheaterSetlist;
  members: TheaterMember[];
  seitansai: any[];
  graduation: any[];
  date: string;
  team: TheaterTeam;
  idnTheater: {
    image: string;
    price: number;
    slug: string;
    start_at: number;
    title: string;
    username: string;
    uuid: string;
  };
}

interface TheaterDetail {
  author: string;
  shows: TheaterDetailShow[];
  date: string;
}

export default function JKT48Schedule() {
  const [theaterData, setTheaterData] = useState<TheaterShow[]>([]);
  const [eventsData, setEventsData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>("");
  const [theaterDetail, setTheaterDetail] = useState<TheaterDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    async function fetchScheduleData() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        
        // Fetch theater shows
        const theaterResponse = await jkt48Api.theater(apiKey);
        
        // Get current date at the start of the day (midnight)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        // Filter shows that haven't happened yet
        const upcomingShows = theaterResponse.theater.filter((show: TheaterShow) => {
          const showDate = new Date(show.date);
          return showDate >= currentDate;
        });
        
        // Sort upcoming shows by date (nearest first)
        const sortedShows = [...upcomingShows].sort((a: TheaterShow, b: TheaterShow) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        
        setTheaterData(sortedShows.slice(0, 8)); // Show up to 8 upcoming shows
        
        // Fetch events
        const events = await jkt48Api.events(apiKey);
        
        // Filter upcoming events
        const upcomingEvents = events.filter((event: EventItem) => {
          const eventDate = new Date(event.date);
          return eventDate >= currentDate;
        });
        
        // Sort upcoming events by date
        const sortedEvents = [...upcomingEvents].sort((a: EventItem, b: EventItem) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        
        setEventsData(sortedEvents.slice(0, 8)); // Show up to 8 upcoming events
        
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScheduleData();
  }, []);

  const handleTheaterClick = async (theaterId: string) => {
    setSelectedTheaterId(theaterId);
    setLoadingDetail(true);
    onOpen();
    
    try {
      const jkt48Api = require('@jkt48/core');
      const apiKey = 'JKTCONNECT';
      const detail = await jkt48Api.theaterDetail(theaterId, apiKey);
      setTheaterDetail(detail);
    } catch (error) {
      console.error("Error fetching theater detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Format date to show day and time
  const formatShowDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderTheaterSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <div key={`theater-skeleton-${index}`} className="w-full">
        <Skeleton className="rounded-lg">
          <div className="h-64 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    ));
  };

  const renderEventsSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
     <Card key={`events-skeleton-${index}`} className="w-full h-[250px] flex flex-col">
        <div className="p-4 flex gap-3">
          <Skeleton className="rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-2 flex-1">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-4 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
        <Divider />
        <div className="p-4 flex-grow space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
        <Divider />
        <div className="p-4">
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    ));
  };

  const renderModalDetailSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="w-full rounded-lg">
          <div className="h-48 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-3/4 rounded-lg">
          <div className="h-6 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-20 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
      <div className="flex gap-2">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="rounded-full">
            <div className="h-12 w-12 rounded-full bg-default-200" />
          </Skeleton>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Schedule</BreadcrumbItem>
      </Breadcrumbs>

      {/* Theater Shows Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-left">Theater Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {loading ? (
            renderTheaterSkeletons()
          ) : theaterData.length > 0 ? (
            theaterData.map((show) => (
              <Card 
                key={show.id} 
                isFooterBlurred 
                className="border-none h-64 w-full cursor-pointer hover:scale-105 transition-transform" 
                radius="lg"
                isPressable
                onPress={() => handleTheaterClick(show.id)}
              >
                <Image
                  alt={`${show.title} show banner`}
                  className="object-cover w-full h-full z-0"
                  src={show.banner}
                />
                <CardFooter className="justify-between before:bg-black/60 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">{show.title}</p>
                    <p className="text-xs">{formatShowDate(show.date)}</p>
                  </div>
                  <Button
                    className="text-xs"
                    color="primary"
                    radius="lg"
                    size="sm"
                    variant="flat"
                    as="a" 
                    href={`https://jkt48.com/theater/schedule/id/${show.url}?lang=id`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">No upcoming theater shows available</p>
            </div>
          )}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-left">Other Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {loading ? (
            renderEventsSkeletons()
          ) : eventsData.length > 0 ? (
            eventsData.map((event) => (
              <Card key={event.id} className="w-full">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="JKT48 Event"
                    height={25}
                    radius="sm"
                    src={event.label}
                    width={55}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-semibold">Event</p>
                    <p className="text-small text-default-500">
                      {formatShowDate(event.date)}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="font-medium">{event.title}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link 
                    isExternal 
                    showAnchorIcon 
                    href={event.url}
                  >
                    View Details
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">No upcoming events available</p>
            </div>
          )}
        </div>
      </div>

      {/* Theater Detail Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {loadingDetail ? (
                  <Skeleton className="w-3/4 rounded-lg">
                    <div className="h-6 rounded-lg bg-default-200" />
                  </Skeleton>
                ) : (
                  theaterDetail?.shows?.[0]?.title || "Theater Details"
                )}
              </ModalHeader>
              <ModalBody>
                {loadingDetail ? (
                  renderModalDetailSkeleton()
                ) : theaterDetail?.shows?.[0] ? (
                  <div className="space-y-6">
                    {/* Setlist Banner */}
                    <div className="relative">
                      <Image
                        alt={theaterDetail.shows[0].setlist.title}
                        className="w-full h-64 object-cover rounded-lg"
                        src={theaterDetail.shows[0].setlist.banner}
                      />
                      <div className="absolute top-4 right-4">
                        <Chip
                          startContent={
                            <Image
                              alt="Team"
                              className="w-5 h-5"
                              src={`https://jkt48.com${theaterDetail.shows[0].team.img}`}
                            />
                          }
                          variant="solid"
                          color="primary"
                        >
                          {theaterDetail.shows[0].team.id.toUpperCase()}
                        </Chip>
                      </div>
                    </div>

                    {/* Show Information */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{theaterDetail.shows[0].setlist.title}</h3>
                        <p className="text-lg text-default-600 mb-4">
                          {formatShowDate(theaterDetail.shows[0].date)}
                        </p>
                      </div>

                      {/* Description */}
                      {theaterDetail.shows[0].setlist.description && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Description</h4>
                          <p className="text-default-700 leading-relaxed">
                            {theaterDetail.shows[0].setlist.description}
                          </p>
                        </div>
                      )}

                      {/* Members */}
                      {theaterDetail.shows[0].members && theaterDetail.shows[0].members.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-4">Performing Members</h4>
                          <div className="flex flex-wrap gap-4">
                            {theaterDetail.shows[0].members.map((member) => (
                              <div key={member.id} className="flex flex-col items-center space-y-2">
                                <Avatar
                                  src={member.img}
                                  alt={member.name}
                                  className="w-16 h-16"
                                />
                                <p className="text-sm font-medium text-center">{member.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Special Events */}
                      {(theaterDetail.shows[0].seitansai?.length > 0 || theaterDetail.shows[0].graduation?.length > 0) && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Special Events</h4>
                          <div className="flex gap-2">
                            {theaterDetail.shows[0].seitansai?.map((event, index) => (
                              <Chip key={`seitansai-${index}`} color="warning" variant="flat">
                                Birthday: {event.name}
                              </Chip>
                            ))}
                            {theaterDetail.shows[0].graduation?.map((event, index) => (
                              <Chip key={`graduation-${index}`} color="danger" variant="flat">
                                Graduation: {event.name}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* IDN Theater Info */}
                      {theaterDetail.shows[0].idnTheater && (
                        <div className="bg-default-100 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold mb-2">Ticket Information</h4>
                          <div className="flex items-center gap-4">
                            <Image
                              src={theaterDetail.shows[0].idnTheater.image}
                              alt="IDN Theater"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{theaterDetail.shows[0].idnTheater.title}</p>
                              <p className="text-success-600 font-bold">
                                Rp {theaterDetail.shows[0].idnTheater.price?.toLocaleString('id-ID')}
                              </p>
                              <p className="text-sm text-default-500">
                                via {theaterDetail.shows[0].idnTheater.username}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-default-500">Failed to load theater details</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {theaterDetail?.shows?.[0] && (
                  <Button 
                    color="primary" 
                    as={Link}
                    href={theaterDetail.shows[0].url}
                    isExternal
                    showAnchorIcon
                  >
                    View on JKT48.com
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
