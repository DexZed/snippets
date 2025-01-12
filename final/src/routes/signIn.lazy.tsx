import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/signIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/signIn"!</div>
}
