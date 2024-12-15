import React from 'react'
import DashboardSkeleton from '@/app/ui/skeletons';
type Props = {}

function Loading({}: Props) {
  return (
    <DashboardSkeleton />
  )
}

export default Loading