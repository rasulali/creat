"use client";
import { createContext, useContext, useState } from "react";

interface AdminContextType {
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  deleteProject: boolean;
  setDeleteProject: (project: boolean) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const AdminContext = createContext<AdminContextType>({
  editingProject: null,
  setEditingProject: () => { },
  deleteProject: false,
  setDeleteProject: () => { },
  refreshTrigger: 0,
  triggerRefresh: () => { },
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <AdminContext.Provider value={{
      editingProject,
      setEditingProject,
      deleteProject,
      setDeleteProject,
      refreshTrigger,
      triggerRefresh
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
