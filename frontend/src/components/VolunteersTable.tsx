import {
    Button,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    Tooltip,
    Chip,
    Pagination,
} from "@nextui-org/react";
import { TableVolunteer, Volunteer } from "../types";
import { useCallback, type Key } from "react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";

interface VolunteersTableProps {
    volunteers: TableVolunteer[];
    setVolunteers: (volunteers: Volunteer[]) => void;
    removeVolunteer: (volunteerId: string) => void;
    editVolunteer: (volunteer: Volunteer) => void;
}

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "name",
        label: "Name"
    },
    {
        key: "avatarURL",
        label: "Avatar",
    },
    {
        key: "heroProject",
        label: "Hero Project",
    },
    {
        key: "notes",
        label: "Notes",
    },
    {
        key: "email",
        label: "Email",
    },
    {
        key: "phone",
        label: "Phone",
    },
    {
        key: "rating",
        label: "Rating",
    },
    {
        key: "status",
        label: "Status",
    },

    {
        key: "actions",
        label: "Actions",
    }
]

const VolunteersTable = ({ volunteers, removeVolunteer, editVolunteer }: VolunteersTableProps) => {



    const renderCell = useCallback((volunteer: Volunteer, columnKey: Key) => {
        const handleVolunteerDelete = (volunteerId: string) => {
            return () => {
                removeVolunteer(volunteerId)
            }
        }

        const handleVolunteerEdit = (volunteer: Volunteer) => {
            return () => {
                editVolunteer(volunteer)
            }
        }

        const cellValue = getKeyValue(volunteer, columnKey)
        switch (columnKey) {
            case "name":
                return <span>{cellValue}</span>
            case "avatarURL":
                return <img src={cellValue} alt="Avatar" />
            case "heroProject":
                return <span>{cellValue}</span>
            case "notes":
                return <span>{cellValue}</span>
            case "email":
                return <span>{cellValue}</span>
            case "phone":
                return <span>{cellValue}</span>
            case "rating":
                return <span>{cellValue}</span>
            case "status":
                return <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                    {cellValue ? "Active" : "Inactive"}
                </Chip>
            case "id":
                return <span>{cellValue}</span>
            case "actions":
                return (<div className="relative flex items-center gap-2">
                    <Tooltip content="Edit user">
                        <button onClick={handleVolunteerEdit(volunteer)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </button>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <button onClick={handleVolunteerDelete(volunteer.id)} className="bg-transparent text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </button>
                    </Tooltip>
                </div>)
            default:
                return null
        }
    }, [editVolunteer, removeVolunteer])

    return (
        <Table aria-label="Volunteer data table" isStriped>
            <TableHeader columns={columns}>
                {(column) => <TableColumn width={10} key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={volunteers}>
                {(item) => {
                    return (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell key={columnKey}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>)
                }
                }
            </TableBody>
        </Table >)
}

export default VolunteersTable