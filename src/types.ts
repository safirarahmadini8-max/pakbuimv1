export type View = 'dashboard' | 'protokol' | 'rumah-tangga' | 'narasi' | 'agenda' | 'dokumentasi';

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface Guest {
  id: string;
  name: string;
  organization: string;
  role: string;
}

export interface RundownItem {
  id: string;
  time: string;
  activity: string;
  pic: string;
}

export interface VehicleRequest {
  id: string;
  requester: string;
  destination: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface SpeechDraft {
  id: string;
  title: string;
  pimpinan: string;
  date: string;
  status: 'Draft' | 'Review' | 'Final';
  fileName?: string;
  fileUrl?: string;
}

export interface HouseholdService {
  id: string;
  date: string;
  agenda: string;
  location: string;
  menu: string;
  files: number;
  status: 'Selesai' | 'Proses' | 'Menunggu';
}

export interface DocumentationItem {
  id: string;
  title: string;
  category: 'Protokol' | 'Rumah Tangga';
  type: 'image' | 'video';
  url: string;
  date: string;
}
