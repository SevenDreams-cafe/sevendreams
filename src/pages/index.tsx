import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@utils/supabase";

import { JumbotronComponent } from "@components/home/JumbotronComponent";

interface AuthUser {
  id: string;
  email: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login"); // Redirect ke halaman login jika tidak ada session
    } else {
      setUser({ id: session.user.id, email: session.user.email ?? "" });
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    localStorage.clear(); // Bersihkan semua data localStorage
    await supabase.auth.signOut();
    const { data: session } = await supabase.auth.getSession();
    console.log("Session after logout:", session); // Harus null
    router.push("/login");
  };

  return (
    <>
      <div className="flex">
        <section className="bg-neutral-50 px-6 min-h-64 py-10 rounded-md w-3/5">
          <JumbotronComponent userEmail={user?.email || ""} />
        </section>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </>
  );
}
