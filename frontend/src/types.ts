import { SVGProps } from "react";

export interface Volunteer {
  avatarURL: string;
  email: string;
  heroProject: string;
  id: DigitString;
  name: string;
  notes: string;
  phone: string;
  rating: DigitString;
  status: boolean;
}

export interface TableVolunteer extends Volunteer {
  key: `${number}`;
}

export interface VolunteerDTO {
  avatar: string;
  email: string;
  hero_project: string;
  id: DigitString;
  name: string;
  notes: string;
  phone: string;
  rating: DigitString;
  status: boolean;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DigitString = `${number}`;
