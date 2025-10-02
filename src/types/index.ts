export interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  nutrition: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface ReservationFormData {
  name: string;
  telefone: string;
  date: string;
  time: string;
  countG: string;
  message: string;
}

export interface HeaderProps {
  onReservationClick: () => void;
}

export interface ReservationModalProps {
  show: boolean;
  onHide: () => void;
}