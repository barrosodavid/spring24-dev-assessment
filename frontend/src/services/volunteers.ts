import { Volunteer, VolunteerDTO } from "../types";

export const fetchAllVolunteers = async (): Promise<Volunteer[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/bog/users");
    const body: VolunteerDTO[] = await response.json();
    const volunteers: Volunteer[] = body.map((volunteerDTO) => ({
      avatarURL: volunteerDTO.avatar,
      email: volunteerDTO.email,
      heroProject: volunteerDTO.hero_project,
      id: volunteerDTO.id,
      name: volunteerDTO.name,
      notes: volunteerDTO.notes,
      phone: volunteerDTO.phone,
      rating: volunteerDTO.rating,
      status: volunteerDTO.status,
    }));
    return volunteers;
  } catch (error) {
    throw new Error(`Error fetching volunteers: ${error}`);
  }
};
