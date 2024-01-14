import { Button, useDisclosure, Pagination } from "@nextui-org/react"
import { useEffect, useState, useMemo } from "react"
import { TableVolunteer, Volunteer } from "./types";
import VolunteersTable from "./components/VolunteersTable";
import { fetchAllVolunteers } from "./services/volunteers";
import { PlusIcon } from "./components/PlusIcon";
import AddVolunteerModal from "./components/AddVolunteerModal";
import DeleteVolunteerModal from "./components/DeleteVolunteerModal";
import EditVolunteerModal from "./components/EditVolunteerModal";

function App() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [volunteerIDBeingRemoved, setVolunteerIDBeingRemoved] = useState<string | null>(null)
  const [volunteerBeingEdited, setVolunteerBeingEdited] = useState<Volunteer | null>(null)
  const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange, onClose: onAddClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure()

  const [page, setPage] = useState(1);
  console.log(page)
  const rowsPerPage = 10;

  const pages = volunteers.length ? Math.ceil(volunteers.length / rowsPerPage) : 1; // Otherwise we can get NaN and the page color doesn't show
  const tableItems: TableVolunteer[] = useMemo(() => {
    const rows = volunteers.map((volunteer) => {
      return {
        ...volunteer,
        key: volunteer.id,
      }
    })

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, volunteers]);

  const handleEditVolunteer = (volunteer: Volunteer) => {
    setVolunteerBeingEdited(volunteer)
    onEditOpen()
  }

  const handleRemoveVolunteer = (volunteerId: string) => {
    setVolunteerIDBeingRemoved(volunteerId)
    onDeleteOpen()
  }

  const addVolunteer = (addVolunteerInputs: Partial<Volunteer>) => {
    if (addVolunteerInputs.name && addVolunteerInputs.avatarURL && addVolunteerInputs.phone && addVolunteerInputs.email && addVolunteerInputs.heroProject && addVolunteerInputs.rating) {
      const newId = Number(volunteers[volunteers.length - 1].id) + 1
      const newVolunteer: Volunteer = {
        id: `${newId}`,
        name: addVolunteerInputs.name,
        avatarURL: addVolunteerInputs.avatarURL,
        phone: addVolunteerInputs.phone,
        email: addVolunteerInputs.email,
        heroProject: addVolunteerInputs.heroProject,
        rating: addVolunteerInputs.rating,
        status: Boolean(addVolunteerInputs.status),
        notes: addVolunteerInputs.notes ?? ""
      }
      // Clear inputs
      setVolunteers([...volunteers, newVolunteer])
      onAddClose()
    }
  }

  const editVolunteer = (editVolunteerInputs: Partial<Volunteer>) => {
    if (editVolunteerInputs.name && editVolunteerInputs.avatarURL && editVolunteerInputs.phone && editVolunteerInputs.email && editVolunteerInputs.heroProject && editVolunteerInputs.rating) {
      const newVolunteers = volunteers.map((volunteer) => {
        if (volunteer.id === volunteerBeingEdited?.id) {
          return {
            ...volunteer,
            ...editVolunteerInputs
          }
        }
        return volunteer
      })
      setVolunteers(newVolunteers)
      onEditClose()
    }
  }

  const deleteVolunteer = () => {
    if (volunteerIDBeingRemoved) {
      const newVolunteers = volunteers.filter((volunteer) => {
        return volunteer.id !== volunteerIDBeingRemoved
      })
      setVolunteers(newVolunteers)
    }
    onDeleteClose()
    setVolunteerIDBeingRemoved(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      const volunteers = await fetchAllVolunteers()
      setVolunteers(volunteers)
    }
    fetchData()
  }, [])
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <main className="w-full xl:max-w-screen-xl h-full">
        <header className="w-full pt-4 px-4">
          <h1 className="text-2xl lg:text-5xl font-semibold tracking-tight">HaHa Heroes</h1>
          <h2>Volunteer Management System (VMS)</h2>
          <div className="flex justify-end px-4 pt-2">
            <Button size="sm" className="text-white" onPress={onAddOpen} color="success" endContent={<PlusIcon />}>
              Add
            </Button>
          </div>
        </header>
        <div className="overflow-scroll lg:overflow-auto h-[75vh] max-h-[75vh] w-full">
          <VolunteersTable volunteers={tableItems} setVolunteers={setVolunteers} removeVolunteer={handleRemoveVolunteer}
            editVolunteer={handleEditVolunteer}
          />
        </div>
        <div className="flex w-full mt-4 justify-center">
          <Pagination
            total={pages}
            showControls
            page={page}
            onChange={setPage}
            showShadow
          />
        </div>
      </main>
      <footer className="p-2">
        <p className="mt-auto">HaHa Heroes, Greater Atlanta Area, GA</p>
      </footer>
      <AddVolunteerModal isOpen={isAddOpen} onOpenChange={onAddOpenChange}
        onSubmit={addVolunteer}
      />
      <DeleteVolunteerModal isOpen={isDeleteOpen}
        onDelete={deleteVolunteer}
        onOpenChange={onDeleteOpenChange}
        volunteerName={volunteers.find((volunteer) => {
          return volunteer.id === volunteerIDBeingRemoved
        })?.name ?? ""} />
      <EditVolunteerModal isOpen={isEditOpen} onOpenChange={onEditOpenChange}
        volunteer={volunteerBeingEdited}
        onSubmit={editVolunteer}
      />
    </div>
  );
}

export default App;
