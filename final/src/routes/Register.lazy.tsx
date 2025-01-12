import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/Register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Register"!</div>
}
