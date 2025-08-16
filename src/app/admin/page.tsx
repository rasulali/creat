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
    redirect("/login");
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
        <Link
          className="lg:h-12 h-9 flex w-fit tooltip tooltip-right"
          href="/"
          data-tip="Home"
        >
          <img
            src="/logos/horizontal_black.svg"
            alt="logo"
            className="h-full w-full object-cover"
          />
        </Link>
        <Menu {...userData} />
      </nav>
      <AdminProvider>
        <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8 items-start">
          {/* Left Column - Form + Customers (sticky to form bottom) */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex flex-col h-auto min-h-[50vh]">
              {" "}
              {/* Form container */}
              <Form />
              <div className="mt-8">
                {" "}
                {/* Customers container */}
                <Customers />
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8">
            <div className="min-h-[50vh] lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <Preview />
            </div>
          </div>
        </div>
      </AdminProvider>
    </main>
  );
};

export default Dashboard;
