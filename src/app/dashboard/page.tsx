'use client';

import DashboardLayout from '@/components/Layouts/DashboardLayout';
import NexusDashboard from '@/components/NexusDashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <NexusDashboard />
    </DashboardLayout>
  );
}
