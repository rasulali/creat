"use client";

import { createContext, useContext, useState } from "react";

interface AdminContextType {
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  deleteProject: boolean;
  setDeleteProject: (project: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  editingProject: null,
  setEditingProject: () => { },
  deleteProject: false,
  setDeleteProject: () => { },
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState(false);

  return (
    <AdminContext.Provider value={{ editingProject, setEditingProject, deleteProject, setDeleteProject }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
