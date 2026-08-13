import { Services as ServicesComponent } from "@/components/home/Services";

export const metadata = {
  title: "Naše služby | NANOfusion",
  description: "Nabízíme profesionální služby od čištění střech, fasád, dlažeb až po průmyslové čištění a nano-ochranu.",
};

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-12">
      <ServicesComponent />
    </main>
  );
}
