// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { supabase } from "@utils/supabase"; // Sesuaikan path jika perlu

// export async function middleware(req: NextRequest) {
//   const {
//     // data: { session },
//   } = await supabase.auth.getSession();

//   // const isAuthPage = req.nextUrl.pathname.startsWith("/login");
//   // const isProtectedPage = req.nextUrl.pathname.startsWith("/dashboard");

//   // Jika user belum login dan mencoba masuk ke halaman dashboard

//   // if (isProtectedPage && !session) {
//   //   return NextResponse.redirect(new URL("/login", req.url));
//   // }

//   // Jika user sudah login dan mencoba masuk ke halaman login, arahkan ke dashboard

//   // if (isAuthPage && session) {
//   //   return NextResponse.redirect(new URL("/", req.url));
//   // }

//   return NextResponse.next();
// }
