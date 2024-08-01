"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { Form, Menu, Preview } from "./client";
import Link from "next/link";

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

  type UserDataType = {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: Date;
  };

  return (
    <main className="relative bg-zinc-100 pb-9 min-h-screen">
      <nav className="flex justify-between items-center w-full p-4 lg:px-8">
        <Link className="lg:h-12 h-9 flex w-fit" href="/">
          <img src="/logo.svg" alt="logo" className="h-full w-full object-cover" />
        </Link>
        <Menu {...userData} />
      </nav>
      <div className="flex gap-x-8 flex-col lg:flex-row lg:items-start items-center px-4 lg:p-0 gap-y-4">
        <Form />
        <Preview />
      </div>
    </main>
  );
};

export default Dashboard;
