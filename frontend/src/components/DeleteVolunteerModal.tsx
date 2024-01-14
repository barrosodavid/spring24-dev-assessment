import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, Slider } from "@nextui-org/react";

interface DeleteVolunteerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  volunteerName: string;
}

const DeleteVolunteerModal = ({ isOpen, onOpenChange, volunteerName, onDelete }: DeleteVolunteerModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to remove {volunteerName}?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="solid" onPress={onDelete}>
                Delete
              </Button>

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteVolunteerModal