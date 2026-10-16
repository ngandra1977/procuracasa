import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = { title: 'Gestão de imóveis | Procuracasa', robots: { index: false, follow: false } };
export default function ManagementLayout({ children }: { children: ReactNode }) { return children; }
