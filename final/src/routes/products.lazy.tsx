import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products"!</div>
}
