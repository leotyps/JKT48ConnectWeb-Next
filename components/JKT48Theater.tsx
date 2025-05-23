"use client"

import { useState, useEffect } from "react";
import { Card, CardFooter, Image, Button, Skeleton, Badge } from "@heroui/react";

interface TheaterShow {
  id: string;
  title: string;
  banner: string;
  poster: string;
  member_count: number;
  url: string;
  date: string;
}

interface TheaterResponse {
  author: string;
  theater: TheaterShow[];
  page: number;
  perpage: number;
  total_count: number;
}

export default function JKT48TheaterShows() {
  const [theaterData, setTheaterData] = useState<TheaterShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTheaterShows() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const response = await jkt48Api.theater(apiKey);
        
        // Get current date at the start of the day (midnight)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        // Filter shows that haven't happened yet
        const upcomingShows = response.theater.filter((show: TheaterShow) => {
          const showDate = new Date(show.date);
          return showDate >= currentDate;
        });
        
        // Sort upcoming shows by date (nearest first)
        const sortedShows = [...upcomingShows].sort((a: TheaterShow, b: TheaterShow) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        
        setTheaterData(sortedShows.slice(0, 5)); // Show up to 5 upcoming shows
      } catch (error) {
        console.error("Error fetching theater shows:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTheaterShows();
  }, []);

  // Function to determine show status based on date
  const getShowStatus = (showDate: string) => {
    const now = new Date();
    const showDateTime = new Date(showDate);
    const diffTime = showDateTime.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    // Check if it's the same day
    const isSameDay = 
      now.getDate() === showDateTime.getDate() &&
      now.getMonth() === showDateTime.getMonth() &&
      now.getFullYear() === showDateTime.getFullYear();
    
    if (diffTime < 0) {
      return { status: "Completed", color: "default" };
    } else if (isSameDay) {
      if (diffHours <= 3 && diffHours > 0) {
        return { status: "Akan Berlangsung", color: "warning" };
      } else if (diffHours <= 0) {
        return { status: "Berlangsung", color: "success" };
      } else {
        return { status: "Hari Ini", color: "primary" };
      }
    } else if (diffDays <= 1) {
      return { status: "Besok", color: "secondary" };
    } else {
      return { status: "Upcoming", color: "default" };
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

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="w-full">
        <Skeleton className="rounded-lg">
          <div className="h-64 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Theater Shows</h2>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          renderSkeletons()
        ) : theaterData.length > 0 ? (
          theaterData.map((show) => {
            const showStatus = getShowStatus(show.date);
            
            return (
              <Card 
                key={show.id} 
                isFooterBlurred 
                className="border-none h-64" 
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
    <p className="text-sm">{formatShowDate(show.date)}</p>
  </div>
  <Button
    className="text-sm"
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
            );
          })
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-lg">No upcoming theater shows available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
