import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function SetFileForSaleModal(props) {
  const { isOpen, onOpen, onClose } = props;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl" // sets the size of the modal
        isCentered // centers the modal on the screen
      >
        <ModalOverlay />
        <ModalContent
          w="80%" // sets the width of the modal content
          maxW="500px" // sets the maximum width of the modal content
          mx="auto" // centers the modal content horizontally
        >
          <ModalHeader textTransform="uppercase">
            Set your file for sale
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Price:</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Price in ETH"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Set For Sale
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
