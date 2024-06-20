"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { Form, Menu, Preview } from "./client";
import Link from "next/link";

const Dashboard = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
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
      <nav className="flex justify-between items-center w-full p-4 md:px-8">
        <Link className="w-32 md:w-48 block" href="/">
          <img
            src="/logo-horizontal.svg"
            alt="The logo of the company, flower pattern of left and horizontal text CREAT on right"
          />
        </Link>
        <Menu {...userData} />
      </nav>
      <div className="flex md:px-8 gap-x-8">
        <Form />
        <Preview />
      </div>
    </main>
  );
};

export default Dashboard;
