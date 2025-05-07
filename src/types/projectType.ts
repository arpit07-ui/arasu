export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  video: string[];
  date: string;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
  status: "ongoing" | "completed";
  content?: string;
}

export interface CompletedProject {
  title: string;
  year: string;
  outcomes: string;
  images: string[];
}
