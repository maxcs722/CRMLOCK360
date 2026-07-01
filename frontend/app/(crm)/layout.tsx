import { ReactNode } from "react";

import { MainLayout } from "@/components/layout/MainLayout";

interface Props {
  children: ReactNode;
}

export default function CRMLayout({
  children,
}: Props) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}