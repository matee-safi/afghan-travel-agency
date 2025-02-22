import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase"; // Using your existing Firestore instance
import Image from "next/image";

type Item = {
  id: string;
  name: string;
  headline: string;
  image: string;
};

async function getPopularItems() {
  // Fetch all appointments
  const appointmentsSnapshot = await getDocs(collection(db, "appointments"));
  const appointmentsCounts: Record<string, number> = {};

  appointmentsSnapshot.forEach((doc) => {
    const data = doc.data();
    const itemId = data.itemId;
    if (itemId) {
      appointmentsCounts[itemId] = (appointmentsCounts[itemId] || 0) + 1;
    }
  });

  // Get top 3 items based on the highest appointment count
  const topItemIds = Object.entries(appointmentsCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([itemId]) => itemId);

  // Fetch items collection
  const itemsSnapshot = await getDocs(query(collection(db, "items")));
  const items: Item[] = [];

  itemsSnapshot.forEach((doc) => {
    if (topItemIds.includes(doc.id)) {
      items.push({ id: doc.id, ...(doc.data() as Omit<Item, "id">) });
    }
  });

  return items.sort(
    (a, b) => (appointmentsCounts[b.id] || 0) - (appointmentsCounts[a.id] || 0)
  );
}

export default async function Popular() {
  const items = await getPopularItems();

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="m-5 py-10 text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-red-900 to-red-500">
          Popular Packages
        </h1>
        {items.length === 0 ? (
          <p className="text-gray-400">No popular items found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-dark-800/50 backdrop-blur p-4 rounded-lg"
              >
                <h3 className="text-xl">{item.name}</h3>
                <div className="relative h-64 w-full mb-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-lg text-dark-500">{item.headline}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
