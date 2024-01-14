import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, Slider, SliderValue } from "@nextui-org/react";
import { Volunteer } from "../types";
import { useState, useEffect } from "react";

interface EditVolunteerModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (editVolunteerInputs: Partial<Volunteer>) => void;
    volunteer: Volunteer | null;
}

const EditVolunteerModal = ({ isOpen, onOpenChange, onSubmit, volunteer }: EditVolunteerModalProps) => {
    const [editVolunteerInputs, setEditVolunteerInputs] = useState<Partial<Volunteer>>({
        ...volunteer,
    })

    // Update inputs when default volunteer changes
    useEffect(() => {
        setEditVolunteerInputs({
            ...volunteer,
        })
    }, [volunteer])

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit volunteer</ModalHeader>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit(editVolunteerInputs)
                            setEditVolunteerInputs({})
                        }}>
                            <ModalBody>
                                <Input
                                    isRequired
                                    autoFocus
                                    name="name"
                                    label="Name"
                                    placeholder="Enter volunteer's name"
                                    variant="bordered"
                                    value={editVolunteerInputs.name ?? ""}
                                    onChange={(e) => {
                                        setEditVolunteerInputs({ ...editVolunteerInputs, name: e.target.value })
                                    }}
                                />
                                <Input
                                    isRequired
                                    name="avatar"
                                    label="Avatar"
                                    placeholder="Enter volunteer's avatar image URL"
                                    variant="bordered"
                                    value={editVolunteerInputs.avatarURL ?? ""}
                                    onChange={(e) => {
                                        setEditVolunteerInputs({ ...editVolunteerInputs, avatarURL: e.target.value })
                                    }}
                                />
                                <Input
                                    isRequired
                                    name="phone"
                                    label="Phone"
                                    placeholder="Enter volunteer's phone number"
                                    variant="bordered"
                                    value={editVolunteerInputs.phone ?? ""}
                                    onChange={(e) => {
                                        setEditVolunteerInputs({ ...editVolunteerInputs, phone: e.target.value })
                                    }}
                                />
                                <Input
                                    isRequired
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter volunteer's email"
                                    variant="bordered"
                                    value={editVolunteerInputs.email ?? ""}
                                    onChange={(e) => {
                                        setEditVolunteerInputs({ ...editVolunteerInputs, email: e.target.value })
                                    }}
                                />
                                <Input
                                    isRequired
                                    name="heroProject"
                                    label="Hero project"
                                    placeholder="Enter volunteer's assigned hero project"
                                    variant="bordered"
                                    value={editVolunteerInputs.heroProject ?? ""}
                                    onChange={(e) => {
                                        setEditVolunteerInputs({ ...editVolunteerInputs, heroProject: e.target.value })
                                    }}
                                />
                                <Slider
                                    size="sm"
                                    step={1}
                                    name="rating"
                                    color="secondary"
                                    label="Rating"
                                    showSteps
                                    maxValue={9}
                                    minValue={1}
                                    defaultValue={5}
                                    className="max-w-md"
                                    value={Number(editVolunteerInputs.rating) ?? 5}
                                    onChange={(value: SliderValue) => {
                                        setEditVolunteerInputs({ ...editVolunteerInputs, rating: `${value}` as `${number}` })
                                    }}
                                />
                                <div className="px-1">
                                    <Checkbox
                                        name="status"
                                        isSelected={editVolunteerInputs.status ?? false}
                                        onValueChange={(e) => {
                                            setEditVolunteerInputs({ ...editVolunteerInputs, status: e })
                                        }}
                                    >
                                        Is the volunteer active?
                                    </Checkbox>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default EditVolunteerModal