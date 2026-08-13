import { supabase } from "@/lib/supabase";
import { ConfiguratorClient } from "./ConfiguratorClient";

export async function Configurator() {
  const { data: prices, error } = await supabase
    .from("configurator_prices")
    .select("item_key, label, price");

  if (error) {
    console.warn("Failed to load configurator_prices", error);
  }

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ConfiguratorClient 
          prices={prices || []} 
        />
      </div>
    </section>
  );
}
