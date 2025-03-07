"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { Customers, Form, Menu, Preview } from "./client";
import Link from "next/link";
import { AdminProvider } from "./admin-context";

const Dashboard = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  const { data: userData } = await supabase
    .from("roles")
    .select("*")
    .eq("id", user.id)
    .single()
    .then((res) => res as { data: UserDataType; error: any });

  return (
    <main className="relative bg-zinc-100 pb-9 min-h-dvh">
      <nav className="flex justify-between items-center w-full p-4 lg:px-8">
        <Link className="lg:h-12 h-9 flex w-fit tooltip tooltip-right" href="/"
          data-tip="Home"
        >
          <img src="/logos/horizontal_black.svg" alt="logo" className="h-full w-full object-cover" />
        </Link>
        <Menu {...userData} />
      </nav>
      <AdminProvider>
        <div className="flex px-8 gap-x-8 items-start">
          <div className="flex flex-col w-1/2">
            <Form />
            <div className="w-full h-8 pointer-events-none" />
            <Customers />
          </div>
          <div className="w-1/2">
            <Preview />
          </div>
        </div>
      </AdminProvider>
    </main>
  );
};

export default Dashboard;
