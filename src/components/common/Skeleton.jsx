import React from 'react';

// Base skeleton element
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Skeleton for resume cards in dashboard
export const ResumeCardSkeleton = () => (
  <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
    <div className="aspect-[210/297] bg-gray-100 relative overflow-hidden">
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
    <div className="p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for dashboard grid
export const DashboardSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ResumeCardSkeleton key={i} />
    ))}
  </div>
);

// Skeleton for editor page
export const EditorSkeleton = () => (
  <div className="h-screen flex flex-col bg-transparent overflow-hidden">
    {/* Toolbar skeleton */}
    <div className="h-20 bg-white border-b border-gray-100 px-6 lg:px-12 flex items-center">
      <Skeleton className="h-8 w-24" />
    </div>
    {/* Editor area */}
    <div className="flex-1 flex overflow-hidden">
      {/* Left editor */}
      <div className="w-1/2 border-r border-gray-100 bg-white/50 p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
      {/* Right preview */}
      <div className="w-1/2 bg-gray-50/30 p-8 flex justify-center">
        <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg p-8">
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Text skeleton with multiple lines
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - (i % 3) * 15}%` }} />
    ))}
  </div>
);

// Circle skeleton for avatars
export const CircleSkeleton = ({ size = 40, className = '' }) => (
  <Skeleton className={`rounded-full ${className}`} style={{ width: size, height: size }} />
);

export default Skeleton;
