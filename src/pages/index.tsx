import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@utils/supabase";
import type { AuthUsers } from "@type/AuthUser";

import { JumbotronComponent } from "@components/home/JumbotronComponent";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUsers | null>(null);

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

  return (
    <>
      <section className="bg-neutral-50 px-6 min-h-64 py-10 rounded-md lg:w-3/5">
        <JumbotronComponent userEmail={user?.email || ""} />
      </section>
    </>
  );
}
