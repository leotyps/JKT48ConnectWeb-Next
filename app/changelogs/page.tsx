"use client"

import { useState, useEffect } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip, 
  Progress, 
  Divider, 
  Breadcrumbs, 
  BreadcrumbItem, 
  Alert,
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
  Input
} from "@heroui/react";

interface ChangeLogEntry {
  version: string;
  date: string;
  description: string;
  type: string;
  author: string;
  badgeUrl: string | null;
  changes: {
    title: string;
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
    description: string;
  }[];
}

interface FilterOptions {
  search: string;
  type: string;
}

export default function Changelog() {
  const [changelog, setChangelog] = useState<ChangeLogEntry[]>([
    {
      version: "2.3.0",
      date: "2025-06-05",
      description: "Major update with new features and improvements",
      type: "Feature Release",
      author: "John Doe",
      badgeUrl: "/images/new-feature-badge.png",
      changes: [
        {
          title: "New Dashboard Layout",
          type: "added",
          description: "Completely redesigned dashboard for better user experience"
        },
        {
          title: "Advanced Analytics",
          type: "added",
          description: "Added new analytics tools for tracking user behavior"
        },
        {
          title: "Performance Optimization",
          type: "changed",
          description: "Improved loading times by 40%"
        },
        {
          title: "Bug Fixes",
          type: "fixed",
          description: "Resolved several UI issues reported by users"
        }
      ]
    },
    {
      version: "2.2.1",
      date: "2025-05-18",
      description: "Patch release with critical fixes",
      type: "Patch Release",
      author: "Jane Smith",
      badgeUrl: "/images/patch-badge.png",
      changes: [
        {
          title: "Security Update",
          type: "security",
          description: "Fixed vulnerability in authentication system"
        },
        {
          title: "UI Fixes",
          type: "fixed",
          description: "Resolved display issues on mobile devices"
        }
      ]
    },
    {
      version: "2.2.0",
      date: "2025-05-01",
      description: "Minor feature release with new functionality",
      type: "Minor Release",
      author: "Alice Johnson",
      badgeUrl: "/images/minor-update-badge.png",
      changes: [
        {
          title: "New Export Options",
          type: "added",
          description: "Added support for exporting data in CSV and Excel formats"
        },
        {
          title: "Notification Preferences",
          type: "added",
          description: "Users can now customize their notification settings"
        },
        {
          title: "Improved Search",
          type: "changed",
          description: "Enhanced search functionality with better results"
        }
      ]
    }
  ]);
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: "",
    type: ""
  });

  const versionTypes = [
    "All",
    "Major Release",
    "Minor Release",
    "Patch Release",
    "Beta Release"
  ];

  const changeTypes = {
    added: "Added",
    changed: "Changed",
    deprecated: "Deprecated",
    removed: "Removed",
    fixed: "Fixed",
    security: "Security"
  };

  const filterChangeLogs = (logs: ChangeLogEntry[]) => {
    return logs.filter(log => {
      // Filter by search term
      const matchesSearch = 
        log.version.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        log.description.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        log.author.toLowerCase().includes(filterOptions.search.toLowerCase());
      
      // Filter by type
      const matchesType = filterOptions.type === "All" || log.type === filterOptions.type;
      
      return matchesSearch && matchesType;
    });
  };

  const filteredChangelog = filterChangeLogs(changelog);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Changelog</BreadcrumbItem>
        </Breadcrumbs>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JKT48Connect Changelog</h1>
          <p className="text-lg text-default-600">
            Track all updates, improvements, and changes to our platform
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-xl font-bold">Filter Changelog Entries</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Search"
                placeholder="Search versions, descriptions, or authors..."
                value={filterOptions.search}
                onValueChange={(value) => setFilterOptions({...filterOptions, search: value})}
                size="lg"
                variant="bordered"
              />
              
              <div>
                <label className="block text-default-600 mb-2">Release Type</label>
                <div className="flex gap-2 flex-wrap">
                  {versionTypes.map(type => (
                    <Chip 
                      key={type}
                      color={filterOptions.type === type || (type === "All" && filterOptions.type === "") ? "primary" : "default"}
                      variant="flat"
                      onClick={() => setFilterOptions({...filterOptions, type: type === "All" ? "" : type})}
                      className="cursor-pointer"
                    >
                      {type}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Changelog Entries */}
        {filteredChangelog.length > 0 ? (
          <div className="space-y-6">
            {filteredChangelog.map((entry, index) => (
              <Card key={entry.version}>
                <CardHeader>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h3 className="text-xl font-bold">{entry.version}</h3>
                      <p className="text-default-600 text-sm">{new Date(entry.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      {entry.badgeUrl && (
                        <img 
                          src={entry.badgeUrl} 
                          alt={`${entry.version} badge`} 
                          className="h-8 w-auto" 
                        />
                      )}
                      <Chip size="sm" variant="flat">
                        {entry.type}
                      </Chip>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <p className="text-default-500 text-sm">Description</p>
                      <p className="mt-1">{entry.description}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 text-sm">Author</p>
                      <p className="mt-1 font-medium">{entry.author}</p>
                    </div>
                    
                    <Divider />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Changes in this version</h4>
                      <Table>
                        <TableHeader>
                          <tr>
                            <th>Type</th>
                            <th>Change</th>
                            <th>Description</th>
                          </tr>
                        </TableHeader>
                        <TableBody>
                          {entry.changes.map((change, idx) => (
                            <TableRow key={idx}>
                              <td>
                                <Chip 
                                  color={
                                    change.type === "added" ? "success" : 
                                    change.type === "changed" ? "primary" :
                                    change.type === "deprecated" ? "warning" :
                                    change.type === "removed" ? "danger" :
                                    change.type === "fixed" ? "secondary" : 
                                    change.type === "security" ? "red" : "default"
                                  } 
                                  size="sm"
                                >
                                  {changeTypes[change.type]}
                                </Chip>
                              </td>
                              <td className="font-medium">{change.title}</td>
                              <td>{change.description}</td>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            
            {/* Pagination (if needed) */}
            <div className="flex justify-center mt-6">
              <div className="space-x-2">
                <Button variant="flat" size="sm">Previous</Button>
                <Button color="primary" size="sm">1</Button>
                <Button variant="flat" size="sm">2</Button>
                <Button variant="flat" size="sm">3</Button>
                <Button variant="flat" size="sm">Next</Button>
              </div>
            </div>
          </div>
        ) : (
          <Alert className="mb-6">
            <div>
              <h4 className="font-semibold">No Changelog Entries Found</h4>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          </Alert>
        )}

        {/* About Changelog */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="text-xl font-bold">About Our Changelog</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p>
                We maintain this changelog to keep our users informed about all updates, improvements, and changes to our platform. 
                Each entry contains detailed information about what was changed, who made the change, and why it was made.
              </p>
              
              <Divider />
              
              <div>
                <h4 className="font-semibold mb-2">Change Types</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(changeTypes).map(([type, label]) => (
                    <div key={type} className="p-3 border rounded-lg">
                      <Chip 
                        color={
                          type === "added" ? "success" : 
                          type === "changed" ? "primary" :
                          type === "deprecated" ? "warning" :
                          type === "removed" ? "danger" :
                          type === "fixed" ? "secondary" : 
                          type === "security" ? "red" : "default"
                        } 
                        size="sm"
                      >
                        {label}
                      </Chip>
                      <p className="text-sm mt-1">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
