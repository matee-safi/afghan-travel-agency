import Image from "next/image";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import AppointmentForm from "@/app/components/AppointmentForm";
import Footer from "@/app/components/Footer";

interface Item {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  processTime: string;
  price: number;
  image: string;
  requiredDocs: string[];
}

export default async function Product({ params }: { params: { id: string } }) {
  const { id } = params;
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);

  const item = { id: docSnap.id, ...docSnap.data() } as Item;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 container mx-auto py-28 px-4">
        <div className="flex justify-center">
          <Image
            loading="lazy"
            src={item.image}
            width={1000}
            height={1000}
            alt={item.name}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-col mt-8">
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-xl text-gray-500 mb-2">{item.headline}</p>
          <p className="mb-4">{item.description}</p>
          <p className="mb-2">
            <strong>Category:</strong> {item.category}
          </p>
          <p className="mb-2">
            <strong>Processing Time:</strong> {item.processTime}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${item.price.toFixed(2)}
          </p>
          <p className="mb-4">
            <strong>Required Documents:</strong> {item.requiredDocs.join(", ")}
          </p>

          <AppointmentForm itemId={item.id} />
        </div>
      </div>
      <Footer />
    </>
  );
}
