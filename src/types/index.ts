// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Content types
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  status: ContentStatus;
  platforms: ContentPlatform[];
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  assets?: ContentAsset[];
  schedule?: Schedule;
  analytics?: ContentAnalytics;
}

export type ContentType = 'post' | 'article' | 'image' | 'video' | 'story' | 'reel';

export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface ContentAsset {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document';
  fileName: string;
  fileSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for videos
}

export interface ContentPlatform {
  id: string;
  name: string;
  platformId: string;
  platformSpecificData?: Record<string, any>;
}

// Schedule types
export interface Schedule {
  id: string;
  contentId: string;
  scheduledFor: string;
  timeZone: string;
  status: 'scheduled' | 'posted' | 'failed';
  platformIds: string[];
}

// Platform types
export interface Platform {
  id: string;
  name: string;
  type: PlatformType;
  connected: boolean;
  accountName?: string;
  accountId?: string;
  iconUrl?: string;
}

export type PlatformType = 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube';

// Analytics types
export interface ContentAnalytics {
  contentId: string;
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
  platformSpecific?: Record<string, any>;
}

export interface OverallAnalytics {
  totalContentCount: number;
  totalImpressions: number;
  totalEngagements: number;
  engagementRate: number;
  platformBreakdown: Record<string, PlatformAnalytics>;
  contentTypeBreakdown: Record<ContentType, number>;
  timePerformance: TimePerformanceData[];
}

export interface PlatformAnalytics {
  platform: string;
  contentCount: number;
  impressions: number;
  engagements: number;
  engagementRate: number;
}

export interface TimePerformanceData {
  date: string;
  impressions: number;
  engagements: number;
  posts: number;
}

// Generic state interfaces for common patterns
export interface ListState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface DetailState<T> {
  item: T | null;
  loading: boolean;
  error: string | null;
}

export interface FormState {
  submitting: boolean;
  error: string | null;
  success: boolean;
}