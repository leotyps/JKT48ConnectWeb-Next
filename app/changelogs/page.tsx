// src/app/changelogs/page.tsx
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Breadcrumbs,
  BreadcrumbItem,
  Chip,
  Input,
  Select,
  SelectItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { Calendar, Tag, User, Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";

// Import the JKT48 core module
const jkt48Api = require('@jkt48/core');

interface Changelog {
  id: string;
  version: string;
  title: string;
  description: string;
  date: string;
  type: "major" | "minor" | "patch" | "hotfix";
  changes: {
    type: "added" | "changed" | "deprecated" | "removed" | "fixed" | "security";
    description: string;
  }[];
  author: string;
  badges: string[];
  image?: string;
  published: boolean;
}

// API response type - this represents what comes from the server
interface ApiChangelog {
  id: string;
  version: string;
  title: string;
  description: string;
  date: string;
  type: "major" | "minor" | "patch" | "hotfix";
  changes: {
    type: "added" | "changed" | "deprecated" | "removed" | "fixed" | "security";
    description: string;
  }[];
  author: string;
  badges: string | string[]; // Could be either string (JSON) or array
  image?: string;
  published: boolean;
}

const CHANGE_TYPES = {
  added: { label: "Added", color: "success", icon: "✨" },
  changed: { label: "Changed", color: "primary", icon: "🔄" },
  deprecated: { label: "Deprecated", color: "warning", icon: "⚠️" },
  removed: { label: "Removed", color: "danger", icon: "🗑️" },
  fixed: { label: "Fixed", color: "secondary", icon: "🐛" },
  security: { label: "Security", color: "danger", icon: "🔒" },
} as const;

const VERSION_TYPES = {
  major: { label: "Major", color: "danger" },
  minor: { label: "Minor", color: "primary" },
  patch: { label: "Patch", color: "success" },
  hotfix: { label: "Hotfix", color: "warning" }
} as const;

const ChangelogsPage = () => {
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [filteredChangelogs, setFilteredChangelogs] = useState<Changelog[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUnpublished, setShowUnpublished] = useState(false);

  // Form states for admin
  const [editingLog, setEditingLog] = useState<Changelog | null>(null);
  const [formData, setFormData] = useState<Partial<Changelog>>({
    version: "",
    title: "",
    description: "",
    type: "patch",
    author: "",
    badges: [],
    image: "",
    published: false,
    changes: [],
  });
  const [newChange, setNewChange] = useState<{
    type: "added" | "changed" | "deprecated" | "removed" | "fixed" | "security";
    description: string;
  }>({ type: "added", description: "" });
  const [newBadge, setNewBadge] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  // Modal states
  const { isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState<string>("");

  // Helper function to safely parse badges
  const parseBadges = (badges: string | string[] | undefined): string[] => {
    if (!badges) return [];
    if (Array.isArray(badges)) return badges;
    if (typeof badges === 'string') {
      try {
        const parsed = JSON.parse(badges);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If JSON parsing fails, treat as a single badge
        return [badges];
      }
    }
    return [];
  };

  // Helper function to transform API data to client format
  const transformApiData = (apiData: ApiChangelog[]): Changelog[] => {
    return apiData.map((item) => ({
      ...item,
      badges: parseBadges(item.badges),
      image: item.image || "",
      published: item.published,
      changes: item.changes.map((change) => ({
        type: change.type,
        description: change.description,
      })),
    }));
  };

  // Check admin status from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsAdmin(urlParams.get("admin") === "true");
  }, []);

  // Fetch changelogs using @jkt48/core
  const fetchChangelogs = async () => {
    setLoading(true);
    try {
      const response = await jkt48Api.database.getChangelogs();
      if (response.status && response.data) {
        const transformedData = transformApiData(response.data);
        setChangelogs(transformedData);
        setFilteredChangelogs(transformedData);
      } else {
        throw new Error('Invalid data received');
      }
    } catch (error) {
      console.error("Error fetching changelogs:", error);
      alert("Failed to fetch changelogs. Please check your network connection and try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChangelogs();
  }, []);

  // Filter changelogs
  useEffect(() => {
    let filtered = changelogs.filter((log) => {
      if (!showUnpublished && !log.published && !isAdmin) return false;

      const matchesSearch = searchTerm === "" ||
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "all" || log.type === filterType;

      return matchesSearch && matchesType;
    });

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredChangelogs(filtered);
  }, [changelogs, searchTerm, filterType, showUnpublished, isAdmin]);

  // Handle form submission using @jkt48/core
  const handleSubmit = async () => {
  if (!formData.version || !formData.title || !formData.description) {
    alert("Please fill in all required fields");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("version", formData.version || "");
  formDataToSend.append("title", formData.title || "");
  formDataToSend.append("description", formData.description || "");
  formDataToSend.append("type", formData.type || "patch");
  formDataToSend.append("author", formData.author || "");
  formDataToSend.append("badges", JSON.stringify(formData.badges || []));
  formDataToSend.append("published", JSON.stringify(formData.published || false));
  formDataToSend.append("changes", JSON.stringify(formData.changes || []));

  if (imageFile) {
    formDataToSend.append("image", imageFile);
  }

  try {
    const response = await axios.post('https://v2.jkt48connect.my.id/api/database/create-changelog', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'username': process.env.REACT_APP_USERNAME,
        'password': process.env.REACT_APP_PASSWORD,
        'apikey': process.env.REACT_APP_APIKEY
      }
    });

    if (response.status === 201) {
      alert("Changelog created/updated successfully");
      resetForm();
      onFormOpenChange();
      fetchChangelogs();
    } else {
      alert(`Failed to create/update changelog: ${response.data.message}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting form:", error.message);
      alert(`Error submitting form: ${error.message}`);
    } else if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        alert(`Error submitting form: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        alert("No response received from server. Please check your network connection.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Error submitting form: ${error.message}`);
      }
    } else {
      console.error("Unknown error:", error);
      alert("An unknown error occurred. Please try again.");
    }
  }
};
  // Reset form
  const resetForm = () => {
    setFormData({
      version: "",
      title: "",
      description: "",
      type: "patch",
      author: "",
      badges: [],
      image: "",
      published: false,
      changes: [],
    });
    setEditingLog(null);
    setNewChange({ type: "added", description: "" });
    setNewBadge("");
    setImageFile(null);
    setImagePreview("");
    setImageLoadError(false);
  };

  // Handle edit
  const handleEdit = (changelog: Changelog) => {
    setEditingLog(changelog);
    setFormData(changelog);
    setImagePreview(changelog.image || "");
    setImageLoadError(false);
    onFormOpen();
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setDeleteTarget(id);
    onDeleteOpen();
  };

  // Confirm delete using @jkt48/core
  const confirmDelete = async () => {
    try {
      const response = await jkt48Api.database.deleteChangelog(deleteTarget);
      if (response.status || response.success) {
        alert("Changelog deleted successfully");
        await fetchChangelogs();
      } else {
        alert("Failed to delete changelog");
      }
    } catch (error) {
      console.error("Error deleting changelog:", error);
      alert("Error deleting changelog");
    }
    onDeleteOpenChange();
    setDeleteTarget("");
  };

  // Add change to form
  const addChange = () => {
    if (!newChange.description.trim()) return;

    setFormData((prev) => ({
      ...prev,
      changes: [...(prev.changes || []), newChange],
    }));
    setNewChange({ type: "added", description: "" });
  };

  // Remove change from form
  const removeChange = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      changes: prev.changes?.filter((_, i) => i !== index) || [],
    }));
  };

  // Add badge to form
  const addBadge = () => {
    if (!newBadge.trim()) return;

    setFormData((prev) => ({
      ...prev,
      badges: [...(prev.badges || []), newBadge.trim()],
    }));
    setNewBadge("");
  };

  // Remove badge from form
  const removeBadge = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      badges: prev.badges?.filter((_, i) => i !== index) || [],
    }));
  };

  // Toggle published status using @jkt48/core
  const togglePublished = async (id: string) => {
    try {
      const currentLog = changelogs.find((log) => log.id === id);
      if (!currentLog) return;

      const response = await jkt48Api.database.updateChangelog(id, {
        published: !currentLog.published,
      });
      
      if (response.status || response.success) {
        alert("Published status updated successfully");
        await fetchChangelogs();
      } else {
        alert("Failed to update published status");
      }
    } catch (error) {
      console.error("Error toggling published status:", error);
      alert("Error toggling published status");
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
        setImageLoadError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
    setImageLoadError(false);
  };

  // Handle image load error
  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-6xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Changelogs</BreadcrumbItem>
        </Breadcrumbs>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            JKT48Connect Changelogs
            {isAdmin && <Chip color="danger" className="ml-2">Admin Mode</Chip>}
          </h1>
          <p className="text-lg text-default-600">
            Stay updated with the latest changes, improvements, and new features
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search changelogs..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="flex-1"
            startContent={<Tag className="w-4 h-4" />}
          />

          <Select
            placeholder="Filter by type"
            selectedKeys={filterType === "all" ? [] : [filterType]}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;
              setFilterType(key || "all");
            }}
            className="min-w-48"
          >
            <SelectItem key="all">All Types</SelectItem>
            <SelectItem key="major">Major</SelectItem>
            <SelectItem key="minor">Minor</SelectItem>
            <SelectItem key="patch">Patch</SelectItem>
            <SelectItem key="hotfix">Hotfix</SelectItem>
          </Select>

          {isAdmin && (
            <>
              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={() => {
                  resetForm();
                  onFormOpen();
                }}
              >
                Add Changelog
              </Button>

              <Button
                color={showUnpublished ? "warning" : "default"}
                variant={showUnpublished ? "solid" : "bordered"}
                startContent={showUnpublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                onPress={() => setShowUnpublished(!showUnpublished)}
              >
                {showUnpublished ? "Hide" : "Show"} Unpublished
              </Button>
            </>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-default-500">Loading changelogs...</p>
            </CardBody>
          </Card>
        )}

        {/* Changelogs List */}
        {!loading && (
          <div className="space-y-6">
            {filteredChangelogs.map((changelog) => (
              <Card key={changelog.id} className={`${!changelog.published ? "opacity-60 border-dashed" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Chip
                          color={VERSION_TYPES[changelog.type].color as "danger" | "primary" | "success" | "warning"}
                          variant="flat"
                          size="sm"
                        >
                          v{changelog.version}
                        </Chip>
                        <Chip
                          color={VERSION_TYPES[changelog.type].color as "danger" | "primary" | "success" | "warning"}
                          size="sm"
                        >
                          {VERSION_TYPES[changelog.type].label}
                        </Chip>
                        {!changelog.published && (
                          <Chip color="warning" size="sm">
                            Draft
                          </Chip>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{changelog.title}</h3>
                      <p className="text-default-600 text-sm mb-2">{changelog.description}</p>

                      <div className="flex items-center gap-4 text-sm text-default-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(changelog.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {changelog.author}
                        </div>
                      </div>

                      {changelog.badges && changelog.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {changelog.badges.map((badge, index) => (
                            <Chip key={index} size="sm" variant="bordered">
                              {badge}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </div>

                    {isAdmin && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="light"
                          color={changelog.published ? "warning" : "success"}
                          onPress={() => togglePublished(changelog.id)}
                        >
                          {changelog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          color="primary"
                          onPress={() => handleEdit(changelog)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleDelete(changelog.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  {changelog.image && (
                    <div className="w-full max-w-md mx-auto mb-4">
                      <Image
                        src={changelog.image}
                        alt={`${changelog.title} preview`}
                        className="w-full rounded-lg"
                        onError={handleImageError}
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    {changelog.changes.map((change, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Chip
                          size="sm"
                          color={CHANGE_TYPES[change.type].color as "success" | "primary" | "warning" | "danger" | "secondary"}
                          variant="flat"
                          className="mt-0.5"
                        >
                          {CHANGE_TYPES[change.type].icon} {CHANGE_TYPES[change.type].label}
                        </Chip>
                        <p className="text-sm flex-1">{change.description}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}

            {filteredChangelogs.length === 0 && (
              <Card>
                <CardBody className="text-center py-12">
                  <p className="text-default-500">No changelogs found matching your criteria.</p>
                </CardBody>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Admin Form Modal */}
      {isAdmin && (
        <Modal
          isOpen={isFormOpen}
          onOpenChange={onFormOpenChange}
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader>
              <h3 className="text-lg font-bold">
                {editingLog ? "Edit Changelog" : "Add New Changelog"}
              </h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    isRequired
                    label="Version"
                    placeholder="e.g., 2.1.0"
                    value={formData.version || ""}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, version: value }))}
                  />
                  <Select
                    isRequired
                    label="Type"
                    selectedKeys={formData.type ? [formData.type] : []}
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys)[0] as Changelog["type"];
                      setFormData((prev) => ({ ...prev, type: key }));
                    }}
                  >
                    <SelectItem key="major">Major</SelectItem>
                    <SelectItem key="minor">Minor</SelectItem>
                    <SelectItem key="patch">Patch</SelectItem>
                    <SelectItem key="hotfix">Hotfix</SelectItem>
                  </Select>
                </div>

                <Input
                  isRequired
                  label="Title"
                  placeholder="Brief title for this release"
                  value={formData.title || ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
                />

                <Textarea
                  isRequired
                  label="Description"
                  placeholder="Detailed description of this release"
                  value={formData.description || ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Author"
                    placeholder="Author name"
                    value={formData.author || ""}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, author: value }))}
                  />
                  <Input
                    label="Image URL"
                    placeholder="Optional image URL"
                    value={formData.image || ""}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, image: value }));
                      setImagePreview(value);
                      setImageLoadError(false);
                    }}
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Image</label>
                  <div className="space-y-3">
                    {/* Image Upload Button */}
                    <div className="flex gap-2">
                      <Button
                        color="primary"
                        variant="bordered"
                        startContent={<Upload className="w-4 h-4" />}
                        onPress={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => handleImageUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
                          input.click();
                        }}
                      >
                        Upload Image
                      </Button>
                      {(imagePreview || formData.image) && (
                        <Button
                          color="danger"
                          variant="light"
                          startContent={<X className="w-4 h-4" />}
                          onPress={removeImage}
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    {/* Image Preview */}
                    {(imagePreview || formData.image) && (
                      <div className="border rounded-lg p-4 bg-default-50">
                        {!imageLoadError ? (
                          <Image
                            src={imagePreview || formData.image}
                            alt="Image preview"
                            className="w-full max-w-sm mx-auto rounded-lg"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-full max-w-sm mx-auto h-48 bg-default-200 rounded-lg flex items-center justify-center">
                            <p className="text-default-500">Failed to load image</p>
                          </div>
                        )}
                        <p className="text-xs text-default-500 mt-2 text-center">
                          Image preview • Max size: 5MB
                        </p>
                      </div>
                    )}

                    {/* Upload Guidelines */}
                    <div className="text-xs text-default-500">
                      <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                      <p>• Maximum file size: 5MB</p>
                      <p>• Recommended dimensions: 400x200px or similar aspect ratio</p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Badges</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add badge"
                      value={newBadge}
                      onValueChange={setNewBadge}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addBadge();
                        }
                      }}
                    />
                    <Button size="sm" color="primary" onPress={addBadge}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.badges?.map((badge, index) => (
                      <Chip
                        key={index}
                        size="sm"
                        variant="flat"
                        onClose={() => removeBadge(index)}
                      >
                        {badge}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Changes */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Changes</label>
                  <div className="flex gap-2 mb-4">
                    <Select
                      placeholder="Change type"
                      selectedKeys={[newChange.type]}
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as "added" | "changed" | "deprecated" | "removed" | "fixed" | "security";
                        setNewChange((prev) => ({ ...prev, type: key }));
                      }}
                      className="w-40"
                    >
                      <SelectItem key="added">Added</SelectItem>
                      <SelectItem key="changed">Changed</SelectItem>
                      <SelectItem key="deprecated">Deprecated</SelectItem>
                      <SelectItem key="removed">Removed</SelectItem>
                      <SelectItem key="fixed">Fixed</SelectItem>
                      <SelectItem key="security">Security</SelectItem>
                    </Select>
                    <Input
                      placeholder="Change description"
                      value={newChange.description}
                      onValueChange={(value) => setNewChange((prev) => ({ ...prev, description: value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addChange();
                        }
                      }}
                    />
                    <Button size="sm" color="primary" onPress={addChange}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.changes?.map((change, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-default-50 rounded">
                        <Chip
                          size="sm"
                          color={CHANGE_TYPES[change.type].color}
                          variant="flat"
                          className="mt-0.5"
                        >
                          {CHANGE_TYPES[change.type].icon} {CHANGE_TYPES[change.type].label}
                        </Chip>
                        <span className="flex-1 text-sm">{change.description}</span>
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          isIconOnly
                          onPress={() => removeChange(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published toggle */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Status:</label>
                  <Button
                    size="sm"
                    color={formData.published ? "success" : "default"}
                    variant={formData.published ? "solid" : "bordered"}
                    onPress={() => setFormData((prev) => ({ ...prev, published: !prev.published }))}
                  >
                    {formData.published ? "Published" : "Draft"}
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onFormOpenChange}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {editingLog ? "Update" : "Create"} Changelog
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isAdmin && (
        <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
          <ModalContent>
            <ModalHeader>
              <h3 className="text-lg font-bold">Confirm Delete</h3>
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this changelog? This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onDeleteOpenChange}>
                Cancel
              </Button>
              <Button color="danger" onPress={confirmDelete}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </section>
  );
};

export default ChangelogsPage;

