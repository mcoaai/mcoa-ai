import StudentSidebarLayout from "@/components/layout/StudentSidebarLayout";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentSidebarLayout>{children}</StudentSidebarLayout>;
}
