export type Role = "employee" | "admin";

export type Priority = "Faible" | "Normale" | "Élevée" | "Critique";

export type Status = "Ouverte" | "En Cours" | "Résolue" | "Clôturée";

export type Category = 
  | "IT" 
  | "RH" 
  | "Matériel" 
  | "Chantier" 
  | "Administration" 
  | "Logistique" 
  | "Sécurité";

export interface HelpDeskRequest {
  id: string;
  reference: string;
  subject: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  service: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
