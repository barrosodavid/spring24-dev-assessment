import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, Slider, SliderValue } from "@nextui-org/react";
import { Volunteer } from "../types";
import { useState } from "react";

interface AddVolunteerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (addVolunteerInputs: Partial<Volunteer>) => void;
}

const AddVolunteerModal = ({ isOpen, onOpenChange, onSubmit }: AddVolunteerModalProps) => {
  const [addVolunteerInputs, setAddVolunteerInputs] = useState<Partial<Volunteer>>({
    rating: "5",
  })

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add volunteer</ModalHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              onSubmit(addVolunteerInputs)
              setAddVolunteerInputs({})
            }}>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  name="name"
                  label="Name"
                  placeholder="Enter volunteer's name"
                  variant="bordered"
                  value={addVolunteerInputs.name ?? ""}
                  onChange={(e) => {
                    setAddVolunteerInputs({ ...addVolunteerInputs, name: e.target.value })
                  }}
                />
                <Input
                  isRequired
                  name="avatar"
                  label="Avatar"
                  placeholder="Enter volunteer's avatar image URL"
                  variant="bordered"
                  value={addVolunteerInputs.avatarURL ?? ""}
                  onChange={(e) => {
                    setAddVolunteerInputs({ ...addVolunteerInputs, avatarURL: e.target.value })
                  }}
                />
                <Input
                  isRequired
                  name="phone"
                  label="Phone"
                  placeholder="Enter volunteer's phone number"
                  variant="bordered"
                  value={addVolunteerInputs.phone ?? ""}
                  onChange={(e) => {
                    setAddVolunteerInputs({ ...addVolunteerInputs, phone: e.target.value })
                  }}
                />
                <Input
                  isRequired
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter volunteer's email"
                  variant="bordered"
                  value={addVolunteerInputs.email ?? ""}
                  onChange={(e) => {
                    setAddVolunteerInputs({ ...addVolunteerInputs, email: e.target.value })
                  }}
                />
                <Input
                  isRequired
                  name="heroProject"
                  label="Hero project"
                  placeholder="Enter volunteer's assigned hero project"
                  variant="bordered"
                  value={addVolunteerInputs.heroProject ?? ""}
                  onChange={(e) => {
                    setAddVolunteerInputs({ ...addVolunteerInputs, heroProject: e.target.value })
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
                  value={Number(addVolunteerInputs.rating) ?? 5}
                  onChange={(value: SliderValue) => {
                    setAddVolunteerInputs({ ...addVolunteerInputs, rating: `${value}` as `${number}` })
                  }}
                />
                <div className="px-1">
                  <Checkbox
                    name="status"
                    isSelected={addVolunteerInputs.status ?? false}
                    onValueChange={(e) => {
                      setAddVolunteerInputs({ ...addVolunteerInputs, status: e })
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
                  Add volunteer
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AddVolunteerModal