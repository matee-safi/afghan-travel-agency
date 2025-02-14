"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

type Product = {
  id: string;
  name: string;
  category: string;
  headline: string;
  processTime: string;
  price: number;
  image: string | File;
  requiredDocs: string;
  description: string;
};

type UserType = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
};

type AppointmentType = {
  id: string;
  name: string;
  email: string;
  itemId: string;
  phone: string;
  date: string;
};

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [user, loadingAuth] = useAuthState(auth);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  // Redirect if not admin
  useEffect(() => {
    if (!loadingAuth && (!user || user.email !== adminEmail)) {
      router.replace("/");
    }
  }, [loadingAuth, user, adminEmail, router]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersArr: UserType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserType[];
      setUsers(usersArr);
    });
    return () => unsubscribe();
  }, []);

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "users", icon: Users, label: "Users" },
    { id: "products", icon: ShoppingCart, label: "Products" },
    { id: "appointments", icon: CalendarDays, label: "Apppointments" },
  ];

  // Product management states
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Product>({
    id: "",
    name: "",
    category: "",
    headline: "",
    processTime: "",
    price: 0,
    image: "",
    requiredDocs: "",
    description: "",
  });
  const [unfilled, setUnfilled] = useState<string>("");

  const storage = getStorage();

  // Listen for product changes
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsArr: Product[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        itemsArr.push({
          id: docSnap.id,
          name: data.name,
          category: data.category,
          headline: data.headline,
          processTime: data.processTime,
          price: data.price,
          image: data.image,
          requiredDocs: data.requiredDocs,
          description: data.description,
        });
      });
      setProducts(itemsArr);
    });
    return () => unsubscribe();
  }, []);

  // Listen for user profiles (in "users" collection)
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersArr: UserType[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        usersArr.push({
          id: docSnap.id,
          email: data.email,
          name: data.name,
          createdAt: data.createdAt,
        });
      });
      setUsers(usersArr);
    });
    return () => unsubscribe();
  }, []);

  // Listen for appointments (in "appointments" collection)
  useEffect(() => {
    const q = query(collection(db, "appointments"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appointmentsArr: AppointmentType[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        appointmentsArr.push({
          id: docSnap.id,
          name: data.name,
          email: data.email,
          itemId: data.itemId,
          phone: data.phone,
          date: data.date,
        });
      });
      setAppointments(appointmentsArr);
    });
    return () => unsubscribe();
  });

  const addProduct = async () => {
    if (
      !productForm.name ||
      !productForm.category ||
      !productForm.headline ||
      !productForm.processTime ||
      !productForm.price ||
      !productForm.requiredDocs
    ) {
      setUnfilled("Please fill in all required fields.");
      setTimeout(() => setUnfilled(""), 5000);
      return;
    }
    // Upload image if file selected
    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    const imageFile = imageInput?.files?.[0];
    if (!imageFile) {
      setUnfilled("Please select an image.");
      setTimeout(() => setUnfilled(""), 5000);
      return;
    }
    try {
      const storageRef = ref(storage, "images/" + imageFile.name);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      const requiredDocsArray =
        productForm.requiredDocs.split(/[,\u060C\u060D]/);
      await addDoc(collection(db, "items"), {
        name: productForm.name,
        category: productForm.category.replaceAll(" ", ""),
        headline: productForm.headline,
        processTime: productForm.processTime,
        price: productForm.price,
        image: imageUrl,
        requiredDocs: requiredDocsArray,
        description: productForm.description,
      });
      toast.success("Product added successfully!");
      setProductForm({
        id: "",
        name: "",
        category: "",
        headline: "",
        processTime: "",
        price: 0,
        image: "",
        requiredDocs: "",
        description: "",
      });
      setIsAddingProduct(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const updateProduct = async () => {
    if (
      !productForm.name ||
      !productForm.category ||
      !productForm.headline ||
      !productForm.processTime ||
      !productForm.price ||
      !productForm.requiredDocs
    ) {
      setUnfilled("Please fill all the fields.");
      setTimeout(() => setUnfilled(""), 3000);
      return;
    }
    try {
      const requiredDocsArray =
        typeof productForm.requiredDocs === "string"
          ? productForm.requiredDocs.split(/[,\u060C\u060D]/)
          : productForm.requiredDocs;
      if (productForm.image instanceof File) {
        const storageRef = ref(storage, "images/" + productForm.image.name);
        await uploadBytes(storageRef, productForm.image);
        productForm.image = await getDownloadURL(storageRef);
      }
      const docRef = doc(db, "items", productForm.id);
      await updateDoc(docRef, {
        name: productForm.name,
        category: productForm.category.replaceAll(" ", ""),
        headline: productForm.headline,
        processTime: productForm.processTime,
        price: productForm.price,
        image: productForm.image,
        requiredDocs: requiredDocsArray,
        description: productForm.description,
      });
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      setProductForm({
        id: "",
        name: "",
        category: "",
        headline: "",
        processTime: "",
        price: 0,
        image: "",
        requiredDocs: "",
        description: "",
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "items", id));
      toast.success("Product deleted successfully!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Users",
                  value: String(users.length || 0),
                  change: `+${
                    ((users.length -
                      users.filter(
                        (user) =>
                          new Date(user.createdAt).toDateString() ===
                          new Date().toDateString()
                      ).length) /
                      users.length) *
                    100
                  }%`,
                },
                {
                  title: "Total Products",
                  value: String(products.length || 0),
                  change: "",
                },
                {
                  title: "Total appointments",
                  value: String(appointments.length || 0),
                  change: "",
                },
                {
                  title: "Today's Appointments",
                  value: appointments.filter(
                    (app) =>
                      new Date(app.date).toDateString() ===
                      new Date().toDateString()
                  ).length,
                  change: (() => {
                    const today = new Date().toDateString();
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toDateString();

                    const todayCount = appointments.filter(
                      (app) => new Date(app.date).toDateString() === today
                    ).length;

                    const yesterdayCount = appointments.filter(
                      (app) =>
                        new Date(app.date).toDateString() === yesterdayStr
                    ).length;

                    if (yesterdayCount === 0) {
                      return todayCount > 0 ? "+100%" : "0%";
                    }

                    const percentageChange = Math.round(
                      ((todayCount - yesterdayCount) / yesterdayCount) * 100
                    );

                    return `${
                      percentageChange > 0 ? "+" : ""
                    }${percentageChange}%`;
                  })(),
                },
              ].map((card, index) => (
                <div key={index} className="bg-dark-800 p-6 rounded-xl">
                  <h3 className="text-dark-400 text-sm">{card.title}</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-2xl font-bold">{card.value}</span>
                    <span
                      className={`text-sm ${
                        card.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {card.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-xl m-4">Today's Appointments</h1>
              <div className="bg-dark-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-700">
                      <tr>
                        <th className="text-left p-4">For</th>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Phone</th>
                        <th className="text-left p-4">Preferred Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments
                        .filter(
                          (appointment) =>
                            new Date(appointment.date).toDateString() ===
                            new Date().toDateString()
                        )
                        .map((appointment) => (
                          <tr
                            key={appointment.id}
                            className="border-t border-dark-700 hover:bg-dark-750"
                          >
                            <td className="p-4">
                              {(() => {
                                const prod = products.find(
                                  (prod) => prod.id === appointment.itemId
                                );
                                if (prod) {
                                  const capitalizedCategory =
                                    prod.category.charAt(0).toUpperCase() +
                                    prod.category.slice(1);
                                  return `${prod.name} (${capitalizedCategory})`;
                                }
                                return appointment.itemId;
                              })()}
                            </td>
                            <td className="p-4">{appointment.name}</td>
                            <td className="p-4">{appointment.email}</td>
                            <td className="p-4">{appointment.phone}</td>
                            <td className="p-4">{appointment.date}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl m-4">Latest Users</h3>
              <div className="bg-dark-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-700">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 5).map((user) => (
                        <tr
                          key={user.id}
                          className="border-t border-dark-700 hover:bg-dark-750"
                        >
                          <td className="p-4">{user.name || "-"}</td>
                          <td className="p-4">{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl m-4">Latest Products</h3>
              <div className="bg-dark-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-700">
                      <tr>
                        <th className="text-left p-4">Image</th>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Process Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map((prod) => (
                        <tr
                          key={prod.id}
                          className="border-t border-dark-700 hover:bg-dark-750"
                        >
                          <td className="p-4">
                            <img
                              src={
                                typeof prod.image === "string" ? prod.image : ""
                              }
                              alt={prod.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          </td>
                          <td className="p-4">
                            <div className="font-medium">{prod.name}</div>
                            <div className="text-sm text-dark-400">
                              {prod.headline}
                            </div>
                          </td>
                          <td className="p-4">{prod.category}</td>
                          <td className="p-4">{prod.price}</td>
                          <td className="p-4">{prod.processTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="bg-dark-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="text-left p-4">ID</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-dark-700 hover:bg-dark-750"
                      >
                        <td className="p-4">{user.id}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.name || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Products</h1>
              <button
                onClick={() => {
                  setIsAddingProduct(true);
                  setEditingProduct(null);
                  setProductForm({
                    id: "",
                    name: "",
                    category: "",
                    headline: "",
                    processTime: "",
                    price: 0,
                    image: "",
                    requiredDocs: "",
                    description: "",
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>
            <div className="bg-dark-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="text-left p-4">Image</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Process Time</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr
                        key={prod.id}
                        className="border-t border-dark-700 hover:bg-dark-750"
                      >
                        <td className="p-4">
                          <img
                            src={
                              typeof prod.image === "string" ? prod.image : ""
                            }
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{prod.name}</div>
                          <div className="text-sm text-dark-400">
                            {prod.headline}
                          </div>
                        </td>
                        <td className="p-4">{prod.category}</td>
                        <td className="p-4">{prod.price}</td>
                        <td className="p-4">{prod.processTime}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setProductForm(prod);
                                setIsAddingProduct(false);
                              }}
                              className="p-2 hover:bg-dark-700 rounded-lg text-blue-400 hover:text-blue-300"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-2 hover:bg-dark-700 rounded-lg text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "appointments":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
            <div className="bg-dark-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="text-left p-4">For</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Phone</th>
                      <th className="text-left p-4">Preferred Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-t border-dark-700 hover:bg-dark-750"
                      >
                        <td className="p-4">
                          {(() => {
                            const prod = products.find(
                              (prod) => prod.id === appointment.itemId
                            );
                            if (prod) {
                              const capitalizedCategory =
                                prod.category.charAt(0).toUpperCase() +
                                prod.category.slice(1);
                              return `${prod.name} (${capitalizedCategory})`;
                            }
                            return appointment.itemId;
                          })()}
                        </td>
                        <td className="p-4">{appointment.name}</td>
                        <td className="p-4">{appointment.email}</td>
                        <td className="p-4">{appointment.phone}</td>
                        <td className="p-4">{appointment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a menu item from the sidebar</div>;
    }
  };

  // Sidebar toggle handler
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-dark-900 text-dark-100 flex mt-[69px]">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-dark-800 transition-all duration-300 fixed h-full`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`text-red-500 font-bold ${!isSidebarOpen && "hidden"}`}
          >
            ADMIN
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-dark-700"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-4 flex items-center gap-4 hover:bg-dark-700 transition-colors ${
                activeTab === item.id
                  ? "bg-red-500/10 border-r-4 border-red-500"
                  : ""
              }`}
            >
              <item.icon
                size={20}
                className={activeTab === item.id ? "text-red-500" : ""}
              />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        {/* Content Area */}
        <div className="p-6">{renderContent()}</div>
      </div>
      {/* Product Modal (for adding/editing) */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-800 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                  setProductForm({
                    id: "",
                    name: "",
                    category: "",
                    headline: "",
                    processTime: "",
                    price: 0,
                    image: "",
                    requiredDocs: "",
                    description: "",
                  });
                }}
                className="p-2 hover:bg-dark-700 rounded-lg"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-400 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option disabled>Select a category</option>
                    <option value="visa">Visa</option>
                    <option value="ticket">Ticket</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="asylum">Asylum</option>
                    <option value="form">Online Form</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-400 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={productForm.headline}
                  onChange={(e) =>
                    setProductForm({ ...productForm, headline: e.target.value })
                  }
                  className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-400 mb-1">
                    Process Time
                  </label>
                  <input
                    type="text"
                    value={productForm.processTime}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        processTime: e.target.value,
                      })
                    }
                    className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-400 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: +e.target.value })
                    }
                    className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-400 mb-1">
                  Image File
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProductForm({ ...productForm, image: file });
                    }
                  }}
                  required={!editingProduct}
                  className="w-full bg-dark-700 rounded-lg py-2 px-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-400 mb-1">
                  Required Documents (comma-separated)
                </label>
                <input
                  type="text"
                  value={productForm.requiredDocs}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      requiredDocs: e.target.value,
                    })
                  }
                  className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-400 mb-1">
                  Description
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full bg-dark-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              {unfilled && (
                <p className="text-rose-500 text-center">{unfilled}</p>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                    setProductForm({
                      id: "",
                      name: "",
                      category: "",
                      headline: "",
                      processTime: "",
                      price: 0,
                      image: "",
                      requiredDocs: "",
                      description: "",
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (editingProduct) {
                      setSubmitting(true);
                      updateProduct();
                      setSubmitting(false);
                    } else {
                      setSubmitting(true);
                      addProduct();
                      setSubmitting(false);
                    }
                  }}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
                >
                  {editingProduct
                    ? submitting
                      ? "Updating..."
                      : "Update Product"
                    : submitting
                    ? "Adding"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
