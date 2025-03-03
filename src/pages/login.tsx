import { useEffect, useState } from "react";
import { supabase } from "@utils/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SevenDreamsImage from "@public/icon_seven_dreams.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        const userRole = await getUserRole(data.session.user.id);
        redirectUser(userRole);
      } else {
        console.error(error);
      }
    };
    getSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const userRole = await getUserRole(data.user.id);
      redirectUser(userRole);
    }
  };

  async function getUserRole(userId: string) {
    const { data, error } = await supabase
      .from("users") // Asumsi ada tabel `users` dengan kolom `role`
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user role:", error.message);
      return null;
    }
    return data?.role;
  }

  function redirectUser(role: string | null) {
    if (role === "admin") {
      router.push("/");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="bg-slate-950">
      <section className="flex items-center justify-center translate-y-[30%] lg:translate-y-[50%]">
        <form
          onSubmit={handleLogin}
          className="p-6 bg-slate-900 shadow-md rounded-lg mx-6 sm:mx-0 w-full sm:w-1/3 xl:w-1/4 border-2 border-slate-800"
        >
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-12">
              <Image
                src={SevenDreamsImage}
                alt="SevenDreams Logo"
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl mt-2 font-bold uppercase text-slate-400">
              SevenDreams
            </h2>
          </div>
          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm text-slate-400 border border-transparent bg-slate-700 rounded-full mb-2.5 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm text-slate-400 border border-transparent bg-slate-700 rounded-full mb-5 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2.5 text-sm text-slate-400 font-bold border border-transparent hover:bg-slate-950 bg-gray-950 rounded-full mb-3 outline-none"
          >
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
