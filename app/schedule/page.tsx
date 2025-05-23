"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link, Skeleton, Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";

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

export default function JKT48Schedule() {
  const [theaterData, setTheaterData] = useState<TheaterShow[]>([]);
  const [eventsData, setEventsData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

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
                className="border-none h-64 w-full" 
                radius="lg"
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
    </div>
  );
}
