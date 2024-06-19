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
    <main className="relative bg-zinc-100 pb-9">
      <nav className="flex justify-between items-center w-full p-4">
        <Link className="w-32 block" href="/">
          <img
            src="/logo-horizontal.svg"
            alt="The logo of the company, flower pattern of left and horizontal text CREAT on right"
          ></img>
        </Link>

        <Menu {...userData} />
      </nav>
      <Form />
      <section className="w-full px-4 mt-6">
        <div className="w-full flex flex-col bg-white drop-shadow gap-y-6 rounded-lg p-4">
          {/* heading and desc */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold capitalize leading-tight">
              content overview
            </h1>
            <p>View and manage the contents of website</p>
          </div>
          {/* upload form */}
          <Preview />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
