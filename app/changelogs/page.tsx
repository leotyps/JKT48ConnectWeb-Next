"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Image, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, Link, Input, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar, Divider, Tabs, Tab, Progress, Textarea, Badge } from "@heroui/react";
import { Calendar, Tag, User, Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";

interface Changelog {
  id: string;
  version: string;
  title: string;
  description: string;
  date: string;
  type: 'major' | 'minor' | 'patch' | 'hotfix';
  changes: {
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
    description: string;
  }[];
  author: string;
  badges?: string[];
  image?: string;
  published: boolean;
}

const CHANGE_TYPES = {
  added: { label: 'Added', color: 'success' as const, icon: '✨' },
  changed: { label: 'Changed', color: 'primary' as const, icon: '🔄' },
  deprecated: { label: 'Deprecated', color: 'warning' as const, icon: '⚠️' },
  removed: { label: 'Removed', color: 'danger' as const, icon: '🗑️' },
  fixed: { label: 'Fixed', color: 'secondary' as const, icon: '🐛' },
  security: { label: 'Security', color: 'danger' as const, icon: '🔒' }
};

const VERSION_TYPES = {
  major: { label: 'Major', color: 'danger' as const },
  minor: { label: 'Minor', color: 'primary' as const },
  patch: { label: 'Patch', color: 'success' as const },
  hotfix: { label: 'Hotfix', color: 'warning' as const }
};

// Sample changelog data
const SAMPLE_CHANGELOGS: Changelog[] = [
  {
    id: '1',
    version: '2.1.0',
    title: 'New Features and Improvements',
    description: 'Major update with new member features and performance improvements',
    date: '2025-06-10',
    type: 'minor',
    author: 'Development Team',
    badges: ['New Feature', 'Performance'],
    image: 'https://via.placeholder.com/400x200?text=Version+2.1.0',
    published: true,
    changes: [
      { type: 'added', description: 'New member profile API endpoint' },
      { type: 'added', description: 'Enhanced search functionality' },
      { type: 'changed', description: 'Improved response time by 40%' },
      { type: 'fixed', description: 'Fixed issue with member data caching' }
    ]
  },
  {
    id: '2',
    version: '2.0.1',
    title: 'Bug Fixes and Security Updates',
    description: 'Critical security patches and bug fixes',
    date: '2025-06-05',
    type: 'patch',
    author: 'Security Team',
    badges: ['Security', 'Bug Fix'],
    published: true,
    changes: [
      { type: 'security', description: 'Fixed authentication vulnerability' },
      { type: 'fixed', description: 'Resolved API key validation issues' },
      { type: 'fixed', description: 'Fixed memory leak in data processing' }
    ]
  },
  {
    id: '3',
    version: '2.0.0',
    title: 'Major Release - Complete Redesign',
    description: 'Complete overhaul of the API system with breaking changes',
    date: '2025-06-01',
    type: 'major',
    author: 'Development Team',
    badges: ['Breaking Change', 'Redesign'],
    image: 'https://via.placeholder.com/400x200?text=Version+2.0.0',
    published: true,
    changes: [
      { type: 'added', description: 'New REST API architecture' },
      { type: 'added', description: 'Real-time websocket support' },
      { type: 'changed', description: 'Updated authentication system' },
      { type: 'removed', description: 'Deprecated v1 endpoints' },
      { type: 'changed', description: 'New response format structure' }
    ]
  }
];

export default function JKT48Changelogs() {
  const [changelogs, setChangelogs] = useState<Changelog[]>(SAMPLE_CHANGELOGS);
  const [filteredChangelogs, setFilteredChangelogs] = useState<Changelog[]>(SAMPLE_CHANGELOGS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showUnpublished, setShowUnpublished] = useState(false);

  // Form states for admin
  const [editingLog, setEditingLog] = useState<Changelog | null>(null);
  const [formData, setFormData] = useState<Partial<Changelog>>({
    version: '',
    title: '',
    description: '',
    type: 'patch',
    author: '',
    badges: [],
    image: '',
    published: false,
    changes: []
  });
  const [newChange, setNewChange] = useState({ type: 'added' as const, description: '' });
  const [newBadge, setNewBadge] = useState('');

  // Modal states
  const {isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange} = useDisclosure();
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange} = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState<string>('');

  // Check admin status from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsAdmin(urlParams.get('admin') === 'true');
  }, []);

  // Filter changelogs
  useEffect(() => {
    let filtered = changelogs.filter(log => {
      if (!showUnpublished && !log.published && !isAdmin) return false;
      
      const matchesSearch = searchTerm === '' || 
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || log.type === filterType;
      
      return matchesSearch && matchesType;
    });

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredChangelogs(filtered);
  }, [changelogs, searchTerm, filterType, showUnpublished, isAdmin]);

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.version || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const changelog: Changelog = {
      id: editingLog ? editingLog.id : Date.now().toString(),
      version: formData.version!,
      title: formData.title!,
      description: formData.description!,
      date: editingLog ? editingLog.date : new Date().toISOString().split('T')[0],
      type: formData.type as Changelog['type'],
      author: formData.author || 'Admin',
      badges: formData.badges || [],
      image: formData.image,
      published: formData.published || false,
      changes: formData.changes || []
    };

    if (editingLog) {
      setChangelogs(prev => prev.map(log => log.id === editingLog.id ? changelog : log));
    } else {
      setChangelogs(prev => [changelog, ...prev]);
    }

    resetForm();
    onFormOpenChange();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      version: '',
      title: '',
      description: '',
      type: 'patch',
      author: '',
      badges: [],
      image: '',
      published: false,
      changes: []
    });
    setEditingLog(null);
    setNewChange({ type: 'added', description: '' });
    setNewBadge('');
  };

  // Handle edit
  const handleEdit = (changelog: Changelog) => {
    setEditingLog(changelog);
    setFormData(changelog);
    onFormOpen();
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setDeleteTarget(id);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    setChangelogs(prev => prev.filter(log => log.id !== deleteTarget));
    onDeleteOpenChange();
    setDeleteTarget('');
  };

  // Add change to form
  const addChange = () => {
    if (!newChange.description.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      changes: [...(prev.changes || []), newChange]
    }));
    setNewChange({ type: 'added', description: '' });
  };

  // Remove change from form
  const removeChange = (index: number) => {
    setFormData(prev => ({
      ...prev,
      changes: prev.changes?.filter((_, i) => i !== index) || []
    }));
  };

  // Add badge to form
  const addBadge = () => {
    if (!newBadge.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      badges: [...(prev.badges || []), newBadge.trim()]
    }));
    setNewBadge('');
  };

  // Remove badge from form
  const removeBadge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges?.filter((_, i) => i !== index) || []
    }));
  };

  // Toggle published status
  const togglePublished = (id: string) => {
    setChangelogs(prev => prev.map(log => 
      log.id === id ? { ...log, published: !log.published } : log
    ));
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
            {isAdmin && <Badge color="danger" className="ml-2">Admin Mode</Badge>}
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
            selectedKeys={filterType === 'all' ? [] : [filterType]}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;
              setFilterType(key || 'all');
            }}
            className="min-w-48"
          >
            <Select>
  <SelectItem key="all">All Types</SelectItem>
  <>
    {Object.entries(VERSION_TYPES).map(([key, type]) => (
      <SelectItem key={key}>{type.label}</SelectItem>
    ))}
  </>
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
                {showUnpublished ? 'Hide' : 'Show'} Unpublished
              </Button>
            </>
          )}
        </div>

        {/* Changelogs List */}
        <div className="space-y-6">
          {filteredChangelogs.map((changelog) => (
            <Card key={changelog.id} className={`${!changelog.published ? 'opacity-60 border-dashed' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Chip 
                        color={VERSION_TYPES[changelog.type].color} 
                        variant="flat" 
                        size="sm"
                      >
                        v{changelog.version}
                      </Chip>
                      <Chip color={VERSION_TYPES[changelog.type].color} size="sm">
                        {VERSION_TYPES[changelog.type].label}
                      </Chip>
                      {!changelog.published && (
                        <Chip color="warning" size="sm">Draft</Chip>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{changelog.title}</h3>
                    <p className="text-default-600 text-sm mb-2">{changelog.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-default-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(changelog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
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
                  <Image
                    src={changelog.image}
                    alt={`${changelog.title} preview`}
                    className="w-full max-w-md mx-auto mb-4 rounded-lg"
                  />
                )}

                <div className="space-y-3">
                  {changelog.changes.map((change, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Chip
                        size="sm"
                        color={CHANGE_TYPES[change.type].color}
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
                {editingLog ? 'Edit Changelog' : 'Add New Changelog'}
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
                    value={formData.version || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, version: value }))}
                  />
                  <Select
                    isRequired
                    label="Type"
                    selectedKeys={formData.type ? [formData.type] : []}
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys)[0] as Changelog['type'];
                      setFormData(prev => ({ ...prev, type: key }));
                    }}
                  >
                    {Object.entries(VERSION_TYPES).map(([key, type]) => (
                      <SelectItem key={key}>{type.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                <Input
                  isRequired
                  label="Title"
                  placeholder="Brief title for this release"
                  value={formData.title || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                />

                <Textarea
                  isRequired
                  label="Description"
                  placeholder="Detailed description of this release"
                  value={formData.description || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Author"
                    placeholder="Author name"
                    value={formData.author || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, author: value }))}
                  />
                  <Input
                    label="Image URL"
                    placeholder="Optional image URL"
                    value={formData.image || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
                  />
                </div>

                {/* Badges */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Badges</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add badge"
                      value={newBadge}
                      onValueChange={setNewBadge}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
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
                        const key = Array.from(keys)[0] as keyof typeof CHANGE_TYPES;
                        setNewChange(prev => ({ ...prev, type: key }));
                      }}
                      className="w-40"
                    >
                      {Object.entries(CHANGE_TYPES).map(([key, type]) => (
                        <SelectItem key={key}>{type.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      placeholder="Change description"
                      value={newChange.description}
                      onValueChange={(value) => setNewChange(prev => ({ ...prev, description: value }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
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
                        <Chip size="sm" color={CHANGE_TYPES[change.type].color} variant="flat">
                          {CHANGE_TYPES[change.type].label}
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
                    onPress={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
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
                {editingLog ? 'Update' : 'Create'} Changelog
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
}
