import MuseumSelector from "../components/MuseumSelector";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MuseumSelector />
      <section>{children}</section>
    </>
  );
}
