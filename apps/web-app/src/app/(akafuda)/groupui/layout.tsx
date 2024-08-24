// app/(custom-layout)/dao-directory/layout.tsx
import Providers from '../../providers'

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}